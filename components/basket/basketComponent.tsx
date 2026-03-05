// components/BasketSheet.tsx
"use client";

import { useCart } from "../../app/context/CartContext";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export function BasketSheet() {
  const { cart, removeFromCart, updateQty } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          Basket {cart.length > 0 && `(${cart.reduce((s, i) => s + i.qty, 0)})`}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Shopping Basket</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-4 px-4">
          {cart.length === 0 ? (
            <p className="text-gray-500">Basket is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.price} £ x {item.qty}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(item.id, -1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)}>+</button>
                  <button onClick={() => removeFromCart(item.id)}>🗑</button>
                </div>
              </div>
            ))
          )}
        </div>

        <SheetFooter>
          {cart.length > 0 && (
            <p className="font-bold">Total: {total.toFixed(2)} £</p>
          )}
          <Button type="submit">Go to Checkout</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
