import { useCallback } from "react";
import { apiRequest } from ".";
import { IPresentation } from "./useGetPresentations";
import useGetImageUploadUrl from "./useGetImageUploadUrl";

interface ICreatePresentationRequest {
  name: string;
  image?: string;
}

const useCreatePresentation = () => {
  const imageUploadUrlRequest = useGetImageUploadUrl();
  return useCallback(async ({ name, image }: ICreatePresentationRequest) => {
    try {
      let imageUploadUrl: string | undefined;

      if (image) {
        const urlResult = await imageUploadUrlRequest();
        imageUploadUrl = urlResult;
      }

      const result = await apiRequest.post<
        IPresentation,
        ICreatePresentationRequest
      >("/presentation/create", { name, image: imageUploadUrl });

      return result;
    } catch (error) {
      console.error("createPresentation error", error);
      return undefined;
    }
  }, []);
};

export default useCreatePresentation;
