import CategoryCom from "../components/homeComponents/category";
import { CarouselPlugin } from "../components/homeComponents/homeSlider";

export default function HomePage() {
  return (
    <main className="flex flex-col w-full  p-4 gap-6">
      <CarouselPlugin />
      <CategoryCom />
    </main>
  );
}
