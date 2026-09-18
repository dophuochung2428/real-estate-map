import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/service";
import { getStoragePath } from "@/utils/storage";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Thiếu ID bài đăng" },
        { status: 400 },
      );
    }

    // Client theo session của user hiện tại
    const supabase = await createServerClient();

    // Kiểm tra đăng nhập
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Chưa đăng nhập" },
        { status: 401 },
      );
    }

    // Kiểm tra quyền admin
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || profile?.role !== "admin") {
      return NextResponse.json(
        { error: "Bạn không có quyền xóa bài đăng" },
        { status: 403 },
      );
    }

    // =========================================================
    // 1. Lấy danh sách ảnh trước khi xóa record
    // =========================================================

    const { data: images, error: imagesError } = await supabaseAdmin
      .from("property_images")
      .select("image_url, image_key")
      .eq("property_id", id);

    if (imagesError) {
      console.error("Get property images error:", imagesError);

      return NextResponse.json(
        { error: "Không thể lấy hình ảnh của bài đăng" },
        { status: 500 },
      );
    }

    // =========================================================
    // 2. Xóa ảnh trên Cloudflare R2
    // =========================================================

    const r2Images = (images ?? []).filter(
      (image) => image.image_key,
    );

    for (const image of r2Images) {
      const response = await fetch(new URL("/api/delete", _request.url), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: image.image_key,
        }),
      });

      if (!response.ok) {
        console.error(
          "Delete R2 image error:",
          image.image_key,
        );

        return NextResponse.json(
          { error: "Không thể xóa hình ảnh trên R2" },
          { status: 500 },
        );
      }
    }

    // =========================================================
    // 3. Xóa ảnh cũ trên Supabase Storage
    // =========================================================

    const supabaseImages = (images ?? []).filter(
      (image) => !image.image_key,
    );

    if (supabaseImages.length > 0) {
      const filePaths = supabaseImages.map((image) =>
        getStoragePath(image.image_url),
      );

      const { error: storageError } = await supabaseAdmin.storage
        .from("property-images")
        .remove(filePaths);

      if (storageError) {
        console.error(
          "Delete Supabase Storage images error:",
          storageError,
        );

        return NextResponse.json(
          { error: "Không thể xóa hình ảnh trên Storage" },
          { status: 500 },
        );
      }
    }

    // =========================================================
    // 4. Xóa dữ liệu land areas
    // =========================================================

    const { error: landAreaError } = await supabaseAdmin
      .from("property_land_areas")
      .delete()
      .eq("property_id", id);

    if (landAreaError) {
      console.error(
        "Delete property land areas error:",
        landAreaError,
      );

      return NextResponse.json(
        { error: "Không thể xóa dữ liệu đất của bài đăng" },
        { status: 500 },
      );
    }

    // =========================================================
    // 5. Xóa records hình ảnh
    // =========================================================

    const { error: imageDbError } = await supabaseAdmin
      .from("property_images")
      .delete()
      .eq("property_id", id);

    if (imageDbError) {
      console.error(
        "Delete property images DB error:",
        imageDbError,
      );

      return NextResponse.json(
        { error: "Không thể xóa dữ liệu hình ảnh" },
        { status: 500 },
      );
    }

    // =========================================================
    // 6. Hard delete property
    // =========================================================

    const { data: deletedProperty, error: propertyError } =
      await supabaseAdmin
        .from("properties")
        .delete()
        .eq("id", id)
        .select("id")
        .maybeSingle();

    if (propertyError) {
      console.error("Delete property error:", propertyError);

      return NextResponse.json(
        {
          error: propertyError.message,
          code: propertyError.code,
          details: propertyError.details,
          hint: propertyError.hint,
        },
        { status: 500 },
      );
    }

    // Không có row nào thực sự bị xóa
    if (!deletedProperty) {
      console.error("Property was not deleted. ID:", id);

      return NextResponse.json(
        { error: "Không tìm thấy bài đăng" },
        { status: 404 },
      );
    }

    console.log("Deleted property:", deletedProperty.id);

    return NextResponse.json({
      success: true,
      deletedPropertyId: deletedProperty.id,
    });
  } catch (error) {
    console.error("Delete property API error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Đã xảy ra lỗi khi xóa bài đăng",
      },
      { status: 500 },
    );
  }
}