import { useCallback, useContext } from "react";
import { apiRequest } from ".";
import { AppContext } from "src/context/AppContext/AppContext";

export type SignupResponse = {
  token: string;
};

type SignupRequest = {
  name: string;
  email: string;
  password: string;
};

const useSignup = () => {
  const { setIsLoading } = useContext(AppContext);

  return useCallback(
    async (request: SignupRequest) => {
      try {
        setIsLoading(true);

        const result = await apiRequest.post<SignupResponse, SignupRequest>(
          "/auth/signup",
          request
        );

        return result;
      } catch (error) {
        console.error("signup error", error);
        return undefined;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );
};
export default useSignup;
