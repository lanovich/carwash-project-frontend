import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/shared/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  title?: string;
  mainImage?: string;
  additionalImages?: string[];
}

export const ServiceGallery = ({
  title,
  mainImage,
  additionalImages,
}: Props) => {
  const allImages = [mainImage, ...(additionalImages ?? [])].filter(
    (img): img is string => Boolean(img)
  );

  const imagesToShow = allImages.length ? allImages : ["/placeholder.jpg"];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    skipSnaps: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
        setSelectedIndex(index);
      }
    },
    [emblaApi]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      onSelect();
      emblaApi.on("select", onSelect);
    }
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      {/* Основной Carousel */}
      <div className="overflow-hidden relative" ref={emblaRef}>
        <div className="flex gap-2">
          {imagesToShow.map((img, idx) => (
            <div
              key={idx}
              className="flex-[0_0_100%] relative"
              onClick={() => scrollTo(idx)}
            >
              <img
                src={img}
                alt={`${title} ${idx}`}
                className={`w-full h-64 object-cover rounded-md transition-all border-2 ${
                  selectedIndex === idx
                    ? "border-primary"
                    : "border-transparent"
                }`}
              />
            </div>
          ))}
        </div>

        {canScrollPrev && (
          <Button
            iconOnly
            variant="primaryGhost"
            icon={
              <ChevronLeft color="var(--color-primary)" strokeWidth={1.75} />
            }
            onClick={scrollPrev}
            className="z-50 absolute left-0 top-1/2 -translate-y-1/2 translate-x-1/2 px-0 h-fit py-0 bg-white/80 border-none"
          />
        )}
        {canScrollNext && (
          <Button
            iconOnly
            variant="primaryGhost"
            icon={
              <ChevronRight color="var(--color-primary)" strokeWidth={1.75} />
            }
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 px-0 h-fit py-0 bg-white/80 border-none"
          />
        )}
      </div>

      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto mt-2">
          {imagesToShow.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${title} thumb ${idx}`}
              className={`w-20 h-20 object-cover rounded cursor-pointer border-2 transition-all ${
                selectedIndex === idx ? "border-primary" : "border-transparent"
              }`}
              onClick={() => scrollTo(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
