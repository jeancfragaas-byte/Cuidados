
import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  ChevronRight, 
  Info, 
  LogOut, 
  ExternalLink,
  Search,
  Book,
  Clock,
  PlayCircle
} from 'lucide-react';
import { View, ContentItem, ExerciseItem, Trail } from './types';
import { CATEGORIES, CONTENTS, EXERCISES, TRAILS } from './constants.tsx';
import Navigation from './components/Navigation';
import BreathingPlayer from './components/BreathingPlayer';
import { getDailyReflection } from './geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseItem | null>(null);
  const [dailyReflection, setDailyReflection] = useState<string>("Carregando sua reflexão do dia...");
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchReflection = async () => {
      const reflection = await getDailyReflection();
      setDailyReflection(reflection);
    };
    fetchReflection();
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
    <div className="px-6 py-8 space-y-8 pb-32">
      <header className="flex justify-between items-center opacity-0 animate-fade-zoom">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">SerSocial</h1>
          <p className="text-slate-500 text-base font-medium">Bem-estar Profissional</p>
        </div>
        <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-teal-600 hover:border-teal-100 transition-all shadow-sm">
          <Bell size={24} />
        </button>
      </header>

      {/* Daily Reflection Card */}
      <div className="bg-gradient-to-br from-teal-600 to-emerald-700 rounded-[2.5rem] p-10 text-white shadow-xl shadow-teal-900/10 opacity-0 animate-fade-zoom delay-100">
        <div className="flex items-center space-x-2.5 mb-6">
          <div className="bg-white/20 p-2 rounded-xl">
            <Info size={18} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest opacity-80">Reflexão do dia</span>
        </div>
        <p className="text-2xl md:text-3xl font-medium leading-relaxed italic mb-2">
          "{dailyReflection}"
        </p>
      </div>

      {/* Quick Access Grid */}
      <section className="space-y-6">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 opacity-0 animate-fade-zoom delay-200">Atalhos Rápidos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button 
            onClick={() => startExercise(EXERCISES[0])}
            className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-100 hover:scale-[1.02] transition-all group opacity-0 animate-fade-zoom delay-250"
          >
            <div className="bg-blue-50 p-5 rounded-2xl mb-4 text-blue-500 group-hover:scale-110 transition-transform">
              <Clock size={32} />
            </div>
            <span className="text-lg font-bold text-slate-800">Pausa Respiratória</span>
            <span className="text-sm text-slate-400 mt-1">Sessão de 1 min</span>
          </button>
          <button 
            onClick={() => setCurrentView(View.TRAILS)}
            className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-100 hover:scale-[1.02] transition-all group opacity-0 animate-fade-zoom delay-300"
          >
            <div className="bg-amber-50 p-5 rounded-2xl mb-4 text-amber-500 group-hover:scale-110 transition-transform">
              <PlayCircle size={32} />
            </div>
            <span className="text-lg font-bold text-slate-800">Trilhas de Cuidado</span>
            <span className="text-sm text-slate-400 mt-1">Sequências Educativas</span>
          </button>
        </div>
      </section>

      {/* Recommended Content */}
      <section className="space-y-6">
        <div className="flex justify-between items-center opacity-0 animate-fade-zoom delay-350">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Conteúdos Recomendados</h2>
          <button 
            onClick={() => setCurrentView(View.LIBRARY)}
            className="text-teal-600 text-sm font-bold uppercase tracking-wider hover:underline"
          >
            Explorar tudo
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CONTENTS.slice(0, 4).map((content, idx) => (
            <button
              key={content.id}
              onClick={() => navigateToContent(content)}
              className={`w-full flex items-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm text-left group hover:border-teal-100 hover:shadow-md hover:scale-[1.01] transition-all opacity-0 animate-fade-zoom delay-${400 + (idx * 50)}`}
            >
              <div className="bg-slate-50 p-4 rounded-2xl mr-5 text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                <Book size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-teal-600 font-bold uppercase tracking-wider mb-1 truncate">{content.category}</p>
                <h3 className="text-lg font-bold text-slate-800 truncate">{content.title}</h3>
              </div>
              <ChevronRight size={20} className="text-slate-300 ml-2 group-hover:text-teal-600" />
            </button>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-slate-100/50 rounded-3xl p-6 flex space-x-5 items-start border border-slate-200/50 opacity-0 animate-fade-zoom delay-500">
        <div className="bg-white p-2 rounded-xl shadow-sm">
          <span className="text-slate-400"><Info size={20} /></span>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed font-medium">
          <strong>Aviso Institucional:</strong> Este aplicativo é uma ferramenta de apoio ao bem-estar preventivo. Seu conteúdo é informativo e não substitui aconselhamentos clínicos especializados.
        </p>
      </div>
    </div>
  );

  const renderLibrary = () => (
    <div className="px-6 py-8 space-y-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Biblioteca</h1>
        <p className="text-slate-500 text-base font-medium">Educação para o Autocuidado Profissional</p>
      </header>

      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="O que você deseja aprender hoje?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-[2rem] py-5 pl-14 pr-6 text-base font-medium focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all shadow-sm"
          />
        </div>

        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
              !selectedCategory ? 'bg-teal-600 text-white shadow-lg shadow-teal-100' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Todos os Temas
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat ? 'bg-teal-600 text-white shadow-lg shadow-teal-100' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLibrary.length > 0 ? (
          filteredLibrary.map(content => (
            <button
              key={content.id}
              onClick={() => navigateToContent(content)}
              className="w-full p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm text-left hover:border-teal-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-5">
                  <span className="text-[10px] bg-teal-50 text-teal-600 px-3 py-1.5 rounded-xl font-extrabold uppercase tracking-widest">
                    {content.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center font-bold">
                    <Clock size={14} className="mr-1.5" /> {content.readTime}
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors">{content.title}</h3>
                <p className="text-slate-500 text-base leading-relaxed line-clamp-3 mb-6">{content.shortDescription}</p>
              </div>
              <div className="text-teal-600 font-bold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                Ler mais <ChevronRight size={16} className="ml-1" />
              </div>
            </button>
          ))
        ) : (
          <div className="col-span-full text-center py-24 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
            <Search className="mx-auto text-slate-200 mb-6" size={64} />
            <p className="text-slate-400 text-lg font-medium italic">Nenhum resultado para sua busca.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderContentDetail = () => {
    if (!selectedContent) return null;
    return (
      <div className="bg-white min-h-screen pb-32 animate-in fade-in duration-500">
        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 py-5 flex items-center border-b border-slate-100">
          <div className="max-w-5xl mx-auto w-full px-6 flex items-center">
            <button 
              onClick={() => setCurrentView(View.LIBRARY)}
              className="p-2.5 text-teal-600 bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors"
            >
              <ChevronRight size={24} className="rotate-180" />
            </button>
            <span className="ml-5 font-bold text-slate-900 text-lg truncate tracking-tight">{selectedContent.title}</span>
          </div>
        </div>
        <div className="max-w-4xl mx-auto p-8 md:p-12 space-y-8">
          <div className="space-y-4">
             <span className="text-xs bg-teal-50 text-teal-600 px-4 py-2 rounded-xl font-extrabold uppercase tracking-widest inline-block">
                {selectedContent.category}
              </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">{selectedContent.title}</h1>
            <div className="flex items-center text-slate-400 text-base font-medium">
              <Clock size={18} className="mr-2.5" /> Tempo estimado de leitura: {selectedContent.readTime}
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-50">
            <p className="text-slate-600 leading-relaxed text-xl whitespace-pre-wrap font-normal">
              {selectedContent.fullContent}
            </p>
          </div>
          
          <div className="pt-12 mt-8 border-t border-slate-100">
            <h4 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest mb-6">Integre com uma Prática</h4>
            <button 
              onClick={() => startExercise(EXERCISES[0])}
              className="w-full p-8 bg-teal-600 text-white rounded-[2.5rem] flex items-center justify-between shadow-xl shadow-teal-900/10 hover:bg-teal-700 transition-all group"
            >
              <div className="flex items-center space-x-6">
                <div className="bg-white/20 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                  <PlayCircle size={32} />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold text-white leading-none">Pausa Respiratória de 1 minuto</p>
                  <p className="text-sm text-teal-100 mt-2 opacity-80">Recomendado para consolidar sua pausa</p>
                </div>
              </div>
              <ChevronRight size={24} className="text-teal-200" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderExercises = () => (
    <div className="px-6 py-8 space-y-8 pb-32 animate-in fade-in duration-500">
      <header>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Práticas</h1>
        <p className="text-slate-500 text-base font-medium">Pausas Breves e Conscientes</p>
      </header>

      <section className="space-y-12">
        {[1, 3, 5].map(min => (
          <div key={min} className="space-y-6">
            <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-l-4 border-teal-500 pl-4">Práticas de {min} {min === 1 ? 'minuto' : 'minutos'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {EXERCISES.filter(ex => ex.duration === min).map(ex => (
                <button
                  key={ex.id}
                  onClick={() => startExercise(ex)}
                  className="w-full bg-slate-100/50 p-4 rounded-[2.5rem] text-left group hover:scale-[1.03] hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
                >
                  <div className="flex items-center bg-white p-4 rounded-[2rem] shadow-sm w-full border border-slate-100/50">
                    <div className={`p-4 rounded-2xl mr-4 flex-shrink-0 ${
                      ex.type === 'breathing' ? 'bg-blue-50 text-blue-600' : 
                      ex.type === 'stretch' ? 'bg-emerald-50 text-emerald-600' : 
                      'bg-purple-50 text-purple-600'
                    }`}>
                      {ex.type === 'breathing' || ex.type === 'mindfulness' ? <Clock size={24} /> : <Info size={24} />}
                    </div>
                    <div className="flex-1 min-w-0 pr-2">
                      <h4 className="text-base font-extrabold text-slate-900 truncate">{ex.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-medium leading-relaxed">{ex.description}</p>
                    </div>
                    {(ex.type === 'breathing' || ex.type === 'mindfulness') && (
                      <div className="text-slate-200 group-hover:text-teal-600 transition-colors pl-2">
                        <PlayCircle size={28} />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );

  const renderTrails = () => (
    <div className="px-6 py-8 space-y-8 pb-32 animate-in fade-in duration-500">
      <header className="flex items-center">
        <button onClick={() => setCurrentView(View.HOME)} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 mr-5 shadow-sm hover:bg-slate-50">
          <ChevronRight size={24} className="rotate-180" />
        </button>
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Trilhas</h1>
          <p className="text-slate-500 text-base font-medium">Jornadas Sequenciais de Bem-estar</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {TRAILS.map(trail => (
          <div key={trail.id} className="bg-white rounded-[3rem] border border-slate-100 shadow-lg overflow-hidden flex flex-col h-full hover:scale-[1.01] transition-transform">
            <div className="p-10 flex flex-col flex-1">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{trail.title}</h3>
              <p className="text-slate-500 text-base mb-8 leading-relaxed font-medium">{trail.description}</p>
              
              <div className="space-y-5 mb-10 flex-1">
                {trail.steps.map((stepId, index) => {
                  const content = CONTENTS.find(c => c.id === stepId);
                  const exercise = EXERCISES.find(e => e.id === stepId);
                  return (
                    <div key={index} className="flex items-center space-x-5 group">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-sm font-extrabold text-slate-400 border border-slate-100 group-hover:bg-teal-50 group-hover:text-teal-600 group-hover:border-teal-100 transition-all">
                        {index + 1}
                      </div>
                      <span className="text-base font-bold text-slate-700 truncate">{content?.title || exercise?.title}</span>
                    </div>
                  );
                })}
              </div>
              
              <button 
                onClick={() => startExercise(EXERCISES.find(e => e.id === trail.steps[1]) || EXERCISES[0])}
                className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-bold shadow-xl shadow-slate-900/10 hover:bg-teal-600 transition-all text-lg"
              >
                Iniciar Sequência
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="px-6 py-8 space-y-8 pb-32 animate-in fade-in duration-500">
      <header>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Ajustes</h1>
        <p className="text-slate-500 text-base font-medium">Configurações e Suporte</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-[0.2em]">Experiência</h3>
          </div>
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between p-5 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center space-x-5">
                <div className="bg-teal-50 p-3 rounded-2xl text-teal-600"><Bell size={24} /></div>
                <span className="font-bold text-slate-800 text-lg">Lembretes Automáticos</span>
              </div>
              <div className="w-14 h-8 bg-teal-600 rounded-full flex items-center px-1.5 shadow-inner">
                <div className="w-5 h-5 bg-white rounded-full translate-x-6 shadow-sm"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-[0.2em]">Institucional</h3>
          </div>
          <div className="p-4 space-y-2">
            {['Sobre o SerSocial', 'Política de Privacidade', 'Termos de Serviço'].map((item, idx) => (
              <button key={idx} className="w-full flex items-center justify-between p-5 rounded-2xl hover:bg-slate-50 transition-all">
                <div className="flex items-center space-x-5">
                  <div className="bg-slate-50 p-3 rounded-2xl text-slate-400"><Info size={24} /></div>
                  <span className="font-bold text-slate-800 text-lg">{item}</span>
                </div>
                <ChevronRight size={20} className="text-slate-300" />
              </button>
            ))}
          </div>
        </section>

        <div className="md:col-span-2 space-y-6">
          <button className="w-full flex items-center justify-center space-x-4 py-6 text-red-500 font-bold bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:bg-red-50 transition-all text-xl">
            <LogOut size={24} />
            <span>Encerrar Minha Sessão</span>
          </button>

          <div className="text-center space-y-2 py-6">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.3em]">SerSocial App — Versão 1.0.0</p>
            <p className="text-xs text-slate-300 font-medium italic">Plataforma Educativa para o Cuidado com o Profissional da Área Social</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case View.HOME: return renderHome();
      case View.LIBRARY: return renderLibrary();
      case View.CONTENT_DETAIL: return renderContentDetail();
      case View.EXERCISES: return renderExercises();
      case View.TRAILS: return renderTrails();
      case View.SETTINGS: return renderSettings();
      case View.BREATHING: return <BreathingPlayer exercise={selectedExercise || EXERCISES[0]} onBack={() => setCurrentView(View.EXERCISES)} />;
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative">
      <div className="min-h-screen overflow-y-auto">
        <div className={`max-w-5xl mx-auto w-full transition-all duration-700`}>
          {renderCurrentView()}
        </div>
      </div>
      {![View.BREATHING, View.CONTENT_DETAIL].includes(currentView) && (
        <Navigation currentView={currentView} setView={setCurrentView} />
      )}
    </div>
  );
};

export default App;
