import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAccessToken,
  setAccessToken,
  logout as logoutAction,
} from "@/features/auth";
import { useRefreshMutation, useLogoutMutation } from "@/entities/admin/api";

export const useAdminAuth = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const [refresh] = useRefreshMutation();
  const [serverLogout] = useLogoutMutation();

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const restoreSession = async () => {
      if (!accessToken) {
        try {
          const result = await refresh().unwrap();
          dispatch(setAccessToken(result.accessToken));
          setLoggedIn(true);
        } catch {
          setLoggedIn(false);
          dispatch(logoutAction());
        } finally {
          setLoading(false);
        }
      } else {
        setLoggedIn(true);
        setLoading(false);
      }
    };

    restoreSession();
  }, [accessToken, dispatch, refresh]);

  const logout = useCallback(async () => {
    try {
      await serverLogout().unwrap();
    } catch {
    } finally {
      dispatch(logoutAction());
      setLoggedIn(false);
    }
  }, [dispatch, serverLogout]);

  return { loggedIn, loading, logout };
};
