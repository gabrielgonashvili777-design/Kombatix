import React, { useState } from 'react';
import { Technique } from '../types';
import { useApp } from '../context/AppContext';
import { APP_IMAGES } from '../data/mmaData';
import {
  X,
  Bookmark,
  CheckCircle,
  Play,
  RotateCcw,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ShieldAlert,
  Dumbbell,
  Tv,
  Layers,
  Video,
  Clock,
  UserCheck
} from 'lucide-react';

interface Props {
  technique: Technique;
  onClose: () => void;
}

export const TechniqueDetailModal: React.FC<Props> = ({ technique, onClose }) => {
  const {
    profile,
    toggleFavoriteTechnique,
    toggleLearnedTechnique,
    viewTechnique,
    openTechniqueVideo,
    techniques,
    setActiveTab,
    setTrainingSubTab
  } = useApp();

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlayingDemo, setIsPlayingDemo] = useState(true);
  const [mediaView, setMediaView] = useState<'video' | 'kinetic'>('video');

  const isFavorite = profile.favoriteTechniqueIds.includes(technique.id);
  const isLearned = profile.learnedTechniqueIds.includes(technique.id);

  // Related techniques
  const related = techniques.filter((t) => technique.relatedTechniqueIds.includes(t.id));

  const youtubeEmbedUrl = `https://www.youtube-nocookie.com/embed/${technique.videoYoutubeId || 'vd2dGhHeFZw'}?rel=0&modestbranding=1`;

  // Image source based on discipline
  const imageSrc =
    technique.imageKey === 'striking'
      ? APP_IMAGES.striking
      : technique.imageKey === 'bjj'
      ? APP_IMAGES.bjj
      : technique.imageKey === 'wrestling'
      ? APP_IMAGES.wrestling
      : APP_IMAGES.hero;

  const handleStartDrilling = () => {
    onClose();
    setActiveTab('training');
    setTrainingSubTab('timer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0f1118] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800/80 flex items-center justify-between bg-[#12151f]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-rose-950/70 text-rose-400 border border-rose-900/50 rounded text-xs font-bold uppercase tracking-wider">
              {technique.discipline}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {technique.category}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-xs font-semibold text-slate-300">
              {technique.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavoriteTechnique(technique.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isFavorite
                  ? 'bg-rose-600 text-white border-rose-500'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => toggleLearnedTechnique(technique.id)}
              className={`px-3 py-2 rounded-lg border text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                isLearned
                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <CheckCircle className={`w-4 h-4 ${isLearned ? 'fill-emerald-500 text-black' : ''}`} />
              <span className="hidden sm:inline">{isLearned ? 'Mastered' : 'Mark Mastered'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-2"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          {/* Title & Overview */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading uppercase text-white tracking-wide">
              {technique.name}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {technique.description}
            </p>

            {/* Video Lesson Metadata Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#181c28] border border-slate-800 rounded-lg text-xs text-slate-300">
                <Video className="w-3.5 h-3.5 text-rose-500" />
                <span className="font-semibold text-white">Coach:</span>
                <span>{technique.videoInstructor || 'Master Instructor'}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#181c28] border border-slate-800 rounded-lg text-xs text-slate-300">
                <Clock className="w-3.5 h-3.5 text-rose-400" />
                <span>{technique.videoDuration || '6 min lesson'}</span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  openTechniqueVideo(technique);
                }}
                className="px-3.5 py-1.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-600/40 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ml-auto"
                title="Open larger cinema theater player"
              >
                <Tv className="w-3.5 h-3.5" />
                <span>Cinema Theater View</span>
              </button>
            </div>
          </div>

          {/* Interactive In-App Media Center (Video Lesson + Kinetic HUD) */}
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#08090d] shadow-2xl">
            {/* View Mode Switcher Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#12151f] border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setMediaView('video')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                    mediaView === 'video'
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
                      : 'text-slate-400 hover:text-white bg-[#0a0b0e] border border-slate-800'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>In-App Video Lesson</span>
                </button>
                <button
                  onClick={() => setMediaView('kinetic')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                    mediaView === 'kinetic'
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
                      : 'text-slate-400 hover:text-white bg-[#0a0b0e] border border-slate-800'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Step Breakdown HUD</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-400 hidden sm:flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Plays Directly In App</span>
              </div>
            </div>

            {/* Media Area */}
            {mediaView === 'video' ? (
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={youtubeEmbedUrl}
                  title={technique.name}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative aspect-video max-h-[360px] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                <img
                  src={imageSrc}
                  alt={technique.name}
                  className="w-full h-full object-cover filter contrast-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Visual Demonstration HUD Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
                      <span>Technical Motion Loop</span>
                    </div>
                    <div className="text-sm sm:text-base font-bold text-white font-heading uppercase">
                      Phase {activeStepIndex + 1}: {technique.steps[activeStepIndex]?.phase}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPlayingDemo(!isPlayingDemo)}
                      className="px-3 py-1.5 bg-black/60 hover:bg-black/90 text-white rounded text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 border border-white/10"
                    >
                      {isPlayingDemo ? <RotateCcw className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isPlayingDemo ? 'Replay Loop' : 'Play'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step selector track below demo */}
            <div className="grid grid-cols-3 border-t border-slate-800 bg-[#12151f]">
              {technique.steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveStepIndex(idx);
                    if (mediaView === 'video') setMediaView('kinetic');
                  }}
                  className={`p-3 text-left transition-colors border-r last:border-r-0 border-slate-800 ${
                    activeStepIndex === idx
                      ? 'bg-rose-950/40 border-b-2 border-b-rose-500'
                      : 'hover:bg-slate-800/40 text-slate-400'
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold text-slate-400">Step 0{idx + 1}</div>
                  <div className="text-xs font-bold text-slate-100 truncate">{step.phase}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Current Step Instruction Breakdown */}
          {technique.steps[activeStepIndex] && (
            <div className="bg-[#12151f] border border-slate-800/80 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <Lightbulb className="w-4 h-4" />
                <span>Kinetic Instruction Breakdown</span>
              </div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {technique.steps[activeStepIndex].instruction}
              </p>
              <div className="p-3 bg-black/40 border border-rose-900/40 rounded-lg text-xs text-rose-200 font-medium">
                <strong className="text-white uppercase tracking-wider mr-1">Pro Cue:</strong>
                {technique.steps[activeStepIndex].keyCue}
              </div>
            </div>
          )}

          {/* Common Mistakes & Practical Fixes */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="text-lg font-bold font-heading uppercase text-white tracking-wide">
                Common Technical Errors & Corrections
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {technique.commonMistakes.map((item, idx) => (
                <div key={idx} className="bg-[#12151f] border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold text-rose-400 flex items-start gap-1.5">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>Mistake: {item.mistake}</span>
                  </div>
                  <div className="text-xs text-slate-300 pl-5 border-l border-slate-700/80">
                    <span className="font-semibold text-emerald-400">The Fix: </span>
                    {item.fix}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Drilling Suggestion & Round Timer Link */}
          <div className="p-4 bg-gradient-to-r from-rose-950/30 to-[#12151f] border border-rose-900/40 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <Dumbbell className="w-4 h-4" />
                <span>Recommended Gym Drill</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-200">
                {technique.drillSuggestion}
              </div>
            </div>
            <button
              onClick={handleStartDrilling}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              Drill on Timer
            </button>
          </div>

          {/* In-App Video Lesson Masterclass Info (No External Links) */}
          <div className="p-4 bg-[#12151f] border border-slate-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5" />
                <span>Included Video Masterclass</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-200">
                {technique.externalResourceTitle}
              </div>
              <div className="text-xs text-slate-400">
                Instructor: {technique.videoInstructor || 'Elite Coach'} · {technique.videoDuration || 'Full HD breakdown'}
              </div>
            </div>
            <button
              onClick={() => {
                setMediaView('video');
                // scroll to top of modal smoothly
                const modalBody = document.querySelector('.overflow-y-auto');
                if (modalBody) modalBody.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 shrink-0 shadow-md shadow-rose-950/30"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Play Video Above</span>
            </button>
          </div>

          {/* Related Techniques */}
          {related.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Chained & Related Techniques
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {related.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => viewTechnique(rel.id)}
                    className="p-3 bg-[#12151f] hover:bg-slate-800/60 border border-slate-800 rounded-xl text-left transition-all group"
                  >
                    <div className="text-[10px] font-bold text-rose-400 uppercase">{rel.discipline}</div>
                    <div className="text-xs font-bold text-slate-200 group-hover:text-rose-400 transition-colors">
                      {rel.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
