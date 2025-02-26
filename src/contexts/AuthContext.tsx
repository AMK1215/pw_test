"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
 } from "react";
import { getMe } from "../services/userService";
import { useNavigate } from "react-router-dom";

interface User {
    id:number;
    name: string;
    user_name: string;
    phone: string;
     balance: string;
 }

interface AuthContextProps {
  user: User | null;
  setUser:(data:User)=>void;
  logout:()=>void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(()=>{
    const fetchUser = async () => {
      try {
        const savedUser = await getMe();
        if (savedUser) {
          setUser(savedUser);
          console.log('savedUser',savedUser)
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } 
    };

    fetchUser();
  },[]);

  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  
  return (
    <AuthContext.Provider value={{ user, setUser ,logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
