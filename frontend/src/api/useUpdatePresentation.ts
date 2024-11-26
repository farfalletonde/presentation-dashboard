import { useCallback, useContext } from "react";
import { apiRequest } from ".";
import { IPresentation } from "./useGetPresentations";
import { AppContext } from "src/context/AppContext/AppContext";

interface IUpdatePresentationRequest {
  id: number;
  name: string;
}

const useUpdatePresentation = () => {
  const { setIsLoading } = useContext(AppContext);

  return useCallback(
    async (request: IUpdatePresentationRequest) => {
      try {
        setIsLoading(true);

        const result = await apiRequest.put<
          IPresentation,
          IUpdatePresentationRequest
        >("/presentation/update", request);

        return result;
      } catch (error) {
        console.error("updatePresentation error", error);
        return undefined;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );
};

export default useUpdatePresentation;
