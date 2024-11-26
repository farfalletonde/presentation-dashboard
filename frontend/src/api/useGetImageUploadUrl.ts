import { useCallback, useContext } from "react";
import { apiRequest } from ".";
import { AppContext } from "src/context/AppContext/AppContext";

interface IImageUrlResponse {
  imageUrl: string;
}

const useGetImageUploadUrl = () => {
  const { setIsLoading, setError } = useContext(AppContext);

  return useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await apiRequest.get<IImageUrlResponse>("/s3");
      return result?.imageUrl;
    } catch (error) {
      console.error("getImageUploadUrl error", error);
      setError(error);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setError]);
};

export default useGetImageUploadUrl;
