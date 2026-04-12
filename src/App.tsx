import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
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
  Flame,
  Droplets,
  Eye,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from './lib/supabase';

function CharacterPortrait({ name, imageUrl, position = "object-center" }: { name: string, imageUrl: string, position?: string }) {
  return (
    <img 
      src={imageUrl} 
      alt={name} 
      className={`h-full w-full ${position} object-cover grayscale contrast-125 transition-all group-hover:grayscale-0 group-hover:contrast-100`}
      referrerPolicy="no-referrer"
    />
  );
}

function MeltedCrossLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center overflow-hidden rounded-full`}>
      <img 
        src="https://res.cloudinary.com/dfvyj8vy5/image/upload/v1774620313/favicon_medalha_lrqpxc.png" 
        alt="The Melted Cross" 
        className="w-full h-full object-contain"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

const dossierPages = [
  {
    id: 0,
    type: 'cover',
    title: 'THE MELTED CROSS',
    subtitle: 'O Exército Fantasma de Manchester',
    content: 'Um Dossier Confidencial. Manchester, Inverno de 1919.',
    icon: <Flame size={48} className="text-gold mb-4" />
  },
  {
    id: 1,
    type: 'content',
    title: 'O Império de Lama e Pedra',
    subtitle: 'O Cenário',
    content: 'A guerra não terminou nas trincheiras da Europa. Ela apenas mudou de endereço. Manchester respira carvão, chuva, ferrugem e violência represada. As ruas de paralelepípedo brilham molhadas como espelhos negros. Acima da terra, a falsa ordem. Abaixo dela, forjas improvisadas e os fantasmas da guerra preparam-se para retomar o que é seu.',
    quote: '"Lá fora, a chuva recomeçava a cair sobre os paralelepípedos negros... Mas sob os túneis de carvão, a guerra despertava."',
    icon: <Droplets size={32} className="text-neutral-500 mb-2" />
  },
  {
    id: 2,
    type: 'content',
    title: 'Alec Ashford',
    subtitle: 'O Diabo de Smoking',
    content: 'Ele regressou dos mortos para liderar o Exército Fantasma. Frio, calculista e calejado pela lama das frentes de batalha. Alec não procura a paz; ele procura o controlo das docas de Salford e das ruas sombrias. Ele sabe que a lealdade tem um preço e que as alianças são forjadas a sangue e pólvora.',
    quote: '"O tilintar dos copos no escuro foi o único pacto que precisavam firmar."',
    icon: <Crosshair size={32} className="text-gold mb-2" />
  },
  {
    id: 3,
    type: 'content',
    title: 'Audrey Shaw',
    subtitle: 'A Lâmina Invisível',
    content: 'Num mundo dominado por homens armados, ela é a excepção letal. Audrey não precisa de gritar para ser ouvida; cada aparição sua altera a temperatura da história. Ela liga os mundos da polícia, das docas e dos rumores. O seu olhar percebe as falhas na armadura de todos os homens ao seu redor.',
    quote: '"Ela já estava na cidade antes de os homens perceberem que a guerra havia começado."',
    icon: <Eye size={32} className="text-gold mb-2" />
  },
  {
    id: 4,
    type: 'content',
    title: 'Sangue, Bronze e Algodão',
    subtitle: 'O Conflito',
    content: 'A Operação Ferrugem e Osso está em marcha. Com as metralhadoras pesadas Lewis roubadas, o nível da disputa elevou-se. Cães de dois mestres rondam a cidade. De um lado, o orgulho ferido de Blackwood; do outro, o implacável Major Thorne. A guerra total vai consumir Manchester na névoa.',
    quote: '"O exército fantasma exige a sua cidade de volta."',
    icon: <BookOpen size={32} className="text-neutral-500 mb-2" />
  }
];

function DossierModal({ isOpen, onClose, onOpenLeadModal }: { isOpen: boolean, onClose: () => void, onOpenLeadModal: () => void }) {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (isOpen) setCurrentPage(0);
  }, [isOpen]);

  if (!isOpen) return null;

  const nextPage = () => {
    if (currentPage < dossierPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const page = dossierPages[currentPage];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative flex w-full max-w-4xl flex-col items-center justify-center font-serif text-neutral-300 overflow-hidden rounded-sm">
        
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-gold hover:text-black"
        >
          <X size={24} />
        </button>

        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-neutral-600 rounded-full mix-blend-screen filter blur-[120px]"></div>
        </div>

        <div className="relative w-full bg-[#121212] border border-white/10 shadow-2xl shadow-black rounded-sm overflow-hidden z-10">
          
          <div className="h-1 bg-black w-full flex">
            {dossierPages.map((p) => (
              <div 
                key={p.id} 
                className={`h-full flex-1 transition-colors duration-500 ${currentPage >= p.id ? 'bg-gold' : 'bg-transparent'}`}
              />
            ))}
          </div>

          <div className="p-8 md:p-16 min-h-[500px] flex flex-col justify-center relative">
            
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-gold/30 opacity-50"></div>
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-gold/30 opacity-50"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-gold/30 opacity-50"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-gold/30 opacity-50"></div>

            <div className={`transition-all duration-700 transform ${currentPage === page.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              
              {page.type === 'cover' ? (
                <div className="text-center space-y-6">
                  <div className="flex justify-center">{page.icon}</div>
                  <h1 className="text-4xl md:text-6xl font-bold tracking-widest text-white uppercase drop-shadow-lg">
                    {page.title}
                  </h1>
                  <p className="text-gold tracking-widest uppercase text-sm md:text-base border-t border-b border-white/10 py-2 inline-block">
                    {page.subtitle}
                  </p>
                  <p className="text-neutral-500 italic mt-8">{page.content}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 border-b border-white/10 pb-4">
                    {page.icon}
                    <div>
                      <h2 className="text-sm tracking-widest text-gold uppercase">{page.subtitle}</h2>
                      <h3 className="text-3xl md:text-4xl text-white font-semibold">{page.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-lg md:text-xl leading-relaxed text-neutral-400">
                    {page.content}
                  </p>
                  
                  {page.quote && (
                    <div className="mt-8 p-6 bg-black/40 border-l-2 border-gold italic text-neutral-300">
                      {page.quote}
                    </div>
                  )}
                </div>
              )}
              
            </div>
          </div>

          <div className="bg-black/50 p-4 border-t border-white/10 flex justify-between items-center">
            <button 
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded transition-all ${currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/5 text-gold'}`}
            >
              <ChevronLeft size={20} />
              <span className="uppercase tracking-wider text-xs font-bold">Anterior</span>
            </button>
            
            <div className="text-neutral-500 text-xs tracking-widest">
              {currentPage === 0 ? 'CAPA' : `PÁGINA ${currentPage} DE ${dossierPages.length - 1}`}
            </div>

            <button 
              onClick={nextPage}
              disabled={currentPage === dossierPages.length - 1}
              className={`flex items-center space-x-2 px-4 py-2 rounded transition-all ${currentPage === dossierPages.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/5 text-gold'}`}
            >
              <span className="uppercase tracking-wider text-xs font-bold">Próxima</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        {currentPage === dossierPages.length - 1 && (
          <div className="mt-8 animate-fade-in-up w-full max-w-md">
            <button 
              onClick={() => {
                onClose();
                onOpenLeadModal();
              }}
              className="w-full bg-gold hover:bg-white text-black px-8 py-4 rounded-sm font-black tracking-widest uppercase transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              Acessar o Dossiê Visual Agora
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const characters = [
    {
      name: 'Alec Ashford',
      role: 'O Estrategista',
      imageUrl: 'https://res.cloudinary.com/dfvyj8vy5/image/upload/v1774536449/alec4_avhirj.jpg',
      position: 'object-center', 
      description:
        'O herói que Manchester cuspiu de volta das trincheiras. Alec derreteu sua honra militar no cadinho de Ancoats para forjar uma nova lei. Frio como o aço de Flandres e tático como um general do submundo, ele governa o império mais temido da cidade com mãos manchadas de pólvora e carvão.',
    },
    {
      name: 'Audrey Shaw',
      role: 'A Informante',
      imageUrl: 'https://res.cloudinary.com/dfvyj8vy5/image/upload/v1774536449/awen_k6wasa.jpg',
      position: 'object-top', 
      description:
        'A aranha no centro de uma teia tecida com sussurros e fumaça. Audrey Shaw sabe quem vai morrer antes mesmo do assassino sacar a arma. Com um sorriso que esconde segredos letais, ela é a inteligência que mantém a Melted Cross um passo à frente da forca.',
    },
    {
      name: 'Thomas',
      role: 'O Fiel Escudeiro',
      imageUrl: 'https://res.cloudinary.com/dfvyj8vy5/image/upload/v1774536450/thomas12_wmiona.jpg',
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
      imageUrl: 'https://res.cloudinary.com/dfvyj8vy5/image/upload/v1774536449/arquivo1_mkre2p.jpg',
      description:
        'A polícia local teme homens que sobreviveram à Somme e agora tratam cada beco como uma trincheira.',
    },
    {
      code: 'Arquivo #002',
      tag: 'Território',
      title: 'Império de Carvão e Sangue',
      imageUrl: 'https://res.cloudinary.com/dfvyj8vy5/image/upload/v1774536449/arquivo2_az05qb.jpg',
      description:
        'A Melted Cross avança sobre lugares que o império abandonou, onde a lei chega tarde e sangra cedo.',
    },
    {
      code: 'Arquivo #003',
      tag: 'Símbolo',
      title: 'Medalhas Derretidas',
      imageUrl: 'https://res.cloudinary.com/dfvyj8vy5/image/upload/v1774536449/arquivo3_nl8v73.jpg',
      description:
        'Cada lâmina forjada carrega a humilhação de homens descartados depois da guerra.',
    },
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      if (!supabase) {
        throw new Error('Supabase não configurado');
      }

      const { error } = await supabase
        .from('leads')
        .insert([{ email, origem: 'melted_cross' }]);

      if (error) {
        if (error.code === '23505') {
          // Unique violation (e-mail já cadastrado) — envia email mesmo assim
          await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });
          setStatus('success');
          return;
        }
        throw error;
      }

      // Envia email de boas-vindas com o dossiê
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      setStatus('success');
    } catch (err) {
      console.error('Erro ao salvar e-mail:', err);
      setStatus('error');
      setFeedbackMessage('Ocorreu um erro ao tentar salvar seu e-mail. Tente novamente ou verifique se as chaves do Supabase estão configuradas.');
    }
  };

  return (
    <div className="noise min-h-screen bg-[#121212] text-[#e0e0e0] font-sans selection:bg-bronze/30 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5">
          <div className="flex items-center gap-3 font-serif text-xl font-black tracking-tighter text-white md:text-2xl">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-gold/30 bg-gold/5 md:h-10 md:w-10">
              <MeltedCrossLogo className="w-full h-full" />
            </div>
            THE MELTED CROSS
          </div>
          <div className="hidden gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 md:flex">
            <a href="#universo" className="transition-colors hover:text-gold">O Universo</a>
            <a href="#personagens" className="transition-colors hover:text-gold">Personagens</a>
            <a href="#arquivos" className="transition-colors hover:text-gold">Arquivos</a>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group relative overflow-hidden rounded-full border border-gold/40 bg-gold/5 px-6 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold hover:text-black md:px-8 md:py-2.5 md:text-[10px]"
          >
            <span className="relative z-10">Lista VIP</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center md:pt-32">
        
        <div className="absolute inset-0 opacity-60 contrast-110">
          <img 
            src="https://res.cloudinary.com/dfvyj8vy5/image/upload/v1774536451/herodapagina_ycuzx8.jpg" 
            alt="Industrial Manchester" 
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        {/* Overlays para escurecer a imagem e melhorar a leitura do texto */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#121212_100%)] opacity-80" />
        
        <div className="vignette absolute inset-0" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 flex w-full max-w-7xl flex-col items-center"
        >
          <span className="mb-6 flex items-center gap-3 text-[8px] font-black uppercase tracking-[0.5em] text-gold md:mb-10 md:gap-6 md:text-[10px] md:tracking-[0.8em]">
            <span className="h-px w-8 bg-gold/30 md:w-24" />
            Manchester, 1920 — O Despertar do Império
            <span className="h-px w-8 bg-gold/30 md:w-24" />
          </span>
          
          <h1 className="mb-8 font-serif text-5xl font-black leading-[1.1] text-white md:mb-12 md:text-9xl lg:text-[11rem] lg:leading-[0.95]">
            A Honra é <br />
            <span className="italic text-gold drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">Forjada no Fogo.</span>
          </h1>
          
          <p className="mb-10 max-w-5xl text-lg leading-relaxed text-neutral-300 md:mb-16 md:text-3xl font-light italic">
            "Onde o carvão mancha a alma e o destino é escrito em ouro e sangue."
          </p>

          <p className="mb-12 max-w-4xl text-sm leading-relaxed text-neutral-400 md:mb-20 md:text-xl">
            Mergulhe nas sombras de uma Manchester industrial visceral. Uma jornada épica de lealdade inquebrável, traições letais e o despertar de um exército que a história tentou apagar. Você está pronto para cruzar a linha?
          </p>

          <div className="flex flex-col items-center gap-6 sm:flex-row md:gap-8">
            <a
              href="https://loja.infinitepay.io/l7fitness/pny7214-livro---the-melted-cross"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 overflow-hidden rounded-sm bg-gold px-10 py-4 transition-all hover:bg-white md:px-12 md:py-5"
            >
              <span className="relative z-10 flex flex-col items-center leading-tight">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black md:text-xs">Garantir Minha Cópia</span>
                <span className="text-[8px] font-bold uppercase tracking-widest text-black/60 md:text-[9px]">Edição de Colecionador · R$ 29,90</span>
              </span>
            </a>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative flex items-center gap-4 overflow-hidden rounded-sm border border-gold/60 bg-transparent px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gold transition-all hover:bg-gold hover:text-black md:px-12 md:py-5 md:text-xs md:tracking-[0.5em]"
            >
              <span className="relative z-10 flex items-center gap-3">
                <FileText size={18} />
                Baixar Dossiê Visual Grátis
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50 md:bottom-16">
          <div className="h-16 w-px bg-gradient-to-b from-gold to-transparent md:h-24" />
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
          
          <div className="relative flex items-center justify-center">
            <div className="w-full overflow-hidden rounded-md border border-white/10 shadow-2xl">
              <img 
                src="https://res.cloudinary.com/dfvyj8vy5/image/upload/v1774536449/caderno-alec_mceoor.jpg" 
                alt="Diário de Alec Ashford" 
                className="h-auto w-full object-contain"
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
            
            {/* Book Cover View */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              className="relative mx-auto max-w-md aspect-[2/3] book-cover group cursor-pointer shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              onClick={() => setIsDossierOpen(true)}
            >
              <img 
                src="https://res.cloudinary.com/dfvyj8vy5/image/upload/v1774536452/capa3_v2ruhc.jpg" 
                alt="The Melted Cross Real Cover" 
                className="book-cover-image"
                referrerPolicy="no-referrer"
              />
              <div className="book-cover-overlay" />
              
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
                    <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-white/80 group-hover:text-bronze transition-colors duration-500">Acessar Dossiê Confidencial</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col items-center justify-center h-full">
            <div className="relative w-full max-w-lg overflow-hidden rounded-sm border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:scale-[1.02]">
              <img 
                src="https://res.cloudinary.com/dfvyj8vy5/image/upload/v1774612071/crtiativos_melted_cross_qu4bj1.jpg" 
                alt="The Melted Cross nas Livrarias" 
                className="h-auto w-full object-cover" 
                referrerPolicy="no-referrer"
              />
              <div className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-inset ring-white/10" />
            </div>
            
            <div className="mt-10 w-full max-w-lg flex flex-col items-center">
              <p className="mb-4 text-center text-sm italic text-neutral-400">
                "Uma obra-prima sombria de ficção histórica."
              </p>
              <a
                href="https://loja.infinitepay.io/l7fitness/pny7214-livro---the-melted-cross"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex w-full items-center justify-center gap-4 overflow-hidden rounded-sm border border-gold/50 bg-gold/10 px-8 py-5 transition-all hover:bg-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
              >
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-gold transition-colors group-hover:text-black">
                    Comprar Livro Físico
                  </span>
                  <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-neutral-400 transition-colors group-hover:text-black/70">
                    Edição de Colecionador • R$ 29,90
                  </span>
                </div>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
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
                className="group relative flex flex-col items-start overflow-hidden border border-white/10 bg-[#1a1a1a] p-10 text-left transition-all hover:border-bronze/40"
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0 opacity-30 transition-opacity group-hover:opacity-60">
                  <img 
                    src={file.imageUrl} 
                    alt="" 
                    className="h-full w-full object-cover grayscale contrast-125"
                    referrerPolicy="no-referrer"
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
            <MeltedCrossLogo className="w-10 h-10" />
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

      {/* Modal do Dossiê Interativo */}
      <DossierModal 
        isOpen={isDossierOpen} 
        onClose={() => setIsDossierOpen(false)} 
        onOpenLeadModal={() => setIsModalOpen(true)} 
      />

      {/* Modal de Captura / Sucesso */}
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
              className="dossier-paper relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-1 md:p-2"
            >
              <div className="border border-white/10 bg-[#1a1a1a] p-6 md:p-10">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 text-neutral-600 transition-colors hover:text-white"
                >
                  <X size={24} />
                </button>

                <div className="mb-6 flex flex-col items-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-bronze/30 bg-bronze/5">
                    <Lock className="text-bronze" size={22} />
                  </div>
                  
                  <span className="mb-2 text-[10px] font-black uppercase tracking-[0.5em] text-bronze">Top Secret // Restricted Access</span>
                  <h2 className="mb-3 font-serif text-2xl font-black text-white md:text-3xl">
                    ARQUIVO CONFIDENCIAL: <br />
                    <span className="text-bronze">O EXÉRCITO FANTASMA</span>
                  </h2>
                  <p className="font-serif text-base italic text-neutral-400">
                    Desbloqueie o Dossiê Visual da Gangue e um Cupom de Desconto Exclusivo.
                  </p>
                </div>

                <div className="mb-6 border-y border-white/5 py-5">
                  <p className="text-center text-sm leading-relaxed text-neutral-400 md:text-base">
                    A guerra de Alec não terminou na França. Abaixo das ruas úmidas de Manchester, um império de carvão e sangue está sendo forjado. Junte-se à lista de informantes de Audrey Shaw e receba o Dossiê Visual (Trailer) e um Cupom Especial para o lançamento do livro.
                  </p>
                </div>

                {status === 'success' ? (
                  <div className="flex flex-col items-center py-4 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                      <Shield size={30} />
                    </div>
                    <h3 className="mb-3 font-serif text-2xl font-bold text-white">Acesso Concedido</h3>
                    <p className="mb-6 text-sm leading-relaxed text-neutral-400">
                      Seu registro foi confirmado. Conforme prometido, aqui estão seus arquivos confidenciais:
                    </p>
                    
                    <div className="w-full max-w-md space-y-4">
                      {/* Botão de Download */}
                      <a 
                        href="https://res.cloudinary.com/dfvyj8vy5/image/upload/v1774622038/THE-MELTED-CROSS_-_FEITO_NO_GAMMA_erkygy.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-sm border border-gold/50 bg-gold/10 px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold hover:text-black md:text-sm"
                      >
                        <FileText size={20} />
                        <span className="relative z-10">Baixar Dossiê Visual (PDF)</span>
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      </a>

                      {/* Cupom de Desconto e Upsell */}
                      <div className="relative flex w-full flex-col items-center justify-center rounded-sm border border-dashed border-white/20 bg-black/50 p-6">
                        <span className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Cupom 20% OFF — Livro Digital</span>
                        <div className="font-mono text-2xl font-bold tracking-widest text-white md:text-3xl">
                          FANTASMA20
                        </div>
                        <span className="mt-2 text-center text-xs text-neutral-400">
                          De R$ 29,90 por apenas <strong className="text-gold">R$ 23,92</strong>.
                        </span>
                        
                        <a 
                          href="https://checkout.infinitepay.io/l7fitness/2XxELH26z7"
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mt-6 flex w-full items-center justify-center gap-2 rounded-sm bg-gold px-6 py-4 text-[10px] font-black uppercase tracking-widest text-black transition-all hover:bg-white md:text-xs"
                        >
                          Comprar Livro Digital Agora
                        </a>
                      </div>
                    </div>
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
                        className={`w-full border ${status === 'error' ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-bronze'} bg-black/50 py-4 pl-12 pr-4 text-sm font-bold tracking-widest text-white focus:outline-none`}
                      />
                      {status === 'error' && (
                        <p className="mt-2 text-xs text-red-500">{feedbackMessage}</p>
                      )}
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

      <footer className="w-full border-t border-white/10 bg-black/80 py-8 text-center text-xs text-neutral-500">
        <div className="container mx-auto flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p>© 2026 The Melted Cross. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <Link to="/privacidade" className="hover:text-gold transition-colors">Política de Privacidade</Link>
            <Link to="/termos" className="hover:text-gold transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-gold selection:text-black">
      <div className="container mx-auto max-w-3xl px-6 py-24">
        <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-white mb-12 transition-colors">
          <ChevronLeft size={16} />
          Voltar para a página inicial
        </Link>
        <h1 className="font-serif text-4xl font-bold mb-8 text-gold">Política de Privacidade</h1>
        <div className="space-y-6 text-neutral-300 leading-relaxed">
          <p>
            A sua privacidade é importante para nós. É política do <strong>The Melted Cross</strong> respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site.
          </p>
          <h2 className="text-xl font-bold text-white mt-8">1. Informações que coletamos</h2>
          <p>
            Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço (como o envio do Dossiê Visual). Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.
          </p>
          <h2 className="text-xl font-bold text-white mt-8">2. Uso das informações</h2>
          <p>
            Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
          </p>
          <h2 className="text-xl font-bold text-white mt-8">3. Compartilhamento de dados</h2>
          <p>
            Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei ou para processamento de pagamentos através de plataformas seguras (como InfinitePay, Hotmart, etc).
          </p>
          <h2 className="text-xl font-bold text-white mt-8">4. Seus direitos</h2>
          <p>
            Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
          </p>
          <p className="mt-8 text-sm text-neutral-500">
            Esta política é efetiva a partir de Março de 2026.
          </p>
        </div>
      </div>
    </div>
  );
}

function TermsOfUse() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-gold selection:text-black">
      <div className="container mx-auto max-w-3xl px-6 py-24">
        <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-white mb-12 transition-colors">
          <ChevronLeft size={16} />
          Voltar para a página inicial
        </Link>
        <h1 className="font-serif text-4xl font-bold mb-8 text-gold">Termos de Uso</h1>
        <div className="space-y-6 text-neutral-300 leading-relaxed">
          <h2 className="text-xl font-bold text-white mt-8">1. Termos</h2>
          <p>
            Ao acessar ao site <strong>The Melted Cross</strong>, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site.
          </p>
          <h2 className="text-xl font-bold text-white mt-8">2. Uso de Licença</h2>
          <p>
            É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site The Melted Cross, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título.
          </p>
          <h2 className="text-xl font-bold text-white mt-8">3. Isenção de responsabilidade</h2>
          <p>
            Os materiais no site da The Melted Cross são fornecidos 'como estão'. The Melted Cross não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
          </p>
          <h2 className="text-xl font-bold text-white mt-8">4. Limitações</h2>
          <p>
            Em nenhum caso o The Melted Cross ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em The Melted Cross.
          </p>
          <p className="mt-8 text-sm text-neutral-500">
            Estes termos são efetivos a partir de Março de 2026.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/privacidade" element={<PrivacyPolicy />} />
      <Route path="/termos" element={<TermsOfUse />} />
    </Routes>
  );
}
