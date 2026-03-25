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
  Loader2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function CharacterPortrait({ name, imageUrl, position = "object-center" }: { name: string, imageUrl: string, position?: string }) {
  return (
    <img 
      src={imageUrl} 
      alt={name} 
      className={`h-full w-full ${position} object-cover grayscale contrast-125 transition-all group-hover:grayscale-0 group-hover:contrast-100`}
      referrerPolicy="no-referrer"
      onError={(e) => {
        // Fallback if the image fails to load
        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=800&auto=format&fit=crop';
      }}
    />
  );
}

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const diaryPages = [
    {
      left: {
        title: "Manchester, Inverno de 1919.",
        content: "O governo nos deu bronze pelo nosso sangue. Hoje, fervemos a honra deles no cadinho de Ancoats."
      },
      right: {
        content: "A cruz de Thomas derreteu primeiro. A minha eu guardei para a mesa de Blackwood."
      }
    },
    {
      left: {
        content: "A guerra acabou em Flandres, mas nas ruas de Manchester, nós acabamos de forjar as nossas próprias regras."
      },
      right: {
        content: "O cheiro de carvão se mistura ao cheiro de ferro fundido. Não há mais volta."
      }
    },
    {
      left: {
        content: "Cada medalha derretida é um lembrete. Eles nos esqueceram, mas nós nunca esqueceremos."
      },
      right: {
        content: "Assinado: A. Ashford",
        isSignature: true
      }
    }
  ];

  const nextPage = () => {
    if (currentPage < diaryPages.length - 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsFlipping(false);
      }, 600);
    }
  };
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const characters = [
    {
      name: 'Alec Ashford',
      role: 'O Estrategista',
      imageUrl: 'https://raw.githubusercontent.com/l7fitness/Meu-Primeiro-Livro/main/alec 4.jpg',
      position: 'object-center', 
      description:
        'O herói que Manchester cuspiu de volta das trincheiras. Alec derreteu sua honra militar no cadinho de Ancoats para forjar uma nova lei. Frio como o aço de Flandres e tático como um general do submundo, ele governa o império mais temido da cidade com mãos manchadas de pólvora e carvão.',
    },
    {
      name: 'Audrey Shaw',
      role: 'A Informante',
      imageUrl: 'https://raw.githubusercontent.com/l7fitness/Meu-Primeiro-Livro/main/awen.jpg',
      position: 'object-top', 
      description:
        'A aranha no centro de uma teia tecida com sussurros e fumaça. Audrey Shaw sabe quem vai morrer antes mesmo do assassino sacar a arma. Com um sorriso que esconde segredos letais, ela é a inteligência que mantém a Melted Cross um passo à frente da forca.',
    },
    {
      name: 'Thomas',
      role: 'O Fiel Escudeiro',
      imageUrl: 'https://raw.githubusercontent.com/l7fitness/Meu-Primeiro-Livro/main/thomas 12.jpg',
      position: 'object-center', 
      description:
        'O braço armado da lealdade absoluta. Thomas trocou sua cruz de guerra por uma soqueira de bronze e nunca olhou para trás. Forjado na brutalidade das ruas e batizado no calor da fundição, ele é a sombra letal que garante que a vontade de Alec seja a última palavra em Manchester.',
    },
  ];

  const intelligenceFiles = [
    {
      code: 'Arquivo #001',
      tag: 'Ameaça Urbana',
      title: 'Pânico Defensivo nas Ruas',
      imageUrl: 'https://raw.githubusercontent.com/l7fitness/Meu-Primeiro-Livro/main/arquivo1.jpg',
      description:
        'A polícia local teme homens que sobreviveram à Somme e agora tratam cada beco como uma trincheira.',
    },
    {
      code: 'Arquivo #002',
      tag: 'Território',
      title: 'Império de Carvão e Sangue',
      imageUrl: 'https://raw.githubusercontent.com/l7fitness/Meu-Primeiro-Livro/main/arquivo2.jpg',
      description:
        'A Melted Cross avança sobre lugares que o império abandonou, onde a lei chega tarde e sangra cedo.',
    },
    {
      code: 'Arquivo #003',
      tag: 'Símbolo',
      title: 'Medalhas Derretidas',
      imageUrl: 'https://raw.githubusercontent.com/l7fitness/Meu-Primeiro-Livro/main/arquivo3.jpg',
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
          className="relative z-10 flex max-w-5xl flex-col items-center"
        >
          <span className="mb-8 flex items-center gap-4 text-xs font-black uppercase tracking-[0.6em] text-bronze">
            <span className="h-px w-16 bg-bronze/30" />
            Manchester, 1920
            <span className="h-px w-16 bg-bronze/30" />
          </span>
          
          <h1 className="mb-10 font-serif text-6xl font-black leading-[1.05] text-white md:text-8xl lg:text-9xl">
            Onde o carvão <br />
            <span className="italic text-bronze">mancha a alma.</span>
          </h1>
          
          <p className="mb-14 max-w-3xl text-xl leading-relaxed text-neutral-400 md:text-2xl">
            Entre as trincheiras de ferro da fumaça e os segredos dos túneis, Alec e Audrey jogam um jogo de lealdade e traição. Descubra o thriller noir que revela o Exército Fantasma.
          </p>

          <div className="flex flex-col items-center gap-8 sm:flex-row">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-bronze group flex items-center gap-4 px-12 py-6 text-base"
            >
              <BookOpen size={24} />
              Acessar Arquivos Restritos
              <ChevronRight size={20} className="transition-transform group-hover:translate-x-2" />
            </button>
            <a
              href="#universo"
              className="group flex items-center gap-3 text-sm font-bold uppercase tracking-[0.4em] text-neutral-400 transition-all hover:text-white"
            >
              Explorar o Universo
              <div className="h-px w-0 bg-bronze transition-all group-hover:w-12" />
            </a>
          </div>
        </motion.div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <div className="h-16 w-px bg-gradient-to-b from-bronze to-transparent" />
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
          </div>
        </div>
      </section>

      {/* Diary / Chapter Preview Section */}
      <section className="relative border-b border-white/5 py-32 overflow-hidden">
        {/* Map Background */}
        <div className="map-background absolute inset-0 z-0" />
        
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-[1.2fr_0.8fr] md:items-center relative z-10">
          <div className="relative book-container">
            <span className="mb-4 block text-xs font-black uppercase tracking-[0.4em] text-bronze">Diário de Alec Ashford</span>
            <h2 className="mb-12 font-serif text-4xl font-bold text-white md:text-5xl">Memórias de Guerra</h2>
            
            <AnimatePresence mode="wait">
              {!isBookOpen ? (
                /* Book Cover View */
                <motion.div
                  key="cover"
                  initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ rotateY: -110, opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                  className="relative mx-auto max-w-md aspect-[2/3] book-cover group cursor-pointer shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                  onClick={() => setIsBookOpen(true)}
                >
                  {/* 
                    SUBSTITUA O LINK ABAIXO PELA SUA CAPA REAL:
                    Exemplo: src="https://i.imgur.com/sua_imagem.jpg"
                  */}
                  <img 
                    src="https://raw.githubusercontent.com/l7fitness/Meu-Primeiro-Livro/main/capa 3.jpg" 
                    alt="The Melted Cross Real Cover" 
                    className="book-cover-image"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1598153346810-860daa814c4b?q=80&w=1000&auto=format&fit=crop";
                    }}
                  />
                  <div className="book-cover-overlay" />
                  <div className="book-ribbon" />
                  
                  <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                    <div className="text-center">
                      <div className="open-hint mb-4">
                        <div className="mx-auto w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-black/30 group-hover:bg-bronze/20 group-hover:border-bronze/40 transition-all duration-500">
                          <motion.div 
                            animate={{ x: [0, 5, 0] }} 
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-2 h-2 border-t-2 border-r-2 border-white rotate-45"
                          />
                        </div>
                        <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-white/80 group-hover:text-bronze transition-colors duration-500">Clique para Abrir</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Diary Content View */
                <motion.div
                  key="diary"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="mb-4 text-xs font-black uppercase tracking-widest text-bronze/50 flex items-center justify-center gap-4">
                    <span className="h-px w-8 bg-bronze/20" />
                    Toque nas bordas para folhear
                    <span className="h-px w-8 bg-bronze/20" />
                  </div>
                  
                  <div className="relative mx-auto max-w-4xl aspect-[4/3] md:aspect-[1.6/1] book-container">
                    <div className="book-wrapper w-full h-full flex relative">
                      {/* Botão para fechar o livro */}
                      <button 
                        onClick={() => setIsBookOpen(false)}
                        className="absolute -top-12 right-0 text-[10px] font-black uppercase tracking-widest text-bronze/60 hover:text-bronze transition-colors flex items-center gap-2"
                      >
                        <span className="w-4 h-px bg-bronze/30" /> Fechar Livro
                      </button>

                      {/* Left Page (Current Spread) */}
                      <motion.div 
                        className="book-page book-page-left w-1/2 h-full p-8 md:p-14 border-r border-black/5 flex flex-col justify-start pt-10 md:pt-14 relative"
                      >
                        <div className="book-page-wear" />
                        <div className="page-burnt-edge" />
                        <div className="page-stain top-10 left-10 w-40 h-40" />
                        <div className="page-stain bottom-20 right-10 w-32 h-32 opacity-40" />
                        
                        <div className="relative z-10 diary-text text-lg md:text-xl lg:text-2xl leading-relaxed">
                          {diaryPages[currentPage].left.title && (
                            <p className="mb-4 font-bold underline decoration-black/20 underline-offset-8">
                              {diaryPages[currentPage].left.title}
                            </p>
                          )}
                          <p>{diaryPages[currentPage].left.content}</p>
                        </div>

                        <div className="absolute bottom-6 left-10 text-xs font-handwriting opacity-30">
                          pág. {currentPage * 2 + 1}
                        </div>
                        
                        {currentPage > 0 && (
                          <div 
                            className="page-curl-trigger page-curl-trigger-left" 
                            onClick={prevPage}
                          />
                        )}
                      </motion.div>

                      {/* Spine */}
                      <div className="page-spine left-1/2 -translate-x-1/2" />

                      {/* Right Page (Current Spread) */}
                      <motion.div 
                        className="book-page w-1/2 h-full p-8 md:p-14 flex flex-col justify-start pt-10 md:pt-14 relative"
                      >
                        <div className="book-page-wear" />
                        <div className="page-burnt-edge" />
                        <div className="page-stain top-20 right-10 w-48 h-48 opacity-30" />
                        <div className="page-stain bottom-10 left-10 w-24 h-24" />
                        
                        <div className="relative z-10 diary-text text-lg md:text-xl lg:text-2xl leading-relaxed">
                          <p>{diaryPages[currentPage].right.content}</p>
                        </div>

                        <div className="absolute bottom-6 right-10 text-xs font-handwriting opacity-30">
                          pág. {currentPage * 2 + 2}
                        </div>
                        
                        {diaryPages[currentPage].right.isSignature && (
                          <div className="mt-12 flex justify-end opacity-40 grayscale">
                            <div className="h-16 w-16 border-2 border-black/30 rounded-full flex items-center justify-center text-[10px] font-black uppercase tracking-tighter text-black/60 rotate-12">
                              A. Ashford
                            </div>
                          </div>
                        )}

                        {currentPage < diaryPages.length - 1 && (
                          <div 
                            className="page-curl-trigger" 
                            onClick={nextPage}
                          />
                        )}
                      </motion.div>

                      {/* Flipping Page Overlay */}
                      <AnimatePresence>
                        {isFlipping && (
                          <motion.div
                            initial={{ rotateY: 0 }}
                            animate={{ rotateY: -180 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="absolute top-0 right-0 w-1/2 h-full origin-left z-40 pointer-events-none"
                            style={{ transformStyle: "preserve-3d" }}
                          >
                            {/* Front of flipping page */}
                            <div className="book-page absolute inset-0 p-8 md:p-14 flex flex-col justify-start pt-10 md:pt-14">
                              <div className="book-page-wear" />
                              <div className="page-burnt-edge" />
                              <div className="relative z-10 diary-text text-lg md:text-xl lg:text-2xl leading-relaxed opacity-20">
                                <p>{diaryPages[currentPage].right.content}</p>
                              </div>
                              {/* Sweeping Shadow */}
                              <motion.div 
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: [0, 0.3, 0], x: [0, 200, 400] }}
                                transition={{ duration: 0.6 }}
                                className="absolute inset-0 bg-black/40 blur-3xl"
                              />
                            </div>
                            
                            {/* Back of flipping page */}
                            <div className="book-page book-page-back absolute inset-0 p-8 md:p-14 flex flex-col justify-start pt-10 md:pt-14 overflow-hidden">
                              <div className="book-page-wear" />
                              <div className="page-burnt-edge" />
                              <div className="relative z-10 diary-text text-lg md:text-xl lg:text-2xl leading-relaxed">
                                <p>{diaryPages[currentPage + 1]?.left.content}</p>
                              </div>
                              {/* Back Shadow */}
                              <motion.div 
                                initial={{ opacity: 0.3 }}
                                animate={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                                className="absolute inset-0 bg-black/20"
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <aside className="border border-bronze/20 bg-bronze/5 p-10 backdrop-blur-sm">
            <span className="mb-4 block text-xs font-black uppercase tracking-[0.3em] text-bronze">Acesso Restrito</span>
            <h3 className="mb-6 font-serif text-3xl font-bold text-white">Receba o dossiê e entre na lista antes da massa.</h3>
            <p className="mb-10 text-sm leading-relaxed text-neutral-500">
              Esta etapa não pede compra imediata. Ela pede curiosidade, cadastro e retenção até a abertura oficial das vendas.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-bronze flex w-full items-center justify-center gap-3 py-5 text-sm"
            >
              Entrar para a Lista VIP
              <ChevronRight size={18} />
            </button>
            <p className="mt-6 text-[10px] font-bold uppercase tracking-widest text-neutral-600">
              Capítulo 1 + dossiê + aviso prioritário de lançamento.
            </p>
          </aside>
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
                className="group relative flex flex-col items-start overflow-hidden border border-white/10 bg-[#1a1a1a] p-10 text-left transition-all hover:border-bronze/40"
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0 opacity-30 transition-opacity group-hover:opacity-60">
                  <img 
                    src={file.imageUrl} 
                    alt="" 
                    className="h-full w-full object-cover grayscale contrast-125"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback visual enquanto você não sobe as imagens
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1436262513933-a0b06755c784?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/60 to-transparent" />
                </div>

                <div className="relative z-10 w-full">
                  <div className="mb-6 inline-block border border-bronze/40 bg-bronze/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-bronze">
                    {file.code}
                  </div>
                  <h3 className="mb-4 font-serif text-3xl font-bold text-white group-hover:text-bronze">{file.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-400">{file.description}</p>
                  <div className="mt-8 h-px w-full bg-white/5 transition-all group-hover:bg-bronze/30" />
                </div>
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
                <div className="mb-8 aspect-[3/4] overflow-hidden border border-white/5 bg-neutral-900 transition-all">
                  <CharacterPortrait name={char.name} imageUrl={char.imageUrl} position={char.position} />
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
