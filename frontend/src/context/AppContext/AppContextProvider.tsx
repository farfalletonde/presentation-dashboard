import { ReactNode, useState } from "react";

import { AppContext } from "./AppContext";

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
