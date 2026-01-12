import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import type { User } from "../context/AuthContext";

interface UseSignupReturn {
  signup: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useSignup = (): UseSignupReturn => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const signup = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json: User | { error: string } = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError("error" in json ? json.error : "Unknown error");
      return;
    }

    localStorage.setItem("user", JSON.stringify(json));

    dispatch({ type: "LOGIN", payload: json as User });

    setIsLoading(false);
  };
  return { signup, isLoading, error };
};
