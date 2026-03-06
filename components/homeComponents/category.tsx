import Image from "next/image";
import Link from "next/link";
import { Category, getCategories } from "../../app/services/categoryService";

export default async function CategoryCom() {
  const categories: Category[] = await getCategories();

  return (
    <section className=" w-full px-4 py-8 md:py-12 border-2 bg-emerald-700/50 shadow-2xl rounded-2xl my-10">
      <div className="max-w-6xl mx-auto  ">
        {/* Section Title */}
        <h2 className="text-center text-sm uppercase tracking-[0.3em] text-green-400 font-bold mb-2">
          Categories
        </h2>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4  ">
          {categories.map((category) => (
            <Link key={category.id} href={`${category.slug}`} className="group">
              <div
                className="
                  flex flex-col items-center justify-center gap-3
                  p-4 md:p-5 rounded-2xl
                  bg-white/5 border border-white/10
                  hover:bg-green-700/20 hover:border-green-500/40
                  transition-all duration-300
                  cursor-pointer shadow-lg
                "
              >
                {/* Icon */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                  <Image
                    src={category.icon}
                    alt={category.name}
                    fill
                    unoptimized
                    className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Name */}
                <span className="text-sm md:text-base font-semibold text-center text-white/80 group-hover:text-green-400 transition-colors duration-300 leading-tight">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
