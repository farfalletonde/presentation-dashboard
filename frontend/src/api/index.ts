import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";

dotenv.config();

axios.defaults.baseURL = process.env.BASE_URL;

async function getUserPayload(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem("auth");
  } catch {
    console.error("Couldn't get user payload");
    return null;
  }
}

axios.interceptors.request.use(async (config) => {
  const token = await getUserPayload();
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

const responseBody = <T>(response: AxiosResponse<T>): T | undefined =>
  response?.data;

export const apiRequest = {
  get: <T>(url: string, params?: object) =>
    axios.get<T>(url, { params }).then(responseBody),
  post: <T, J>(url: string, body: J) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T, J>(url: string, body: J) =>
    axios.put<T>(url, body).then(responseBody),
  setTokens: (token: string) => {
    axios.interceptors.request.use((config) => {
      config.headers["Authorization"] = token;
      return config;
    });
  },
  clearTokens: () => axios.interceptors.request.clear(),
};
