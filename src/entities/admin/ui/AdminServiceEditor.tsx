import { Controller, useForm } from "react-hook-form";
import { ALL_CATEGORIES, measureMap, Service } from "@/entities/service/model";
import {
  Button,
  Input,
  Textarea,
  Checkbox,
  ImagePreview,
  FormField,
  Select,
  FileUploader,
} from "@/shared/ui";
import { Plus } from "lucide-react";
import {
  useDeleteAdditionalImageMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
  useUploadAdditionalImageMutation,
  useUploadMainImageMutation,
} from "@/entities/service/api";
import { ServiceObjectTypeBlock } from ".";
import { useState } from "react";
import { ConfirmModal } from "@/features/modals/ui";

interface Props {
  service: Service;
}

type FormValues = {
  title: string;
  category: string;
  popular: boolean;
  from: boolean;
  shortDescription: string;
  longDescription: string;
  measure: Service["measure"];
  resultDescriptions: string[];
};

export const AdminServiceEditor = ({ service }: Props) => {
  const [updateService] = useUpdateServiceMutation();
  const [uploadMainImage] = useUploadMainImageMutation();
  const [uploadAdditionalImage] = useUploadAdditionalImageMutation();
  const [deleteAdditionalImage] = useDeleteAdditionalImageMutation();
  const [deleteService] = useDeleteServiceMutation();
  const [isModalOpen, setModalOpen] = useState(false);

  const { control, watch, getValues } = useForm<FormValues>({
    defaultValues: {
      title: service.title,
      category: service.category,
      popular: service.popular,
      from: service.from,
      measure: service.measure,
      shortDescription: service.shortDescription,
      longDescription: service.longDescription,
      resultDescriptions: service.resultDescriptions
        ? [...service.resultDescriptions].slice(0, 3)
        : ["", "", ""],
    },
  });

  const resultDescriptions = watch("resultDescriptions") || [];

  const measureOptions = [
    { label: "ничего", value: null },
    ...Object.entries(measureMap).map(([key, label]) => ({
      label,
      value: key,
    })),
  ];

  const handleBlur = async <T extends keyof FormValues>(fieldName: T) => {
    const data = getValues();
    const newValue = data[fieldName];
    const oldValue = service[fieldName as keyof typeof service];
    if (newValue === oldValue) return;

    try {
      await updateService({
        id: service.id,
        data: { [fieldName]: newValue },
      }).unwrap();
    } catch (error) {
      console.error(`Failed to update ${fieldName}:`, error);
    }
  };

  const handleResultDescriptionsBlur = async () => {
    const newValues = getValues("resultDescriptions").slice(0, 3);
    const oldValues = service.resultDescriptions?.slice(0, 3) || ["", "", ""];
    const isChanged = newValues.some((val, i) => val !== oldValues[i]);
    if (!isChanged) return;

    try {
      await updateService({
        id: service.id,
        data: { resultDescriptions: newValues },
      }).unwrap();
    } catch (error) {
      console.error("Failed to update resultDescriptions:", error);
    }
  };

  const handleDeleteService = async (confirmed: boolean) => {
    setModalOpen(false);
    if (!confirmed) return;
    try {
      await deleteService(service.id).unwrap();
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };

  const handleDeleteAdditionalImage = async (url: string) => {
    try {
      const updated = await deleteAdditionalImage({
        serviceId: service.id,
        imageUrl: encodeURIComponent(url),
      }).unwrap();
      console.log("Updated additional images:", updated.additionalImages);
    } catch (err) {
      console.error("Failed to delete additional image:", err);
    }
  };

  return (
    <div className="flex flex-col gap-2 text-sm">
      {/* Main Image */}
      <div className="flex items-center gap-2">
        <ImagePreview
          src={service.mainImage || "/placeholder.jpg"}
          alt={service.title}
          className="w-32 h-24 object-cover rounded"
        />
        <FileUploader
          className="p-0 border-none"
          accept="image/*"
          onUpload={async (file) => {
            await uploadMainImage({ serviceId: service.id, file }).unwrap();
          }}
        >
          <Button variant="primary" size="sm">
            Изменить обложку
          </Button>
        </FileUploader>
      </div>

      {/* Additional Images */}
      <div className="flex gap-2 overflow-x-auto">
        {service.additionalImages?.map((img) => (
          <ImagePreview
            key={img}
            src={img}
            alt="Additional image"
            className="w-24 h-16 object-cover rounded border border-primary"
            onDelete={() => handleDeleteAdditionalImage(img)}
          />
        ))}

        <FileUploader
          className="w-24 h-16 flex flex-col items-center justify-center border border-dashed rounded p-2"
          accept="image/*"
          onUpload={async (file) => {
            await uploadAdditionalImage({
              serviceId: service.id,
              file,
            }).unwrap();
          }}
        >
          <Plus size={20} color="var(--color-primary)" />
          <p className="text-caption text-primary">доп. фото</p>
        </FileUploader>
      </div>

      {/* Service Form */}
      <div className="grid sm:grid-cols-2 gap-2 grid-cols-1">
        <FormField name="title" control={control}>
          <Input label="Название" onBlur={() => handleBlur("title")} />
        </FormField>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              label="Категория"
              options={ALL_CATEGORIES.map((cat) => ({
                label: cat.name,
                value: cat.value,
              }))}
              value={field.value}
              onChange={(val) => {
                field.onChange(val);
                handleBlur("category");
              }}
            />
          )}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Controller
          name="popular"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="Популярно"
              checked={field.value}
              onChange={(checked) => {
                field.onChange(checked);
                handleBlur("popular");
              }}
            />
          )}
        />
        <Controller
          name="from"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="Цена от"
              checked={field.value}
              onChange={(checked) => {
                field.onChange(checked);
                handleBlur("from");
              }}
            />
          )}
        />
      </div>

      <FormField name="shortDescription" control={control}>
        <Textarea
          label="Короткое описание"
          rows={2}
          className="resize-none bg-white"
          onBlur={() => handleBlur("shortDescription")}
        />
      </FormField>

      <Controller
        name="measure"
        control={control}
        render={({ field }) => (
          <Select
            label="Ед. измерения"
            options={measureOptions}
            value={field.value || ""}
            onChange={(val) => {
              field.onChange(val);
              handleBlur("measure");
            }}
            placeholder="Выберите единицу"
          />
        )}
      />

      <ServiceObjectTypeBlock
        serviceId={service.id}
        prices={service.prices}
        durations={service.duration}
      />

      <FormField name="longDescription" control={control}>
        <Textarea
          label="Полное описание"
          rows={4}
          className="resize-none bg-white"
          onBlur={() => handleBlur("longDescription")}
        />
      </FormField>

      <div className="text-xs text-text-secondary mb-1">
        Результат для клиента
      </div>
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <FormField key={i} name={`resultDescriptions.${i}`} control={control}>
            <Input
              onBlur={handleResultDescriptionsBlur}
              value={resultDescriptions[i]}
            />
          </FormField>
        ))}
      </div>

      <Button
        variant="primary"
        className="bg-bg-dark-100 w-fit self-end"
        onClick={() => setModalOpen(true)}
      >
        Удалить сервис
      </Button>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Подтверждение удаления"
        message={
          <p>
            Вы уверены, что хотите удалить сервис:{" "}
            <strong>{service.title}</strong>? Действие необратимо.
          </p>
        }
        onClose={handleDeleteService}
      />
    </div>
  );
};
