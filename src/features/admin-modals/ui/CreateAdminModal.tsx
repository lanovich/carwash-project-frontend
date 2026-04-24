import { Controller, useForm } from "react-hook-form";
import { useCreateAdminMutation } from "@/entities/admin/api";
import { Button, Input, Checkbox, Modal } from "@/shared/ui";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  login: string;
  password: string;
  email: string;
  notifyOnBooking: boolean;
}

export const CreateAdminModal = ({ isOpen, onClose, onSuccess }: Props) => {
  const [createAdmin, { isLoading }] = useCreateAdminMutation();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      login: "",
      password: "",
      email: "",
      notifyOnBooking: true,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createAdmin({
        login: data.login,
        password: data.password,
        email: data.email || undefined,
        notifyOnBooking: data.notifyOnBooking,
      }).unwrap();
      toast.success("Администратор создан");
      reset();
      onSuccess();
    } catch (e) {
      const error = e as { data?: { message?: string } };
      toast.error(error?.data?.message || "Ошибка при создании");
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = (email: string) => !email || emailRegex.test(email);

  if (!isOpen) return null;

  return (
    <Modal onClose={handleClose} className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Создание администратора</h2>

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
            label="Пароль"
            type="password"
            placeholder="Введите пароль"
            errorText={errors.password?.message}
            {...register("password", {
              required: "Пароль обязателен",
              minLength: {
                value: 6,
                message: "Пароль должен быть минимум 6 символов",
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
            {isLoading ? "Создание..." : "Создать"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};