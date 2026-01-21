import React, { useState, useEffect } from 'react';
import { ChevronLeft, Play, Pause, RotateCcw, Volume2, Eye, Hand, MoveHorizontal, MoveVertical } from 'lucide-react';
import { ExerciseItem } from '../types';

interface BreathingPlayerProps {
  onBack: () => void;
  exercise: ExerciseItem;
}

const BreathingPlayer: React.FC<BreathingPlayerProps> = ({ onBack, exercise }) => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exercise.duration * 60);
  const [phase, setPhase] = useState<'inspire' | 'hold' | 'expire' | 'sounds' | 'colors' | 'sensations' | 'right' | 'left' | 'front'>('inspire');
  const [scale, setScale] = useState(1);

  // Mindfulness & Stretch logic
  useEffect(() => {
    if (isActive) {
      if (exercise.type === 'mindfulness') {
        if (timeLeft > 120) setPhase('sounds');
        else if (timeLeft > 60) setPhase('colors');
        else setPhase('sensations');
      } else if (exercise.type === 'stretch') {
        if (timeLeft > 40) setPhase('right');
        else if (timeLeft > 20) setPhase('left');
        else setPhase('front');
      }
    }
  }, [timeLeft, exercise.type, isActive]);

  useEffect(() => {
    let timer: any;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  // Breathing cycle logic
  useEffect(() => {
    let phaseTimer: any;
    if (isActive && exercise.type === 'breathing') {
      const runCycle = () => {
        setPhase('inspire');
        setScale(1.6);
        phaseTimer = setTimeout(() => {
          setPhase('hold');
          phaseTimer = setTimeout(() => {
            setPhase('expire');
            setScale(1);
          }, 4000);
        }, 4000);
      };
      
      runCycle();
      const interval = setInterval(runCycle, 12000);
      return () => {
        clearTimeout(phaseTimer);
        clearInterval(interval);
      };
    } else {
      setScale(1);
      if (exercise.type === 'breathing') setPhase('inspire');
    }
  }, [isActive, exercise.type]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderIcon = () => {
    if (exercise.type === 'breathing') return null;
    if (exercise.type === 'mindfulness') {
      if (phase === 'sounds') return <Volume2 size={48} className="text-white opacity-90" />;
      if (phase === 'colors') return <Eye size={48} className="text-white opacity-90" />;
      if (phase === 'sensations') return <Hand size={48} className="text-white opacity-90" />;
    }
    if (exercise.type === 'stretch') {
       if (phase === 'right' || phase === 'left') return <MoveHorizontal size={48} className="text-white opacity-90" />;
       if (phase === 'front') return <MoveVertical size={48} className="text-white opacity-90" />;
    }
    return null;
  };

  const getPhaseText = () => {
    if (!isActive) return 'PRONTO PARA COMEÇAR?';
    if (exercise.type === 'breathing') {
      return phase === 'inspire' ? 'Inspire' : phase === 'hold' ? 'Segure' : 'Expire';
    }
    if (exercise.type === 'mindfulness') {
      if (phase === 'sounds') return 'Foque em 3 Sons';
      if (phase === 'colors') return 'Foque em 3 Cores';
      if (phase === 'sensations') return 'Foque em 3 Sensações';
    }
    if (exercise.type === 'stretch') {
      if (phase === 'right') return 'Lado Direito';
      if (phase === 'left') return 'Lado Esquerdo';
      if (phase === 'front') return 'Para Frente';
    }
    return 'Respire';
  };

  const getInstruction = () => {
    if (!isActive) return 'Encontre uma posição confortável e relaxe os ombros.';
    if (exercise.type === 'mindfulness') {
      if (phase === 'sounds') return 'Feche os olhos se desejar e identifique três sons distintos ao seu redor.';
      if (phase === 'colors') return 'Abra os olhos e busque três cores diferentes que se destacam no ambiente.';
      if (phase === 'sensations') return 'Sinta o contato do seu corpo com a cadeira, a textura da sua roupa ou a temperatura do ar.';
    }
    if (exercise.type === 'stretch') {
      if (phase === 'right') return 'Incline suavemente a orelha direita em direção ao ombro direito. Sinta o alongamento lateral.';
      if (phase === 'left') return 'Incline suavemente a orelha esquerda em direção ao ombro esquerdo. Mantenha os ombros relaxados.';
      if (phase === 'front') return 'Deixe o queixo cair suavemente em direção ao peito. Respire fundo enquanto sente o alongamento da nuca.';
    }
    return 'Acompanhe o movimento suave e deixe sua mente se acalmar.';
  };

  const getColors = () => {
    // Screenshot uses purple theme for Pausa Consciente
    if (exercise.type === 'breathing') return { main: 'bg-blue-600', shadow: 'shadow-blue-900/10', light: 'bg-blue-50', med: 'bg-blue-100', text: 'text-blue-600' };
    if (exercise.type === 'mindfulness') return { main: 'bg-indigo-600', shadow: 'shadow-indigo-900/10', light: 'bg-indigo-50', med: 'bg-indigo-100', text: 'text-indigo-600' };
    return { main: 'bg-emerald-600', shadow: 'shadow-emerald-900/10', light: 'bg-emerald-50', med: 'bg-emerald-100', text: 'text-emerald-600' };
  };

  const colors = getColors();

  return (
    <div className="flex flex-col h-screen bg-slate-50 animate-fade-zoom overflow-hidden">
      <header className="p-6 flex items-center bg-white border-b border-slate-50">
        <button onClick={onBack} className="p-2 bg-slate-100 rounded-xl text-slate-500">
          <ChevronLeft size={20} />
        </button>
        <h1 className="flex-1 text-center font-bold text-slate-800 text-sm tracking-wide mr-8">{exercise.title}</h1>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center space-y-12 px-8">
        <div className="text-center space-y-2">
          <p className="text-6xl font-black text-slate-900 tracking-tighter">{formatTime(timeLeft)}</p>
          <p className={`uppercase tracking-[0.2em] text-[11px] font-black ${colors.text} opacity-70`}>
            {getPhaseText()}
          </p>
        </div>

        <div className="relative w-72 h-72 flex items-center justify-center">
          {/* Animated Background Rings */}
          <div 
            className={`absolute ${colors.light} rounded-full w-56 h-56 opacity-40`}
            style={{ transform: `scale(${scale * 1.3})`, transition: 'transform 4000ms cubic-bezier(0.4, 0, 0.2, 1)' }}
          ></div>
          <div 
            className={`absolute ${colors.med} rounded-full w-56 h-56 opacity-50`}
            style={{ transform: `scale(${scale * 1.15})`, transition: 'transform 4000ms cubic-bezier(0.4, 0, 0.2, 1)' }}
          ></div>
          
          {/* Main Breathing Circle */}
          <div 
            className={`${colors.main} rounded-full w-48 h-48 flex items-center justify-center shadow-2xl ${colors.shadow} transition-transform duration-[4000ms] cubic-bezier(0.4, 0, 0.2, 1)`}
            style={{ transform: `scale(${scale})` }}
          >
            {renderIcon()}
          </div>
        </div>

        <div className="flex space-x-4 items-center">
          <button 
            onClick={() => {
              setTimeLeft(exercise.duration * 60);
              setIsActive(false);
            }}
            className="p-5 rounded-3xl bg-slate-100 text-slate-400 hover:text-slate-600 transition-all"
          >
            <RotateCcw size={24} />
          </button>
          <button 
            onClick={() => setIsActive(!isActive)}
            className={`p-6 px-10 rounded-[2rem] text-white shadow-xl transition-all ${
              isActive ? 'bg-slate-900 shadow-slate-900/20' : colors.main + ' ' + colors.shadow
            }`}
          >
            {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
          </button>
        </div>
      </div>

      <div className="p-10 pb-16 text-center bg-white border-t border-slate-50 rounded-t-[3rem]">
        <p className="text-slate-500 text-sm leading-relaxed font-medium">
          {getInstruction()}
        </p>
      </div>
    </div>
  );
};

export default BreathingPlayer;