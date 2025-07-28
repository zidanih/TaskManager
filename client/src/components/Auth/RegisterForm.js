import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Nom requis';
    if (!formData.email.includes('@')) newErrors.email = 'Email invalide';
    if (formData.password.length < 6) newErrors.password = '6 caractères minimum';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post('/api/users/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      navigate('/login');
    } catch (error) {
      setErrors({ api: error.response?.data?.error || 'Erreur d\'inscription' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Inscription</h2>
      
      {errors.api && <div className="error">{errors.api}</div>}

      <div className="form-group">
        <label>Nom</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      {/* Champs email/password/confirmPassword similaires */}

      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default RegisterForm;