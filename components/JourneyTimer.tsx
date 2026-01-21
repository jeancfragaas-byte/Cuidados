import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Play, Pause, Square, Clock, AlertCircle, Info } from 'lucide-react';

interface JourneyTimerProps {
  onBack: () => void;
}

type TimerStatus = 'idle' | 'running' | 'paused' | 'ended';

const JourneyTimer: React.FC<JourneyTimerProps> = ({ onBack }) => {
  const [status, setStatus] = useState<TimerStatus>(() => {
    return (localStorage.getItem('sersocial_timer_status') as TimerStatus) || 'idle';
  });
  const [elapsed, setElapsed] = useState<number>(() => {
    return parseInt(localStorage.getItem('sersocial_timer_elapsed') || '0', 10);
  });
  const [lastTick, setLastTick] = useState<number | null>(() => {
    const saved = localStorage.getItem('sersocial_timer_last_tick');
    return saved ? parseInt(saved, 10) : null;
  });

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (status === 'running') {
      timerRef.current = window.setInterval(() => {
        setElapsed((prev) => {
          const next = prev + 1;
          localStorage.setItem('sersocial_timer_elapsed', next.toString());
          return next;
        });
        localStorage.setItem('sersocial_timer_last_tick', Date.now().toString());
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status]);

  // Recupera tempo perdido se o app foi fechado enquanto rodava
  useEffect(() => {
    if (status === 'running' && lastTick) {
      const now = Date.now();
      const diff = Math.floor((now - lastTick) / 1000);
      if (diff > 0) {
        setElapsed((prev) => prev + diff);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sersocial_timer_status', status);
  }, [status]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startJourney = () => setStatus('running');
  const pauseJourney = () => setStatus('paused');
  const endJourney = () => {
    if (confirm('Deseja encerrar a jornada de hoje? O tempo será zerado.')) {
      setStatus('idle');
      setElapsed(0);
      localStorage.removeItem('sersocial_timer_elapsed');
      localStorage.removeItem('sersocial_timer_last_tick');
    }
  };

  // Alerta de pausa sugerida a cada 2 horas (7200 segundos)
  const showPauseAlert = elapsed > 0 && elapsed % 7200 < 300 && elapsed >= 7200;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 animate-fade-zoom overflow-hidden">
      <header className="p-6 flex items-center bg-white border-b border-slate-100">
        <button onClick={onBack} className="p-2 bg-slate-50 rounded-xl text-slate-500">
          <ChevronLeft size={20} />
        </button>
        <h1 className="flex-1 text-center font-bold text-slate-800 text-sm tracking-wide mr-8 uppercase">Cronômetro de Jornada</h1>
      </header>

      <div className="flex-1 p-8 flex flex-col items-center justify-center space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full border border-slate-100 shadow-sm">
            <div className={`w-2 h-2 rounded-full ${status === 'running' ? 'bg-teal-500 animate-pulse' : status === 'paused' ? 'bg-amber-500' : 'bg-slate-300'}`} />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              {status === 'running' ? 'Jornada em andamento' : status === 'paused' ? 'Jornada pausada' : status === 'idle' ? 'Aguardando início' : 'Jornada encerrada'}
            </span>
          </div>
          <h2 className="text-7xl font-black text-slate-900 tracking-tighter tabular-nums">
            {formatTime(elapsed)}
          </h2>
        </div>

        {showPauseAlert && status === 'running' && (
          <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-center space-x-3 animate-bounce">
            <AlertCircle className="text-amber-500" size={20} />
            <p className="text-xs font-bold text-amber-800">Considere realizar uma pausa. Jornada prolongada.</p>
          </div>
        )}

        <div className="flex space-x-6 items-center">
          {status === 'idle' ? (
            <button 
              onClick={startJourney}
              className="flex flex-col items-center justify-center w-24 h-24 rounded-full bg-teal-600 text-white shadow-xl shadow-teal-900/20 hover:scale-105 transition-all"
            >
              <Play size={32} fill="currentColor" />
              <span className="text-[9px] font-bold uppercase mt-1">Iniciar</span>
            </button>
          ) : (
            <>
              {status === 'running' ? (
                <button 
                  onClick={pauseJourney}
                  className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-amber-500 text-white shadow-lg shadow-amber-900/10 hover:scale-105 transition-all"
                >
                  <Pause size={28} fill="currentColor" />
                  <span className="text-[9px] font-bold uppercase mt-1">Pausar</span>
                </button>
              ) : (
                <button 
                  onClick={startJourney}
                  className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-teal-600 text-white shadow-lg shadow-teal-900/10 hover:scale-105 transition-all"
                >
                  <Play size={28} fill="currentColor" />
                  <span className="text-[9px] font-bold uppercase mt-1">Retomar</span>
                </button>
              )}
              
              <button 
                onClick={endJourney}
                className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-slate-900 text-white shadow-lg shadow-slate-900/10 hover:scale-105 transition-all"
              >
                <Square size={24} fill="currentColor" />
                <span className="text-[9px] font-bold uppercase mt-1">Encerrar</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="p-8 pb-12 bg-white rounded-t-[3rem] shadow-[0_-10px_30px_rgba(0,0,0,0.02)] space-y-6">
        <div className="flex items-start space-x-4">
          <div className="bg-slate-50 p-3 rounded-2xl text-slate-400">
            <Info size={20} />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Uso Orientativo</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Esta é uma ferramenta de auxílio à organização pessoal do tempo de trabalho. Não substitui o controle formal de ponto ou sistemas institucionais.
            </p>
          </div>
        </div>

        <div className="bg-teal-50/50 p-4 rounded-2xl">
          <p className="text-[10px] text-teal-700/70 font-bold uppercase mb-2">Privacidade</p>
          <p className="text-[11px] text-teal-800/80 leading-relaxed">
            Seus dados de jornada são armazenados apenas localmente no seu dispositivo e não são compartilhados com terceiros ou gestores.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JourneyTimer;