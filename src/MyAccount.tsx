import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Mail, Loader2, CheckCircle, XCircle } from 'lucide-react';

type Status = 'idle' | 'loading' | 'found' | 'not_found';

export default function MyAccount() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const navigate = useNavigate();

  // Se já tem token salvo, redireciona direto
  useEffect(() => {
    const saved = localStorage.getItem('reader_token');
    if (saved) {
      navigate(`/ler?token=${saved}`, { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');

    try {
      const res = await fetch(`/api/get-token-by-email?email=${encodeURIComponent(email.trim().toLowerCase())}`);
      const data = await res.json();

      if (data.valid && data.token) {
        localStorage.setItem('reader_token', data.token);
        setStatus('found');
        setTimeout(() => navigate(`/ler?token=${data.token}`), 1200);
      } else {
        setStatus('not_found');
      }
    } catch {
      setStatus('not_found');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: 'Georgia, serif',
    }}>
      {/* Logo / Title */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <BookOpen size={40} color="#d4af37" style={{ marginBottom: '16px' }} />
        <p style={{ margin: '0 0 8px', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#d4af37' }}>
          Acesso ao Livro
        </p>
        <h1 style={{ margin: '0', fontSize: '28px', fontWeight: 900, letterSpacing: '6px', textTransform: 'uppercase', color: '#ffffff' }}>
          THE MELTED CROSS
        </h1>
        <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#555', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Minha Conta
        </p>
      </div>

      {/* Card */}
      <div style={{
        width: '100%',
        maxWidth: '440px',
        background: '#121212',
        border: '1px solid #2a2a2a',
        padding: '40px',
      }}>
        {/* Topo dourado */}
        <div style={{ height: '3px', background: 'linear-gradient(90deg,#d4af37,#b8960c,#d4af37)', marginBottom: '32px' }} />

        <p style={{ margin: '0 0 24px', fontSize: '14px', lineHeight: 1.8, color: '#888', textAlign: 'center' }}>
          Digite o email que você usou na compra para acessar seu livro digital em qualquer dispositivo.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Input email */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <Mail size={16} color="#555" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              disabled={status === 'loading' || status === 'found'}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                background: '#0a0a0a',
                border: '1px solid #333',
                color: '#fff',
                fontSize: '14px',
                padding: '14px 14px 14px 40px',
                outline: 'none',
                fontFamily: 'Georgia, serif',
              }}
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={status === 'loading' || status === 'found'}
            style={{
              width: '100%',
              padding: '16px',
              background: '#d4af37',
              color: '#000',
              border: 'none',
              cursor: status === 'loading' || status === 'found' ? 'default' : 'pointer',
              fontSize: '11px',
              fontWeight: 900,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: status === 'loading' || status === 'found' ? 0.8 : 1,
              fontFamily: 'Georgia, serif',
            }}
          >
            {status === 'loading' && <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />}
            {status === 'found' && <CheckCircle size={16} />}
            {status === 'loading' ? 'Verificando...' : status === 'found' ? 'Acesso liberado!' : 'Acessar meu livro'}
          </button>
        </form>

        {/* Mensagem de erro */}
        {status === 'not_found' && (
          <div style={{
            marginTop: '20px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            padding: '16px',
            background: '#1a0a0a',
            border: '1px solid #3a1a1a',
          }}>
            <XCircle size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: '1px' }} />
            <div>
              <p style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: 700, color: '#ef4444', letterSpacing: '1px' }}>
                Email não encontrado
              </p>
              <p style={{ margin: 0, fontSize: '12px', color: '#888', lineHeight: 1.6 }}>
                Verifique se digitou o email correto ou consulte o email de confirmação de compra.
              </p>
            </div>
          </div>
        )}

        {/* Rodapé */}
        <div style={{ height: '1px', background: '#1a1a1a', margin: '32px 0 20px' }} />
        <p style={{ margin: 0, fontSize: '11px', color: '#444', textAlign: 'center', lineHeight: 1.6 }}>
          Ainda não tem o livro?{' '}
          <a href="/" style={{ color: '#d4af37', textDecoration: 'none' }}>Voltar ao site</a>
        </p>
      </div>

      {/* Spinner keyframe */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
