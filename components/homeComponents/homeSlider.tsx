"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import * as React from "react";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );

  const slides: { url: string; alt: string; title: string }[] = [
    {
      url: "https://ivgxziafhjebalzhdxqk.supabase.co/storage/v1/object/public/nano/grilled-beef-steak-dark-wooden-surface.jpg",
      alt: "Slider 2",
      title: "Nano Steak",
    },
    {
      url: "https://ivgxziafhjebalzhdxqk.supabase.co/storage/v1/object/public/nano/pexels-alleksana-4050990.jpg",
      alt: "Slider 3",
      title: "Nano Restaurant",
    },
    {
      url: "https://ivgxziafhjebalzhdxqk.supabase.co/storage/v1/object/public/nano/pexels-suju-1132558.jpg",
      alt: "Slider 4",
      title: "Nano Restaurant Dessert ",
    },
    {
      url: "https://ivgxziafhjebalzhdxqk.supabase.co/storage/v1/object/public/nano/pexels-vanmalidate-769289.jpg",
      alt: "Slider 5",
      title: "Nano Restaurant Special",
    },
  ];

  return (
    <div className=" container w-full flex justify-center px-12 mx-auto mt-20">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="relative h-96 flex aspect-video p-0 overflow-hidden rounded-lg">
                  <Image
                    src={slide.url}
                    alt={slide.alt}
                    fill
                    className="object-cover "
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-gray-500/20 text-green-700 text-7xl font-bold px-4 py-2 rounded-md">
                      {slide.title}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="z-30" />
        <CarouselNext className="z-30" />
      </Carousel>
    </div>
  );
}
