import { useCallback } from "react";

interface IUploadImageRequest {
  imageUrl: string;
  file: File;
}

const useUploadImage = () =>
  useCallback(async ({ imageUrl, file }: IUploadImageRequest) => {
    try {
      await fetch(imageUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: file,
      });

      return imageUrl.split("?")[0];
    } catch (error) {
      console.error("uploadImage error", error);
      return undefined;
    }
  }, []);

export default useUploadImage;
