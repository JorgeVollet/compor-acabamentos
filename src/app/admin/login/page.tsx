'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';

export default function AdminLoginPage() {
  const { signIn, user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace('/admin');
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await signIn(email, password);
      router.replace('/admin');
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div style={{ minHeight: '100vh', background: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray)' }}>Carregando...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ background: 'var(--bg-card)', padding: '3rem', borderRadius: 8, width: '100%', maxWidth: 400, border: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
        <Image src="/logocompor2.png" alt="Compor Acabamentos" width={150} height={60} style={{ objectFit: 'contain', margin: '0 auto 1.5rem' }} />
        <h1 className="title-serif" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Área Admin</h1>
        <p style={{ color: 'var(--gray)', marginBottom: '2rem', fontSize: '0.9rem' }}>Entre com suas credenciais</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" autoFocus />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
          </div>
          {error && <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>}
          <button type="submit" className="btn-gold" style={{ width: '100%' }} disabled={submitting}>
            {submitting ? 'Entrando...' : 'ENTRAR'}
          </button>
        </form>
        <a href="/" style={{ display: 'block', marginTop: '1.5rem', color: 'var(--gray)', fontSize: '0.85rem' }}>← Voltar ao site</a>
      </div>
    </div>
  );
}
