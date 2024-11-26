import { useCallback, useContext } from "react";
import { apiRequest } from ".";
import { AppContext } from "src/context/AppContext/AppContext";

interface IGetAIPromptResponse {
  message: string;
}

interface IGetAIPromptRequest {
  message: string;
}

const useGetAiResult = () => {
  const { setIsLoading, setError } = useContext(AppContext);

  return useCallback(
    async ({ message }: IGetAIPromptResponse) => {
      try {
        setIsLoading(true);

        const result = await apiRequest.post<
          IGetAIPromptResponse,
          IGetAIPromptRequest
        >("/chatgpt", { message });
        return result?.message;
      } catch (error) {
        console.error("getAiPrompt error", error);
        setError(error);
        return undefined;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setError]
  );
};

export default useGetAiResult;
