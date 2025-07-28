import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ isLogin, setUser }) => {  // Ajoute setUser dans les props
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    name: '' 
  });
  const navigate = useNavigate();  // Hook pour la navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? '/api/users/login' : '/api/users/register';
    try {
      const res = await axios.post(url, formData);
      
      // Stocke le token dans localStorage
      localStorage.setItem('token', res.data.token);
      
      // Met à jour l'état utilisateur dans App.js (si setUser est fourni)
      if (setUser && res.data.user) {
        setUser(res.data.user);
      }
      
      // Redirige vers la page des tâches
      navigate('/tasks');
      
    } catch (error) {
      console.error(error.response?.data || error);
      alert(error.response?.data?.error || "Erreur lors de l'authentification");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isLogin && (
        <input 
          type="text" 
          placeholder="Nom" 
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
        />
      )}
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
      <button type="submit">{isLogin ? 'Connexion' : 'Inscription'}</button>
    </form>
  );
};

export default AuthForm;