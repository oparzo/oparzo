import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Category {
  _id: string;
  name: string;
  slug: { current: string };
  coverImage?: any;
}

export default function Categories({ categories }: { categories: Category[] }) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 bg-[var(--cream)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-gray-500">
              EXPLORE
            </p>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--ink)]">
              Shop Categories
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-sm uppercase tracking-[0.2em] text-[var(--muted)] hover:text-[var(--ink)] transition"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => {
            const imageUrl = category.coverImage
              ? urlFor(category.coverImage).width(600).height(400).url()
              : null;

            return (
              <Link
                key={category._id}
                href={`/category/${category.slug.current}`}
                className="group relative overflow-hidden rounded-lg aspect-[4/3] bg-[var(--stone)]"
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-[var(--stone)] flex items-center justify-center">
                    <span className="text-sm text-gray-400">No image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition flex items-center justify-center">
                  <span className="text-white font-serif text-lg sm:text-xl lg:text-2xl tracking-wide">
                    {category.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
