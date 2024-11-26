import { useCallback, useContext } from "react";
import { apiRequest } from ".";
import { AppContext } from "src/context/AppContext/AppContext";

export interface IPresentation {
  id: number;
  name: string;
  image: string;
  created_by: string;
  last_updated: string;
}

export enum SORT_BY {
  TITLE_A_Z,
  TITLE_Z_A,
  RECENTLY_MODIFIED,
  OLDEST_MODIFIED,
}

const useGetPresentations = () => {
  const { setIsLoading } = useContext(AppContext);

  return useCallback(
    async (sortBy: SORT_BY) => {
      try {
        setIsLoading(true);
        const result = await apiRequest.get<IPresentation[]>("/presentation", {
          sortBy: SORT_BY[sortBy],
        });

        return result;
      } catch (error) {
        console.error("getPresentations error", error);
        return undefined;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );
};

export default useGetPresentations;
