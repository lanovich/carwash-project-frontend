import { ObjectType } from "@/entities/booking/model";
import { OBJECT_TYPES } from "@/entities/car/model";
import { CarTypeCard } from "@/entities/car/ui";
import { ALL_CATEGORIES, selectAllServices } from "@/entities/service/model";
import { HorizontalServiceCard } from "@/entities/service/ui";
import { Container } from "@/shared/ui";
import { useState } from "react";

export const OurServices = () => {
  const [selectedType, setSelectedType] = useState<ObjectType>("sedan");
  const services = selectAllServices();

  return (
    <div className="mt-8">
      <div className="flex gap-2 items-stretch flex-wrap bg-bg-dark-100 py-4 justify-center shadow-lg">
        {Object.entries(OBJECT_TYPES).map(([type, { caption, icon }]) => {
          const isActive = selectedType === type;
          return (
            <CarTypeCard
              className="max-w-[200px]"
              key={type}
              caption={caption}
              icon={icon}
              active={isActive}
              onClick={() => setSelectedType(type as ObjectType)}
            />
          );
        })}
      </div>

      <div className="bg-bg-dark">
        <Container className="flex gap-4 py-4 max-w-[1660px] flex-wrap">
          {ALL_CATEGORIES.map(({ name, value }) => (
            <div className="flex flex-col flex-1 min-w-[300px]" key={value}>
              <div className="flex bg-primary px-4 py-2 rounded-md text-white text-super-caption text-center mb-4">
                {name}
              </div>
              <div className="flex flex-col gap-3">
                {services
                  .filter((service) => service.category === value)
                  .map((service) => (
                    <HorizontalServiceCard
                      key={service.id}
                      service={service}
                      canOrder={false}
                      selectedObjectType={
                        service.category === "special"
                          ? "special"
                          : selectedType
                      }
                      size="sm"
                    />
                  ))}
              </div>
            </div>
          ))}
        </Container>
      </div>
    </div>
  );
};
