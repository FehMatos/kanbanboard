import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="loginPage">
      <form className="login" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label>Email</label>
        <input
          type="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          value={email}
        />

        <label>Password</label>
        <input
          type="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          value={password}
        />

        <button disabled={isLoading}>Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
