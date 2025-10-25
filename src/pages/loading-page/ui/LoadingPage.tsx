import { Loading } from "@/shared/ui/Loading";

interface LoadingPageProps {
  description?: string;
}

export const LoadingPage = ({ description }: LoadingPageProps) => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-50">
      <Loading description={description ?? ""} />
    </div>
  );
};
