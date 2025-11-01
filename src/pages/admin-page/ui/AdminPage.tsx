import { Button, Input, Loading, FormField } from "@/shared/ui";
import { lazy, Suspense, useState } from "react";
import { useForm } from "react-hook-form";

const AdminPageContent = lazy(() =>
  import("@/entities/admin/ui/AdminPageContent").then((module) => ({
    default: module.AdminPageContent,
  }))
);

type FormData = {
  login: string;
  password: string;
};

const AdminPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = (data: FormData) => {
    if (data.login === "admin" && data.password === "1234") {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Неверный логин или пароль");
    }
  };

  if (!loggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col bg-white p-5 rounded-lg shadow-md w-full max-w-md gap-3"
        >
          <h1 className="text-2xl font-bold mb-4">Вход в админку</h1>

          {error && <p className="text-red-500 mb-2">{error}</p>}

          <FormField<FormData> name="login" control={control} type="text">
            <Input placeholder="Логин" className="w-full border p-2 rounded" />
          </FormField>
          {errors.login && (
            <p className="text-red-500 text-sm mb-1">{errors.login.message}</p>
          )}

          <FormField<FormData>
            name="password"
            control={control}
            type="password"
          >
            <Input placeholder="Пароль" className="w-full border p-2 rounded" />
          </FormField>
          {errors.password && (
            <p className="text-red-500 text-sm mb-1">
              {errors.password.message}
            </p>
          )}

          <Button type="submit">Войти</Button>
        </form>
      </div>
    );
  }

  return (
  
    <Suspense fallback={<Loading description="Получаем данные по услугам" />}>
      <AdminPageContent />
    </Suspense>
  );
};

export default AdminPage;
