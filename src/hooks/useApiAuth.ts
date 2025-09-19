import axiosClient from "../conf/axiosClient";
import type { SigninResponse, SignupParams } from "../types/user";

export function useApiAuth() {
  const signup = async (params: SignupParams) => {
    const {data} = await axiosClient.post<SigninResponse>("/register", params);
    return data;
  };

  const signin = async (email: string, password: string) => {
    const { data } = await axiosClient.post<SigninResponse>("/login", {
      email,
      password,
    });
    return data;
  };

  return { signup, signin };
}
