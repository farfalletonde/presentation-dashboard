import { useCallback } from "react";
import { apiRequest } from ".";
import { IPresentation } from "./useGetPresentations";

interface ICreatePresentationRequest {
  name: string;
  image?: string;
}

const useCreatePresentation = () =>
  useCallback(async (request: ICreatePresentationRequest) => {
    try {
      const result = await apiRequest.post<
        IPresentation,
        ICreatePresentationRequest
      >("/presentation/create", request);

      return result;
    } catch (error) {
      console.error("createPresentation error", error);
      return undefined;
    }
  }, []);

export default useCreatePresentation;
