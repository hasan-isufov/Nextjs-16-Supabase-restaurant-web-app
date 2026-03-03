import { supabase } from "@/lib/supabase/client/supabase";

export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category_id: string;
};
export const getProductsByCategorySlug = async (
  slug: string,
): Promise<Product[]> => {
  const { data: category } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", slug)
    .single();

  if (!category) return [];

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", category.id);

  if (error) throw new Error(error.message);
  return data as Product[];
};
