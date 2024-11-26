import { useCallback, useContext } from "react";
import { apiRequest } from ".";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "src/context/AuthContext/AuthContext";
import { AppContext } from "src/context/AppContext/AppContext";

export interface IFetchProfileResponse {
  id: number;
  name: string;
  email: string;
}

const useFetchProfile = (): ((
  token: string
) => Promise<IFetchProfileResponse | undefined>) => {
  const { setUser } = useContext(AuthContext);
  const { setIsLoading } = useContext(AppContext);

  return useCallback(
    async (token: string) => {
      try {
        setIsLoading(true);

        apiRequest.setTokens(token);
        AsyncStorage.setItem("auth", token);

        const result = await apiRequest.get<IFetchProfileResponse>(
          "/auth/profile"
        );

        if (result) {
          setUser(result);
        }

        return result;
      } catch (error) {
        console.error("fetchProfile error", error);

        return undefined;
      } finally {
        setIsLoading(false);
      }
    },
    [setUser, setIsLoading]
  );
};

export default useFetchProfile;
