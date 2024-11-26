import { useCallback, useContext } from "react";
import { AppContext } from "src/context/AppContext/AppContext";

interface IUploadImageRequest {
  imageUrl: string;
  file: File;
}

const useUploadImage = () => {
  const { setIsLoading, setError } = useContext(AppContext);

  return useCallback(
    async ({ imageUrl, file }: IUploadImageRequest) => {
      try {
        setIsLoading(true);

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
        setError(error);
        return undefined;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setError]
  );
};

export default useUploadImage;
