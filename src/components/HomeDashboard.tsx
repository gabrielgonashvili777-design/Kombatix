import React from 'react';
import { useApp } from '../context/AppContext';
import { APP_IMAGES } from '../data/mmaData';
import {
  Flame,
  Dumbbell,
  BookOpen,
  Award,
  Cpu,
  ChevronRight,
  Play,
  CheckCircle2,
  Bookmark,
  Zap,
  Target,
  ArrowRight,
  Tv,
  Video
} from 'lucide-react';

export const HomeDashboard: React.FC = () => {
  const {
    profile,
    techniques,
    recentlyViewedIds,
    viewTechnique,
    openTechniqueVideo,
    setActiveTab,
    setLearnSubTab,
    setAiCoachSubTab,
    setTrainingSubTab,
    challenges,
    toggleChallengeComplete,
    trainingSessions
  } = useApp();

  // Daily recommendation technique
  const dailyRecommendation = techniques.find((t) => t.id === 'box-cross') || techniques[0];
  const recentlyViewed = techniques.filter((t) => recentlyViewedIds.includes(t.id));

  // Quick stats
  const totalRoundsThisWeek = trainingSessions.reduce((acc, s) => acc + s.roundsCompleted, 0);

  return (
    <div className="space-y-10 pb-20">
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-[#12151e] via-[#10121a] to-[#0a0b0e] p-6 sm:p-10 shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 lg:opacity-40 pointer-events-none overflow-hidden">
          <img
            src={APP_IMAGES.hero}
            alt="MMA Fighter In Cage"
            className="w-full h-full object-cover object-center filter grayscale contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#10121a]/80 to-[#12151e]" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-500 uppercase tracking-widest">
            <Flame className="w-4 h-4 fill-current" />
            <span>Fighter Readiness Dashboard</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">Streak: {profile.streakDays} Days</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white font-heading">
            Welcome Back, <span className="text-rose-500">{profile.username}</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Your MMA laboratory is primed. Review today's recommended cross mechanics, run an AI shadowbox biomechanical diagnostic, or start championship rounds on the bell.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setActiveTab('training');
                setTrainingSubTab('timer');
              }}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg shadow-rose-950/50 transition-all flex items-center gap-2 active:scale-95"
            >
              <Dumbbell className="w-4 h-4" />
              <span>Start Round Timer</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('ai-coach');
                setAiCoachSubTab('shadowbox');
              }}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 active:scale-95"
            >
              <Cpu className="w-4 h-4 text-rose-400" />
              <span>AI Shadowbox Scan</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4-KPI Metric Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#12151e] border border-slate-800/80 rounded-xl p-4 sm:p-5">
          <div className="text-xs font-medium text-slate-400">Total Rounds Logged</div>
          <div className="mt-2 text-3xl font-extrabold font-heading text-white tabular-nums">
            {profile.totalRounds}
          </div>
          <div className="mt-1 text-xs text-rose-400 flex items-center gap-1">
            <span>+{totalRoundsThisWeek} this training cycle</span>
          </div>
        </div>

        <div className="bg-[#12151e] border border-slate-800/80 rounded-xl p-4 sm:p-5">
          <div className="text-xs font-medium text-slate-400">Techniques Mastered</div>
          <div className="mt-2 text-3xl font-extrabold font-heading text-white tabular-nums">
            {profile.learnedTechniqueIds.length} <span className="text-sm font-normal text-slate-500">/ {techniques.length}</span>
          </div>
          <div className="mt-1 text-xs text-emerald-400 flex items-center gap-1">
            <span>Verified in sparring</span>
          </div>
        </div>

        <div className="bg-[#12151e] border border-slate-800/80 rounded-xl p-4 sm:p-5">
          <div className="text-xs font-medium text-slate-400">Daily Training Streak</div>
          <div className="mt-2 text-3xl font-extrabold font-heading text-white tabular-nums flex items-baseline gap-1.5">
            {profile.streakDays} <span className="text-sm font-medium text-rose-500">Days</span>
          </div>
          <div className="mt-1 text-xs text-slate-400">Consistent mat discipline</div>
        </div>

        <div className="bg-[#12151e] border border-slate-800/80 rounded-xl p-4 sm:p-5">
          <div className="text-xs font-medium text-slate-400">Active Discipline</div>
          <div className="mt-2 text-2xl font-extrabold font-heading text-white truncate">
            {profile.preferredDiscipline}
          </div>
          <div className="mt-1 text-xs text-slate-400">{profile.stance} · {profile.weightClass}</div>
        </div>
      </section>

      {/* 2-Column Split: Daily Recommendation & Daily Challenges */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Daily Technique Spotlight */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold font-heading uppercase text-white tracking-wide">
                Daily Technique Spotlight
              </h2>
              <div className="text-xs text-slate-400">Curated mechanical focus for today's session</div>
            </div>
            <button
              onClick={() => {
                setActiveTab('learn');
                setLearnSubTab('techniques');
              }}
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1 group"
            >
              <span>Full Library</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="bg-[#12151e] border border-slate-800 rounded-xl overflow-hidden shadow-lg transition-all hover:border-slate-700">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-0">
              <div className="sm:col-span-5 relative h-48 sm:h-auto min-h-[180px] bg-slate-900">
                <img
                  src={APP_IMAGES.striking}
                  alt={dailyRecommendation.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12151e] via-transparent to-transparent sm:hidden" />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider text-white">
                  {dailyRecommendation.discipline}
                </div>
              </div>

              <div className="sm:col-span-7 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{dailyRecommendation.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-rose-400 font-semibold">{dailyRecommendation.difficulty}</span>
                  </div>
                  <h3 className="text-2xl font-bold font-heading uppercase text-white">
                    {dailyRecommendation.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                    {dailyRecommendation.description}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => openTechniqueVideo(dailyRecommendation)}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 shadow-md shadow-rose-950/40 active:scale-95"
                    title="Watch video lesson inside app"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Video Lesson</span>
                  </button>
                  <button
                    onClick={() => viewTechnique(dailyRecommendation.id)}
                    className="px-4 py-2 bg-[#181c28] hover:bg-[#232733] text-slate-200 border border-slate-700 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>Step Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recently Viewed Techniques */}
          <div className="pt-4 space-y-3">
            <h3 className="text-lg font-bold font-heading uppercase text-slate-200 tracking-wide">
              Recently Studied Techniques
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {recentlyViewed.slice(0, 3).map((tech) => (
                <div
                  key={tech.id}
                  className="bg-[#12151e]/80 border border-slate-800/80 rounded-xl overflow-hidden flex flex-col justify-between"
                >
                  <div
                    onClick={() => viewTechnique(tech.id)}
                    className="p-3.5 cursor-pointer hover:bg-[#181c28] transition-colors group"
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span className="font-semibold text-rose-400">{tech.discipline}</span>
                      <span>{tech.difficulty}</span>
                    </div>
                    <div className="font-bold text-sm text-slate-100 group-hover:text-rose-400 transition-colors line-clamp-1">
                      {tech.name}
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 mt-1">
                      {tech.category}
                    </div>
                  </div>

                  {/* Direct In-App Actions Below Card */}
                  <div className="px-3 pb-3 pt-1 border-t border-slate-800/80 bg-[#0d0f17]/80 flex items-center gap-1.5">
                    <button
                      onClick={() => openTechniqueVideo(tech)}
                      className="flex-1 py-1.5 px-2 bg-rose-600 hover:bg-rose-500 text-white rounded text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 shadow-sm active:scale-95"
                      title="Watch video inside FightLab"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Watch Video</span>
                    </button>
                    <button
                      onClick={() => viewTechnique(tech.id)}
                      className="py-1.5 px-2 bg-[#181c28] hover:bg-[#222738] text-slate-300 hover:text-white rounded border border-slate-700 text-[11px] font-bold uppercase flex items-center gap-1"
                      title="View step breakdown"
                    >
                      <BookOpen className="w-3 h-3 text-slate-400" />
                      <span>Steps</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Daily Challenges & AI Quick Access */}
        <div className="space-y-6">
          {/* Daily Challenges Card */}
          <div className="bg-[#12151e] border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-rose-500" />
                <h3 className="text-lg font-bold font-heading uppercase text-white tracking-wide">
                  Daily Training Challenge
                </h3>
              </div>
              <span className="text-xs text-slate-400">Reset: 24h</span>
            </div>

            <div className="space-y-3">
              {challenges.map((ch) => (
                <div
                  key={ch.id}
                  className={`p-3 rounded-lg border transition-all ${
                    ch.completed
                      ? 'bg-rose-950/20 border-rose-900/40 text-slate-300'
                      : 'bg-[#181c28] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="font-bold text-rose-400 uppercase">{ch.discipline}</span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-slate-400 font-medium">+{ch.xp} XP</span>
                      </div>
                      <div className={`text-xs font-bold ${ch.completed ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                        {ch.title}
                      </div>
                      <div className="text-[11px] text-slate-400 leading-snug">
                        {ch.description}
                      </div>
                    </div>

                    <button
                      onClick={() => toggleChallengeComplete(ch.id)}
                      className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-colors ${
                        ch.completed
                          ? 'text-rose-500 hover:text-rose-400'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                      aria-label={ch.completed ? 'Mark incomplete' : 'Mark complete'}
                    >
                      <CheckCircle2 className={`w-5 h-5 ${ch.completed ? 'fill-rose-500 text-black' : ''}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Cornerman Access Banner */}
          <div className="relative overflow-hidden rounded-xl border border-rose-900/40 bg-gradient-to-br from-[#1b1420] to-[#12151e] p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              <span>AI Combat Cornerman</span>
            </div>
            <h4 className="text-lg font-bold font-heading uppercase text-white">
              Stuck on a Counter or Takedown?
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ask our MMA AI assistant for real-time adjustments, cage wrestling counters, or BJJ escape mechanics.
            </p>
            <button
              onClick={() => {
                setActiveTab('ai-coach');
                setAiCoachSubTab('assistant');
              }}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Chat With MMA Assistant</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive BJJ Explorer Teaser */}
          <div
            onClick={() => {
              setActiveTab('learn');
              setLearnSubTab('positions');
            }}
            className="group cursor-pointer rounded-xl border border-slate-800 bg-[#12151e] p-5 hover:border-slate-700 transition-all space-y-2"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold uppercase tracking-wider text-slate-300">Grappling Flow</span>
              <span className="text-rose-400 font-semibold group-hover:translate-x-1 transition-transform">Explore &rarr;</span>
            </div>
            <div className="font-heading text-lg font-bold uppercase text-white">
              Interactive BJJ Position Map
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Visualize sweeps, passes, and submission trees across Closed Guard, Half Guard, Mount, and Back Control.
            </p>
          </div>

          {/* Tactical Game Plan Lab Teaser */}
          <div
            onClick={() => {
              setActiveTab('training');
              setTrainingSubTab('gameplan');
            }}
            className="group cursor-pointer rounded-xl border border-slate-800 bg-[#12151f] p-5 hover:border-rose-700/60 transition-all space-y-2 shadow-md"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold uppercase tracking-wider text-rose-400">Matchup Tactics</span>
              <span className="text-rose-400 font-semibold group-hover:translate-x-1 transition-transform">Launch Lab &rarr;</span>
            </div>
            <div className="font-heading text-lg font-bold uppercase text-white">
              MMA Game Plan & Fight Simulator
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Build custom tactical blueprints against Wrestlers, BJJ Specialists, and Boxers, and test your decision-making.
            </p>
          </div>

          {/* Sparring Scorecard Teaser */}
          <div
            onClick={() => {
              setActiveTab('training');
              setTrainingSubTab('scorecard');
            }}
            className="group cursor-pointer rounded-xl border border-slate-800 bg-[#12151f] p-5 hover:border-cyan-700/60 transition-all space-y-2 shadow-md"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold uppercase tracking-wider text-cyan-400">Judge Simulator</span>
              <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">Score Bout &rarr;</span>
            </div>
            <div className="font-heading text-lg font-bold uppercase text-white">
              Unified MMA Sparring Scorecard
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Score live rounds with 10-Point Must rules, track significant strikes, takedowns, control time, and knockdowns.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
