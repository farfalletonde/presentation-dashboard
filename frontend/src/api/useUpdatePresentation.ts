import { useCallback } from "react";
import { apiRequest } from ".";
import { IPresentation } from "./useGetPresentations";

interface IUpdatePresentationRequest {
  id: number;
  name: string;
}

const useUpdatePresentation = () =>
  useCallback(async (request: IUpdatePresentationRequest) => {
    try {
      const result = await apiRequest.put<
        IPresentation,
        IUpdatePresentationRequest
      >("/presentation/update", request);

      return result;
    } catch (error) {
      console.error("updatePresentation error", error);
      return undefined;
    }
  }, []);

export default useUpdatePresentation;
