// components/AddToCartButton.tsx
"use client";

import { useCart } from '../../../app/context/CartContext';


type Props = {
  product: {
    id: number;
    name: string;
    price: number;
    image_url?: string;
  };
};

export function AddToCartButton({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-md mt-2"
    >
      Add to Cart
    </button>
  );
}
