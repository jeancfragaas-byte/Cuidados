
import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  ChevronRight, 
  Info, 
  LogOut, 
  Search,
  Book,
  Clock,
  PlayCircle
} from 'lucide-react';
import { View, ContentItem, ExerciseItem } from './types';
import { CONTENTS, EXERCISES, STATIC_REFLECTIONS } from './constants';
import Navigation from './components/Navigation';
import BreathingPlayer from './components/BreathingPlayer';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseItem | null>(null);
  const [dailyReflection, setDailyReflection] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    // Seleciona uma frase aleatória da lista estática ao carregar o app
    const randomIndex = Math.floor(Math.random() * STATIC_REFLECTIONS.length);
    setDailyReflection(STATIC_REFLECTIONS[randomIndex]);
  }, []);

  const navigateToContent = (content: ContentItem) => {
    setSelectedContent(content);
    setCurrentView(View.CONTENT_DETAIL);
  };

  const startExercise = (ex: ExerciseItem) => {
    setSelectedExercise(ex);
    setCurrentView(View.BREATHING);
  };

  const filteredLibrary = CONTENTS.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderHome = () => (
    <div className="px-6 py-8 space-y-8 pb-32 animate-fade-zoom">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">SerSocial</h1>
          <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Bem-estar Profissional</p>
        </div>
        <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-teal-600 transition-all shadow-sm">
          <Bell size={24} />
        </button>
      </header>

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
        <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Atalhos</h2>
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
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Destaques</h2>
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
              <ChevronRight size={16} className="text-slate-300 ml-2" />
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
        <p className="text-slate-500 text-sm font-medium">Conteúdos educativos</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLibrary.map(content => (
          <button
            key={content.id}
            onClick={() => navigateToContent(content)}
            className="w-full p-6 bg-white rounded-3xl border border-slate-100 shadow-sm text-left hover:shadow-md transition-all group"
          >
            <span className="text-[9px] bg-teal-50 text-teal-600 px-2 py-1 rounded-lg font-black uppercase tracking-widest mb-3 inline-block">
              {content.category}
            </span>
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
            </header>
            <div className="p-8 max-w-2xl mx-auto space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] text-teal-600 font-black uppercase tracking-widest">{selectedContent?.category}</span>
                <h1 className="text-3xl font-black text-slate-900 leading-tight">{selectedContent?.title}</h1>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg">{selectedContent?.fullContent}</p>
            </div>
          </div>
        );
      case View.EXERCISES: 
        return (
          <div className="px-6 py-8 space-y-8 pb-32 animate-fade-zoom">
            <header>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Práticas</h1>
              <p className="text-slate-500 text-sm font-medium">Momentos de pausa</p>
            </header>
            <div className="space-y-4">
              {EXERCISES.map(ex => (
                <button
                  key={ex.id}
                  onClick={() => startExercise(ex)}
                  className="w-full flex items-center p-5 bg-white rounded-3xl border border-slate-100 shadow-sm text-left group hover:border-teal-100 transition-all"
                >
                  <div className={`p-4 rounded-2xl mr-4 ${ex.type === 'breathing' ? 'bg-blue-50 text-blue-500' : 'bg-purple-50 text-purple-500'}`}>
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
                <span className="font-bold text-slate-700">Privacidade</span>
                <ChevronRight size={18} className="text-slate-300" />
              </button>
              <button className="w-full p-5 text-left flex justify-between items-center text-red-500">
                <span className="font-bold">Sair</span>
                <LogOut size={18} />
              </button>
            </div>
            <div className="p-6 bg-slate-100 rounded-2xl">
              <p className="text-[10px] text-slate-400 uppercase font-black mb-2 tracking-widest">Aviso Legal</p>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Este aplicativo é uma ferramenta educativa de apoio ao bem-estar. Não substitui acompanhamento médico, psicológico ou terapêutico profissional.
              </p>
            </div>
          </div>
        );
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center">
      <div className="w-full max-w-lg min-h-screen relative shadow-2xl shadow-slate-200 bg-slate-50">
        {renderCurrentView()}
        {![View.BREATHING, View.CONTENT_DETAIL].includes(currentView) && (
          <Navigation currentView={currentView} setView={setCurrentView} />
        )}
      </div>
    </div>
  );
};

export default App;
