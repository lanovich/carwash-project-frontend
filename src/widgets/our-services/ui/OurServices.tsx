import { useState } from "react";
import { ObjectType } from "@/entities/booking/model";
import { OBJECT_TYPES } from "@/entities/car/model";
import { CarTypeCard } from "@/entities/car/ui";
import { ALL_CATEGORIES, selectAllServices } from "@/entities/service/model";
import { HorizontalServiceCard } from "@/entities/service/ui";
import { Container } from "@/shared/ui";

export const OurServices = () => {
  const [selectedType, setSelectedType] = useState<ObjectType>("sedan");
  const services = selectAllServices();

  const handleSelectType = (type: string) =>
    setSelectedType(type as ObjectType);

  const filteredTypes = Object.entries(OBJECT_TYPES).filter(
    ([type]) => type !== "special"
  );

  return (
    <div className="mt-8 bg-bg-dark-100  border-b border-primary border-dashed">
      <div className="flex gap-2 items-stretch py-4 justify-center shadow-lg px-6 flex-wrap">
        {filteredTypes.map(([type, { caption, icon }]) => (
          <CarTypeCard
            key={type}
            className="max-w-[200px]"
            caption={caption}
            icon={icon}
            active={selectedType === type}
            onClick={() => handleSelectType(type)}
          />
        ))}
      </div>

      <div className="bg-bg-dark">
        <Container className="flex gap-4 py-4 max-w-[1660px] flex-wrap">
          {ALL_CATEGORIES.map(({ name, value }) => {
            const categoryServices = services.filter(
              (service) => service.category === value
            );

            return (
              <div
                key={value}
                className="flex flex-col flex-1 gap-1.5"
              >
                <div className="flex bg-primary px-4 py-2 rounded-md text-white text-super-caption text-center">
                  {name}
                </div>

                <div className="flex flex-col gap-2">
                  {categoryServices.map((service) => (
                    <HorizontalServiceCard
                      key={service.id}
                      service={service}
                      canOrder={false}
                      size="sm"
                      selectedObjectType={
                        service.category === "special"
                          ? "special"
                          : selectedType
                      }
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </div>
    </div>
  );
};
