import { apiRequest } from ".";

export type SignupResponse = {
  token: string;
};

type SignupRequest = {
  name: string;
  email: string;
  password: string;
};

const useSignup = () => {
  const signup = {
    post: (input: SignupRequest) =>
      apiRequest.post<SignupResponse, SignupRequest>("/auth/signup", input),
  };
  return signup;
};

export default useSignup;
