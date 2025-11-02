import { useState } from "react";
import { useForm } from "react-hook-form";
import { Service } from "@/entities/service/model";
import {
  Button,
  Input,
  Textarea,
  Checkbox,
  ImagePreview,
  FormField,
} from "@/shared/ui";
import { objectTypesMap, OBJECT_TYPES } from "@/entities/car/model";
import { Plus, RussianRuble, X } from "lucide-react";
import { useUpdateServiceMutation } from "@/entities/service/api";

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
  resultDescriptions: string[];
};

export const AdminServiceEditor = ({ service }: Props) => {
  const [objectTypes, setObjectTypes] = useState([...service.objectTypes]);
  const [updateService] = useUpdateServiceMutation();

  const { control, watch, getValues } = useForm<FormValues>({
    defaultValues: {
      title: service.title,
      category: service.category,
      popular: service.popular,
      from: service.from,
      shortDescription: service.shortDescription,
      longDescription: service.longDescription,
      resultDescriptions: service.resultDescriptions || [],
    },
  });

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
      console.log(`✅ Updated field "${fieldName}" with:`, newValue);
    } catch (error) {
      console.error(`❌ Failed to update field "${fieldName}":`, error);
    }
  };

  const addObjectType = (ot: keyof typeof objectTypesMap) => {
    if (!objectTypes.includes(ot)) {
      setObjectTypes([...objectTypes, ot]);
    }
  };

  const removeObjectType = (ot: keyof typeof objectTypesMap) => {
    setObjectTypes(objectTypes.filter((o) => o !== ot));
  };

  const resultDescriptions = watch("resultDescriptions") || [];

  return (
    <div className="flex flex-col gap-2 text-sm">
      <div className="flex items-center gap-2">
        <ImagePreview
          src={service.mainImage || "/placeholder.jpg"}
          alt={service.title}
          className="w-32 h-24 object-cover rounded"
        />
        <Button variant="primary" size="sm">
          Изменить обложку
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {service.additionalImages?.map((img) => (
          <img
            key={img}
            src={img}
            alt=""
            className="w-16 h-16 object-cover rounded border border-primary"
          />
        ))}
        <Button type="button" iconOnly className="w-20 h-16">
          <Plus size={20} />
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-2 grid-cols-1">
        <FormField name="title" control={control}>
          <Input label="Название" onBlur={() => handleBlur("title")} />
        </FormField>

        <FormField name="category" control={control}>
          <Input label="Название" onBlur={() => handleBlur("title")} />
        </FormField>
      </div>

      <div className="flex flex-wrap gap-2">
        <FormField name="popular" control={control}>
          <Checkbox label="Популярно" />
        </FormField>

        <FormField name="from" control={control}>
          <Checkbox label="Цена от" />
        </FormField>

        <Checkbox checked label="Ед. измерения" onChange={() => {}} />
      </div>

      <FormField name="shortDescription" control={control}>
        <Textarea
          label="Короткое описание"
          rows={2}
          className="resize-none bg-white"
          onBlur={() => handleBlur("shortDescription")}
        />
      </FormField>

      <div>
        <div className="text-xs text-text-secondary mb-1">
          Цены и длительность
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-text-secondary min-h-[126px]">
          {objectTypes.map((ot) => (
            <div
              key={ot}
              className="border rounded-md p-2 bg-white flex flex-col gap-1 relative border-primary"
            >
              <button
                type="button"
                className="absolute top-1 right-1 text-primary"
                onClick={() => removeObjectType(ot)}
              >
                <X size={14} />
              </button>

              <div className="font-medium text-sm">
                {objectTypesMap[ot].caption}
              </div>
              <Input
                defaultValue={service.prices?.[ot] || ""}
                placeholder="Цена"
                withRightArea
                areaContent={<RussianRuble strokeWidth={1.75} size={16} />}
                onBlur={async (e) => {
                  await updateService({
                    id: service.id,
                    data: { prices: { [ot]: e.target.value } },
                  });
                }}
              />
              <Input
                defaultValue={service.duration?.[ot] || ""}
                placeholder="Минуты"
                withRightArea
                areaContent="Мин"
                onBlur={async (e) => {
                  await updateService({
                    id: service.id,
                    data: { duration: { [ot]: e.target.value } },
                  });
                }}
              />
            </div>
          ))}

          {OBJECT_TYPES.filter((ot) => !objectTypes.includes(ot)).map((ot) => (
            <Button
              key={ot}
              type="button"
              onClick={() => addObjectType(ot)}
              className="min-h-[126px]"
            >
              <p className="text-wrap">
                Включить услугу в раздел:{" "}
                {objectTypesMap[ot].caption.toUpperCase()}
              </p>
            </Button>
          ))}
        </div>
      </div>

      <FormField name="longDescription" control={control}>
        <Textarea
          label="Полное описание"
          rows={4}
          className="resize-none bg-white"
          onBlur={() => handleBlur("longDescription")}
        />
      </FormField>

      <div>
        <div className="text-xs text-text-secondary mb-1">
          Результат для клиента
        </div>
        <div className="flex flex-col gap-2">
          {resultDescriptions.map((_, i) => (
            <FormField
              key={i}
              name={`resultDescriptions.${i}`}
              control={control}
            >
              <Input onBlur={() => handleBlur("resultDescriptions")} />
            </FormField>
          ))}
        </div>
      </div>
    </div>
  );
};
