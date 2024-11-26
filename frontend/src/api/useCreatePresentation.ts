import { useCallback, useContext } from "react";
import { apiRequest } from ".";
import { IPresentation } from "./useGetPresentations";
import useGetImageUploadUrl from "./useGetImageUploadUrl";
import useUploadImage from "./useUploadImage";
import { AppContext } from "src/context/AppContext/AppContext";

interface ICreatePresentationRequest {
  name: string;
  image?: string;
}

const useCreatePresentation = () => {
  const imageUploadUrlRequest = useGetImageUploadUrl();
  const imageUploadRequest = useUploadImage();
  const { setIsLoading } = useContext(AppContext);

  return useCallback(
    async ({ name }: ICreatePresentationRequest, imageFile?: File) => {
      try {
        setIsLoading(true);

        let imageUploadUrl: string | undefined;

        if (imageFile) {
          const urlResult = await imageUploadUrlRequest(); // get image upload url

          if (urlResult) {
            const uploadResult = await imageUploadRequest({
              //upload image file to the fetched url
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
      } finally {
        setIsLoading(false);
      }
    },
    [imageUploadRequest, imageUploadUrlRequest, setIsLoading]
  );
};

export default useCreatePresentation;
