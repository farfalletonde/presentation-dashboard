import { useCallback } from "react";
import { apiRequest } from ".";
import { IPresentation } from "./useGetPresentations";
import useGetImageUploadUrl from "./useGetImageUploadUrl";
import useUploadImage from "./useUploadImage";

interface ICreatePresentationRequest {
  name: string;
  image?: string;
}

const useCreatePresentation = () => {
  const imageUploadUrlRequest = useGetImageUploadUrl();
  const imageUploadRequest = useUploadImage();

  return useCallback(
    async ({ name }: ICreatePresentationRequest, imageFile?: File) => {
      try {
        let imageUploadUrl: string | undefined;

        if (imageFile) {
          const urlResult = await imageUploadUrlRequest(); // get image upload url

          if (urlResult) {
            const uploadResult = await imageUploadRequest({ //upload image file to the fetched url
              imageUrl: urlResult,
              file: imageFile,
            });

            imageUploadUrl = uploadResult;
          }
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
    },
    []
  );
};

export default useCreatePresentation;
