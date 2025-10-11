import { useCallback, useMemo, useState } from "react";
import { type YMapLocationRequest } from "ymaps3";
import { CARWASH_INFO } from "@/entities/carwash/model";
import {
  YMap,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
  YMapMarker,
  reactify,
} from "../lib";
import { formatAddress, useGeolocation } from "@/shared/lib";
import { MarkerIcon, MarkerPopup } from ".";

const LOCATION: YMapLocationRequest = {
  center: [37.507739, 45.018993],
  zoom: 14.5,
};

export function YandexMap() {
  const [isMarkerActive, setMarkerActive] = useState(false);
  const userCoords = useGeolocation();

  const handleTogglePopup = useCallback(
    () => setMarkerActive((prev) => !prev),
    []
  );
  const handleShowPopup = useCallback(() => setMarkerActive(true), []);
  const handleHidePopup = useCallback(() => setMarkerActive(false), []);

  const yandexMapsRouteUrl = useMemo(() => {
    const [destLat, destLon] = CARWASH_INFO.coordinates;
    return userCoords
      ? `https://yandex.ru/maps/?rtext=${userCoords.lat},${userCoords.lon}~${destLat},${destLon}&rtt=auto`
      : `https://yandex.ru/maps/?rtext=~${destLat},${destLon}&rtt=mt`;
  }, [userCoords]);

  return (
    <div className="flex-1 bg-bg-light flex border-1 border-primary rounded-md max-h-[270px] overflow-hidden">
      <YMap location={reactify.useDefault(LOCATION)} className="rounded-md">
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />

        <YMapMarker coordinates={[37.509759, 45.018493]}>
          <div
            className="relative flex flex-col items-center w-1 h-1"
            onMouseEnter={handleShowPopup}
            onMouseLeave={handleHidePopup}
            onTouchEnd={handleTogglePopup}
          >
            <MarkerPopup
              isActive={isMarkerActive}
              name={CARWASH_INFO.name}
              address={formatAddress(CARWASH_INFO.address)}
              workTime={CARWASH_INFO.workTime}
              routeUrl={yandexMapsRouteUrl}
            />
            <MarkerIcon />
          </div>
        </YMapMarker>
      </YMap>
    </div>
  );
}
