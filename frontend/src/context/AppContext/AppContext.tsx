import { Dispatch, SetStateAction, createContext } from "react";

export const AppContext = createContext<{
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  error?: unknown;
  setError: Dispatch<SetStateAction<unknown | undefined>>;
}>({
  isLoading: false,
  setIsLoading: () => {},
  error: undefined,
  setError: () => {},
});
