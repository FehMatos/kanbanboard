import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import type { User } from "../context/AuthContext";

interface UseLoginReturn {
  login: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useLogin = (): UseLoginReturn => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json: User | { error: string } = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError("error" in json ? json.error : "Unknown Error");
      return;
    }

    localStorage.setItem("user", JSON.stringify(json));

    dispatch({ type: "LOGIN", payload: json as User });

    setIsLoading(false);
  };
  return { login, isLoading, error };
};
