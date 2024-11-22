import { useCallback } from "react";
import { apiRequest } from ".";
import AsyncStorage from "@react-native-async-storage/async-storage";

type IFetchProfileResponse = {
  id: string;
};

const useFetchProfile = (): ((
  token: string
) => Promise<IFetchProfileResponse | undefined>) =>
  useCallback(async (token: string) => {
    try {
      apiRequest.setTokens(token);
      AsyncStorage.setItem("auth", token);

      const result = await apiRequest.get<IFetchProfileResponse>(
        "/auth/profile"
      );

      //set auth context

      return result;
    } catch (error) {
      console.error("fetchProfile error", error);

      return undefined;
    }
  }, []);

export default useFetchProfile;
