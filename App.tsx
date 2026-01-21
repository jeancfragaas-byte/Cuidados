
import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  ChevronRight, 
  Info, 
  LogOut, 
  Search,
  Book,
  Clock,
  PlayCircle,
  Heart,
  Smile,
  Meh,
  Frown,
  Zap
} from 'lucide-react';
import { View, ContentItem, ExerciseItem } from './types';
import { CONTENTS, EXERCISES, STATIC_REFLECTIONS } from './constants';
import Navigation from './components/Navigation';
import BreathingPlayer from './components/BreathingPlayer';

const Logo = () => (
  <svg viewBox="0 0 100 100" className="w-14 h-14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M35 78C35 76.8954 35.8954 76 37 76H63C64.1046 76 65 76.8954 65 78V81H35V78Z" fill="#1B3131"/>
    <rect x="42" y="73" width="16" height="3" fill="#1B3131"/>
    <rect x="48.5" y="48" width="3" height="25" fill="#1B3131"/>
    <circle cx="50" cy="48" r="2.5" fill="#1B3131"/>
    <circle cx="50" cy="62" r="2" fill="#1B3131"/>
    <circle cx="50" cy="68" r="2" fill="#1B3131"/>
    <path d="M33 45L47 48" stroke="#1B3131" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M67 45L53 48" stroke="#1B3131" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M26 51C26 56.5228 30.4772 61 36 61C41.5228 61 46 56.5228 46 51H26Z" fill="#2C5F5F"/>
    <path d="M54 51C54 56.5228 58.4772 61 64 61C69.5228 61 74 56.5228 74 51H54Z" fill="#2C5F5F"/>
    <path d="M50 22C50 22 41 31 41 38C41 42.9706 45.0294 47 50 47C54.9706 47 59 42.9706 59 38C59 31 50 22 50 22Z" fill="#FF8A00"/>
    <path d="M50 28C50 28 45 33 45 38C45 40.7614 47.2386 43 50 43C52.7614 43 55 40.7614 55 38C55 33 50 28 50 28Z" fill="#FFD600"/>
  </svg>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseItem | null>(null);
  const [dailyReflection, setDailyReflection] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState('');
  
  // Estado Local (Salvo no Navegador)
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('sersocial_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [mood, setMood] = useState<string | null>(() => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem('sersocial_mood_date');
    return saved === today ? localStorage.getItem('sersocial_mood_value') : null;
  });

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * STATIC_REFLECTIONS.length);
    setDailyReflection(STATIC_REFLECTIONS[randomIndex]);
  }, []);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavorites = favorites.includes(id) 
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('sersocial_favorites', JSON.stringify(newFavorites));
  };

  const saveMood = (value: string) => {
    const today = new Date().toDateString();
    setMood(value);
    localStorage.setItem('sersocial_mood_date', today);
    localStorage.setItem('sersocial_mood_value', value);
  };

  const navigateToContent = (content: ContentItem) => {
    setSelectedContent(content);
    setCurrentView(View.CONTENT_DETAIL);
  };

  const startExercise = (ex: ExerciseItem) => {
    setSelectedExercise(ex);
    setCurrentView(View.BREATHING);
  };

  const filteredLibrary = CONTENTS.filter(item => {
    return item.title.toLowerCase().includes(searchQuery.toLowerCase());
  }).sort((a, b) => {
    const aFav = favorites.includes(a.id) ? -1 : 1;
    const bFav = favorites.includes(b.id) ? -1 : 1;
    return aFav - bFav;
  });

  const renderHome = () => (
    <div className="px-6 py-8 space-y-8 pb-32 animate-fade-zoom">
      <header className="flex justify-between items-center">
        <div className="flex items-center">
          <Logo />
          <div className="ml-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-1">SerSocial App</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.1em]">Cuidado Profissional</p>
          </div>
        </div>
        <div className="relative">
          {mood ? (
            <button 
              onClick={() => setMood(null)}
              className={`p-3 bg-white border border-slate-200 rounded-2xl transition-all shadow-sm ${
                mood === 'bem' ? 'text-teal-500' : mood === 'neutro' ? 'text-amber-500' : 'text-rose-500'
              }`}
            >
              {mood === 'bem' && <Smile size={24} />}
              {mood === 'neutro' && <Meh size={24} />}
              {mood === 'cansado' && <Frown size={24} />}
            </button>
          ) : (
            <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-teal-600 transition-all shadow-sm">
              <Bell size={24} />
            </button>
          )}
        </div>
      </header>

      {/* Cartão de Check-in Ocupacional */}
      {!mood ? (
        <section className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="bg-teal-50 p-2 rounded-xl text-teal-600">
              <Zap size={20} />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Check-in de Energia</h3>
          </div>
          <p className="text-xs text-slate-500">Como você inicia seu turno hoje?</p>
          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => saveMood('bem')} className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl hover:bg-teal-50 hover:text-teal-600 transition-all group">
              <Smile size={28} className="mb-2 text-slate-400 group-hover:text-teal-500" />
              <span className="text-[10px] font-bold uppercase">Bem</span>
            </button>
            <button onClick={() => saveMood('neutro')} className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl hover:bg-amber-50 hover:text-amber-600 transition-all group">
              <Meh size={28} className="mb-2 text-slate-400 group-hover:text-amber-500" />
              <span className="text-[10px] font-bold uppercase">Neutro</span>
            </button>
            <button onClick={() => saveMood('cansado')} className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl hover:bg-rose-50 hover:text-rose-600 transition-all group">
              <Frown size={28} className="mb-2 text-slate-400 group-hover:text-rose-500" />
              <span className="text-[10px] font-bold uppercase">Cansado</span>
            </button>
          </div>
        </section>
      ) : (
        <section className="bg-teal-50 rounded-[2rem] p-5 border border-teal-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-xl text-teal-600 shadow-sm">
              <Zap size={18} />
            </div>
            <p className="text-xs font-bold text-teal-800 tracking-tight">Check-in concluído! Boa jornada.</p>
          </div>
          <button onClick={() => setMood(null)} className="text-[9px] font-bold text-teal-600 uppercase underline">Refazer</button>
        </section>
      )}

      <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-[2rem] p-8 text-white shadow-xl shadow-teal-900/10">
        <div className="flex items-center space-x-2 mb-4">
          <Info size={16} className="opacity-70" />
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Reflexão do momento</span>
        </div>
        <p className="text-xl md:text-2xl font-medium leading-relaxed italic">
          "{dailyReflection}"
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Atalhos Rápidos</h2>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => startExercise(EXERCISES[0])}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:scale-[1.02] transition-all group"
          >
            <div className="bg-blue-50 p-4 rounded-2xl mb-3 text-blue-500 group-hover:scale-110 transition-transform">
              <Clock size={28} />
            </div>
            <span className="text-sm font-bold text-slate-800">Pausa</span>
          </button>
          <button 
            onClick={() => setCurrentView(View.TRAILS)}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:scale-[1.02] transition-all group"
          >
            <div className="bg-amber-50 p-4 rounded-2xl mb-3 text-amber-500 group-hover:scale-110 transition-transform">
              <PlayCircle size={28} />
            </div>
            <span className="text-sm font-bold text-slate-800">Trilhas</span>
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Favoritos & Destaques</h2>
          <button onClick={() => setCurrentView(View.LIBRARY)} className="text-teal-600 text-[10px] font-bold uppercase hover:underline">Ver tudo</button>
        </div>
        <div className="space-y-3">
          {CONTENTS.slice(0, 3).map((content) => (
            <button
              key={content.id}
              onClick={() => navigateToContent(content)}
              className="w-full flex items-center p-5 bg-white rounded-2xl border border-slate-100 shadow-sm text-left group hover:border-teal-100 transition-all"
            >
              <div className="bg-slate-50 p-3 rounded-xl mr-4 text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                <Book size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-800 truncate">{content.title}</h3>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{content.category}</p>
              </div>
              <button 
                onClick={(e) => toggleFavorite(content.id, e)}
                className={`p-2 rounded-lg transition-colors ${favorites.includes(content.id) ? 'text-rose-500 bg-rose-50' : 'text-slate-200 hover:text-slate-400'}`}
              >
                <Heart size={18} fill={favorites.includes(content.id) ? "currentColor" : "none"} />
              </button>
            </button>
          ))}
        </div>
      </section>
    </div>
  );

  const renderLibrary = () => (
    <div className="px-6 py-8 space-y-8 pb-32 animate-fade-zoom">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Biblioteca</h1>
        <p className="text-slate-500 text-sm font-medium">Conteúdos educativos e ferramentas</p>
      </header>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Pesquisar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredLibrary.map(content => (
          <button
            key={content.id}
            onClick={() => navigateToContent(content)}
            className="w-full p-6 bg-white rounded-3xl border border-slate-100 shadow-sm text-left hover:shadow-md transition-all group relative"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-[9px] bg-teal-50 text-teal-600 px-2 py-1 rounded-lg font-black uppercase tracking-widest">
                {content.category}
              </span>
              <button 
                onClick={(e) => toggleFavorite(content.id, e)}
                className={`p-2 rounded-lg transition-colors ${favorites.includes(content.id) ? 'text-rose-500 bg-rose-50' : 'text-slate-200 hover:text-slate-400'}`}
              >
                <Heart size={18} fill={favorites.includes(content.id) ? "currentColor" : "none"} />
              </button>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-600">{content.title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{content.shortDescription}</p>
          </button>
        ))}
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case View.HOME: return renderHome();
      case View.LIBRARY: return renderLibrary();
      case View.CONTENT_DETAIL: 
        return (
          <div className="bg-white min-h-screen pb-32 animate-fade-zoom">
            <header className="p-6 flex items-center border-b border-slate-50 sticky top-0 bg-white/90 backdrop-blur-sm z-10">
              <button onClick={() => setCurrentView(View.LIBRARY)} className="p-2 bg-slate-50 rounded-xl text-teal-600 mr-4">
                <ChevronRight size={20} className="rotate-180" />
              </button>
              <h2 className="font-bold text-slate-800 text-sm truncate">{selectedContent?.title}</h2>
              <button 
                onClick={(e) => selectedContent && toggleFavorite(selectedContent.id, e)}
                className={`ml-auto p-2 rounded-xl ${selectedContent && favorites.includes(selectedContent.id) ? 'text-rose-500' : 'text-slate-300'}`}
              >
                <Heart size={20} fill={selectedContent && favorites.includes(selectedContent.id) ? "currentColor" : "none"} />
              </button>
            </header>
            <div className="p-8 max-w-2xl mx-auto space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] text-teal-600 font-black uppercase tracking-widest">{selectedContent?.category}</span>
                <h1 className="text-3xl font-black text-slate-900 leading-tight">{selectedContent?.title}</h1>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">{selectedContent?.fullContent}</p>
            </div>
          </div>
        );
      case View.EXERCISES: 
        return (
          <div className="px-6 py-8 space-y-8 pb-32 animate-fade-zoom">
            <header>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Práticas</h1>
              <p className="text-slate-500 text-sm font-medium">Momentos de pausa orientada</p>
            </header>
            <div className="space-y-4">
              {EXERCISES.map(ex => (
                <button
                  key={ex.id}
                  onClick={() => startExercise(ex)}
                  className="w-full flex items-center p-5 bg-white rounded-3xl border border-slate-100 shadow-sm text-left group hover:border-teal-100 transition-all"
                >
                  <div className={`p-4 rounded-2xl mr-4 ${ex.type === 'breathing' ? 'bg-blue-50 text-blue-500' : ex.type === 'mindfulness' ? 'bg-indigo-50 text-indigo-500' : 'bg-emerald-50 text-emerald-500'}`}>
                    <Clock size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">{ex.title}</h4>
                    <p className="text-xs text-slate-400">{ex.description}</p>
                  </div>
                  <PlayCircle size={24} className="text-slate-200 group-hover:text-teal-600" />
                </button>
              ))}
            </div>
          </div>
        );
      case View.BREATHING: 
        return <BreathingPlayer exercise={selectedExercise || EXERCISES[0]} onBack={() => setCurrentView(View.EXERCISES)} />;
      case View.SETTINGS:
        return (
          <div className="px-6 py-8 space-y-8 pb-32 animate-fade-zoom">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Ajustes</h1>
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
              <button className="w-full p-5 text-left flex justify-between items-center border-b border-slate-50">
                <span className="font-bold text-slate-700">Sobre o App</span>
                <ChevronRight size={18} className="text-slate-300" />
              </button>
              <button className="w-full p-5 text-left flex justify-between items-center border-b border-slate-50">
                <span className="font-bold text-slate-700">Privacidade dos Dados</span>
                <ChevronRight size={18} className="text-slate-300" />
              </button>
              <button 
                onClick={() => { localStorage.clear(); window.location.reload(); }}
                className="w-full p-5 text-left flex justify-between items-center text-red-500"
              >
                <span className="font-bold">Limpar Dados Locais</span>
                <LogOut size={18} />
              </button>
            </div>
            <div className="p-6 bg-slate-100 rounded-2xl">
              <p className="text-[10px] text-slate-400 uppercase font-black mb-2 tracking-widest">Aviso Institucional</p>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                O SerSocial App é uma plataforma educativa de apoio geral. Não realiza diagnósticos, terapias ou intervenções clínicas. Caso necessite de apoio especializado, procure um profissional habilitado.
              </p>
            </div>
          </div>
        );
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center">
      <div className="w-full max-w-lg min-h-screen relative shadow-2xl shadow-slate-200 bg-slate-50 overflow-hidden">
        {renderCurrentView()}
        {![View.BREATHING, View.CONTENT_DETAIL].includes(currentView) && (
          <Navigation currentView={currentView} setView={setCurrentView} />
        )}
      </div>
    </div>
  );
};

export default App;
