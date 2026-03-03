import Link from "next/link";
import { Category, getCategories } from "../../app/services/categoryService";

export default async function CategoryCom() {
  const categories: Category[] = await getCategories();

  return (
    <div className="container  flex  w-full h-25 mx-auto p-4 text-2xl justify-center items-center text-amber-800">
      <div className=" flex flex-row flex-wrap w-full justify-around gap-4 bg-black/10 p-4 rounded-lg">
        {categories.map((category) => (
          <Link key={category.id} href={`${category.slug}`}>
            <div className="bg-amber-500/20 p-2 px-4 rounded-lg hover:bg-amber-500/30 transition-colors">
              {category.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
