import { Carousel } from "@/shared/ui";
import { useState } from "react";

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
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    mainImage || additionalImages?.[0] || "/logo.svg"
  );

  const allImages = [mainImage, ...(additionalImages ?? [])].filter(
    (img): img is string => Boolean(img)
  );

  const images = [mainImage, ...(additionalImages ?? [])].filter(Boolean);

  const imagesToShow = images.length ? images : ["/logo.svg"];
  const hasImages = images.length > 0;

  return (
    <div>
      <Carousel itemsPerSlide={1} gap={8} className="max-h-64 rounded-md">
        {imagesToShow.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${title} ${idx}`}
            className={`w-full h-64 object-cover rounded-md transition-all ${
              hasImages ? "cursor-pointer border-2" : "opacity-70"
            } ${
              selectedImage === img && hasImages
                ? "border-primary"
                : "border-transparent"
            }`}
            onClick={() => hasImages && setSelectedImage(img)}
          />
        ))}
      </Carousel>

      {hasImages && allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto mt-2">
          {allImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${title} thumb ${idx}`}
              className={`w-20 h-20 object-cover rounded cursor-pointer border-2 transition-all ${
                selectedImage === img ? "border-primary" : "border-transparent"
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
