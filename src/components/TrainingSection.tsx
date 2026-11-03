import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Discipline, TrainingSession } from '../types';
import { sound } from '../utils/audio';
import { FightGamePlanLab } from './FightGamePlanLab';
import { SparringScorecardView } from './SparringScorecardView';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Plus,
  Dumbbell,
  BookOpen,
  Calendar,
  Clock,
  Sparkles,
  Zap,
  Target,
  Shuffle,
  Activity,
  CheckCircle2,
  Scale,
  Brain,
  Mic,
  Bell
} from 'lucide-react';

export const TrainingSection: React.FC = () => {
  const {
    trainingSubTab,
    setTrainingSubTab,
    trainingSessions,
    logTrainingSession,
    techniques,
    viewTechnique,
    challenges,
    toggleChallengeComplete,
    // Centralized Persistent Timer Engine
    timerPhase,
    isTimerRunning,
    currentRound,
    totalRounds,
    roundMinutes,
    roundSeconds,
    restMinutes,
    restSeconds,
    prepSeconds,
    secondsRemaining,
    soundEnabled,
    setSoundEnabled,
    bellSoundType,
    setBellSoundType,
    coachCalloutsEnabled,
    setCoachCalloutsEnabled,
    backgroundNotificationsEnabled,
    requestNotificationPermission,
    startTimer,
    pauseTimer,
    resetTimer,
    applyTimerPreset,
    updateTimerConfig,
    showToast
  } = useApp();

  // Log session from timer completion
  const handleSaveTimerSession = () => {
    logTrainingSession({
      type: 'Timer',
      roundsCompleted: currentRound,
      durationMinutes: Math.round(((roundMinutes * 60 + roundSeconds) * currentRound) / 60) || 15,
      discipline: 'MMA',
      notes: `Completed ${currentRound} rounds of ${roundMinutes}:${roundSeconds < 10 ? '0' : ''}${roundSeconds} on FightLab timer.`,
      rpe: 8
    });
    showToast('Training session saved to your Fighter Journal!', 'success');
    setTrainingSubTab('journal');
  };

  // Format time mm:ss
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // ---------------------------------------------
  // SHADOWBOXING DRILLS & RANDOM GENERATOR STATE
  // ---------------------------------------------
  const [comboInterval, setComboInterval] = useState(5);
  const [comboIsRunning, setComboIsRunning] = useState(false);
  const [currentCombo, setCurrentCombo] = useState('1 - 2 (Jab - Cross) - Exit 45°');
  const comboTimerRef = useRef<any>(null);

  const curatedCombos = [
    '1 - 2 (Jab - Cross) - Slip Right - Rear Cross',
    '1 - 1 - 2 (Double Jab - Cross) - Rear Low Kick',
    '1 - 2 - Lead Hook (1-2-3) - Lead Foot Pivot 90°',
    'Jab - Level Change Feint - Overhand Right',
    'Switch Kick - Cross - Lead Hook - Sprawl',
    'Slip Left - Lead Hook Body - Lead Hook Head - Step Out',
    '1 - 2 - Underhook Entry - Knee Strike to Body',
    'Teep Push Kick - Fake Teep - Flying Knee Entry'
  ];

  const handleNextRandomCombo = () => {
    const rand = curatedCombos[Math.floor(Math.random() * curatedCombos.length)];
    setCurrentCombo(rand);
    if (soundEnabled) sound.playTick(true);
  };

  useEffect(() => {
    if (comboIsRunning) {
      comboTimerRef.current = setInterval(() => {
        handleNextRandomCombo();
      }, comboInterval * 1000);
    } else {
      clearInterval(comboTimerRef.current);
    }
    return () => clearInterval(comboTimerRef.current);
  }, [comboIsRunning, comboInterval, soundEnabled]);

  // Random technique flashcard
  const [randomTechIndex, setRandomTechIndex] = useState(0);
  const currentRandomTech = techniques[randomTechIndex] || techniques[0];

  const rollRandomTechnique = () => {
    const nextIdx = Math.floor(Math.random() * techniques.length);
    setRandomTechIndex(nextIdx);
  };

  // ---------------------------------------------
  // TRAINING JOURNAL FORM STATE
  // ---------------------------------------------
  const [journalType, setJournalType] = useState<TrainingSession['type']>('Timer');
  const [journalDiscipline, setJournalDiscipline] = useState<Discipline>('MMA');
  const [journalRounds, setJournalRounds] = useState(5);
  const [journalMinutes, setJournalMinutes] = useState(30);
  const [journalRpe, setJournalRpe] = useState(7);
  const [journalNotes, setJournalNotes] = useState('');

  const handleLogManualSession = (e: React.FormEvent) => {
    e.preventDefault();
    logTrainingSession({
      type: journalType,
      discipline: journalDiscipline,
      roundsCompleted: Number(journalRounds),
      durationMinutes: Number(journalMinutes),
      rpe: Number(journalRpe),
      notes: journalNotes || 'Logged training session.'
    });
    setJournalNotes('');
    showToast('Workout logged successfully!', 'success');
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Sub-tab Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold font-heading uppercase text-white tracking-wide">
            MMA Training & Combat Timer
          </h1>
          <div className="text-xs text-slate-400">
            Official round timer, shadowbox combo callers, and fighter training journal
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#12151f] rounded-xl border border-slate-800">
          <button
            onClick={() => setTrainingSubTab('timer')}
            className={`min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              trainingSubTab === 'timer'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Timer className="w-4 h-4" />
            <span>Round Timer</span>
          </button>

          <button
            onClick={() => setTrainingSubTab('drills')}
            className={`min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              trainingSubTab === 'drills'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Drills & Combos</span>
          </button>

          <button
            onClick={() => setTrainingSubTab('gameplan')}
            className={`min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              trainingSubTab === 'gameplan'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>Game Plan Lab</span>
          </button>

          <button
            onClick={() => setTrainingSubTab('scorecard')}
            className={`min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              trainingSubTab === 'scorecard'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Scorecard</span>
          </button>

          <button
            onClick={() => setTrainingSubTab('journal')}
            className={`min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              trainingSubTab === 'journal'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Journal</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SUBTAB 1: ROUND TIMER */}
      {/* ========================================================= */}
      {trainingSubTab === 'timer' && (
        <div className="space-y-8">
          {/* Main Giant Timer Display */}
          <div className={`relative overflow-hidden rounded-3xl border p-8 sm:p-12 text-center transition-all shadow-2xl ${
            timerPhase === 'work'
              ? 'bg-gradient-to-b from-[#180a0e] via-[#10121a] to-[#0a0b0e] border-rose-600/70 shadow-rose-950/30'
              : timerPhase === 'rest'
              ? 'bg-gradient-to-b from-[#0a141a] via-[#10121a] to-[#0a0b0e] border-cyan-500/70 shadow-cyan-950/30'
              : timerPhase === 'prep'
              ? 'bg-gradient-to-b from-[#18150a] via-[#10121a] to-[#0a0b0e] border-amber-500/70 shadow-amber-950/30'
              : timerPhase === 'finished'
              ? 'bg-gradient-to-b from-[#0a180f] via-[#10121a] to-[#0a0b0e] border-emerald-500/70 shadow-emerald-950/30'
              : 'bg-[#10131d] border-slate-800'
          }`}>
            {/* Phase Badge */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-widest ${
                timerPhase === 'work'
                  ? 'bg-rose-600 text-white'
                  : timerPhase === 'rest'
                  ? 'bg-cyan-500 text-black'
                  : timerPhase === 'prep'
                  ? 'bg-amber-500 text-black animate-pulse'
                  : timerPhase === 'finished'
                  ? 'bg-emerald-500 text-black'
                  : 'bg-slate-800 text-slate-300'
              }`}>
                {timerPhase === 'work'
                  ? 'FIGHT ROUND ACTIVE'
                  : timerPhase === 'rest'
                  ? 'REST PERIOD (BREATHE)'
                  : timerPhase === 'prep'
                  ? 'PREPARE TO FIGHT'
                  : timerPhase === 'finished'
                  ? 'WORKOUT COMPLETE'
                  : 'READY TO START'}
              </span>

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-lg bg-black/40 text-slate-300 hover:text-white border border-white/10"
                title={soundEnabled ? 'Mute audio cues' : 'Enable audio cues'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-rose-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>

            {/* Current Round Indicator */}
            <div className="text-sm sm:text-base font-bold uppercase tracking-widest text-slate-400 mb-2 font-heading">
              Round <span className="text-white text-xl sm:text-2xl tabular-nums">{currentRound}</span> of <span className="text-white tabular-nums">{totalRounds}</span>
            </div>

            {/* Huge Digital Timer Digits */}
            <div className="text-7xl sm:text-9xl font-black font-mono tracking-tight tabular-nums text-white select-none my-4">
              {formatTime(secondsRemaining)}
            </div>

            {/* Active Round Controls */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
              {!isTimerRunning ? (
                <button
                  onClick={startTimer}
                  className="px-8 py-3.5 bg-rose-600 hover:bg-rose-500 text-white text-sm font-black uppercase tracking-wider rounded-xl shadow-xl shadow-rose-950/60 transition-all flex items-center gap-2 active:scale-95"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>{timerPhase === 'idle' ? 'Start Round Timer' : 'Resume'}</span>
                </button>
              ) : (
                <button
                  onClick={pauseTimer}
                  className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black text-sm font-black uppercase tracking-wider rounded-xl shadow-xl transition-all flex items-center gap-2 active:scale-95"
                >
                  <Pause className="w-5 h-5 fill-current" />
                  <span>Pause Timer</span>
                </button>
              )}

              <button
                onClick={resetTimer}
                className="px-6 py-3.5 bg-[#181c28] hover:bg-[#232733] text-slate-300 border border-slate-700 text-sm font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>

              {(timerPhase === 'finished' || currentRound > 1) && (
                <button
                  onClick={handleSaveTimerSession}
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 active:scale-95 shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save to Journal</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Presets Strip */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Championship Presets
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => applyTimerPreset(3, 0, 1, 0, 12)}
                className="p-4 bg-[#12151f] hover:bg-[#181c28] border border-slate-800 rounded-xl text-left transition-colors group"
              >
                <div className="text-[11px] font-bold text-rose-400 uppercase">Boxing Pro</div>
                <div className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">12 Rds × 3:00</div>
                <div className="text-[11px] text-slate-400">1:00 Rest Period</div>
              </button>

              <button
                onClick={() => applyTimerPreset(5, 0, 1, 0, 5)}
                className="p-4 bg-[#12151f] hover:bg-[#181c28] border border-slate-800 rounded-xl text-left transition-colors group"
              >
                <div className="text-[11px] font-bold text-rose-400 uppercase">MMA Title Fight</div>
                <div className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">5 Rds × 5:00</div>
                <div className="text-[11px] text-slate-400">1:00 Championship Rest</div>
              </button>

              <button
                onClick={() => applyTimerPreset(2, 0, 1, 0, 5)}
                className="p-4 bg-[#12151f] hover:bg-[#181c28] border border-slate-800 rounded-xl text-left transition-colors group"
              >
                <div className="text-[11px] font-bold text-rose-400 uppercase">Muay Thai</div>
                <div className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">5 Rds × 2:00</div>
                <div className="text-[11px] text-slate-400">1:00 Rest Period</div>
              </button>

              <button
                onClick={() => applyTimerPreset(1, 0, 0, 30, 8)}
                className="p-4 bg-[#12151f] hover:bg-[#181c28] border border-slate-800 rounded-xl text-left transition-colors group"
              >
                <div className="text-[11px] font-bold text-rose-400 uppercase">HIIT Conditioning</div>
                <div className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">8 Rds × 1:00</div>
                <div className="text-[11px] text-slate-400">0:30 Explosive Rest</div>
              </button>
            </div>
          </div>

          {/* Custom Configuration Controls */}
          <div className="bg-[#12151f] border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Customize Durations
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Background Persistent: Clock continues even if you switch apps or lock screen</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-slate-300 font-semibold">
                  Round Duration (Mins)
                </label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  disabled={isTimerRunning}
                  value={roundMinutes}
                  onChange={(e) => updateTimerConfig({ roundMinutes: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-[#0a0b0e] border border-slate-800 rounded-lg text-sm text-white font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-300 font-semibold">
                  Rest Duration (Mins)
                </label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  disabled={isTimerRunning}
                  value={restMinutes}
                  onChange={(e) => updateTimerConfig({ restMinutes: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-[#0a0b0e] border border-slate-800 rounded-lg text-sm text-white font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-300 font-semibold">
                  Number of Rounds
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  disabled={isTimerRunning}
                  value={totalRounds}
                  onChange={(e) => updateTimerConfig({ totalRounds: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-[#0a0b0e] border border-slate-800 rounded-lg text-sm text-white font-mono"
                />
              </div>
            </div>

            {/* Audio Profile & Corner Coach Callouts */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Bell className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Round Bell Sound:</span>
                <div className="flex items-center gap-1">
                  {(['brass', 'horn', 'double'] as const).map((bType) => (
                    <button
                      key={bType}
                      onClick={() => {
                        setBellSoundType(bType);
                        if (soundEnabled) {
                          if (bType === 'horn') sound.playTitleFightHorn();
                          else if (bType === 'double') sound.playDoubleBell();
                          else sound.playRoundBell();
                        }
                      }}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg capitalize transition-colors ${
                        bellSoundType === bType
                          ? 'bg-rose-600 text-white'
                          : 'bg-[#181c28] text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {bType === 'brass' ? 'Brass Chime' : bType === 'horn' ? 'Octagon Horn' : 'Double Strike'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setCoachCalloutsEnabled(!coachCalloutsEnabled)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 border ${
                    coachCalloutsEnabled
                      ? 'bg-rose-950/40 text-rose-300 border-rose-800'
                      : 'bg-[#181c28] text-slate-500 border-slate-800'
                  }`}
                  title="Spoken audio callouts for round start, 30s remaining, and round recovery"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Corner Voice Calls: {coachCalloutsEnabled ? 'ON' : 'OFF'}</span>
                </button>

                <button
                  onClick={requestNotificationPermission}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 border ${
                    backgroundNotificationsEnabled
                      ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800'
                      : 'bg-[#181c28] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                  title="Receive desktop/device notifications when rounds end in the background"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>{backgroundNotificationsEnabled ? 'Background Alerts: ON' : 'Enable Device Alerts'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 2: DRILLS & FOOTWORK */}
      {/* ========================================================= */}
      {trainingSubTab === 'drills' && (
        <div className="space-y-8">
          {/* Shadowboxing Combo Caller */}
          <div className="bg-[#10131d] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-wider">
                  <Zap className="w-4 h-4" />
                  <span>Dynamic Striking Combination Caller</span>
                </div>
                <h2 className="text-2xl font-extrabold font-heading uppercase text-white mt-1">
                  Automatic Combo Caller
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Cadence:</span>
                {[3, 5, 8].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => setComboInterval(sec)}
                    className={`px-3 py-1 rounded text-xs font-bold ${
                      comboInterval === sec ? 'bg-rose-600 text-white' : 'bg-[#181c28] text-slate-400'
                    }`}
                  >
                    {sec}s
                  </button>
                ))}
              </div>
            </div>

            {/* Combo Display Card */}
            <div className="p-8 bg-[#0a0b0e] border border-rose-900/40 rounded-2xl text-center space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-rose-400">
                Execute Combo Now:
              </div>
              <div className="text-2xl sm:text-4xl font-extrabold font-heading uppercase text-white tracking-wide">
                {currentCombo}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setComboIsRunning(!comboIsRunning)}
                className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg ${
                  comboIsRunning
                    ? 'bg-amber-500 hover:bg-amber-400 text-black'
                    : 'bg-rose-600 hover:bg-rose-500 text-white'
                }`}
              >
                {comboIsRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{comboIsRunning ? 'Pause Cadence' : 'Start Auto Caller'}</span>
              </button>

              <button
                onClick={handleNextRandomCombo}
                className="px-5 py-3 bg-[#181c28] hover:bg-[#232733] text-slate-200 border border-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <Shuffle className="w-4 h-4" />
                <span>Next Combo</span>
              </button>
            </div>
          </div>

          {/* Random Technique Flashcard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#10131d] border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  Technique Flashcard Generator
                </div>
                <button
                  onClick={rollRandomTechnique}
                  className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Roll Next</span>
                </button>
              </div>

              <div className="p-4 bg-[#141824] border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-rose-400 uppercase">{currentRandomTech.discipline}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-slate-400">{currentRandomTech.category}</span>
                </div>
                <h3 className="text-xl font-bold font-heading uppercase text-white">
                  {currentRandomTech.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentRandomTech.description}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => viewTechnique(currentRandomTech.id)}
                    className="text-xs font-bold uppercase tracking-wider text-rose-400 hover:underline"
                  >
                    Open Step-by-Step Breakdown &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* Footwork & Agility Exercises */}
            <div className="bg-[#10131d] border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Essential MMA Footwork Drills
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-[#141824] border border-slate-800 rounded-xl space-y-1">
                  <div className="font-bold text-xs text-white">1. Pendulum Step Distance Reset</div>
                  <div className="text-[11px] text-slate-400">
                    Bounce in 50/50 rhythm, pushing off back foot to enter range, springing off front foot to exit immediately outside opponent jab range.
                  </div>
                </div>

                <div className="p-3 bg-[#141824] border border-slate-800 rounded-xl space-y-1">
                  <div className="font-bold text-xs text-white">2. Lead Pivot 90-Degree Compass Cut</div>
                  <div className="text-[11px] text-slate-400">
                    Fix lead foot ball, swing rear leg in 90-degree arc while throwing check hook, depriving rushing opponents of their forward runway.
                  </div>
                </div>

                <div className="p-3 bg-[#141824] border border-slate-800 rounded-xl space-y-1">
                  <div className="font-bold text-xs text-white">3. Agility Ladder Lateral Shuffles</div>
                  <div className="text-[11px] text-slate-400">
                    Step 2 feet in, 2 feet out laterally without crossing feet. Build ankle strength and reactive takedown defense agility.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 3: TRAINING JOURNAL */}
      {/* ========================================================= */}
      {trainingSubTab === 'journal' && (
        <div className="space-y-8">
          {/* Manual Workout Log Form */}
          <div className="bg-[#10131d] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h2 className="text-2xl font-extrabold font-heading uppercase text-white tracking-wide">
              Log Combat Training Session
            </h2>

            <form onSubmit={handleLogManualSession} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Session Type</label>
                  <select
                    value={journalType}
                    onChange={(e) => setJournalType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#0a0b0e] border border-slate-800 rounded-lg text-xs text-white"
                  >
                    <option value="Timer">Round Timer</option>
                    <option value="Shadowbox">Shadowboxing</option>
                    <option value="Technique Drill">Technique Drill</option>
                    <option value="Sparring">Hard Sparring</option>
                    <option value="BJJ Roll">BJJ Rolling</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Discipline</label>
                  <select
                    value={journalDiscipline}
                    onChange={(e) => setJournalDiscipline(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#0a0b0e] border border-slate-800 rounded-lg text-xs text-white"
                  >
                    <option value="MMA">MMA</option>
                    <option value="Boxing">Boxing</option>
                    <option value="Muay Thai">Muay Thai</option>
                    <option value="Wrestling">Wrestling</option>
                    <option value="BJJ">BJJ</option>
                    <option value="Judo / Sambo">Judo / Sambo</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Rounds Completed</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={journalRounds}
                    onChange={(e) => setJournalRounds(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#0a0b0e] border border-slate-800 rounded-lg text-xs text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Effort Score (RPE 1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={journalRpe}
                    onChange={(e) => setJournalRpe(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#0a0b0e] border border-slate-800 rounded-lg text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Session Notes & Technical Cues</label>
                <textarea
                  rows={3}
                  value={journalNotes}
                  onChange={(e) => setJournalNotes(e.target.value)}
                  placeholder="e.g. Worked underhook dogfight sweeps, keeping head tucked under opponent chin. Defended 4 single leg shots."
                  className="w-full px-3 py-2 bg-[#0a0b0e] border border-slate-800 rounded-lg text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-all active:scale-95"
              >
                Save Workout Entry
              </button>
            </form>
          </div>

          {/* Past Sessions Feed */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-heading uppercase text-white tracking-wide">
              Training Session History ({trainingSessions.length})
            </h3>

            <div className="space-y-3">
              {trainingSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-5 bg-[#12151f] border border-slate-800 rounded-xl space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-0.5 rounded bg-rose-950/70 border border-rose-900/50 text-rose-400 text-[11px] font-bold uppercase">
                        {session.discipline}
                      </span>
                      <span className="font-bold text-sm text-white">{session.type}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-xs text-slate-400">{session.date}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-300">
                      <span className="font-semibold text-rose-400 tabular-nums">
                        {session.roundsCompleted} Rounds
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>RPE {session.rpe}/10</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {session.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 4: GAME PLAN LAB & FIGHT SIMULATOR */}
      {/* ========================================================= */}
      {trainingSubTab === 'gameplan' && <FightGamePlanLab />}

      {/* ========================================================= */}
      {/* SUBTAB 5: UNIFIED MMA RULES SPARRING SCORECARD */}
      {/* ========================================================= */}
      {trainingSubTab === 'scorecard' && <SparringScorecardView />}
    </div>
  );
};
