import { useCallback } from "react";
import { apiRequest } from ".";

interface IImageUrlResponse {
  imageUrl: string;
}

const useGetImageUploadUrl = () =>
  useCallback(async () => {
    try {
      const result = await apiRequest.get<IImageUrlResponse>("/s3");
      return result?.imageUrl;
    } catch (error) {
      console.error("getImageUploadUrl error", error);
      return undefined;
    }
  }, []);

export default useGetImageUploadUrl;
