'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function LoginModal({ open, onClose, onSuccess }: LoginModalProps) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
      onSuccess?.();
      onClose();
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`modal-overlay${open ? ' active' : ''}`} onClick={(e) => { if ((e.target as HTMLElement).classList.contains('modal-overlay')) onClose(); }} role="dialog" aria-modal="true">
      <div className="modal-content" style={{ maxWidth: 400, display: 'block', padding: '3rem', textAlign: 'center', gridTemplateColumns: 'unset' }}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar">×</button>
        <h2 className="title-serif" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Área Admin</h2>
        <p style={{ color: 'var(--gray)', marginBottom: '2rem', fontSize: '0.9rem' }}>Entre com suas credenciais</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="admin-email">Email</label>
            <input id="admin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          </div>
          <div className="form-group">
            <label htmlFor="admin-password">Senha</label>
            <input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
          </div>
          {error && <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>}
          <button type="submit" className="btn-gold" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Entrando...' : 'ENTRAR'}
          </button>
        </form>
      </div>
    </div>
  );
}
