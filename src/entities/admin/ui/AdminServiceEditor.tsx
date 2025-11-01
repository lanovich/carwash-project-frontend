import { useState } from "react";
import { Service } from "@/entities/service/model";
import { Button, Input, Textarea, Checkbox, ImagePreview } from "@/shared/ui";
import { objectTypesMap, OBJECT_TYPES } from "@/entities/car/model";
import { Plus, RussianRuble, X } from "lucide-react";

interface Props {
  service: Service;
}

export const AdminServiceEditor = ({ service }: Props) => {
  const [objectTypes, setObjectTypes] = useState([...service.objectTypes]);

  const addObjectType = (ot: keyof typeof objectTypesMap) => {
    if (!objectTypes.includes(ot)) {
      setObjectTypes([...objectTypes, ot]);
    }
  };

  const removeObjectType = (ot: keyof typeof objectTypesMap) => {
    setObjectTypes(objectTypes.filter((o) => o !== ot));
  };

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
        <Input label="Название" defaultValue={service.title} />
        <Input label="Категория" defaultValue={service.category} />
      </div>

      <div className="flex flex-wrap gap-2">
        <Checkbox
          checked={service.popular || false}
          label="Популярно"
          onChange={() => {}}
        />
        <Checkbox
          checked={service.from || false}
          label="Цена от"
          onChange={() => {}}
        />
        <Checkbox checked label="Ед. измерения" onChange={() => {}} />
      </div>

      <Textarea
        label="Короткое описание"
        rows={2}
        defaultValue={service.shortDescription || ""}
        className="resize-none bg-white"
      />

      <div>
        <div className="text-xs text-text-secondary mb-1">Цены и длительность</div>
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
                areaContent={<RussianRuble strokeWidth={1.75} size={16}/>}
              />
              <Input
                defaultValue={service.duration?.[ot] || ""}
                placeholder="Минуты"
                withRightArea
                areaContent={"Мин"}
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
              <p className="text-wrap">Включить услугу в раздел: {objectTypesMap[ot].caption.toUpperCase()}</p>
            </Button>
          ))}
        </div>
      </div>

      <Textarea
        label="Полное описание"
        rows={4}
        defaultValue={service.longDescription || ""}
        className="resize-none bg-white"
      />

      <div>
        <div className="text-xs text-text-secondary mb-1">
          Результат для клиента
        </div>
        <div className="flex flex-col gap-2">
          {(service.resultDescriptions || []).map((r, i) => (
            <Input key={i} defaultValue={r} />
          ))}
        </div>
      </div>
    </div>
  );
};
