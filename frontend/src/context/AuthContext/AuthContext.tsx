import { Dispatch, SetStateAction, createContext } from "react";
import { IFetchProfileResponse } from "src/api/useFetchProfile";

export const AuthContext = createContext<{
  user: IFetchProfileResponse | null;
  setUser: Dispatch<SetStateAction<IFetchProfileResponse | null>>;
}>({
  user: null,
  setUser: () => {},
});
