import Image from "next/image";
import { getAllProducts } from "../services/allProductService";
import { getProductsByCategorySlug } from "../services/productService";
import { AddToCartButton } from '../../components/basket/cartButtin/AddToCartButton';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;




  const products =
    slug === "menu"
      ? await getAllProducts()
      : await getProductsByCategorySlug(slug);

  return (
    <main className="container flex flex-col w-full h-screen p-4 top-20 absolute gap-6  mx-auto">
      <h1 className="text-3xl font-bold justify-center text-green-500 mb-6 capitalize">
        {slug === "menu" ? "Menu" : slug}
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500">
          Can&rsquo;t find any products in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-amber-500/20 p-4 rounded-lg hover:bg-amber-500/30 transition-colors"
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
              <h2 className="text-xl font-semibold text-amber-800 capitalize">
                {product.name}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {product.description}
              </p>
              <p className="text-amber-700 font-bold mt-2">{product.price} £</p>
              <AddToCartButton product={product} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
