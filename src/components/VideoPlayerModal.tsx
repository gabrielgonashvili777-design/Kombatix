import React, { useState } from 'react';
import { Technique } from '../types';
import { useApp } from '../context/AppContext';
import { APP_IMAGES } from '../data/mmaData';
import {
  X,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  Bookmark,
  CheckCircle,
  ShieldAlert,
  ArrowRight,
  Tv,
  Layers,
  Dumbbell,
  Clock,
  Video
} from 'lucide-react';

interface Props {
  technique: Technique;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<Props> = ({ technique, onClose }) => {
  const {
    profile,
    toggleFavoriteTechnique,
    toggleLearnedTechnique,
    setSelectedTechnique,
    setActiveTab,
    setTrainingSubTab
  } = useApp();

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [playerMode, setPlayerMode] = useState<'youtube' | 'kinetic'>('youtube');

  const isFav = profile.favoriteTechniqueIds.includes(technique.id);
  const isMastered = profile.learnedTechniqueIds.includes(technique.id);

  const youtubeEmbedUrl = `https://www.youtube-nocookie.com/embed/${technique.videoYoutubeId || 'vd2dGhHeFZw'}?autoplay=1&rel=0&modestbranding=1`;

  const imageSrc =
    technique.imageKey === 'striking'
      ? APP_IMAGES.striking
      : technique.imageKey === 'bjj'
      ? APP_IMAGES.bjj
      : technique.imageKey === 'wrestling'
      ? APP_IMAGES.wrestling
      : APP_IMAGES.hero;

  const handleOpenDetailedBreakdown = () => {
    onClose();
    setSelectedTechnique(technique);
  };

  const handleStartDrill = () => {
    onClose();
    setActiveTab('training');
    setTrainingSubTab('timer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#0d0f16] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-[#12151f] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-rose-950/70 text-rose-400 border border-rose-900/50 rounded text-xs font-bold uppercase tracking-wider">
              {technique.discipline}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-extrabold font-heading uppercase text-white tracking-wide">
                Video: {technique.name}
              </span>
              <span aria-hidden="true" className="text-slate-600 hidden sm:inline">·</span>
              <span className="text-xs text-rose-400 font-semibold hidden sm:inline">
                {technique.difficulty}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-[#181c28] rounded-lg border border-slate-800 mr-2">
              <button
                onClick={() => setPlayerMode('youtube')}
                className={`px-2.5 py-1 text-xs font-bold rounded flex items-center gap-1.5 transition-colors ${
                  playerMode === 'youtube'
                    ? 'bg-rose-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Tv className="w-3.5 h-3.5" />
                <span>Video Lesson</span>
              </button>
              <button
                onClick={() => setPlayerMode('kinetic')}
                className={`px-2.5 py-1 text-xs font-bold rounded flex items-center gap-1.5 transition-colors ${
                  playerMode === 'kinetic'
                    ? 'bg-rose-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Kinetic Study</span>
              </button>
            </div>

            <button
              onClick={() => toggleFavoriteTechnique(technique.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isFav
                  ? 'bg-rose-600 text-white border-rose-500'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
              title={isFav ? 'Favorited' : 'Bookmark technique'}
            >
              <Bookmark className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => toggleLearnedTechnique(technique.id)}
              className={`px-3 py-2 rounded-lg border text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                isMastered
                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <CheckCircle className={`w-4 h-4 ${isMastered ? 'fill-emerald-500 text-black' : ''}`} />
              <span className="hidden sm:inline">{isMastered ? 'Mastered' : 'Mark Mastered'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-2"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          {/* Main Video Screen Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 Cols: Video Player & Direct Watch Button */}
            <div className="lg:col-span-8 space-y-3">
              {/* In-App Video Lesson Info Banner */}
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#12151f] border border-slate-800 rounded-xl text-xs">
                <div className="flex items-center gap-2 truncate pr-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="font-semibold text-white truncate">
                    {technique.name} · {technique.externalResourceTitle}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 shrink-0 text-[11px]">
                  <Video className="w-3.5 h-3.5 text-rose-400" />
                  <span className="font-medium text-slate-300">{technique.videoInstructor || 'Elite Coach'}</span>
                  <span>·</span>
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{technique.videoDuration || 'Full HD'}</span>
                </div>
              </div>

              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
                {playerMode === 'youtube' ? (
                  <iframe
                    src={youtubeEmbedUrl}
                    title={technique.name}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full relative flex items-center justify-center">
                    <img
                      src={imageSrc}
                      alt={technique.name}
                      className="w-full h-full object-cover filter contrast-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-xs font-bold uppercase tracking-wider text-rose-400">
                        Kinetic Motion Loop
                      </div>
                      <div className="text-sm font-bold text-white">
                        Phase {activeStepIndex + 1}: {technique.steps[activeStepIndex]?.phase}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* In-App Practice & Gym Drilling Action Bar */}
              <div className="p-4 bg-gradient-to-r from-[#18121d] via-[#12151f] to-[#0d0f16] border border-rose-900/50 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
                <div className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <Dumbbell className="w-3.5 h-3.5" />
                    <span>Gym Drill Recommendation</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    {technique.drillSuggestion}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Ready to practice on the mat? Fire up the official FightLab round timer.
                  </div>
                </div>

                <button
                  onClick={handleStartDrill}
                  className="w-full sm:w-auto px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-950/40 shrink-0 active:scale-95"
                >
                  <Dumbbell className="w-4 h-4" />
                  <span>Start Round Timer</span>
                </button>
              </div>
            </div>

            {/* Right 4 Cols: Kinetic Cue Cards & Step Timeline */}
            <div className="lg:col-span-4 space-y-4">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Key Mechanical Phases
              </div>

              {/* Phase Selection Tabs */}
              <div className="space-y-2.5">
                {technique.steps.map((step, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      activeStepIndex === idx
                        ? 'bg-rose-950/30 border-rose-700/80 shadow-md'
                        : 'bg-[#12151f] border-slate-800/80 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className={activeStepIndex === idx ? 'text-rose-400 uppercase' : 'text-slate-400'}>
                        Phase 0{idx + 1}: {step.phase}
                      </span>
                      {activeStepIndex === idx && (
                        <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded font-semibold uppercase">
                          Selected
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-200 mt-1 leading-snug">
                      {step.instruction}
                    </div>
                    <div className="text-[11px] text-rose-300 font-semibold mt-1">
                      Cue: {step.keyCue}
                    </div>
                  </div>
                ))}
              </div>

              {/* Common Pitfall */}
              {technique.commonMistakes[0] && (
                <div className="p-3.5 bg-[#12151f] border border-amber-900/40 rounded-xl space-y-1">
                  <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Watch Out For This Error:</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    {technique.commonMistakes[0].mistake}
                  </div>
                  <div className="text-[11px] text-emerald-400 pt-0.5">
                    <strong>Correction:</strong> {technique.commonMistakes[0].fix}
                  </div>
                </div>
              )}

              {/* Switch to Full Text Breakdown */}
              <button
                onClick={handleOpenDetailedBreakdown}
                className="w-full py-2.5 bg-[#181c28] hover:bg-[#232733] text-slate-200 hover:text-white border border-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>Read Full Step-by-Step Curriculum</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
