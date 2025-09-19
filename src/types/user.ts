
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


export type UserType ={
  id_user: number;
  first_name: string;
  last_name: string;
  email: string;
  address: string | null;
  phone: string | null;
  id_role: number; 
  registration_date: string; 
  created_at: string | null;
  updated_at: string | null;
}


export type SigninResponse = {
  token: string;
  user: UserType;
};

export type SignupParams = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
  id_role?: number; 
};


export type Admin = UserType & { id_role: 2 };
export type Client = UserType & { id_role: 1 };

export type UserRole = UserType["id_role"];

export type AuthStore = {
  isAuthenticated: boolean;
  token: string | null;
  user: UserType | null; 
  setIsAuthenticated: (auth: boolean) => void;
  setToken: (token: string | null) => void;
  setUser: (user: UserType | null) => void; 
  logout: () => void;
};
