import { useCallback } from "react";
import { apiRequest } from ".";
import { IPresentation } from "./useGetPresentations";

interface IDeletePresentationRequest {
  id: number;
}

const useDeletePresentation = () =>
  useCallback(async (request: IDeletePresentationRequest) => {
    try {
      const result = await apiRequest.post<
        IPresentation,
        IDeletePresentationRequest
      >("/presentation/delete", request);

      return result;
    } catch (error) {
      console.error("deletePresentation error", error);
      return undefined;
    }
  }, []);

export default useDeletePresentation;
