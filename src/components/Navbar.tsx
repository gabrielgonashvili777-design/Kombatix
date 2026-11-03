import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Flame,
  BookOpen,
  Cpu,
  Timer,
  User,
  Zap,
  Globe
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, setTrainingSubTab } = useApp();

  const handleStartTimer = () => {
    setActiveTab('training');
    setTrainingSubTab('timer');
  };

  return (
    <>
      {/* Desktop & Tablet Top Bar (Adheres to 3-zone contract) */}
      <header className="sticky top-0 z-40 bg-[#0c0e14]/95 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element brand wordmark */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left group transition-transform active:scale-95 shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold shadow-md shadow-rose-900/30 group-hover:bg-rose-500 transition-colors">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <span className="text-2xl font-extrabold tracking-wider font-heading uppercase text-white whitespace-nowrap">
              Fight<span className="text-rose-500">Lab</span>
            </span>
          </button>

          {/* Zone 2: 5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide whitespace-nowrap">
            <button
              onClick={() => setActiveTab('home')}
              className={`transition-colors py-1 relative ${
                activeTab === 'home'
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Home
              {activeTab === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('learn')}
              className={`transition-colors py-1 relative ${
                activeTab === 'learn'
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Learn Library
              {activeTab === 'learn' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('ai-coach')}
              className={`transition-colors py-1 relative flex items-center gap-1.5 ${
                activeTab === 'ai-coach'
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-4 h-4 text-rose-500" />
              <span>AI Video Analyzer</span>
              {activeTab === 'ai-coach' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('training')}
              className={`transition-colors py-1 relative ${
                activeTab === 'training'
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Training & Timer
              {activeTab === 'training' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`transition-colors py-1 relative ${
                activeTab === 'profile'
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Fighter Profile
              {activeTab === 'profile' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('community')}
              className={`transition-colors py-1 relative ${
                activeTab === 'community'
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Community
              {activeTab === 'community' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500 rounded-full" />
              )}
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleStartTimer}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-md shadow-rose-950/40 transition-transform active:scale-95 whitespace-nowrap flex items-center gap-2"
            >
              <Timer className="w-4 h-4" />
              <span>Round Timer</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fixed Bottom Navigation Bar (Pattern 1 from Mobile Reference) */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0e14]/95 backdrop-blur-lg border-t border-slate-800/90 pb-safe"
      >
        <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto px-1">
          <button
            onClick={() => setActiveTab('home')}
            className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors ${
              activeTab === 'home' ? 'text-rose-500' : 'text-slate-400'
            }`}
          >
            <Flame className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight mt-1">Home</span>
          </button>

          <button
            onClick={() => setActiveTab('learn')}
            className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors ${
              activeTab === 'learn' ? 'text-rose-500' : 'text-slate-400'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight mt-1">Learn</span>
          </button>

          <button
            onClick={() => setActiveTab('ai-coach')}
            className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors ${
              activeTab === 'ai-coach' ? 'text-rose-500 font-bold' : 'text-slate-400'
            }`}
          >
            <Cpu className="w-5 h-5" />
            <span className="text-[10px] tracking-tight mt-1">AI Analyzer</span>
          </button>

          <button
            onClick={() => setActiveTab('training')}
            className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors ${
              activeTab === 'training' ? 'text-rose-500' : 'text-slate-400'
            }`}
          >
            <Timer className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight mt-1">Training</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors ${
              activeTab === 'profile' ? 'text-rose-500' : 'text-slate-400'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight mt-1">Profile</span>
          </button>
        </div>
      </nav>
    </>
  );
};
