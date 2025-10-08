import { RootState } from "@/app/store";
import { selectAllServices } from "@/entities/service/model";
import { createSelector } from "@reduxjs/toolkit";

export const selectBooking = (state: RootState) => state.booking;
export const selectObjectType = (state: RootState) => state.booking.objectType;
export const selectUser = (state: RootState) => state.booking.user;
export const selectDate = (state: RootState) => state.booking.date;
export const selectTime = (state: RootState) => state.booking.time;

export const selectSelectedServiceIds = (state: RootState) =>
  state.booking.selectedServiceIds;

export const selectSelectedServices = createSelector(
  [selectSelectedServiceIds, selectObjectType, selectAllServices],
  (selectedIds, objectType, services) => {
    if (!objectType || !selectedIds.length) return [];

    const serviceMap = Object.fromEntries(services.map((s) => [s.id, s]));

    return selectedIds
      .map((id) => {
        const s = serviceMap[id];
        if (!s) return null;
        return {
          id: s.id,
          title: s.title,
          duration: s.duration[objectType] ?? 0,
          price: s.prices?.[objectType] ?? 0,
          category: s.category,
        };
      })
      .filter((s): s is NonNullable<typeof s> => s !== null);
  }
);

export const selectSummary = createSelector(
  [selectSelectedServices],
  (services) => {
    const totalPrice = services.reduce((acc, s) => acc + (s?.price ?? 0), 0);

    const totalDuration = services.reduce(
      (acc, s) => acc + (s?.duration ?? 0),
      0
    );

    return { totalPrice, totalDuration };
  }
);
