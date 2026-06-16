export async function uploadImage(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  return res.json();
}

export async function deleteImage(key: string) {
  await fetch("/api/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key,
    }),
  });
}
