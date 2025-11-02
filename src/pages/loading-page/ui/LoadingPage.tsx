import { Loading } from "@/shared/ui/Loading";

interface LoadingPageProps {
  description?: string;
}

export const LoadingPage = ({ description }: LoadingPageProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <Loading description={description ?? ""} />
    </div>
  );
};
