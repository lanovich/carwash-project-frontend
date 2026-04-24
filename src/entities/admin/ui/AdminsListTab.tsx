import { useState } from "react";
import {
  useGetAllAdminsQuery,
  useDeleteAdminMutation,
  type Admin,
} from "@/entities/admin/api";
import { Button, Loading, InfoBlock } from "@/shared/ui";
import { toast } from "sonner";
import { CreateAdminModal, EditAdminModal } from "@/features/admin-modals/ui";
import { Pencil, Trash2 } from "lucide-react";

export const AdminsListTab = () => {
  const { data: admins, isLoading, refetch } = useGetAllAdminsQuery();
  const [deleteAdmin] = useDeleteAdminMutation();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editAdmin, setEditAdmin] = useState<Admin | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить этого администратора?")) {
      return;
    }
    try {
      await deleteAdmin(id).unwrap();
      toast.success("Администратор деактивирован");
      refetch();
    } catch (error: any) {
      toast.error(error.data?.message || "Ошибка при деактивации");
    }
  };

  if (isLoading)
    return <Loading description="Загружаем список администраторов" />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-center sm:text-left">
          Администраторы
        </h1>
        <Button variant="primary" className="w-fit" onClick={() => setCreateModalOpen(true)}>
          Добавить администратора
        </Button>
      </div>

      {admins?.length === 0 ? (
        <InfoBlock heading="Список пуст">
          <p className="text-gray-500">Нет администраторов</p>
        </InfoBlock>
      ) : (
        <div className="flex flex-col gap-2">
          {admins?.map((admin) => (
            <div
              key={admin.id}
              className={`flex items-center justify-between p-3 bg-white rounded-md shadow-sm ${
                !admin.isActive ? "opacity-50" : ""
              }`}
            >
              <div className="flex flex-col gap-1">
                <span className="font-medium">{admin.login}</span>
                <span className="text-sm text-gray-500">
                  {admin.email || "Email не указан"}
                </span>
                <span
                  className={`text-xs ${
                    admin.isActive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {admin.isActive ? "Активен" : "Деактивирован"}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setEditAdmin(admin)}
                  size={"squareXs"}
                  icon={<Pencil size={16} />}
                />
                <Button
                  variant="ghost"
                  size={"squareXs"}
                  onClick={() => handleDelete(admin.id)}
                  className="text-primary hover:bg-red-50"
                  icon={<Trash2 size={16} />}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateAdminModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={() => {
          refetch();
          setCreateModalOpen(false);
        }}
      />

      <EditAdminModal
        admin={editAdmin}
        onClose={() => setEditAdmin(null)}
        onSuccess={() => {
          refetch();
          setEditAdmin(null);
        }}
      />
    </div>
  );
};
