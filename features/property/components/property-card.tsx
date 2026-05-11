"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, MapPin, Bed, Bath, Square } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Property {
  id: string;
  title: string;
  price: number | string;
  area: number;
  location: string;
  type: string;
  beds?: number;
  baths?: number;
  image: string;
  featured?: boolean;
  saved?: boolean;
  postedAt?: string;
}

interface PropertyCardProps {
  property: Property;
  variant?: "default" | "compact" | "featured";
  className?: string;
  onSave?: (propertyId: string) => void;
}

export function PropertyCard({
  property,
  variant = "default",
  className,
  onSave
}: PropertyCardProps) {
  const formatPrice = (price: number | string) => {
    if (typeof price === "string") return price;
    if (price >= 1000000000) {
      return `${(price / 1000000000).toFixed(1)} tỷ`;
    }
    return `${(price / 1000000).toFixed(0)} triệu`;
  };

  const cardClasses = {
    default: "overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
    compact: "hover:shadow-md transition-shadow",
    featured: "overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-yellow-200",
  };

  const imageHeight = {
    default: "h-48",
    compact: "h-32",
    featured: "h-56",
  };

  return (
    <Card className={cn(cardClasses[variant], className)}>
      <div className="relative">
        <Link href={`/properties/${property.id}`}>
          <div className={cn("relative overflow-hidden", imageHeight[variant])}>
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
            {property.featured && (
              <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold shadow-md">
                Nổi bật
              </div>
            )}
          </div>
        </Link>

        <button
          onClick={() => onSave?.(property.id)}
          className={cn(
            "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors",
            property.saved
              ? "bg-red-500 text-white"
              : "bg-white text-gray-400 hover:text-red-500"
          )}
          aria-label={property.saved ? "Bỏ lưu" : "Lưu tin"}
        >
          <Heart size={16} fill={property.saved ? "currentColor" : "none"} />
        </button>
      </div>

      <CardContent className="p-4">
        <Link href={`/properties/${property.id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {property.title}
          </h3>
        </Link>

        <p className="text-blue-600 font-bold text-xl mb-2">
          {formatPrice(property.price)}
        </p>

        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin size={16} className="mr-1 flex-shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Square size={14} className="mr-1" />
              <span>{property.area} m²</span>
            </div>
            {property.beds && (
              <div className="flex items-center">
                <Bed size={14} className="mr-1" />
                <span>{property.beds}</span>
              </div>
            )}
            {property.baths && (
              <div className="flex items-center">
                <Bath size={14} className="mr-1" />
                <span>{property.baths}</span>
              </div>
            )}
          </div>

          {property.postedAt && (
            <span className="text-gray-400 text-xs">{property.postedAt}</span>
          )}
        </div>

        {variant === "compact" && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <Button className="w-full" size="sm">
              Xem chi tiết
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}