import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  OPPONENT_ARCHETYPES,
  DEFAULT_GAME_PLANS,
  FIGHT_SIM_SCENARIOS,
  APP_IMAGES
} from '../data/mmaData';
import {
  OpponentArchetype,
  FightGamePlan,
  FightSimScenario
} from '../types';
import {
  Shield,
  Swords,
  Target,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Compass,
  Zap,
  ArrowRight,
  TrendingUp,
  Brain,
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';

export const FightGamePlanLab: React.FC = () => {
  const { profile, setActiveTab, setTrainingSubTab, viewTechnique } = useApp();

  const [selectedArchetype, setSelectedArchetype] = useState<OpponentArchetype>(OPPONENT_ARCHETYPES[0]);
  const [opponentStance, setOpponentStance] = useState<'Orthodox' | 'Southpaw'>('Orthodox');
  const [userStance, setUserStance] = useState<'Orthodox' | 'Southpaw' | 'Switch'>(profile.stance || 'Orthodox');
  const [fighterNotes, setFighterNotes] = useState('');
  
  // Active Game Plan
  const [activePlan, setActivePlan] = useState<FightGamePlan>(
    DEFAULT_GAME_PLANS['arch-wrestler'] || DEFAULT_GAME_PLANS[Object.keys(DEFAULT_GAME_PLANS)[0]]
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeRoundTab, setActiveRoundTab] = useState<number>(1);

  // Sparring Simulator State
  const [simScenarioIndex, setSimScenarioIndex] = useState(0);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);
  const [userFightIqScore, setUserFightIqScore] = useState(0);
  const [scenariosCompleted, setScenariosCompleted] = useState<number[]>([]);

  const currentScenario: FightSimScenario = FIGHT_SIM_SCENARIOS[simScenarioIndex] || FIGHT_SIM_SCENARIOS[0];

  const handleSelectArchetype = (arch: OpponentArchetype) => {
    setSelectedArchetype(arch);
    const existing = DEFAULT_GAME_PLANS[arch.id];
    if (existing) {
      setActivePlan(existing);
    } else {
      setActivePlan({
        id: `gp-${arch.id}`,
        archetypeId: arch.id,
        archetypeName: arch.name,
        fighterStance: userStance,
        opponentStance: opponentStance,
        winCondition: `Dictate pace against the ${arch.name} by attacking openings in their ${arch.style} stance.`,
        distanceManagement: 'Maintain long range and cut angles to avoid their primary weapons.',
        cageStrategy: 'Control center octagon; keep your back at least 4 feet away from the fence.',
        roundPlans: [
          {
            round: 1,
            objective: 'Download rhythm, establish low calf kick range, and test defense.',
            strikingFocus: 'High volume probing jabs, front teeps to midsection.',
            grapplingFocus: 'Sprawl immediately on level changes; fight head position.',
            dangerAlert: `Respect their primary weapon: ${arch.primaryWeapons[0] || 'heavy attacks'}.`
          },
          {
            round: 2,
            objective: 'Accelerate combinations; exploit defensive holes.',
            strikingFocus: '1-2 down the pipe into 90-degree lateral pivot.',
            grapplingFocus: 'Attack reactive takedowns or underhook control against the cage.',
            dangerAlert: 'Do not drop hands when exiting exchanges.'
          },
          {
            round: 3,
            objective: 'Championship round push: relentless output and secure dominant rounds.',
            strikingFocus: 'Level change feints into power overhands.',
            grapplingFocus: 'Pass to side control or take the back to run the clock.',
            dangerAlert: 'Watch for desperation wild swings in the final minute.'
          }
        ],
        keyCombinations: [
          'Lead Jab - Outside Calf Kick - Pivot 90',
          'Level-Change Feint - Overhand Right',
          'Check Hook on Pivot - Straight Cross'
        ],
        defensiveChecklist: [
          'High rear guard glued to cheekbone at all times',
          'Instant sprawl reflex: kick hips to canvas on shots',
          'Circle off the cage immediately upon contact',
          'Forehead pressed under opponent chin in clinches'
        ]
      });
    }
  };

  const handleGenerateAiPlan = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/gameplan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          opponentArchetype: selectedArchetype,
          opponentStance,
          userStance,
          userDiscipline: profile.preferredDiscipline,
          fighterNotes
        })
      });

      const data = await response.json();
      if (data && data.roundPlans) {
        setActivePlan({
          id: `gp-${Date.now()}`,
          archetypeId: selectedArchetype.id,
          archetypeName: selectedArchetype.name,
          fighterStance: userStance,
          opponentStance: opponentStance,
          winCondition: data.winCondition || activePlan.winCondition,
          distanceManagement: data.distanceManagement || activePlan.distanceManagement,
          cageStrategy: data.cageStrategy || activePlan.cageStrategy,
          roundPlans: data.roundPlans || activePlan.roundPlans,
          keyCombinations: data.keyCombinations || activePlan.keyCombinations,
          defensiveChecklist: data.defensiveChecklist || activePlan.defensiveChecklist
        });
      }
    } catch (err) {
      console.error('Failed to generate AI gameplan:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSimChoice = (index: number) => {
    if (selectedChoiceIndex !== null) return;
    setSelectedChoiceIndex(index);
    const choice = currentScenario.choices[index];
    if (choice) {
      setUserFightIqScore((prev) => prev + choice.fightIqPoints);
      if (!scenariosCompleted.includes(simScenarioIndex)) {
        setScenariosCompleted([...scenariosCompleted, simScenarioIndex]);
      }
    }
  };

  const handleNextScenario = () => {
    setSelectedChoiceIndex(null);
    if (simScenarioIndex < FIGHT_SIM_SCENARIOS.length - 1) {
      setSimScenarioIndex(simScenarioIndex + 1);
    } else {
      setSimScenarioIndex(0);
    }
  };

  const activeRound = activePlan.roundPlans.find((r) => r.round === activeRoundTab) || activePlan.roundPlans[0];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#10131d] p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-widest">
          <Brain className="w-4 h-4" />
          <span>Combat Intelligence & Fight IQ Center</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-heading uppercase text-white tracking-wide mt-1">
          Tactical Game Plan Lab
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
          Select an opponent archetype to generate an official 3-round strategic blueprint. Study distance management, cage defense, winning combinations, and test your split-second decisions in the tactical sparring simulator.
        </p>
      </div>

      {/* Archetype Selector Strip */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Target className="w-4 h-4 text-rose-500" />
          <span>Select Opponent Fighter Archetype</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {OPPONENT_ARCHETYPES.map((arch) => {
            const isSelected = arch.id === selectedArchetype.id;
            return (
              <div
                key={arch.id}
                onClick={() => handleSelectArchetype(arch)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-rose-950/30 border-rose-600 ring-2 ring-rose-600/30 shadow-lg'
                    : 'bg-[#12151f] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-rose-400 uppercase">{arch.style}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    )}
                  </div>
                  <div className="font-bold text-sm text-white font-heading uppercase">
                    {arch.name}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-2 leading-snug">
                    {arch.tagline}
                  </div>
                </div>
                <div className="pt-2 text-[10px] text-slate-500 flex items-center gap-1 font-semibold">
                  <span>Inspect Blueprint &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Matchup Configurations Bar */}
      <div className="p-4 bg-[#12151f] border border-slate-800 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold">Your Stance:</span>
            <select
              value={userStance}
              onChange={(e) => setUserStance(e.target.value as any)}
              className="px-2.5 py-1.5 bg-[#0a0b0e] border border-slate-800 rounded-lg text-white font-semibold"
            >
              <option value="Orthodox">Orthodox</option>
              <option value="Southpaw">Southpaw</option>
              <option value="Switch">Switch</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold">Opponent Stance:</span>
            <select
              value={opponentStance}
              onChange={(e) => setOpponentStance(e.target.value as any)}
              className="px-2.5 py-1.5 bg-[#0a0b0e] border border-slate-800 rounded-lg text-white font-semibold"
            >
              <option value="Orthodox">Orthodox</option>
              <option value="Southpaw">Southpaw</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerateAiPlan}
          disabled={isGenerating}
          className="w-full md:w-auto px-5 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-rose-950/40 active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isGenerating ? 'Synthesizing Tactics...' : 'Generate AI Game Plan'}</span>
        </button>
      </div>

      {/* Active Tactical Game Plan Blueprint */}
      <div className="bg-[#10131d] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-bold text-rose-500 uppercase tracking-widest flex items-center gap-2">
              <Compass className="w-4 h-4" />
              <span>Championship Fight Blueprint vs {selectedArchetype.name}</span>
            </div>
            <h3 className="text-2xl font-black font-heading uppercase text-white mt-1">
              Path to Victory Strategy
            </h3>
          </div>
          <div className="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            Matchup: <strong className="text-white">{userStance}</strong> vs <strong className="text-rose-400">{opponentStance}</strong>
          </div>
        </div>

        {/* Win Condition Highlight Card */}
        <div className="p-4 bg-gradient-to-r from-rose-950/30 via-[#181c28] to-[#12151f] border border-rose-900/50 rounded-xl space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>Primary Win Condition (Fight Goal)</span>
          </div>
          <div className="text-sm sm:text-base font-bold text-white leading-relaxed">
            {activePlan.winCondition}
          </div>
        </div>

        {/* Distance Management & Cage Strategy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#141824] border border-slate-800 rounded-xl space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              <span>Distance & Range Discipline</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activePlan.distanceManagement}
            </p>
          </div>
          <div className="p-4 bg-[#141824] border border-slate-800 rounded-xl space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              <span>Octagon Cage Positioning</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activePlan.cageStrategy}
            </p>
          </div>
        </div>

        {/* Round-by-Round Breakdown Tabs */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Round-by-Round Tactical Objectives
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRoundTab(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                    activeRoundTab === r
                      ? 'bg-rose-600 text-white'
                      : 'bg-[#181c28] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Round {r}
                </button>
              ))}
            </div>
          </div>

          {activeRound && (
            <div className="p-5 bg-[#141824] border border-slate-800 rounded-xl space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="font-heading font-extrabold text-lg uppercase text-white">
                  Round {activeRound.round} Tactical Mission
                </span>
                <span className="text-xs text-rose-400 font-semibold">5:00 Duration</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {activeRound.objective}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-black/40 border border-slate-800 rounded-lg space-y-1">
                  <div className="text-[11px] font-bold text-rose-400 uppercase flex items-center gap-1">
                    <Swords className="w-3.5 h-3.5" />
                    <span>Striking Directives</span>
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed">
                    {activeRound.strikingFocus}
                  </div>
                </div>

                <div className="p-3 bg-black/40 border border-slate-800 rounded-lg space-y-1">
                  <div className="text-[11px] font-bold text-cyan-400 uppercase flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Grappling & Cage Wrestling</span>
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed">
                    {activeRound.grapplingFocus}
                  </div>
                </div>
              </div>

              {/* Danger Alert */}
              <div className="p-3 bg-amber-950/20 border border-amber-900/40 rounded-lg flex items-start gap-2 text-xs text-amber-200">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white uppercase mr-1">Opponent Danger Alert:</strong>
                  {activeRound.dangerAlert}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recommended Striking Combos & Defensive Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Key Combos */}
          <div className="p-5 bg-[#141824] border border-slate-800 rounded-xl space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <Swords className="w-4 h-4" />
              <span>Tailored Strike Combinations</span>
            </div>
            <div className="space-y-2">
              {activePlan.keyCombinations.map((combo, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#0f1118] border border-slate-800 rounded-lg text-xs font-bold text-white flex items-center justify-between"
                >
                  <span>{combo}</span>
                  <button
                    onClick={() => {
                      setActiveTab('training');
                      setTrainingSubTab('timer');
                    }}
                    className="text-[10px] uppercase font-bold text-rose-400 hover:underline"
                  >
                    Drill &rarr;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Defensive Checklist */}
          <div className="p-5 bg-[#141824] border border-slate-800 rounded-xl space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Non-Negotiable Defensive Checklist</span>
            </div>
            <div className="space-y-2">
              {activePlan.defensiveChecklist.map((check, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#0f1118] border border-slate-800 rounded-lg text-xs text-slate-300 flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>{check}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TACTICAL SPARRING DECISION SIMULATOR */}
      {/* ========================================================= */}
      <div className="bg-[#10131d] border border-rose-900/50 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-widest">
              <Brain className="w-4 h-4" />
              <span>Interactive Decision Engine</span>
            </div>
            <h3 className="text-2xl font-black font-heading uppercase text-white mt-1">
              MMA Tactical Sparring Simulator
            </h3>
            <div className="text-xs text-slate-400">
              Scenario {simScenarioIndex + 1} of {FIGHT_SIM_SCENARIOS.length}   Test your split-second combat decisions under pressure.
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-slate-400">Fight IQ Accumulated</div>
              <div className="text-xl font-black font-heading text-rose-400 tabular-nums">
                {userFightIqScore} XP
              </div>
            </div>
          </div>
        </div>

        {/* Current Scenario Card */}
        <div className="p-5 sm:p-6 bg-[#141824] border border-slate-800 rounded-xl space-y-4">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-rose-400 uppercase tracking-wider">
              Round {currentScenario.round}   Clock: {currentScenario.timeRemaining}
            </span>
            <span className="text-slate-400">Live Octagon Scenario</span>
          </div>

          <div className="text-sm sm:text-base font-bold text-white leading-relaxed">
            {currentScenario.situation}
          </div>

          <div className="p-3 bg-rose-950/30 border border-rose-900/40 rounded-lg text-xs text-rose-200">
            <strong className="text-white uppercase mr-1">Opponent Movement:</strong>
            {currentScenario.opponentAction}
          </div>

          {/* 3 Choices */}
          <div className="space-y-2.5 pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              What is your technical response?
            </div>
            {currentScenario.choices.map((choice, idx) => {
              const isSelected = selectedChoiceIndex === idx;
              let choiceStyle = 'bg-[#0f1118] border-slate-800 hover:border-slate-700 text-slate-200';
              if (selectedChoiceIndex !== null) {
                if (choice.isOptimal) {
                  choiceStyle = 'bg-emerald-950/40 border-emerald-600 text-emerald-200';
                } else if (isSelected && !choice.isOptimal) {
                  choiceStyle = 'bg-rose-950/40 border-rose-600 text-rose-200';
                } else {
                  choiceStyle = 'bg-[#0f1118]/60 border-slate-900 text-slate-500 opacity-60';
                }
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSimChoice(idx)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${choiceStyle}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-xs sm:text-sm font-semibold leading-snug">
                      <span className="font-bold text-rose-400 mr-2">Option {String.fromCharCode(65 + idx)}:</span>
                      {choice.text}
                    </div>
                    {selectedChoiceIndex !== null && choice.isOptimal && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {selectedChoiceIndex === idx && !choice.isOptimal && (
                      <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
                    )}
                  </div>

                  {/* Outcome feedback revealed after clicking */}
                  {selectedChoiceIndex !== null && (isSelected || choice.isOptimal) && (
                    <div className="mt-3 pt-3 border-t border-white/10 text-xs leading-relaxed">
                      <strong className={choice.isOptimal ? 'text-emerald-300' : 'text-rose-300'}>
                        {choice.isOptimal ? 'Optimal Fight IQ (+100 XP): ' : 'Tactical Error (+20 XP): '}
                      </strong>
                      {choice.outcome}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Next Scenario Button */}
          {selectedChoiceIndex !== null && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextScenario}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
              >
                <span>{simScenarioIndex < FIGHT_SIM_SCENARIOS.length - 1 ? 'Next Scenario' : 'Restart Scenarios'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
