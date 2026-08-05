"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SanityImage } from "@/types/product";

export default function ProductGallery({ images }: { images?: SanityImage[] }) {
  const [selected, setSelected] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-[var(--stone)] rounded-lg flex items-center justify-center text-gray-400">
        No image
      </div>
    );
  }

  const mainImage = images[selected];
  const thumbnails = images;

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-white border border-[var(--stone)]">
        {mainImage && (
          <Image
            src={urlFor(mainImage).width(800).height(800).url()}
            alt="Product image"
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {thumbnails.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(idx)}
            className={`relative w-20 h-20 flex-shrink-0 overflow-hidden rounded border-2 transition ${
              selected === idx ? "border-[var(--gold)]" : "border-transparent"
            }`}
          >
            <Image
              src={urlFor(img).width(100).height(100).url()}
              alt={`Thumbnail ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
