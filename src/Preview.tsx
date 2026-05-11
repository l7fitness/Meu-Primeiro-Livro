import { BookOpen } from 'lucide-react';

const PREVIEW_URL = 'https://heyzine.com/flip-book/cfc21cceae.html';
const BUY_URL = 'https://checkout.infinitepay.io/l7fitness/7Pr9A2NOfQ';

export default function Preview() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', background: '#0a0a0a', overflow: 'hidden', zIndex: 9999 }}>
      {/* Top Bar */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.9)', padding: '10px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookOpen size={16} color="#d4af37" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '3px', color: '#fff' }}>
              The Melted Cross
            </span>
            <span style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: '#d4af37' }}>
              Capítulo 1 — Prévia Gratuita
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href={BUY_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: '#d4af37', color: '#000', textDecoration: 'none', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '3px', padding: '8px 16px', whiteSpace: 'nowrap' }}
          >
            Comprar Completo — R$ 29,90
          </a>
          <a
            href="/"
            style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '3px', color: '#555', textDecoration: 'none' }}
          >
            ← Voltar
          </a>
        </div>
      </div>

      {/* Flipbook embed */}
      <iframe
        src={PREVIEW_URL}
        style={{ flex: 1, width: '100%', height: '100%', border: 'none', display: 'block' }}
        allowFullScreen
        allow="fullscreen"
        title="The Melted Cross — Capítulo 1 Grátis"
      />
    </div>
  );
}
