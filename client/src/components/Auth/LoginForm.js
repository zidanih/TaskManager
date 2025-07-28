import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/login', formData);
      localStorage.setItem('token', res.data.token);
      window.location.href = '/'; // Redirige après connexion
    } catch (error) {
      setErrors({ api: 'Identifiants incorrects' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>
      
      {errors.api && <div className="error">{errors.api}</div>}

      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Mot de passe"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      <button type="submit">Se connecter</button>
    </form>
  );
};
export default LoginForm; 