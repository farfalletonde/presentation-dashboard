import { useCallback } from "react";
import { apiRequest } from ".";

export interface IPresentation {
  id: number;
  name: string;
  image: string;
  created_by: string;
  last_updated: string;
}

const useGetPresentations = (): ((
  token: string
) => Promise<IPresentation[] | undefined>) =>
  useCallback(async () => {
    try {
      const result = await apiRequest.get<IPresentation[]>("/presentation");

      return result;
    } catch (error) {
      console.error("getPresentations error", error);
      return undefined;
    }
  }, []);

export default useGetPresentations;
