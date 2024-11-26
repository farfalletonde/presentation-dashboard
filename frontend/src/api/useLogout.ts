import { useCallback, useContext } from "react";
import { apiRequest } from ".";
import { AppContext } from "src/context/AppContext/AppContext";

export type LogoutResponse = {
  message: string;
};

const useLogout = () => {
  const { setIsLoading } = useContext(AppContext);

  return useCallback(async () => {
    try {
      setIsLoading(true);

      const result = await apiRequest.post<LogoutResponse, undefined>(
        "/auth/logout",
        undefined
      );

      return result;
    } catch (error) {
      console.error("logout error", error);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);
};

export default useLogout;
