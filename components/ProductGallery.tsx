"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default function ProductGallery({
  images = [],
}: {
  images: any[];
}) {
  const [active, setActive] = useState(0);

  if (!images.length) {
    return (
      <div className="aspect-[4/5] rounded-sm border border-[var(--stone)] bg-[var(--surface)]" />
    );
  }

  return (
    <div>

      <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-[var(--stone)] bg-[var(--surface)]">

        <Image
          src={urlFor(images[active]).width(1400).url()}
          alt="Product image"
          fill
          priority
          className="object-cover transition duration-500 hover:scale-[1.03]"
        />

      </div>

      {images.length > 1 && (

        <div className="mt-5 flex gap-3 overflow-x-auto pb-2">{images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View image ${index + 1}`}
              className={`relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-sm border transition ${
                active === index
                  ? "border-[var(--gold)]"
                  : "border-[var(--stone)] hover:border-[var(--gold)]"
              }`}
            >
              <Image
                src={urlFor(image).width(300).url()}
                alt={`Product thumbnail ${index + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>

      )}

    </div>
  );
}
