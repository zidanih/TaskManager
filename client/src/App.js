import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import AuthLayout from './components/Auth/AuthLayout';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirige vers /login si non connecté, ou /profile si connecté */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/profile" /> : <Navigate to="/login" />} 
        />

        {/* Page d'inscription */}
        <Route 
          path="/register" 
          element={
            <AuthLayout 
              title="Inscription" 
              footerText="Déjà un compte ?" 
              footerLink="/login"
            >
              <RegisterForm />
            </AuthLayout>
          } 
        />

        {/* Page de connexion */}
        <Route 
          path="/login" 
          element={
            <AuthLayout 
              title="Connexion" 
              footerText="Pas de compte ?" 
              footerLink="/register"
            >
              <LoginForm />
            </AuthLayout>
          } 
        />

        {/* Page profil (exemple basique) */}
        <Route 
          path="/profile" 
          element={
            isAuthenticated ? (
              <div>
                <h1>Bienvenue !</h1>
                <button onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}>
                  Déconnexion
                </button>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;