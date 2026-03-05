import { supabase } from "@/lib/supabase/client/supabase";

// Tip tanımlarını export edelim ki sayfalarda da kullanabilelim
export type Category = {
  id: string; // Supabase'de uuid kullandıysan string olmalı, int8 ise number
  name: string;
  icon: string;
  slug?: string;
};

export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) throw new Error(error.message);
  return data as Category[]; // Gelen veriyi tipimize zorluyoruz
};
