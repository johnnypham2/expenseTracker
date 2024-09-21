import { useState } from "react";
import ExpenseList from "./ExpenseList";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseForm from "./ExpenseForm";
import categories from "../Categories";
import { useNavigate } from 'react-router-dom';
import { Login } from "../endpoints/endpoints";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let loginInfo = {
        userName: username,
        password: password
    }

    try {
        let token = await Login(loginInfo);
        if(token && token.token){
            localStorage.setItem("Token", token.token);
            navigate('/expense')
        }
    } catch (error) {
        console.log("Login failed", error);
    }
  };

  return (
    <>
      <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        <p onClick={() => navigate('/register')} className="toggle-text">
          Don't have an account? Create one
        </p>
      </form>
    </div>
    </>
  );
};

export default LoginPage;
