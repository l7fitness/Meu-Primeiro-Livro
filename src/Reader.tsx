import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Lock, Loader2 } from 'lucide-react';

const FLIPBOOK_URL = 'https://heyzine.com/flip-book/4c1b6074be.html';

type Status = 'validating' | 'valid' | 'invalid';

export default function Reader() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<Status>('validating');

  useEffect(() => {
    if (!token) {
      setStatus('invalid');
      return;
    }
    fetch(`/api/validate-token?token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((data) => setStatus(data.valid ? 'valid' : 'invalid'))
      .catch(() => setStatus('invalid'));
  }, [token]);

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
          Este link é inválido ou expirou. Verifique seu email de confirmação de compra ou entre em contato conosco.
        </p>
        <a
          href="/"
          className="rounded-sm bg-gold px-8 py-3 text-xs font-black uppercase tracking-widest text-black transition hover:bg-white"
        >
          Voltar ao Site
        </a>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-[#0a0a0a]">
      {/* Top Bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/5 bg-black/80 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <BookOpen size={18} className="text-gold" />
          <span className="font-serif text-sm font-black uppercase tracking-widest text-white">
            The Melted Cross
          </span>
        </div>
        <a
          href="/"
          className="text-xs font-bold uppercase tracking-widest text-neutral-500 transition hover:text-gold"
        >
          ← Voltar ao Site
        </a>
      </div>

      {/* Flipbook embed */}
      <iframe
        src={FLIPBOOK_URL}
        className="flex-1 w-full border-0"
        allowFullScreen
        title="The Melted Cross — Livro Digital"
      />
    </div>
  );
}

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen flex-col bg-[#0d0d0d]"
      style={{ userSelect: 'none' }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/5 bg-black/80 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <BookOpen size={18} className="text-gold" />
          <span className="font-serif text-sm font-black uppercase tracking-widest text-white">
            The Melted Cross
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale((s) => Math.max(0.6, s - 0.2))}
            className="rounded p-2 text-neutral-400 transition hover:bg-white/10 hover:text-white"
            title="Diminuir zoom"
          >
            <ZoomOut size={16} />
          </button>
          <span className="min-w-[40px] text-center text-xs text-neutral-500">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale((s) => Math.min(2.5, s + 0.2))}
            className="rounded p-2 text-neutral-400 transition hover:bg-white/10 hover:text-white"
            title="Aumentar zoom"
          >
            <ZoomIn size={16} />
          </button>
          <div className="mx-1 h-4 w-px bg-white/10" />
          <button
            onClick={toggleFullscreen}
            className="rounded p-2 text-neutral-400 transition hover:bg-white/10 hover:text-white"
            title="Tela cheia"
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* Reader Area */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-2 py-6">
        {/* Prev Button */}
        <button
          onClick={goPrev}
          disabled={pageNumber <= 1}
          className="absolute left-2 z-10 rounded-full bg-black/60 p-3 text-white transition hover:bg-gold hover:text-black disabled:opacity-20 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={24} />
        </button>

        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={displayPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="flex items-start gap-1 drop-shadow-2xl"
          >
            <Document
              file={PDF_URL}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              loading={
                <div className="flex h-[70vh] w-[45vw] max-w-[400px] items-center justify-center bg-[#1a1a1a]">
                  <Loader2 className="animate-spin text-gold" size={32} />
                </div>
              }
            >
              {/* Left / Single Page */}
              <div className="overflow-hidden rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                <Page
                  pageNumber={displayPage}
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="block"
                />
              </div>

              {/* Right Page (desktop only) */}
              {showRight && (
                <div className="overflow-hidden rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                  <Page
                    pageNumber={rightPage}
                    scale={scale}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="block"
                  />
                </div>
              )}
            </Document>
          </motion.div>
        </AnimatePresence>

        {/* Next Button */}
        <button
          onClick={goNext}
          disabled={pageNumber >= numPages}
          className="absolute right-2 z-10 rounded-full bg-black/60 p-3 text-white transition hover:bg-gold hover:text-black disabled:opacity-20 disabled:cursor-not-allowed"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-center gap-6 border-t border-white/5 bg-black/80 px-4 py-3 backdrop-blur-sm">
        <button
          onClick={goPrev}
          disabled={pageNumber <= 1}
          className="text-xs font-bold uppercase tracking-widest text-neutral-500 transition hover:text-gold disabled:opacity-30"
        >
          ← Anterior
        </button>

        <div className="flex items-center gap-2">
          <input
            type="number"
            min={1}
            max={numPages}
            value={displayPage}
            onChange={(e) => {
              const v = parseInt(e.target.value);
              if (v >= 1 && v <= numPages) {
                setDirection(v > pageNumber ? 'next' : 'prev');
                setPageNumber(v);
              }
            }}
            className="w-14 bg-transparent text-center text-sm font-bold text-white focus:outline-none"
          />
          <span className="text-xs text-neutral-600">/ {numPages}</span>
        </div>

        <button
          onClick={goNext}
          disabled={pageNumber >= numPages}
          className="text-xs font-bold uppercase tracking-widest text-neutral-500 transition hover:text-gold disabled:opacity-30"
        >
          Próxima →
        </button>
      </div>
    </div>
  );
}
