import { Dispatch, SetStateAction, createContext } from "react";

export const AppContext = createContext<{
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}>({
  isLoading: true,
  setIsLoading: () => {},
});
