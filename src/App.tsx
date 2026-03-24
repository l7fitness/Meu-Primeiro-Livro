import React, { useState } from 'react';
import {
  BookOpen,
  Mail,
  X,
  ChevronRight,
  Skull,
  Shield,
  Crosshair,
  FileText,
  Lock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const characters = [
    {
      name: 'Alec Ashford',
      role: 'O Estrategista',
      description:
        'Ex-sargento condecorado que transformou disciplina militar em uma máquina criminosa precisa e silenciosa.',
    },
    {
      name: 'Nora Vale',
      role: 'A Informante',
      description:
        'Dona de um salão clandestino que reúne policiais, políticos e apostadores sob o mesmo teto esfumaçado.',
    },
    {
      name: 'Hugh Mercer',
      role: 'O Cobrador',
      description:
        'Sobreviveu às trincheiras e agora cobra cada dívida como se ainda estivesse atravessando terra de ninguém.',
    },
  ];

  const intelligenceFiles = [
    {
      code: 'Arquivo #001',
      tag: 'Ameaça Urbana',
      title: 'Pânico Defensivo nas Ruas',
      description:
        'A polícia local teme homens que sobreviveram à Somme e agora tratam cada beco como uma trincheira.',
    },
    {
      code: 'Arquivo #002',
      tag: 'Território',
      title: 'Império de Carvão e Sangue',
      description:
        'A Melted Cross avança sobre lugares que o império abandonou, onde a lei chega tarde e sangra cedo.',
    },
    {
      code: 'Arquivo #003',
      tag: 'Símbolo',
      title: 'Medalhas Derretidas',
      description:
        'Cada lâmina forjada carrega a humilhação de homens descartados depois da guerra.',
    },
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulação de envio
    setTimeout(() => {
      setStatus('success');
      setFeedbackMessage('Dossiê enviado! Verifique sua caixa de entrada.');
    }, 1500);
  };

  return (
    <div className="noise min-h-screen bg-[#121212] text-[#e0e0e0] font-sans selection:bg-bronze/30 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 z-40 w-full border-b border-white/5 bg-[#121212]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3 font-serif text-2xl font-black tracking-tighter text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-bronze/30 bg-bronze/10">
              <Crosshair className="text-bronze" size={20} />
            </div>
            THE MELTED CROSS
          </div>
          <div className="hidden gap-8 text-xs font-bold uppercase tracking-[0.2em] md:flex">
            <a href="#universo" className="transition-colors hover:text-bronze">O Universo</a>
            <a href="#personagens" className="transition-colors hover:text-bronze">Personagens</a>
            <a href="#arquivos" className="transition-colors hover:text-bronze">Arquivos</a>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-bronze text-xs"
          >
            Dossiê VIP
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center">
        <div className="vignette absolute inset-0 z-0" />
        
        <div className="absolute inset-0 z-[-1] opacity-20 grayscale contrast-150">
          <img 
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop" 
            alt="Industrial Manchester" 
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex max-w-4xl flex-col items-center"
        >
          <span className="mb-6 flex items-center gap-4 text-xs font-black uppercase tracking-[0.5em] text-bronze">
            <span className="h-px w-12 bg-bronze/30" />
            Manchester, 1920
            <span className="h-px w-12 bg-bronze/30" />
          </span>
          
          <h1 className="mb-8 font-serif text-5xl font-black leading-[1.1] text-white md:text-7xl lg:text-8xl">
            Onde o carvão <br />
            <span className="italic text-bronze">mancha a alma.</span>
          </h1>
          
          <p className="mb-12 max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl">
            Entre as trincheiras de ferro da fumaça e os segredos dos túneis, Alec e Audrey jogam um jogo de lealdade e traição. Descubra o thriller noir que revela o Exército Fantasma.
          </p>

          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-bronze group flex items-center gap-3 px-10 py-5 text-sm"
            >
              <BookOpen size={20} />
              Acessar Arquivos Restritos
              <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#universo"
              className="group flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 transition-colors hover:text-white"
            >
              Explorar o Universo
              <div className="h-px w-0 bg-bronze transition-all group-hover:w-8" />
            </a>
          </div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <div className="h-12 w-px bg-gradient-to-b from-bronze to-transparent" />
        </div>
      </header>

      {/* Universe Section */}
      <section id="universo" className="relative border-y border-white/5 bg-[#0a0a0a] py-32">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <span className="mb-4 text-xs font-black uppercase tracking-[0.4em] text-bronze">O Contexto Histórico</span>
            <h2 className="mb-8 font-serif text-4xl font-bold text-white md:text-5xl">A Avenida do Crime</h2>
            <div className="space-y-6 text-lg leading-relaxed text-neutral-400">
              <p>
                Eles prometeram glória. O Rei pediu sangue, e eles deram. Mas quando a lama de Flandres secou e os canhões silenciaram, o que sobrou para os heróis da Grande Guerra? Nada.
              </p>
              <p>
                Em 1920, milhares de homens treinados para matar voltaram para o desemprego. A polícia local entrou em pânico. Como você prende um homem que sobreviveu à Batalha do Somme?
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div className="border-l border-bronze/30 pl-6">
                <div className="font-serif text-4xl font-black text-white">1920</div>
                <div className="text-xs font-bold uppercase tracking-widest text-neutral-500">Ano da Revolta</div>
              </div>
              <div className="border-l border-bronze/30 pl-6">
                <div className="font-serif text-4xl font-black text-white">400m</div>
                <div className="text-xs font-bold uppercase tracking-widest text-neutral-500">Túneis de Carvão</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-sm border border-white/10 grayscale contrast-125">
              <img 
                src="https://images.unsplash.com/photo-1584967918940-a7d51b064268?q=80&w=1000&auto=format&fit=crop" 
                alt="Noir Atmosphere" 
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 h-64 w-64 border border-bronze/20 bg-[#121212] p-8 shadow-2xl md:block hidden">
              <Skull className="mb-4 text-bronze" size={32} />
              <h3 className="mb-2 font-serif text-xl font-bold text-white">Melted Cross</h3>
              <p className="text-sm text-neutral-500">Lâminas forjadas com o bronze de medalhas Victoria Cross derretidas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Intelligence Files Section */}
      <section id="arquivos" className="bg-[#121212] py-32">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <span className="mb-4 block text-xs font-black uppercase tracking-[0.4em] text-bronze">Inteligência Militar</span>
          <h2 className="mb-20 font-serif text-4xl font-bold text-white md:text-6xl">Arquivos Confidenciais</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {intelligenceFiles.map((file) => (
              <motion.div 
                key={file.code}
                whileHover={{ y: -10 }}
                className="group relative flex flex-col items-start border border-white/5 bg-[#1a1a1a] p-10 text-left transition-all hover:border-bronze/30"
              >
                <div className="mb-8 flex h-12 w-12 items-center justify-center border border-bronze/20 bg-bronze/5 text-bronze">
                  <FileText size={24} />
                </div>
                <span className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-bronze/60">{file.code}</span>
                <h3 className="mb-4 font-serif text-2xl font-bold text-white">{file.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-500">{file.description}</p>
                <div className="mt-8 h-px w-12 bg-bronze/30 transition-all group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Characters Section */}
      <section id="personagens" className="border-t border-white/5 bg-[#0a0a0a] py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-20 flex flex-col items-end text-right">
            <span className="mb-4 text-xs font-black uppercase tracking-[0.4em] text-bronze">O Elenco</span>
            <h2 className="font-serif text-4xl font-bold text-white md:text-6xl">Veteranos de Guerra</h2>
          </div>
          
          <div className="grid gap-12 md:grid-cols-3">
            {characters.map((char) => (
              <div key={char.name} className="group">
                <div className="mb-8 aspect-square overflow-hidden border border-white/5 bg-neutral-900 grayscale transition-all group-hover:grayscale-0">
                  <div className="flex h-full w-full items-center justify-center text-neutral-800">
                    <Skull size={80} strokeWidth={0.5} />
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-bronze">{char.role}</span>
                <h3 className="mt-2 font-serif text-3xl font-bold text-white">{char.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-500">{char.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#121212] py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="mb-10 flex items-center justify-center gap-4 font-serif text-3xl font-black tracking-tighter text-white">
            <Crosshair className="text-bronze" size={32} />
            THE MELTED CROSS
          </div>
          <p className="mb-10 text-sm font-medium uppercase tracking-[0.2em] text-neutral-600">
            © 2026 Alex Alves. Todos os direitos reservados.
          </p>
          <div className="flex justify-center gap-8 text-neutral-500">
            <a href="#" className="transition-colors hover:text-bronze">Instagram</a>
            <a href="#" className="transition-colors hover:text-bronze">Twitter</a>
            <a href="#" className="transition-colors hover:text-bronze">Newsletter</a>
          </div>
        </div>
      </footer>

      {/* Dossier Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="dossier-paper relative w-full max-w-2xl overflow-hidden p-1 md:p-2"
            >
              <div className="border border-white/10 bg-[#1a1a1a] p-8 md:p-12">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 text-neutral-600 transition-colors hover:text-white"
                >
                  <X size={24} />
                </button>

                <div className="mb-12 flex flex-col items-center text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-bronze/30 bg-bronze/5">
                    <Lock className="text-bronze" size={28} />
                  </div>
                  
                  <span className="mb-2 text-[10px] font-black uppercase tracking-[0.5em] text-bronze">Top Secret // Restricted Access</span>
                  <h2 className="mb-4 font-serif text-3xl font-black text-white md:text-4xl">
                    ARQUIVO CONFIDENCIAL: <br />
                    <span className="text-bronze">O EXÉRCITO FANTASMA</span>
                  </h2>
                  <p className="font-serif text-lg italic text-neutral-400">
                    Desbloqueie o mapa dos túneis e a ficha militar de Alec.
                  </p>
                </div>

                <div className="mb-12 border-y border-white/5 py-8">
                  <p className="text-center text-sm leading-relaxed text-neutral-400 md:text-base">
                    A guerra de Alec não terminou na França. Abaixo das ruas úmidas de Manchester, um império de carvão e sangue está sendo forjado. Junte-se à lista de informantes de Audrey Shaw e receba o 1º Capítulo Inédito e o Dossiê de Inteligência.
                  </p>
                </div>

                {status === 'success' ? (
                  <div className="flex flex-col items-center py-10 text-center">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-bronze/20 text-bronze">
                      <Shield size={40} />
                    </div>
                    <h3 className="mb-2 font-serif text-2xl font-bold text-white">Acesso Concedido</h3>
                    <p className="text-neutral-500">{feedbackMessage}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col items-center gap-8">
                    <div className="relative w-full">
                      <Mail className="absolute top-1/2 left-4 -translate-y-1/2 text-neutral-600" size={18} />
                      <input 
                        type="email" 
                        required
                        placeholder="SEU MELHOR E-MAIL"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-white/10 bg-black/50 py-4 pl-12 pr-4 text-sm font-bold tracking-widest text-white focus:border-bronze focus:outline-none"
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-wax group relative"
                    >
                      <span className="relative z-10">
                        {status === 'loading' ? 'PROCESSANDO...' : '[ ACESSAR ARQUIVOS RESTRITOS ]'}
                      </span>
                      <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                    
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                      Ao prosseguir, você aceita os termos da resistência.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
