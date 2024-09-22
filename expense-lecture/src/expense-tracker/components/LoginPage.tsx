import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Login } from "../endpoints/endpoints";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Reset error message on new attempt

    let loginInfo = {
        userName: username,
        password: password
    };

    try {
        let token = await Login(loginInfo);
        if(token && token.token){
            localStorage.setItem("Token", token.token);
            navigate('/expense');
        } else {
            setErrorMessage("Invalid login credentials. Please try again.");
        }
    } catch (error) {
        setErrorMessage("Login failed. Please check your network and try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Username"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Show/Hide password"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p onClick={() => navigate('/register')} className="toggle-text">
          Don't have an account? Create one
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
