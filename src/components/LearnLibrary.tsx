import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Discipline, Difficulty } from '../types';
import { APP_IMAGES } from '../data/mmaData';
import { BjjPositionExplorer } from './BjjPositionExplorer';
import {
  Search,
  Filter,
  Bookmark,
  CheckCircle,
  Play,
  ArrowRight,
  BookOpen,
  Layers,
  Sparkles,
  Video,
  Tv,
  Clock
} from 'lucide-react';

export const LearnLibrary: React.FC = () => {
  const {
    techniques,
    learnSubTab,
    setLearnSubTab,
    viewTechnique,
    openTechniqueVideo,
    profile,
    toggleFavoriteTechnique,
    toggleLearnedTechnique
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [onlyLearned, setOnlyLearned] = useState(false);

  const disciplines: (Discipline | 'All')[] = ['All', 'Boxing', 'Muay Thai', 'Wrestling', 'BJJ', 'MMA', 'Judo / Sambo'];
  const difficulties: (Difficulty | 'All')[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Filtered techniques list
  const filteredTechniques = useMemo(() => {
    return techniques.filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDiscipline = selectedDiscipline === 'All' || t.discipline === selectedDiscipline;
      const matchesDifficulty = selectedDifficulty === 'All' || t.difficulty === selectedDifficulty;
      const matchesFav = !onlyFavorites || profile.favoriteTechniqueIds.includes(t.id);
      const matchesLearned = !onlyLearned || profile.learnedTechniqueIds.includes(t.id);

      return matchesSearch && matchesDiscipline && matchesDifficulty && matchesFav && matchesLearned;
    });
  }, [techniques, searchQuery, selectedDiscipline, selectedDifficulty, onlyFavorites, onlyLearned, profile]);

  return (
    <div className="space-y-8 pb-20">
      {/* Sub-tab Navigation: Technique Library vs BJJ Position Explorer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold font-heading uppercase text-white tracking-wide">
            MMA Knowledge Repository
          </h1>
          <div className="text-xs text-slate-400">
            {techniques.length} combat techniques & video breakdowns documented across 6 combat arts
          </div>
        </div>

        {/* Sub-tab switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-[#12151f] rounded-xl border border-slate-800">
          <button
            onClick={() => setLearnSubTab('techniques')}
            className={`min-h-[40px] px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              learnSubTab === 'techniques'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Technique Library</span>
          </button>

          <button
            onClick={() => setLearnSubTab('positions')}
            className={`min-h-[40px] px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              learnSubTab === 'positions'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>BJJ Position Map</span>
          </button>
        </div>
      </div>

      {learnSubTab === 'positions' ? (
        <BjjPositionExplorer />
      ) : (
        <div className="space-y-6">
          {/* Search & Filters Bar */}
          <div className="bg-[#12151f] border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
            <div className="flex flex-col md:flex-row items-center gap-3">
              {/* Search input */}
              <div className="relative w-full md:flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search punches, takedowns, submissions, escapes..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0a0b0e] border border-slate-800 rounded-lg text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>

              {/* Toggles: Favorites and Mastered */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <button
                  onClick={() => setOnlyFavorites(!onlyFavorites)}
                  className={`flex-1 md:flex-none px-3.5 py-2.5 rounded-lg text-xs font-semibold border transition-colors flex items-center justify-center gap-1.5 ${
                    onlyFavorites
                      ? 'bg-rose-950/40 border-rose-600 text-rose-400'
                      : 'bg-[#0a0b0e] border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-current' : ''}`} />
                  <span>Favorites</span>
                </button>

                <button
                  onClick={() => setOnlyLearned(!onlyLearned)}
                  className={`flex-1 md:flex-none px-3.5 py-2.5 rounded-lg text-xs font-semibold border transition-colors flex items-center justify-center gap-1.5 ${
                    onlyLearned
                      ? 'bg-emerald-950/40 border-emerald-600 text-emerald-400'
                      : 'bg-[#0a0b0e] border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CheckCircle className={`w-3.5 h-3.5 ${onlyLearned ? 'fill-current' : ''}`} />
                  <span>Mastered</span>
                </button>
              </div>
            </div>

            {/* Discipline selector pills/buttons */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs text-slate-500 mr-1 font-medium">Discipline:</span>
              {disciplines.map((d) => {
                const count = d === 'All' ? techniques.length : techniques.filter((t) => t.discipline === d).length;
                return (
                  <button
                    key={d}
                    onClick={() => setSelectedDiscipline(d)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      selectedDiscipline === d
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-[#181c28] text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span>{d}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                      selectedDiscipline === d ? 'bg-black/30 text-white' : 'bg-[#10131d] text-slate-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Difficulty selector */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-500 mr-1 font-medium">Difficulty:</span>
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedDifficulty === diff
                      ? 'bg-slate-200 text-slate-900 font-bold'
                      : 'bg-[#181c28] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Results Counter */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Showing {filteredTechniques.length} of {techniques.length} techniques</span>
            {(searchQuery || selectedDiscipline !== 'All' || selectedDifficulty !== 'All' || onlyFavorites || onlyLearned) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDiscipline('All');
                  setSelectedDifficulty('All');
                  setOnlyFavorites(false);
                  setOnlyLearned(false);
                }}
                className="text-rose-400 hover:underline"
              >
                Reset filters
              </button>
            )}
          </div>

          {/* Techniques Grid */}
          {filteredTechniques.length === 0 ? (
            <div className="bg-[#12151f] border border-slate-800 rounded-xl p-12 text-center space-y-3">
              <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
              <div className="text-lg font-bold font-heading uppercase text-slate-300">
                No Techniques Matched
              </div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try loosening your search query or discipline filters to view full combat fundamentals.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTechniques.map((tech) => {
                const isFav = profile.favoriteTechniqueIds.includes(tech.id);
                const isMastered = profile.learnedTechniqueIds.includes(tech.id);

                const cardImage =
                  tech.imageKey === 'striking'
                    ? APP_IMAGES.striking
                    : tech.imageKey === 'bjj'
                    ? APP_IMAGES.bjj
                    : tech.imageKey === 'wrestling'
                    ? APP_IMAGES.wrestling
                    : APP_IMAGES.hero;

                return (
                  <div
                    key={tech.id}
                    className="bg-[#12151f] border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden flex flex-col justify-between transition-all group hover:shadow-xl shadow-black/40"
                  >
                    <div>
                      {/* Card Thumbnail Area with Instant In-App Video Trigger */}
                      <div
                        className="relative h-44 bg-slate-900 overflow-hidden cursor-pointer group/thumb"
                        onClick={() => openTechniqueVideo(tech)}
                        title={`Watch ${tech.name} video lesson`}
                      >
                        <img
                          src={cardImage}
                          alt={tech.name}
                          className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#12151f] via-black/30 to-black/40" />

                        {/* Top Tags */}
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white">
                            {tech.discipline}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-rose-950/80 backdrop-blur-md text-[10px] font-semibold text-rose-300 border border-rose-900/50">
                            {tech.difficulty}
                          </span>
                        </div>

                        {/* Hover / Tap Play Video Badge */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-xl shadow-rose-950/60 transform group-hover/thumb:scale-110 transition-all border border-rose-400/50">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>
                        </div>

                        {/* Bottom Thumbnail Metadata */}
                        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-slate-200">
                          <span className="bg-black/70 backdrop-blur-md px-2 py-0.5 rounded font-medium flex items-center gap-1">
                            <Video className="w-3 h-3 text-rose-400" />
                            <span className="truncate max-w-[120px]">{tech.videoInstructor || 'Master Coach'}</span>
                          </span>
                          <span className="bg-black/70 backdrop-blur-md px-2 py-0.5 rounded font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{tech.videoDuration || 'Lesson'}</span>
                          </span>
                        </div>

                        {/* Quick action buttons */}
                        <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavoriteTechnique(tech.id);
                            }}
                            className={`p-1.5 rounded-md backdrop-blur-md transition-colors ${
                              isFav
                                ? 'bg-rose-600 text-white'
                                : 'bg-black/70 text-slate-300 hover:text-white'
                            }`}
                            title={isFav ? 'Favorited' : 'Add to favorites'}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLearnedTechnique(tech.id);
                            }}
                            className={`p-1.5 rounded-md backdrop-blur-md transition-colors ${
                              isMastered
                                ? 'bg-emerald-600 text-white'
                                : 'bg-black/70 text-slate-300 hover:text-white'
                            }`}
                            title={isMastered ? 'Mastered' : 'Mark as learned'}
                          >
                            <CheckCircle className={`w-3.5 h-3.5 ${isMastered ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-4 space-y-2 cursor-pointer" onClick={() => viewTechnique(tech.id)}>
                        <div className="text-[11px] text-slate-400 font-medium">
                          {tech.category}
                        </div>
                        <h3 className="text-lg font-bold font-heading uppercase text-white group-hover:text-rose-400 transition-colors">
                          {tech.name}
                        </h3>
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          {tech.description}
                        </p>
                      </div>
                    </div>

                    {/* In-App Direct Actions Footer (No External Links) */}
                    <div className="p-3 border-t border-slate-800 bg-[#0d0f17] space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => openTechniqueVideo(tech)}
                          className="py-2 px-3 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md shadow-rose-950/40 active:scale-95"
                          title="Watch video lesson directly in-app"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Watch Video</span>
                        </button>

                        <button
                          onClick={() => viewTechnique(tech.id)}
                          className="py-2 px-3 bg-[#181c28] hover:bg-[#222738] text-slate-200 hover:text-white border border-slate-700/80 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-95"
                          title="Open full step-by-step curriculum"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                          <span>Breakdown</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
