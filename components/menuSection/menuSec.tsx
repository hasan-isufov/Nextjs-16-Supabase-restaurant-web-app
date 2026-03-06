import Image from "next/image";
import { JSX } from "react";
import { getAllProducts } from "../../app/services/allProductService";
import { AddToCartButton } from "../basket/cartButton/AddToCartButton";

export default async function MenuSec(): Promise<JSX.Element> {
  const products = await getAllProducts();
  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-emerald-800/50 rounded-2xl shadow-2xl my-10">
      <h1 className=" text-3xl font-bold text-center text-green-400  mb-4 my-5">
        Our Menu
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500">
          Can&rsquo;t find any products in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl
                  bg-white/10 border border-gray-500/20
                  hover:bg-green-700/20 hover:border-green-500/40
                  transition-all duration-300
                  cursor-pointer shadow-xl p-2 "
            >
              {product.image_url && (
                <div className="relative w-full h-48 mb-3">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              )}
              <h2 className="text-xl font-semibold text-green-400 capitalize">
                {product.name}
              </h2>
              <p className="text-gray-600 text-sm mt-1 font-semibold">
                {product.description}
              </p>
              <p className="text-green-600 font-bold mt-2">{product.price} £</p>
              <AddToCartButton product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
