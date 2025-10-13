import {
  ReactNode,
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  ReactElement,
  useState,
  useEffect,
} from "react";
import { cn } from "@/shared/lib";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/shared/ui";
import useEmblaCarousel from "embla-carousel-react";

interface CarouselProps {
  children: ReactNode;
  itemsPerSlide?: number;
  className?: string;
  gap?: number;
  options?: any;
}

export function Carousel({
  children,
  className,
  itemsPerSlide = 4,
  gap = 8,
  options,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: itemsPerSlide,
    containScroll: "trimSnaps",
    dragFree: false,
    ...options,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateButtons();
    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);
  }, [emblaApi, updateButtons]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const totalGap = gap * (itemsPerSlide - 1);
  const basis = `calc(${100 / itemsPerSlide}% - ${totalGap / itemsPerSlide}px)`;

  const childArray = Children.toArray(children) as ReactElement[];

  return (
    <div className={cn("flex gap-1 items-center relative w-full", className)}>
      {canScrollPrev && (
        <Button
          iconOnly
          variant={"primaryGhost"}
          icon={<ChevronLeft color="var(--color-primary)" strokeWidth={1.75} />}
          onClick={scrollPrev}
          className="absolute left-0 -translate-x-1/2 z-10 px-0 h-fit py-0 bg-white border-none"
        />
      )}

      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div className="flex gap-2">
          {childArray.map((child, idx) => {
            if (!isValidElement(child)) return null;
            const element = child as ReactElement<any>;
            return cloneElement(element, {
              key: element.key ?? idx,
              style: { flex: `0 0 ${basis}`, ...(element.props.style || {}) },
            });
          })}
        </div>
      </div>

      {canScrollNext && (
        <Button
          iconOnly
          variant={"primaryGhost"}
          icon={
            <ChevronRight color="var(--color-primary)" strokeWidth={1.75} />
          }
          onClick={scrollNext}
          className="absolute right-0 translate-x-1/2 z-10 px-0 h-fit py-0 bg-white border-none"
        />
      )}
    </div>
  );
}
