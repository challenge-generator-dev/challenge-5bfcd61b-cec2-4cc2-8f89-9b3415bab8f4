import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, CreateUserDto, UpdateUserDto } from '@/types/user.types';

interface UserFormProps {
  user?: User | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function UserForm({ user, onSuccess, onCancel }: UserFormProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditMode = Boolean(user?.id);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (name.length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'El email no es válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditMode && user?.id) {
        const data: UpdateUserDto = { name, email };
        await axios.put<User>(`http://localhost:3000/users/${user.id}`, data);
      } else {
        const data: CreateUserDto = { name, email };
        await axios.post<User>('http://localhost:3000/users', data);
      }

      if (onSuccess) {
        onSuccess();
      }

      setName('');
      setEmail('');
      setErrors({});
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || err.message;
        setErrors({ submit: `Error: ${message}` });
      } else {
        setErrors({ submit: 'Error desconocido al guardar' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form" aria-label={isEditMode ? 'Editar usuario' : 'Crear usuario'}>
      <h3>{isEditMode ? 'Editar Usuario' : 'Crear Usuario'}</h3>

      {errors.submit && (
        <div className="form-error" role="alert">
          {errors.submit}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="user-name">Nombre:</label>
        <input
          id="user-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSubmitting}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <span id="name-error" className="field-error" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="user-email">Email:</label>
        <input
          id="user-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span id="email-error" className="field-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}