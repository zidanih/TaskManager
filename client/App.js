import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './src/AuthForm';
import TasksPage from './TasksPage'; // À créer
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  // Vérifie si l'utilisateur est connecté (token présent)
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  return (
    <BrowserRouter>
      <div>
        <h1>Gestion de Tâches</h1>
        <Routes>
          {/* Page d'accueil (redirige vers /tasks si connecté) */}
          <Route 
            path="/" 
            element={
              isAuthenticated() 
                ? <Navigate to="/tasks" /> 
                : <AuthForm isLogin={false} setUser={setUser} />
            } 
          />

          {/* Connexion (redirige vers /tasks si déjà connecté) */}
          <Route 
            path="/login" 
            element={
              isAuthenticated()
                ? <Navigate to="/tasks" />
                : <AuthForm isLogin={true} setUser={setUser} />
            } 
          />

          {/* Page des tâches (protégée) */}
          <Route 
            path="/tasks" 
            element={
              isAuthenticated()
                ? <TasksPage user={user} />
                : <Navigate to="/login" />
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;