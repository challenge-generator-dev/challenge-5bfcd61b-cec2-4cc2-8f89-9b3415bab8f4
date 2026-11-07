import { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '@/types/user.types';

interface UserListProps {
  onEdit?: (user: User) => void;
}

export function UserList({ onEdit }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<User[]>('http://localhost:3000/users');
      setUsers(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message || 'Error al cargar usuarios');
      } else {
        setError('Error desconocido');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) {
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message || 'Error al eliminar usuario');
      } else {
        setError('Error desconocido');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="user-list-loading" role="status" aria-label="Cargando usuarios">
        <p>Cargando usuarios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-list-error" role="alert">
        <p>Error: {error}</p>
        <button onClick={fetchUsers} type="button">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <h2>Lista de Usuarios</h2>
      {users.length === 0 ? (
        <p>No hay usuarios registrados</p>
      ) : (
        <table className="user-list-table" aria-label="Lista de usuarios">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Fecha de Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.registrationDate || 'N/A'}</td>
                <td className="user-list-actions">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(user)}
                      type="button"
                      aria-label={`Editar usuario ${user.name}`}
                    >
                      Editar
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user.id)}
                    type="button"
                    className="delete-button"
                    aria-label={`Eliminar usuario ${user.name}`}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={fetchUsers} type="button" className="refresh-button">
        Actualizar Lista
      </button>
    </div>
  );
}