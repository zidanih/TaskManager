import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, footerText, footerLink }) => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{title}</h1>
        {children}
        <div className="auth-footer">
          {footerText} <Link to={footerLink}>{footerLink === '/login' ? 'Se connecter' : 'Créer un compte'}</Link>
        </div>
      </div>
    </div>
  );
};
export default AuthLayout; 