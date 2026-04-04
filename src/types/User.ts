// export interface User {
//   name: string;
//   avatar: string;
// }

import { ReactNode } from "react";

// export interface UserContextType {
//   user: User | null;
//   setUser: (user: User | null) => void;
//   login: (user: User) => void;
//   logout: () => void;
// }

export interface User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  role: string;
  avatar: string;
  phone: string;
  status: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
