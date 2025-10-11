import { Button } from "@/shared/ui";

interface MarkerPopupProps {
  isActive: boolean;
  name: string;
  address: string;
  workTime: string;
  routeUrl: string;
}

export const MarkerPopup = ({
  isActive,
  name,
  address,
  workTime,
  routeUrl,
}: MarkerPopupProps) => (
  <div
    className={`absolute bottom-full mr-54 mb-2 text-nowrap bg-white text-black rounded-lg shadow-lg p-3 text-small z-50 transform transition-all duration-200 ease-out 
      ${
        isActive
          ? "scale-100 opacity-100"
          : "scale-95 opacity-0 pointer-events-none"
      }`}
  >
    <p className="font-bold text-regular">{name}</p>
    <p className="text-caption">{address}</p>
    <p className="text-caption text-text-secondary font-semibold">
      {workTime} без выходных
    </p>
    <Button
      size="xs"
      variant="primaryGhost"
      className="flex mt-2 text-primary p-0"
    >
      <a
        className="w-full h-full px-3 py-2"
        href={routeUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Построить маршрут
      </a>
    </Button>
  </div>
);
