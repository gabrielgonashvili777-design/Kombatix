import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { APP_IMAGES } from '../data/mmaData';
import {
  Shield,
  Swords,
  GitCommit,
  ArrowRight,
  Info,
  CheckCircle2,
  Sparkles,
  Layers,
  Play,
  Tv,
  Video,
  X
} from 'lucide-react';

const POSITION_VIDEOS: Record<string, { youtubeId: string; title: string; instructor: string }> = {
  'pos-closed-guard': { youtubeId: 'KKxD5kdOkk0', title: 'BJJ Closed Guard Fundamentals & Attacks', instructor: 'Stephan Kesting' },
  'pos-open-guard': { youtubeId: 'szAvJFvIzx4', title: 'Open Guard Retention & Triangle Setups', instructor: 'Stephan Kesting' },
  'pos-half-guard': { youtubeId: '5ALqUk9uefk', title: 'Half Guard & Knee Shield Control', instructor: 'Stephan Kesting' },
  'pos-side-control': { youtubeId: '5ALqUk9uefk', title: 'Side Control Pressure & Escapes', instructor: 'Stephan Kesting' },
  'pos-mount': { youtubeId: 'ygfnLjP6YQU', title: 'Mount Control & High-Percentage Escapes', instructor: 'Stephan Kesting' },
  'pos-back-control': { youtubeId: '176SLdBhj_A', title: 'Back Take & Rear Naked Choke Mechanics', instructor: 'Stephan Kesting' },
  'pos-turtle': { youtubeId: 'QMVavyxjlNU', title: 'Turtle Defense & Sit-Out Escapes', instructor: 'Cary Kolat' }
};

export const BjjPositionExplorer: React.FC = () => {
  const { positions, selectedPositionId, setSelectedPositionId } = useApp();
  const [optionFilter, setOptionFilter] = useState<'all' | 'offensive' | 'defensive'>('all');
  const [isPlayingInAppVideo, setIsPlayingInAppVideo] = useState(false);

  const currentPosition =
    positions.find((p) => p.id === selectedPositionId) || positions[0];

  const currentVideo = POSITION_VIDEOS[currentPosition.id];

  return (
    <div className="space-y-8">
      {/* Position Selector Strip */}
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          {positions.map((pos) => {
            const isSelected = pos.id === currentPosition.id;
            return (
              <button
                key={pos.id}
                onClick={() => {
                  setSelectedPositionId(pos.id);
                  setIsPlayingInAppVideo(false);
                }}
                className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-950/50'
                    : 'bg-[#12151f] text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>{pos.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  isSelected ? 'bg-black/30 text-rose-100' : 'bg-slate-800 text-slate-400'
                }`}>
                  {pos.type.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Position Detail Hero */}
      <div className="bg-[#10131d] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Position Media / In-App Video Lesson Demonstration */}
          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-[380px] bg-slate-950 flex items-center justify-center">
            {isPlayingInAppVideo && currentVideo ? (
              <div className="relative w-full h-full min-h-[260px] lg:min-h-[380px] bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${currentVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={currentVideo.title}
                  className="w-full h-full min-h-[260px] lg:min-h-[380px] border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <button
                  onClick={() => setIsPlayingInAppVideo(false)}
                  className="absolute top-3 right-3 p-1.5 bg-black/70 hover:bg-black text-white rounded-lg backdrop-blur-md text-xs font-semibold flex items-center gap-1 z-10 transition-colors border border-white/10"
                  title="Close in-app video"
                >
                  <X className="w-3.5 h-3.5" />
                  <span className="text-[10px]">Close Video</span>
                </button>
              </div>
            ) : (
              <>
                <img
                  src={APP_IMAGES.bjj}
                  alt={currentPosition.name}
                  className="w-full h-full object-cover filter contrast-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10131d] via-[#10131d]/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#10131d]" />

                {currentVideo && (
                  <button
                    onClick={() => setIsPlayingInAppVideo(true)}
                    className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-rose-600/90 hover:bg-rose-600 text-white flex items-center justify-center shadow-2xl shadow-rose-950/80 transform hover:scale-110 transition-all border border-rose-400/50 group/play"
                    title={`Watch in-app video for ${currentPosition.name}`}
                  >
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </button>
                )}

                <div className="absolute bottom-4 left-4 right-4 space-y-1 pointer-events-none">
                  <div className="text-[11px] font-bold text-rose-400 uppercase tracking-widest flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Positional Hierarchy · {currentPosition.type}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-heading uppercase text-white">
                    {currentPosition.name}
                  </h2>
                </div>
              </>
            )}
          </div>

          {/* Core Mechanics & Principles */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {currentPosition.description}
              </p>

              {/* In-App Video Lesson Controller (No External Links) */}
              {currentVideo && (
                <div className="p-3 bg-[#161a26] border border-slate-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                      <Tv className="w-3.5 h-3.5" />
                      <span>In-App Video Masterclass</span>
                    </div>
                    <div className="text-xs font-semibold text-white">
                      {currentVideo.title}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Instructor: {currentVideo.instructor} · Direct in-app stream
                    </div>
                  </div>

                  <button
                    onClick={() => setIsPlayingInAppVideo(!isPlayingInAppVideo)}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md shadow-rose-950/40 transition-all active:scale-95 shrink-0"
                  >
                    {isPlayingInAppVideo ? (
                      <>
                        <X className="w-3.5 h-3.5" />
                        <span>Hide Video</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Watch Video Lesson</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Key Grappling Concepts */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <Info className="w-4 h-4" />
                  <span>Crucial Leverage Principles</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentPosition.keyConcepts.map((concept, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-[#161a26] border border-slate-800 text-xs text-slate-300 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span>{concept}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coach Pro Tip */}
              <div className="p-3.5 bg-rose-950/20 border border-rose-900/40 rounded-xl text-xs text-rose-200 leading-relaxed">
                <strong className="text-white uppercase tracking-wider mr-1">Fighter IQ:</strong>
                {currentPosition.proTip}
              </div>
            </div>

            {/* Direct Transition Pathways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Connected Positional Transitions
              </div>
              <div className="flex flex-wrap gap-2">
                {currentPosition.transitions.map((trans, idx) => {
                  const target = positions.find((p) => p.id === trans.toPositionId);
                  if (!target) return null;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedPositionId(target.id);
                        setIsPlayingInAppVideo(false);
                      }}
                      className="px-3 py-2 bg-[#161a26] hover:bg-rose-900/30 text-slate-200 hover:text-white border border-slate-800 hover:border-rose-700/60 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 group"
                    >
                      <span>To {target.name}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-rose-400" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offensive vs Defensive Options Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-extrabold font-heading uppercase text-white tracking-wide">
              Technique Arsenal in {currentPosition.name}
            </h3>
            <div className="text-xs text-slate-400">Submissions, sweeps, passes, and high-percentage escapes</div>
          </div>

          {/* Filter segment */}
          <div className="flex items-center gap-1 p-1 bg-[#12151f] rounded-lg border border-slate-800">
            <button
              onClick={() => setOptionFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                optionFilter === 'all'
                  ? 'bg-rose-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Moves
            </button>
            <button
              onClick={() => setOptionFilter('offensive')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                optionFilter === 'offensive'
                  ? 'bg-rose-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Offense
            </button>
            <button
              onClick={() => setOptionFilter('defensive')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                optionFilter === 'defensive'
                  ? 'bg-rose-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Defense
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Offensive Options Column */}
          {(optionFilter === 'all' || optionFilter === 'offensive') && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400">
                <Swords className="w-4 h-4" />
                <span>Offensive Options (Attacks & Sweeps)</span>
              </div>

              <div className="space-y-2.5">
                {currentPosition.offensiveOptions.map((opt, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#12151f] border border-slate-800 rounded-xl space-y-1.5 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-sm text-white">{opt.name}</div>
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="px-2 py-0.5 rounded bg-rose-950/60 text-rose-400 border border-rose-900/40 font-semibold">
                          {opt.type}
                        </span>
                        <span className="text-slate-400">{opt.difficulty}</span>
                      </div>
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed">
                      {opt.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Defensive Options Column */}
          {(optionFilter === 'all' || optionFilter === 'defensive') && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
                <Shield className="w-4 h-4" />
                <span>Defensive Escapes & Posture Restorations</span>
              </div>

              <div className="space-y-2.5">
                {currentPosition.defensiveOptions.map((opt, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#12151f] border border-slate-800 rounded-xl space-y-1.5 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-sm text-white">{opt.name}</div>
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-400 border border-blue-900/40 font-semibold">
                          {opt.type}
                        </span>
                        <span className="text-slate-400">{opt.difficulty}</span>
                      </div>
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed">
                      {opt.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
