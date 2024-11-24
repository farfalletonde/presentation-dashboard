import { useCallback } from "react";
import { apiRequest } from ".";

interface IGetAIPromptResponse {
  message: string;
}

interface IGetAIPromptRequest {
  message: string;
}

const useGetAiResult = () =>
  useCallback(async ({ message }: IGetAIPromptResponse) => {
    try {
      const result = await apiRequest.post<
        IGetAIPromptResponse,
        IGetAIPromptRequest
      >("/chatgpt", { message });
      return result?.message;
    } catch (error) {
      console.error("getAiPrompt error", error);
      return undefined;
    }
  }, []);

export default useGetAiResult;
