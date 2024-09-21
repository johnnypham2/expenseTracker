import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Register } from '../endpoints/endpoints';
import { IRegister } from '../../interfaces/interface';

const RegisterPage = () => {
    const [id, setId] = useState(0);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let registerInfo = {
            id: id,
            userName: username,
            password: password
        }
    
        try {
            let isUserCreated = await Register(registerInfo);
            if(isUserCreated){
                alert('Account Successfully Created');
                navigate('/')
            }
        } catch (error) {
            console.log("Registering account failed", error);
        }
      };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleRegister}>
        <h2>Create Account</h2>
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
        <button type="submit" className="login-button">Register</button>
        <p onClick={() => navigate('/')} className="toggle-text">
          Already have an account? Login
        </p>
      </form>
    </div>
  )
}

export default RegisterPage
