import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ALL_CATEGORIES,
  Category,
  measureMap,
  Service,
} from "@/entities/service/model";
import {
  Button,
  Input,
  Textarea,
  Checkbox,
  FormField,
  Select,
  Modal,
} from "@/shared/ui";
import { useCreateServiceMutation } from "@/entities/service/api";

interface Props {
  defaultCategory: Category;
}

export const AdminServiceCreateModal = ({ defaultCategory }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [createService] = useCreateServiceMutation();

  const { control, handleSubmit, reset } = useForm<Partial<Service>>({
    defaultValues: {
      title: "",
      category: defaultCategory,
      popular: false,
      from: false,
      shortDescription: "",
      longDescription: "",
      measure: undefined,
      resultDescriptions: ["", "", ""],
    },
  });

  const measureOptions = [
    { label: "ничего", value: null },
    ...Object.entries(measureMap).map(([key, label]) => ({
      label,
      value: key,
    })),
  ];

  const onSubmit = async (data: Partial<Service>) => {
    try {
      const payload = {
        ...data,
        resultDescriptions: ["", "", ""],
      };

      await createService(payload).unwrap();
      reset({ ...data, title: "" });
      setIsOpen(false);
    } catch (err) {
      console.error("Ошибка при создании услуги:", err);
    }
  };

  return (
    <>
      <Button className="w-fit" onClick={() => setIsOpen(true)}>
        Добавить услугу
      </Button>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} className="min-w-[40vw]">
          <h2 className="text-xl font-semibold">Создание новой услуги</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField name="title" control={control}>
              <Input label="Название" required />
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
                  onChange={field.onChange}
                />
              )}
            />

            <div className="flex flex-wrap gap-2">
              <Controller
                name="popular"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    label="Популярно"
                    checked={field.value}
                    onChange={field.onChange}
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
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <FormField name="shortDescription" control={control}>
              <Textarea label="Короткое описание" rows={2} />
            </FormField>

            <Controller
              name="measure"
              control={control}
              render={({ field }) => (
                <Select
                  label="Ед. измерения"
                  options={measureOptions}
                  value={field.value || ""}
                  onChange={field.onChange}
                  placeholder="Выберите единицу"
                />
              )}
            />

            <FormField name="longDescription" control={control}>
              <Textarea label="Полное описание" rows={4} />
            </FormField>

            <Button type="submit" variant="primary">
              Создать услугу
            </Button>
          </form>
        </Modal>
      )}
    </>
  );
};
