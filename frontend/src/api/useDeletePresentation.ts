import { useCallback, useContext } from "react";
import { apiRequest } from ".";
import { IPresentation } from "./useGetPresentations";
import { AppContext } from "src/context/AppContext/AppContext";

interface IDeletePresentationRequest {
  id: number;
}

const useDeletePresentation = () => {
  const { setIsLoading } = useContext(AppContext);

  return useCallback(
    async (request: IDeletePresentationRequest) => {
      try {
        setIsLoading(true);

        const result = await apiRequest.post<
          IPresentation,
          IDeletePresentationRequest
        >("/presentation/delete", request);

        return result;
      } catch (error) {
        console.error("deletePresentation error", error);
        return undefined;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );
};

export default useDeletePresentation;
