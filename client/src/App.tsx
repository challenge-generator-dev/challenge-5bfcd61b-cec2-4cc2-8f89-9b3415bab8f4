import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { UserList } from '@/features/users/UserList';
import { UserForm } from '@/features/users/UserForm';

interface AppProps {
  initialLoading?: boolean;
}

const App: React.FC<AppProps> = ({ initialLoading = true }) => {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Simular carga inicial de datos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Manejo de errores global
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setError(event.message);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando aplicación...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error en la aplicación</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Recargar</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Gestión de Usuarios</h1>
        <nav>
          <ul>
            <li>
              <a
                href="/users"
                className={location.pathname === '/users' ? 'active' : ''}
              >
                Lista de Usuarios
              </a>
            </li>
            <li>
              <a
                href="/users/new"
                className={location.pathname === '/users/new' ? 'active' : ''}
              >
                Nuevo Usuario
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/edit/:id" element={<UserForm />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} E-commerce App. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;