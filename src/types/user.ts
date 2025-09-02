
export type FormValues = {
  prenom: string;
  nom: string;
  telephone: string;
  email: string;
  mot_de_passe: string;
  confirm: string;
};

export type LoginValues = {
  email: string;
  mot_de_passe: string;
};

export type UserType = {
  nom: string;
  prenom: string;
  email: string;
  mot_de_passe: string;
  telephone?: string;
  role: "admin" | "client"; 
  date_inscription: string;
};

export type SigninResponse = {
  token: string;
  user: UserType;
};

export type SignupParams = {
  nom: string;
  prenom: string;
  email: string;
  mot_de_passe: string;
  mot_de_passe_confirmation: string;
  telephone?: string;
  role: "admin" | "client";
};

export type Admin = UserType & { role: "admin" };
export type Client = UserType & { role: "client" };

export type UserRole = UserType["role"];

export type AuthStore = {
  isAuthenticated: boolean;
  token: string | null;
  user: Admin | Client | null;
  setIsAuthenticated: (auth: boolean) => void;
  setToken: (token: string | null) => void;
  setUser: (user: Admin | Client | null) => void;
  logout: () => void;
};