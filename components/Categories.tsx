import Link from "next/link";

export default function Categories({ categories }: any) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10 md:mb-14">

          <div>
            <p className="text-[10px] md:text-xs tracking-[0.45em] uppercase text-gray-500 mb-4">
              Explore
            </p>

            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-none">
              Shop Categories
            </h2>
          </div>

          <Link
            href="/categories"
            className="text-[11px] tracking-[0.3em] uppercase border-b border-black pb-2 w-fit"
          >
            View All
          </Link>

        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

          {categories?.slice(0, 8).map((category: any) => (
            <Link
              key={category._id}
              href={`/category/${category.slug.current}`}
              className="group"
            >
              <div className="aspect-[4/5] bg-[var(--stone)] p-5 md:p-6 flex items-end transition-colors duration-300 group-hover:bg-black">

                <div>

                  <h3 className="font-serif text-xl md:text-2xl group-hover:text-white transition-colors">
                    {category.name}
                  </h3>

                  <p className="mt-3 text-[10px] md:text-xs tracking-[0.3em] uppercase text-gray-500 group-hover:text-gray-300">
                    Discover
                  </p>

                </div>

              </div>
            </Link>
          ))}

        </div>

      </div>
    </section>
  );
}
