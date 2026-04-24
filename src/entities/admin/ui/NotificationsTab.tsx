import { Controller, useForm } from "react-hook-form";
import {
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} from "@/entities/admin/api";
import { Button, Input, Checkbox, Loading, InfoBlock } from "@/shared/ui";
import { toast } from "sonner";

interface FormData {
  emailFrom: string;
  telegramId: string;
  isActive: boolean;
}

export const NotificationsTab = () => {
  const { data: settings, isLoading } = useGetNotificationSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] = useUpdateNotificationSettingsMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormData>({
    values: {
      emailFrom: settings?.emailFrom || "",
      telegramId: settings?.telegramId || "",
      isActive: settings?.isActive ?? true,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await updateSettings({
        emailFrom: data.emailFrom || null,
        telegramId: data.telegramId || null,
        isActive: data.isActive,
      }).unwrap();
      toast.success("Настройки уведомлений сохранены");
      reset(data);
    } catch (error: any) {
      toast.error(error.data?.message || "Ошибка при сохранении");
    }
  };

  if (isLoading) return <Loading description="Загружаем настройки уведомлений" />;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-center sm:text-left">
        Уведомления
      </h1>

      <InfoBlock heading="Настройки уведомлений">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <Checkbox
                label="Включить уведомления"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Input
            label="Telegram ID"
            placeholder="123456789"
            errorText={errors.telegramId?.message}
            {...register("telegramId", {
              validate: (value) =>
                !value ||
                /^\d+$/.test(value) ||
                "Telegram ID должен содержать только цифры",
            })}
          />

          <Input
            label="Email отправителя"
            placeholder="onboarding@resend.dev"
            errorText={errors.emailFrom?.message}
            {...register("emailFrom", {
              validate: (value) => {
                if (!value) return true;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value) || "Неверный формат email";
              },
            })}
          />

          <Button
            variant="primary"
            type="submit"
            disabled={!isDirty || isUpdating}
          >
            {isUpdating ? "Сохранение..." : "Сохранить"}
          </Button>
        </form>
      </InfoBlock>

      <InfoBlock heading="Доступные каналы">
        <div className="flex flex-col gap-2 text-sm text-gray-600">
          <p>
            <strong>Telegram:</strong> уведомления в Telegram бот
          </p>
          <p>
            <strong>Email:</strong> уведомления на Email
          </p>
          <p className="text-gray-400 text-xs">
            *SMS будет добавлено позже
          </p>
        </div>
      </InfoBlock>
    </div>
  );
};