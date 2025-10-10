import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { updateUser } from "@/entities/booking/model";
import { useCallback } from "react";

export const useUserField = <T extends keyof RootState["booking"]["user"]>(
  field: T
) => {
  const dispatch = useDispatch();

  const value = useSelector((state: RootState) => state.booking.user[field]);

  const setValue = useCallback(
    (val: typeof value) => dispatch(updateUser({ [field]: val })),
    [dispatch, field]
  );

  return [value, setValue] as const;
};
