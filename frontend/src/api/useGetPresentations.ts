import { useCallback } from "react";
import { apiRequest } from ".";

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

const useGetPresentations = () =>
  useCallback(async (sortBy: SORT_BY) => {
    try {
      const result = await apiRequest.get<IPresentation[]>("/presentation", {
        sortBy: SORT_BY[sortBy],
      });

      return result;
    } catch (error) {
      console.error("getPresentations error", error);
      return undefined;
    }
  }, []);

export default useGetPresentations;
