import { supabase } from "@/lib/supabase/client/supabase";

export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category_id: string;
};
export const getAllProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw new Error(error.message);
  return data as Product[];
};
