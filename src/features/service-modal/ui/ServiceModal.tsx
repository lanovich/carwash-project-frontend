import { Button, Modal } from "@/shared/ui";
import { Service } from "@/entities/service/model";
import {
  ServiceDescription,
  ServiceGallery,
  ServicePrices,
  ServiceResults,
  ServiceTags,
} from ".";
import { ObjectType } from "@/entities/booking/model";

interface ServiceModalProps {
  service: Service;
  isOpen: boolean;
  isBlocked?: boolean;
  canOrder?: boolean;
  isSelected?: boolean;
  selectedObjectType: ObjectType;
  onClose: () => void;
  onConfirm: () => void;
}

export const ServiceModal = ({
  service,
  isOpen,
  isSelected,
  selectedObjectType,
  isBlocked,
  canOrder,
  onClose,
  onConfirm,
}: ServiceModalProps) => {
  if (!isOpen) return null;

  return (
    <Modal
      onClose={onClose}
      className="border-2 border-primary/50 gap-2 flex flex-col md:max-w-[75vw] lg:max-w-[60vw] xl:max-w-[40vw] transform transition-all duration-300 ease-out opacity-0 animate-modal-open"
    >
      <h2>{service.title}</h2>
      <p className="text-small text-text-secondary">
        {service.shortDescription}
      </p>

      <ServiceGallery
        title={service.title}
        mainImage={service.mainImage}
        additionalImages={service.additionalImages}
      />
      <ServiceDescription description={service.longDescription} />
      <ServiceResults results={service.resultDescriptions} />
      <ServiceTags tags={service.tags} popular={service.popular} />
      <ServicePrices
        prices={service.prices}
        duration={service.duration}
        selectedObjectType={selectedObjectType}
      />

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="primaryGhost" onClick={onClose}>
          Закрыть
        </Button>
        {canOrder && (
          <Button onClick={onConfirm} disabled={isBlocked}>
            {isBlocked
              ? "Услуга уже включена"
              : isSelected
              ? "Убрать услугу"
              : "Добавить услугу"}
          </Button>
        )}
      </div>
    </Modal>
  );
};
