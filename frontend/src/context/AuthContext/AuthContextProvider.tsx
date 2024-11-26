import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, useEffect, useState } from "react";
import useFetchProfile, {
  IFetchProfileResponse,
} from "src/api/useFetchProfile";
import { AuthContext } from "./AuthContext";

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IFetchProfileResponse | null>(null);

  const fetchProfile = useFetchProfile();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("auth");

        if (!token) {
          return;
        }

        const profile = await fetchProfile(token);
        if (!profile) {
          return;
        }
        setUser(profile);
      } catch {
        console.error("Error");
      }
    };

    fetchUser();
  }, [fetchProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
