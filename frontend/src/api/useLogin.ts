import { useCallback, useContext } from "react";
import { apiRequest } from ".";
import { AppContext } from "src/context/AppContext/AppContext";

export type LoginResponse = {
  token: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

const useLogin = () => {
  const { setIsLoading, setError } = useContext(AppContext);

  return useCallback(
    async (request: LoginRequest) => {
      try {
        setIsLoading(true);

        const result = await apiRequest.post<LoginResponse, LoginRequest>(
          "/auth/login",
          request
        );

        return result;
      } catch (error) {
        console.error("login error", error);
        setError(error);
        return undefined;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setError]
  );
};

export default useLogin;
