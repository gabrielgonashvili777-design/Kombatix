import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomeDashboard } from './components/HomeDashboard';
import { LearnLibrary } from './components/LearnLibrary';
import { AiCoachSection } from './components/AiCoachSection';
import { TrainingSection } from './components/TrainingSection';
import { FighterProfile } from './components/FighterProfile';
import { CommunitySection } from './components/CommunitySection';
import { TechniqueDetailModal } from './components/TechniqueDetailModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { MiniTimerHUD } from './components/MiniTimerHUD';

const MainContent: React.FC = () => {
  const {
    activeTab,
    selectedTechnique,
    setSelectedTechnique,
    activeVideoTechnique,
    setActiveVideoTechnique,
    toast
  } = useApp();

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-slate-100 flex flex-col font-sans selection:bg-rose-600 selection:text-white">
      {/* 3-Zone Navigation Header */}
      <Navbar />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'home' && <HomeDashboard />}
        {activeTab === 'learn' && <LearnLibrary />}
        {activeTab === 'ai-coach' && <AiCoachSection />}
        {activeTab === 'training' && <TrainingSection />}
        {activeTab === 'profile' && <FighterProfile />}
        {activeTab === 'community' && <CommunitySection />}
      </main>

      {/* Floating In-App Toast Notification Banner */}
      {toast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 animate-in slide-in-from-top-4 fade-in duration-200">
          <div className={`px-4 py-3 rounded-xl border shadow-2xl flex items-center gap-3 backdrop-blur-md ${
            toast.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/60 text-emerald-200 shadow-emerald-950/50'
              : toast.type === 'warning'
              ? 'bg-amber-950/90 border-amber-500/60 text-amber-200 shadow-amber-950/50'
              : 'bg-rose-950/90 border-rose-500/60 text-rose-200 shadow-rose-950/50'
          }`}>
            <span className="w-2 h-2 rounded-full bg-current animate-ping shrink-0" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Persistent Floating Mini-Timer across all screens */}
      <MiniTimerHUD />

      {/* Modal Overlay for Single Technique Examination */}
      {selectedTechnique && (
        <TechniqueDetailModal
          technique={selectedTechnique}
          onClose={() => setSelectedTechnique(null)}
        />
      )}

      {/* Instant Video Player Modal */}
      {activeVideoTechnique && (
        <VideoPlayerModal
          technique={activeVideoTechnique}
          onClose={() => setActiveVideoTechnique(null)}
        />
      )}

      {/* Professional Footer */}
      <footer className="border-t border-slate-900 bg-[#08090d] py-8 px-4 text-center text-xs text-slate-400 mt-auto pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-heading font-black uppercase tracking-wider text-slate-300">
              Fight<span className="text-rose-500">Lab</span>
            </span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>All-In-One MMA Learning & Training Platform</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Free Forever</span>
            <span aria-hidden="true">·</span>
            <span>Unified MMA Rules</span>
            <span aria-hidden="true">·</span>
            <span>Always Train Under Qualified Supervision</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
