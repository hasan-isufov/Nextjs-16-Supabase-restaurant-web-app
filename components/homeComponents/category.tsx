import Image from "next/image";
import Link from "next/link";
import { Category, getCategories } from "../../app/services/categoryService";

export default async function CategoryCom() {
  const categories: Category[] = await getCategories();

  return (
    <div className="container  flex   w-full mx-auto p-4 text-2xl justify-center items-center text-gray-800 font-bold ">
      <div className=" flex flex-col md:flex-row  w-full justify-around gap-3 bg-black/10 p-4 rounded-lg">
        {categories.map((category) => (
          <Link key={category.id} href={`${category.slug}`}>
            <div className=" rounded-lg bg-green-700/20 hover:bg-green-700/30 px-24  transition-colors">
              <Image
                src={category.icon}
                alt={category.name}
                width={24}
                height={24}
                className="flex flex-col justify-center mx-auto w-full h-full object-cover"
              />
              <div className='flex justify-center mt-2'>{category.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
