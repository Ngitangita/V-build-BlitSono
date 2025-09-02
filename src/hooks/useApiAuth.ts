import axiosClient from "../conf/axiosClient";
import type { SigninResponse, SignupParams } from "../types/user";

export function useApiAuth() {
  const signup = async (params: SignupParams) => {
    const {data} = await axiosClient.post<SigninResponse>("/register", params);
    return data;
  };

  const signin = async (email: string, mot_de_passe: string) => {
    const { data } = await axiosClient.post<SigninResponse>("/login", {
      email,
      mot_de_passe,
    });
    return data;
  };

  return { signup, signin };
}
