import React from 'react';
import { useApp } from '../context/AppContext';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Zap } from 'lucide-react';

export const MiniTimerHUD: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    trainingSubTab,
    setTrainingSubTab,
    timerPhase,
    isTimerRunning,
    currentRound,
    totalRounds,
    secondsRemaining,
    startTimer,
    pauseTimer,
    soundEnabled,
    setSoundEnabled
  } = useApp();

  // Only render if timer is active and user is NOT currently inside the main timer view
  const isViewingMainTimer = activeTab === 'training' && trainingSubTab === 'timer';
  if (timerPhase === 'idle' || isViewingMainTimer) {
    return null;
  }

  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const timeStr = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;

  const handleOpenFullTimer = () => {
    setActiveTab('training');
    setTrainingSubTab('timer');
  };

  return (
    <aside
      aria-label="Active Round Timer HUD"
      className="fixed bottom-20 md:bottom-6 right-4 z-50 animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all ${
        timerPhase === 'work'
          ? 'bg-[#180a0e]/95 border-rose-600/80 shadow-rose-950/60'
          : timerPhase === 'rest'
          ? 'bg-[#0a141a]/95 border-cyan-500/80 shadow-cyan-950/60'
          : timerPhase === 'prep'
          ? 'bg-[#18150a]/95 border-amber-500/80 shadow-amber-950/60'
          : 'bg-[#0a180f]/95 border-emerald-500/80 shadow-emerald-950/60'
      }`}>
        {/* Clickable Area to jump into Timer */}
        <button
          type="button"
          onClick={handleOpenFullTimer}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          {/* Phase Badge */}
          <div className="flex flex-col items-start space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${
                isTimerRunning ? 'animate-ping' : ''
              } ${
                timerPhase === 'work'
                  ? 'bg-rose-500'
                  : timerPhase === 'rest'
                  ? 'bg-cyan-400'
                  : timerPhase === 'prep'
                  ? 'bg-amber-400'
                  : 'bg-emerald-400'
              }`} />
              <span className={`text-[10px] font-black uppercase tracking-wider ${
                timerPhase === 'work'
                  ? 'text-rose-400'
                  : timerPhase === 'rest'
                  ? 'text-cyan-300'
                  : timerPhase === 'prep'
                  ? 'text-amber-300'
                  : 'text-emerald-300'
              }`}>
                {timerPhase === 'work'
                  ? 'Fight'
                  : timerPhase === 'rest'
                  ? 'Rest'
                  : timerPhase === 'prep'
                  ? 'Prep'
                  : 'Done'}
              </span>
            </div>
            <div className="text-[11px] font-mono font-bold text-slate-400">
              R{currentRound}/{totalRounds}
            </div>
          </div>

          {/* Time digits */}
          <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white tabular-nums group-hover:text-rose-400 transition-colors">
            {timeStr}
          </div>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 pl-2 border-l border-white/10">
          <button
            onClick={() => (isTimerRunning ? pauseTimer() : startTimer())}
            className={`p-2 rounded-xl text-white transition-all shadow-md active:scale-95 ${
              isTimerRunning
                ? 'bg-amber-500 hover:bg-amber-400 text-black'
                : 'bg-rose-600 hover:bg-rose-500 text-white'
            }`}
            title={isTimerRunning ? 'Pause' : 'Resume'}
          >
            {isTimerRunning ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-black/40 hover:bg-black/60 text-slate-300 hover:text-white border border-white/10"
            title={soundEnabled ? 'Mute' : 'Unmute'}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-rose-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            )}
          </button>

          <button
            onClick={handleOpenFullTimer}
            className="p-2 rounded-xl bg-black/40 hover:bg-black/60 text-slate-300 hover:text-white border border-white/10"
            title="Open Full Screen Timer"
          >
            <Maximize2 className="w-3.5 h-3.5 text-slate-300" />
          </button>
        </div>
      </div>
    </aside>
  );
};
