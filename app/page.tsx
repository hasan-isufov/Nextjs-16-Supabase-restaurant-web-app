import CategoryCom from "../components/homeComponents/category";
import { CarouselPlugin } from "../components/homeComponents/homeSlider";
import MenuSec from '../components/menuSection/menuSec';

export default function HomePage() {
  return (
    <main >
      <CarouselPlugin />
      <CategoryCom />
      <MenuSec />

    </main>
  );
}
