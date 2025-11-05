import { RootState } from "@/app/store";

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
