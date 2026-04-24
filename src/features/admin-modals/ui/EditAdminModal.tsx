import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useUpdateAdminMutation, type Admin } from "@/entities/admin/api";
import { Button, Input, Checkbox, Modal } from "@/shared/ui";
import { toast } from "sonner";

interface Props {
  admin: Admin | null;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  login: string;
  email: string;
  isActive: boolean;
  notifyOnBooking: boolean;
}

export const EditAdminModal = ({ admin, onClose, onSuccess }: Props) => {
  const [updateAdmin, { isLoading }] = useUpdateAdminMutation();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      login: "",
      email: "",
      isActive: true,
      notifyOnBooking: true,
    },
  });

  useEffect(() => {
    if (admin) {
      reset({
        login: admin.login,
        email: admin.email || "",
        isActive: admin.isActive,
        notifyOnBooking: admin.notifyOnBooking,
      });
    }
  }, [admin, reset]);

  const onSubmit = async (data: FormData) => {
    if (!admin) return;

    try {
      await updateAdmin({
        id: admin.id,
        data: {
          login: data.login,
          email: data.email || undefined,
          isActive: data.isActive,
          notifyOnBooking: data.notifyOnBooking,
        },
      }).unwrap();
      toast.success("Администратор обновлён");
      onSuccess();
    } catch (e) {
      const error = e as { data?: { message?: string } };
      toast.error(error?.data?.message || "Ошибка при обновлении");
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = (email: string) => !email || emailRegex.test(email);

  if (!admin) return null;

  return (
    <Modal onClose={handleClose} className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Редактирование администратора</h2>

        <div className="flex flex-col gap-1">
          <Input
            label="Логин"
            placeholder="Введите логин"
            errorText={errors.login?.message}
            {...register("login", {
              required: "Логин обязателен",
              minLength: {
                value: 3,
                message: "Логин должен быть минимум 3 символа",
              },
            })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Input
            label="Email"
            placeholder="example@mail.ru (опционально)"
            errorText={errors.email?.message}
            {...register("email", {
              validate: (value) =>
                !value || isValidEmail(value) || "Неверный формат email",
            })}
          />
        </div>

        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="Активен"
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="notifyOnBooking"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="Получать уведомления о новых бронированиях"
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="ghost" onClick={handleClose}>
            Отмена
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Сохранение..." : "Сохранить"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};