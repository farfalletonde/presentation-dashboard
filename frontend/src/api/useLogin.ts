import { apiRequest } from ".";

export type LoginResponse = {
  token: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

const useLogin = () => {
  const login = {
    post: (input: LoginRequest) =>
      apiRequest.post<LoginResponse, LoginRequest>("/auth/login", input),
  };
  return login;
};

export default useLogin;
