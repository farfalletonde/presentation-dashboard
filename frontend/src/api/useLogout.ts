import { apiRequest } from ".";

export type LogoutResponse = {
  message: string;
};

const useLogout = () => {
  const login = {
    post: () =>
      apiRequest.post<LogoutResponse, undefined>("/auth/logout", undefined),
  };
  return login;
};

export default useLogout;
