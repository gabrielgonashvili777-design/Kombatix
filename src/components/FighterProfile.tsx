import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { APP_IMAGES } from '../data/mmaData';
import { Discipline, Difficulty } from '../types';
import { WeightCutCalculator } from './WeightCutCalculator';
import {
  Award,
  Bookmark,
  CheckCircle,
  Dumbbell,
  Cpu,
  Flame,
  Shield,
  Target,
  Edit3,
  Lock,
  Globe,
  Users,
  Save,
  X,
  ArrowRight,
  TrendingUp,
  Droplets,
  Scale
} from 'lucide-react';

export const FighterProfile: React.FC = () => {
  const {
    profile,
    updateProfile,
    techniques,
    viewTechnique,
    trainingSessions,
    shadowboxHistory,
    achievements
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState<'achievements' | 'arsenal' | 'weightcut' | 'history' | 'settings'>('achievements');

  // Form edit state
  const [formUsername, setFormUsername] = useState(profile.username);
  const [formNickname, setFormNickname] = useState(profile.nickname);
  const [formDiscipline, setFormDiscipline] = useState<Discipline>(profile.preferredDiscipline);
  const [formStance, setFormStance] = useState(profile.stance);
  const [formExperience, setFormExperience] = useState<Difficulty>(profile.experience);
  const [formWeightClass, setFormWeightClass] = useState(profile.weightClass);
  const [formGoal, setFormGoal] = useState(profile.weeklyRoundGoal);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      username: formUsername,
      nickname: formNickname,
      preferredDiscipline: formDiscipline,
      stance: formStance,
      experience: formExperience,
      weightClass: formWeightClass,
      weeklyRoundGoal: Number(formGoal)
    });
    setIsEditing(false);
  };

  const favoriteTechs = techniques.filter((t) => profile.favoriteTechniqueIds.includes(t.id));
  const masteredTechs = techniques.filter((t) => profile.learnedTechniqueIds.includes(t.id));

  // Compute Weekly Goal Progress
  const roundsThisWeek = trainingSessions.reduce((acc, s) => acc + s.roundsCompleted, 0);
  const goalProgressPct = Math.min(100, Math.round((roundsThisWeek / (profile.weeklyRoundGoal || 20)) * 100));

  return (
    <div className="space-y-8 pb-20">
      {/* Fighter Profile Card Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#10131d] p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar Photo */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-rose-600/70 shadow-xl shrink-0 bg-slate-900">
            <img
              src={APP_IMAGES.hero}
              alt={profile.username}
              className="w-full h-full object-cover filter contrast-125"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Fighter Info */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-rose-500 uppercase tracking-widest">
                  <span>"{profile.nickname}"</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-slate-400">{profile.rank}</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black font-heading uppercase text-white tracking-wide">
                  {profile.username}
                </h1>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-[#181c28] hover:bg-[#232733] text-slate-200 border border-slate-700 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 self-center sm:self-auto"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Fighter Attributes */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-xs text-slate-300">
              <span className="px-2.5 py-1 rounded bg-[#181c28] border border-slate-800 font-semibold">
                {profile.preferredDiscipline}
              </span>
              <span className="px-2.5 py-1 rounded bg-[#181c28] border border-slate-800">
                Stance: <strong className="text-white">{profile.stance}</strong>
              </span>
              <span className="px-2.5 py-1 rounded bg-[#181c28] border border-slate-800">
                Class: <strong className="text-white">{profile.weightClass}</strong>
              </span>
              <span className="px-2.5 py-1 rounded bg-[#181c28] border border-slate-800">
                Level: <strong className="text-rose-400">{profile.experience}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Weekly Round Target Progress Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4 text-rose-500" />
              <span>Weekly Round Goal: {roundsThisWeek} / {profile.weeklyRoundGoal} Rounds</span>
            </span>
            <span className="font-mono font-bold text-rose-400 tabular-nums">{goalProgressPct}%</span>
          </div>
          <div className="w-full bg-[#181c28] rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-rose-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${goalProgressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Edit Profile Drawer / Modal */}
      {isEditing && (
        <div className="bg-[#10131d] border border-rose-900/60 rounded-2xl p-6 sm:p-8 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold font-heading uppercase text-white">
              Edit Fighter Profile
            </h3>
            <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Fighter Name</label>
                <input
                  type="text"
                  value={formUsername}
                  onChange={(e) => setFormUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0a0b0e] border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Nickname / Moniker</label>
                <input
                  type="text"
                  value={formNickname}
                  onChange={(e) => setFormNickname(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0a0b0e] border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Preferred Discipline</label>
                <select
                  value={formDiscipline}
                  onChange={(e) => setFormDiscipline(e.target.value as any)}
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
                <label className="text-xs font-semibold text-slate-300">Fighting Stance</label>
                <select
                  value={formStance}
                  onChange={(e) => setFormStance(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#0a0b0e] border border-slate-800 rounded-lg text-xs text-white"
                >
                  <option value="Orthodox">Orthodox</option>
                  <option value="Southpaw">Southpaw</option>
                  <option value="Switch">Switch</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Weight Division</label>
                <input
                  type="text"
                  value={formWeightClass}
                  onChange={(e) => setFormWeightClass(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0a0b0e] border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Weekly Target (Rounds)</label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  value={formGoal}
                  onChange={(e) => setFormGoal(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#0a0b0e] border border-slate-800 rounded-lg text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Profile Section Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#12151f] rounded-xl border border-slate-800 max-w-2xl">
        <button
          onClick={() => setActiveProfileTab('achievements')}
          className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all text-center ${
            activeProfileTab === 'achievements'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Achievements
        </button>
        <button
          onClick={() => setActiveProfileTab('arsenal')}
          className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all text-center ${
            activeProfileTab === 'arsenal'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Arsenal
        </button>
        <button
          onClick={() => setActiveProfileTab('weightcut')}
          className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all text-center flex items-center gap-1.5 ${
            activeProfileTab === 'weightcut'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Weight Cut & Hydration</span>
        </button>
        <button
          onClick={() => setActiveProfileTab('history')}
          className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all text-center ${
            activeProfileTab === 'history'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          AI Scans
        </button>
        <button
          onClick={() => setActiveProfileTab('settings')}
          className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all text-center ${
            activeProfileTab === 'settings'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Privacy
        </button>
      </div>

      {/* TAB 1: ACHIEVEMENTS & PROGRESSION */}
      {activeProfileTab === 'achievements' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-heading uppercase text-white tracking-wide">
              Badges & Milestones ({achievements.filter((a) => a.unlocked).length} of {achievements.length} Unlocked)
            </h3>
            <span className="text-xs text-rose-400 font-semibold">Tier: Contender</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((ach) => {
              const pct = Math.min(100, Math.round((ach.progress / ach.maxProgress) * 100));

              return (
                <div
                  key={ach.id}
                  className={`p-5 rounded-xl border transition-all ${
                    ach.unlocked
                      ? 'bg-[#12151f] border-rose-900/50 shadow-md shadow-rose-950/20'
                      : 'bg-[#0f1118] border-slate-800/80 opacity-75'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      ach.unlocked
                        ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/60'
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      <Award className="w-6 h-6" />
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-sm text-white font-heading uppercase">
                          {ach.title}
                        </div>
                        {ach.unlocked ? (
                          <span className="text-[10px] font-bold text-emerald-400 uppercase bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/40">
                            Unlocked
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 tabular-nums">
                            {ach.progress}/{ach.maxProgress}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-400 leading-snug">
                        {ach.description}
                      </p>

                      {/* Progress bar */}
                      <div className="pt-1">
                        <div className="w-full bg-[#181c28] rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              ach.unlocked ? 'bg-rose-500' : 'bg-slate-700'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>

                      {ach.unlockedDate && (
                        <div className="text-[10px] text-slate-400 pt-0.5">
                          Earned on {ach.unlockedDate}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: ARSENAL & FAVORITES */}
      {activeProfileTab === 'arsenal' && (
        <div className="space-y-6">
          {/* Mastered Techniques */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold font-heading uppercase text-white tracking-wide flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Mastered Techniques ({masteredTechs.length})</span>
            </h3>

            {masteredTechs.length === 0 ? (
              <div className="p-6 bg-[#12151f] border border-slate-800 rounded-xl text-center text-xs text-slate-400">
                You haven't marked any techniques as mastered yet. Inspect techniques in the Learn tab to verify your mastery.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {masteredTechs.map((tech) => (
                  <div
                    key={tech.id}
                    onClick={() => viewTechnique(tech.id)}
                    className="p-4 bg-[#12151f] hover:bg-[#181c28] border border-slate-800 rounded-xl cursor-pointer transition-colors group"
                  >
                    <div className="text-[10px] font-bold text-emerald-400 uppercase">{tech.discipline}</div>
                    <div className="font-bold text-sm text-white group-hover:text-rose-400 transition-colors mt-0.5">
                      {tech.name}
                    </div>
                    <div className="text-xs text-slate-400 mt-1 line-clamp-1">{tech.category}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Favorited Techniques */}
          <div className="space-y-3 pt-4">
            <h3 className="text-lg font-bold font-heading uppercase text-white tracking-wide flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-rose-500 fill-current" />
              <span>Saved Favorite Techniques ({favoriteTechs.length})</span>
            </h3>

            {favoriteTechs.length === 0 ? (
              <div className="p-6 bg-[#12151f] border border-slate-800 rounded-xl text-center text-xs text-slate-400">
                Bookmark techniques to build your customized training curriculum.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {favoriteTechs.map((tech) => (
                  <div
                    key={tech.id}
                    onClick={() => viewTechnique(tech.id)}
                    className="p-4 bg-[#12151f] hover:bg-[#181c28] border border-slate-800 rounded-xl cursor-pointer transition-colors group"
                  >
                    <div className="text-[10px] font-bold text-rose-400 uppercase">{tech.discipline}</div>
                    <div className="font-bold text-sm text-white group-hover:text-rose-400 transition-colors mt-0.5">
                      {tech.name}
                    </div>
                    <div className="text-xs text-slate-400 mt-1 line-clamp-1">{tech.category}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: WEIGHT CUT & HYDRATION CALCULATOR */}
      {activeProfileTab === 'weightcut' && <WeightCutCalculator />}

      {/* TAB 4: AI SCANS HISTORY */}
      {activeProfileTab === 'history' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold font-heading uppercase text-white tracking-wide">
            Biomechanical Scan Progression
          </h3>

          <div className="space-y-3">
            {shadowboxHistory.map((scan) => (
              <div
                key={scan.id}
                className="p-5 bg-[#12151f] border border-slate-800 rounded-xl space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-base text-white">
                      Diagnostic Session on {scan.date}
                    </div>
                    <div className="text-xs text-slate-400">Stance: {scan.stance} · {scan.evaluatorNote}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-extrabold font-heading text-rose-400 tabular-nums">
                      {scan.overallScore}
                    </span>
                    <span className="text-xs text-slate-500"> / 100</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {scan.summary}
                </p>

                <div className="flex flex-wrap gap-2 text-[11px] pt-1">
                  {scan.strengths.slice(0, 2).map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-900/40">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PRIVACY & ARCHITECTURE */}
      {activeProfileTab === 'settings' && (
        <div className="space-y-6 max-w-2xl">
          <div className="bg-[#12151f] border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-bold font-heading uppercase text-white tracking-wide">
              Fighter Profile Privacy Settings
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Control who can see your training logs, sparring records, and video analysis data.
            </p>

            <div className="space-y-3 pt-2">
              {(['public', 'gym', 'private'] as const).map((mode) => (
                <label
                  key={mode}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    profile.privacy === mode
                      ? 'bg-rose-950/20 border-rose-600'
                      : 'bg-[#181c28] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="privacy"
                    checked={profile.privacy === mode}
                    onChange={() => updateProfile({ privacy: mode })}
                    className="mt-1 text-rose-600 focus:ring-rose-500"
                  />
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white capitalize">{mode} Profile</div>
                    <div className="text-[11px] text-slate-400">
                      {mode === 'public'
                        ? 'Visible to the entire FightLab community for sparring matchmaking.'
                        : mode === 'gym'
                        ? 'Visible only to verified training partners and coaches in your home gym.'
                        : 'Private personal training log. Only you can view your scores.'}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-400 space-y-1">
            <div className="font-semibold text-slate-300">FightLab Free Guarantee</div>
            <div>The entire platform is 100% free with no locked techniques or subscription walls.</div>
          </div>
        </div>
      )}
    </div>
  );
};
