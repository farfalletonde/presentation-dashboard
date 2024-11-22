import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import useFetchProfile, {
  IFetchProfileResponse,
} from "src/api/useFetchProfile";

const AuthContext = createContext<{
  authUser: IFetchProfileResponse | null;
  setAuthUser: Dispatch<SetStateAction<IFetchProfileResponse | null>>;
  isLoading: boolean;
}>({
  authUser: null,
  setAuthUser: () => {},
  isLoading: true,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<IFetchProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = useFetchProfile();

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const token = await AsyncStorage.getItem("auth");

        if (!token) {
          return;
        }

        const profile = await fetchProfile(token);
        if (!profile) {
          return;
        }
        setAuthUser(profile);
      } catch {
        console.error("Error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthUser();
  }, [fetchProfile]);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        isLoading,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
