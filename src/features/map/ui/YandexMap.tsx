import React, { useState, useEffect, useCallback, useMemo } from "react";
import ReactDom from "react-dom";
import { type YMapLocationRequest } from "ymaps3";
import { CARWASH_INFO } from "@/entities/carwash/model";
import { cn, formatAddress, useGeolocation } from "@/shared/lib";
import { MarkerIcon, MarkerPopup } from ".";
import { Loading } from "@/shared/ui";

const LOCATION: YMapLocationRequest = {
  center: [37.507739, 45.018993],
  zoom: 14.5,
};

export function YandexMap({ className }: { className?: string }) {
  const [isMarkerActive, setMarkerActive] = useState(false);
  const [ymapsModules, setYmapsModules] = useState<any>(null);
  const [loadError, setLoadError] = useState(false);

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

  useEffect(() => {
    async function loadYmaps() {
      try {
        const [ymaps3React] = await Promise.all([
          ymaps3.import("@yandex/ymaps3-reactify"),
          ymaps3.ready,
        ]);

        const reactify = ymaps3React.reactify.bindTo(React, ReactDom);
        const modules = reactify.module(ymaps3);

        setYmapsModules({
          reactify,
          ...modules,
        });
      } catch (e) {
        console.error("Yandex Maps failed to load:", e);
        setLoadError(true);
      }
    }

    loadYmaps();
  }, []);

  if (loadError) {
    return (
      <div
        className={cn(
          "w-full h-full flex items-center justify-center",
          className
        )}
      >
        <p className="text-text-subtle">Карта временно недоступна</p>
      </div>
    );
  }

  if (!ymapsModules) {
    return (
      <div
        className={cn(
          "w-full h-full flex items-center justify-center",
          className
        )}
      >
        <Loading />
      </div>
    );
  }

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
    ymapsModules;

  return (
    <div
      className={cn(
        "w-full h-full bg-bg-light flex border-1 border-primary rounded-md overflow-hidden",
        className
      )}
    >
      <YMap
        location={ymapsModules.reactify.useDefault(LOCATION)}
        className="rounded-md"
      >
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
