import { createContext, useReducer, useEffect } from "react";

export interface User {
  email: string;
  token: string;
}
interface AuthState {
  user: User | null;
}
type AuthAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

export interface AuthContextType extends AuthState {
  dispatch: React.Dispatch<AuthAction>;
}
interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
