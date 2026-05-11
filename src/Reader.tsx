import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Lock, Loader2 } from 'lucide-react';

const FLIPBOOK_URL = 'https://heyzine.com/flip-book/4c1b6074be.html';

type Status = 'validating' | 'valid' | 'invalid';

export default function Reader() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<Status>('validating');

  useEffect(() => {
    // Prioridade: token na URL, depois token salvo no localStorage
    const token = searchParams.get('token') || localStorage.getItem('reader_token');
    if (!token) {
      setStatus('invalid');
      return;
    }
    fetch(`/api/validate-token?token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.valid) {
          localStorage.setItem('reader_token', token);
          setStatus('valid');
        } else {
          localStorage.removeItem('reader_token');
          setStatus('invalid');
        }
      })
      .catch(() => setStatus('invalid'));
  }, [searchParams]);

  if (status === 'validating') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-4 text-neutral-400">
          <Loader2 size={40} className="animate-spin text-gold" />
          <p className="text-sm font-bold uppercase tracking-widest">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  if (status === 'invalid') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-red-900/50 bg-red-950/20">
          <Lock size={36} className="text-red-500" />
        </div>
        <h1 className="mb-3 font-serif text-3xl font-black text-white">Acesso Negado</h1>
        <p className="mb-8 max-w-sm text-sm leading-relaxed text-neutral-400">
          Este link é inválido ou expirou. Acesse com o seu email de compra para recuperar o acesso.
        </p>
        <a
          href="/minha-conta"
          className="rounded-sm bg-gold px-8 py-3 text-xs font-black uppercase tracking-widest text-black transition hover:bg-white"
        >
          Acessar Minha Conta
        </a>
      </div>
    );
  }

  return (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', background: '#0a0a0a', overflow: 'hidden', zIndex: 9999 }}>
      {/* Top Bar */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.9)', padding: '10px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookOpen size={16} color="#d4af37" />
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '4px', color: '#fff' }}>
            The Melted Cross
          </span>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a
            href="/minha-conta"
            style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '3px', color: '#555', textDecoration: 'none' }}
            onClick={() => localStorage.removeItem('reader_token')}
          >
            Sair
          </a>
          <a
            href="/"
            style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '3px', color: '#666', textDecoration: 'none' }}
          >
            ← Voltar ao Site
          </a>
        </div>
      </div>

      {/* Flipbook embed — ocupa todo o espaço restante */}
      <iframe
        src={FLIPBOOK_URL}
        style={{ flex: 1, width: '100%', height: '100%', border: 'none', display: 'block' }}
        allowFullScreen
        allow="fullscreen"
        title="The Melted Cross — Livro Digital"
      />
    </div>
  );
}
