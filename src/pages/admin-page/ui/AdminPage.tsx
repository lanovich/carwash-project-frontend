import { Button, Input, FormField, Loading } from "@/shared/ui";
import { lazy, Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/entities/admin/api";
import { useAdminAuth } from "@/entities/admin/lib";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "@/features/auth";
import { LoadingPage } from "@/pages/loading-page/ui";

const AdminPageContent = lazy(() =>
  import("@/entities/admin/ui/AdminPageContent").then((m) => ({
    default: m.AdminPageContent,
  }))
);

type FormData = {
  login: string;
  password: string;
};

const AdminPage = () => {
  const { loggedIn, loading, logout } = useAdminAuth();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { login: "", password: "" },
  });

  const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      const response = await loginMutation(data).unwrap();

      if (!response.accessToken) {
        setError("Неверный логин или пароль");
        dispatch(logoutAction());
      }
    } catch (err: any) {
      setError(err?.data?.message || "Неверный логин или пароль");
      dispatch(logoutAction());
    }
  };

  if (loading || isLoggingIn) {
    return <LoadingPage description="Восстанавливаем сессию..." />;
  }

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

          <Button type="submit" disabled={isLoggingIn}>
            {isLoggingIn ? "Вход..." : "Войти"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end p-4">
        <Button variant="primary" onClick={logout}>
          Выйти
        </Button>
      </div>

      <Suspense fallback={<Loading description="Получаем данные по услугам" />}>
        <AdminPageContent />
      </Suspense>
    </div>
  );
};

export default AdminPage;
