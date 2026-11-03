import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Technique,
  BjjPosition,
  TrainingSession,
  ShadowboxAnalysis,
  UserProfile,
  Achievement,
  DailyChallenge,
  Discipline,
  SparringScorecard
} from '../types';
import {
  MMA_TECHNIQUES,
  BJJ_POSITIONS,
  INITIAL_ACHIEVEMENTS,
  INITIAL_DAILY_CHALLENGES
} from '../data/mmaData';
import { sound } from '../utils/audio';

interface AppContextType {
  activeTab: 'home' | 'learn' | 'ai-coach' | 'training' | 'profile' | 'community';
  setActiveTab: (tab: 'home' | 'learn' | 'ai-coach' | 'training' | 'profile' | 'community') => void;
  learnSubTab: 'techniques' | 'positions';
  setLearnSubTab: (tab: 'techniques' | 'positions') => void;
  aiCoachSubTab: 'shadowbox' | 'assistant';
  setAiCoachSubTab: (tab: 'shadowbox' | 'assistant') => void;
  trainingSubTab: 'timer' | 'drills' | 'gameplan' | 'scorecard' | 'journal';
  setTrainingSubTab: (tab: 'timer' | 'drills' | 'gameplan' | 'scorecard' | 'journal') => void;

  // Scorecards
  scorecards: SparringScorecard[];
  saveScorecard: (scorecard: SparringScorecard) => void;
  deleteScorecard: (id: string) => void;

  // Centralized Background-Persistent Round Timer
  timerPhase: 'idle' | 'prep' | 'work' | 'rest' | 'finished';
  isTimerRunning: boolean;
  currentRound: number;
  totalRounds: number;
  roundMinutes: number;
  roundSeconds: number;
  restMinutes: number;
  restSeconds: number;
  prepSeconds: number;
  secondsRemaining: number;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  bellSoundType: 'brass' | 'horn' | 'double';
  setBellSoundType: (type: 'brass' | 'horn' | 'double') => void;
  coachCalloutsEnabled: boolean;
  setCoachCalloutsEnabled: (enabled: boolean) => void;
  backgroundNotificationsEnabled: boolean;
  requestNotificationPermission: () => Promise<void>;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  applyTimerPreset: (rMin: number, rSec: number, restMin: number, restSec: number, rounds: number) => void;
  updateTimerConfig: (config: {
    roundMinutes?: number;
    roundSeconds?: number;
    restMinutes?: number;
    restSeconds?: number;
    totalRounds?: number;
    prepSeconds?: number;
  }) => void;
  
  // Techniques & Positions
  techniques: Technique[];
  positions: BjjPosition[];
  selectedTechnique: Technique | null;
  setSelectedTechnique: (tech: Technique | null) => void;
  activeVideoTechnique: Technique | null;
  setActiveVideoTechnique: (tech: Technique | null) => void;
  openTechniqueVideo: (tech: Technique) => void;
  selectedPositionId: string;
  setSelectedPositionId: (id: string) => void;
  recentlyViewedIds: string[];
  viewTechnique: (id: string) => void;
  
  // User & Progression
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  toggleFavoriteTechnique: (id: string) => void;
  toggleLearnedTechnique: (id: string) => void;
  
  // Training & Analysis
  trainingSessions: TrainingSession[];
  logTrainingSession: (session: Omit<TrainingSession, 'id' | 'date'>) => void;
  shadowboxHistory: ShadowboxAnalysis[];
  saveShadowboxAnalysis: (analysis: ShadowboxAnalysis) => void;
  
  // Challenges & Achievements
  challenges: DailyChallenge[];
  toggleChallengeComplete: (id: string) => void;
  achievements: Achievement[];

  // In-App Toast Notifications (replaces blocking alerts)
  toast: { message: string; type: 'success' | 'info' | 'warning' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const DEFAULT_PROFILE: UserProfile = {
  id: 'usr-1',
  username: 'Alex Silva',
  nickname: 'The Iron Apex',
  rank: 'Amateur MMA (4-1-0)',
  avatarUrl: '/src/assets/images/hero_mma_fighter_1793692164782.jpg',
  preferredDiscipline: 'MMA',
  stance: 'Orthodox',
  experience: 'Intermediate',
  weightClass: 'Lightweight (155 lbs)',
  streakDays: 7,
  totalRounds: 42,
  favoriteTechniqueIds: ['box-cross', 'bjj-triangle', 'mt-low-kick', 'wrest-sprawl'],
  learnedTechniqueIds: ['box-jab', 'box-cross', 'mt-low-kick', 'bjj-closed-guard'],
  completedChallengeIds: ['dc-3'],
  weeklyRoundGoal: 20,
  privacy: 'public'
};

const INITIAL_SESSIONS: TrainingSession[] = [
  {
    id: 'ts-1',
    date: '2026-11-02',
    type: 'Timer',
    roundsCompleted: 5,
    durationMinutes: 25,
    discipline: 'MMA',
    notes: '5x5min championship rounds with 1m rest. Heavy focus on level change combinations into cage pressure.',
    rpe: 8
  },
  {
    id: 'ts-2',
    date: '2026-11-01',
    type: 'Shadowbox',
    roundsCompleted: 3,
    durationMinutes: 12,
    discipline: 'Boxing',
    notes: 'Slip cord footwork. High guard glued to cheek while throwing 3-2.',
    rpe: 7
  },
  {
    id: 'ts-3',
    date: '2026-10-30',
    type: 'BJJ Roll',
    roundsCompleted: 6,
    durationMinutes: 36,
    discipline: 'BJJ',
    notes: 'Positional rolling from side control bottom. Worked elbow-knee escapes and guard recovery.',
    rpe: 9
  }
];

const INITIAL_SHADOWBOX: ShadowboxAnalysis[] = [
  {
    id: 'sb-1',
    date: '2026-10-31',
    stance: 'Orthodox',
    overallScore: 84,
    categoryScores: {
      guard: 8.5,
      stance: 8.0,
      footwork: 8.5,
      balance: 9.0,
      punchTechnique: 8.5,
      headMovement: 7.5,
      coordination: 8.5
    },
    strengths: [
      'High rear hand guard anchored tightly during cross extension.',
      'Smooth pivot exits off the lead foot after throwing combinations.',
      'Excellent athletic hip torque and kinetic chain power transfer.'
    ],
    areasForImprovement: [
      'Head remains stationary on the centerline during 3-punch combinations.',
      'Lead hand occasionally dips 2 inches before launching the hook.',
      'Recovery step is slightly sluggish when exiting backward in straight line.'
    ],
    recommendations: [
      'Incorporate immediate slip or roll resets after every combination.',
      'Work with a slip cord 3 rounds daily to drill subconscious head movement.',
      'Practice lateral angle cuts rather than linear retreats.'
    ],
    recommendedDrills: ['Slip & Counter 1-2', 'Lead Pivot & Check Hook', 'Pendulum Step Reset'],
    summary: 'Strong technical baseline and crisp hand speed. Main focus should be head movement off center.',
    isAiEvaluated: true,
    evaluatorNote: 'Verified Gemini Biomechanics analysis'
  }
];

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'learn' | 'ai-coach' | 'training' | 'profile' | 'community'>('home');
  const [learnSubTab, setLearnSubTab] = useState<'techniques' | 'positions'>('techniques');
  const [aiCoachSubTab, setAiCoachSubTab] = useState<'shadowbox' | 'assistant'>('shadowbox');
  const [trainingSubTab, setTrainingSubTab] = useState<'timer' | 'drills' | 'gameplan' | 'scorecard' | 'journal'>('timer');

  // Scorecards
  const [scorecards, setScorecards] = useState<SparringScorecard[]>(() => {
    try {
      const saved = localStorage.getItem('fightlab_scorecards');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'sc-1',
        date: '2026-11-01',
        opponentName: 'Marcus Vance (Welterweight Pro)',
        weightClass: 'Welterweight (170 lbs)',
        rounds: [
          {
            round: 1,
            redScore: 10,
            blueScore: 9,
            redSigStrikes: 24,
            blueSigStrikes: 18,
            redTakedowns: 1,
            blueTakedowns: 0,
            redControlSeconds: 85,
            blueControlSeconds: 15,
            redKnockdowns: 0,
            blueKnockdowns: 0
          },
          {
            round: 2,
            redScore: 9,
            blueScore: 10,
            redSigStrikes: 19,
            blueSigStrikes: 26,
            redTakedowns: 0,
            blueTakedowns: 1,
            redControlSeconds: 20,
            blueControlSeconds: 95,
            redKnockdowns: 0,
            blueKnockdowns: 0
          },
          {
            round: 3,
            redScore: 10,
            blueScore: 9,
            redSigStrikes: 31,
            blueSigStrikes: 16,
            redTakedowns: 2,
            blueTakedowns: 0,
            redControlSeconds: 110,
            blueControlSeconds: 10,
            redKnockdowns: 1,
            blueKnockdowns: 0
          }
        ],
        finalDecision: 'Unanimous Decision (29-28, 29-28, 30-27) for Fighter (Red)',
        notes: 'Round 3 knockdown via check hook into high mount control sealed the win.'
      }
    ];
  });

  // Centralized Background-Persistent Round Timer State
  const [roundMinutes, setRoundMinutes] = useState(3);
  const [roundSeconds, setRoundSeconds] = useState(0);
  const [restMinutes, setRestMinutes] = useState(1);
  const [restSeconds, setRestSeconds] = useState(0);
  const [totalRounds, setTotalRounds] = useState(5);
  const [prepSeconds, setPrepSeconds] = useState(10);
  const [currentRound, setCurrentRound] = useState(1);
  const [timerPhase, setTimerPhase] = useState<'idle' | 'prep' | 'work' | 'rest' | 'finished'>('idle');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(3 * 60);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bellSoundType, setBellSoundType] = useState<'brass' | 'horn' | 'double'>('brass');
  const [coachCalloutsEnabled, setCoachCalloutsEnabled] = useState(true);
  const [backgroundNotificationsEnabled, setBackgroundNotificationsEnabled] = useState(false);

  // In-App Toast Notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);
  const toastTimeoutRef = React.useRef<any>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Exact target timestamp in ms for the current phase (wall-clock anchor)
  const phaseEndTimestampRef = React.useRef<number | null>(null);
  const timerIntervalRef = React.useRef<any>(null);

  const [techniques] = useState<Technique[]>(MMA_TECHNIQUES);
  const [positions] = useState<BjjPosition[]>(BJJ_POSITIONS);
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);
  const [activeVideoTechnique, setActiveVideoTechnique] = useState<Technique | null>(null);
  const [selectedPositionId, setSelectedPositionId] = useState<string>('pos-closed-guard');

  const openTechniqueVideo = (tech: Technique) => {
    setActiveVideoTechnique(tech);
    setRecentlyViewedIds((prev) => {
      const next = [tech.id, ...prev.filter((i) => i !== tech.id)].slice(0, 8);
      return next;
    });
  };

  // Persistence for user profile
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('fightlab_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Recently viewed techniques
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fightlab_recent_techniques');
      return saved ? JSON.parse(saved) : ['box-jab', 'bjj-closed-guard', 'wrest-double-leg'];
    } catch {
      return ['box-jab', 'bjj-closed-guard', 'wrest-double-leg'];
    }
  });

  // Training Sessions
  const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>(() => {
    try {
      const saved = localStorage.getItem('fightlab_sessions');
      return saved ? JSON.parse(saved) : INITIAL_SESSIONS;
    } catch {
      return INITIAL_SESSIONS;
    }
  });

  // Shadowbox History
  const [shadowboxHistory, setShadowboxHistory] = useState<ShadowboxAnalysis[]>(() => {
    try {
      const saved = localStorage.getItem('fightlab_shadowbox');
      return saved ? JSON.parse(saved) : INITIAL_SHADOWBOX;
    } catch {
      return INITIAL_SHADOWBOX;
    }
  });

  // Challenges
  const [challenges, setChallenges] = useState<DailyChallenge[]>(() => {
    try {
      const saved = localStorage.getItem('fightlab_challenges');
      return saved ? JSON.parse(saved) : INITIAL_DAILY_CHALLENGES;
    } catch {
      return INITIAL_DAILY_CHALLENGES;
    }
  });

  // Achievements
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      const saved = localStorage.getItem('fightlab_achievements');
      return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
    } catch {
      return INITIAL_ACHIEVEMENTS;
    }
  });

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('fightlab_profile', JSON.stringify(profile));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('fightlab_recent_techniques', JSON.stringify(recentlyViewedIds));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [recentlyViewedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('fightlab_sessions', JSON.stringify(trainingSessions));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [trainingSessions]);

  useEffect(() => {
    try {
      localStorage.setItem('fightlab_shadowbox', JSON.stringify(shadowboxHistory));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [shadowboxHistory]);

  useEffect(() => {
    try {
      localStorage.setItem('fightlab_challenges', JSON.stringify(challenges));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [challenges]);

  useEffect(() => {
    try {
      localStorage.setItem('fightlab_scorecards', JSON.stringify(scorecards));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [scorecards]);

  // Scorecard actions
  const saveScorecard = (scorecard: SparringScorecard) => {
    setScorecards((prev) => [scorecard, ...prev.filter((s) => s.id !== scorecard.id)]);
  };

  const deleteScorecard = (id: string) => {
    setScorecards((prev) => prev.filter((s) => s.id !== id));
  };

  // ----------------------------------------------------
  // CENTRALIZED BACKGROUND-PERSISTENT ROUND TIMER ENGINE
  // ----------------------------------------------------
  const playCurrentBell = () => {
    if (!soundEnabled) return;
    if (bellSoundType === 'horn') {
      sound.playTitleFightHorn();
    } else if (bellSoundType === 'double') {
      sound.playDoubleBell();
    } else {
      sound.playRoundBell();
    }
  };

  const sendBackgroundNotification = (title: string, body: string) => {
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    if (Notification.permission === 'granted' && document.hidden) {
      try {
        new Notification(title, { body, icon: '/favicon.ico' });
      } catch {}
    }
  };

  const requestNotificationPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    try {
      const res = await Notification.requestPermission();
      setBackgroundNotificationsEnabled(res === 'granted');
    } catch {}
  };

  const updateTimerConfig = (config: {
    roundMinutes?: number;
    roundSeconds?: number;
    restMinutes?: number;
    restSeconds?: number;
    totalRounds?: number;
    prepSeconds?: number;
  }) => {
    if (config.roundMinutes !== undefined) setRoundMinutes(config.roundMinutes);
    if (config.roundSeconds !== undefined) setRoundSeconds(config.roundSeconds);
    if (config.restMinutes !== undefined) setRestMinutes(config.restMinutes);
    if (config.restSeconds !== undefined) setRestSeconds(config.restSeconds);
    if (config.totalRounds !== undefined) setTotalRounds(config.totalRounds);
    if (config.prepSeconds !== undefined) setPrepSeconds(config.prepSeconds);

    if (timerPhase === 'idle') {
      const rm = config.roundMinutes !== undefined ? config.roundMinutes : roundMinutes;
      const rs = config.roundSeconds !== undefined ? config.roundSeconds : roundSeconds;
      setSecondsRemaining(rm * 60 + rs);
    }
  };

  const applyTimerPreset = (rMin: number, rSec: number, restMin: number, restSec: number, rounds: number) => {
    setIsTimerRunning(false);
    clearInterval(timerIntervalRef.current);
    phaseEndTimestampRef.current = null;
    setTimerPhase('idle');
    setCurrentRound(1);
    setRoundMinutes(rMin);
    setRoundSeconds(rSec);
    setRestMinutes(restMin);
    setRestSeconds(restSec);
    setTotalRounds(rounds);
    setSecondsRemaining(rMin * 60 + rSec);
  };

  const handlePhaseTransition = () => {
    if (timerPhase === 'prep') {
      playCurrentBell();
      if (soundEnabled && coachCalloutsEnabled) {
        setTimeout(() => sound.speakCoachCallout('Round 1! Hands high, let us work!'), 600);
      }
      sendBackgroundNotification('FightLab Round 1 Started! 🥊', 'Round 1 is active. Keep your chin tucked!');
      setTimerPhase('work');
      const dur = roundMinutes * 60 + roundSeconds;
      phaseEndTimestampRef.current = Date.now() + dur * 1000;
      setSecondsRemaining(dur);
    } else if (timerPhase === 'work') {
      playCurrentBell();
      if (currentRound >= totalRounds) {
        setTimerPhase('finished');
        setIsTimerRunning(false);
        phaseEndTimestampRef.current = null;
        if (soundEnabled && coachCalloutsEnabled) {
          setTimeout(() => sound.speakCoachCallout('Workout complete! Great war, warrior!'), 600);
        }
        sendBackgroundNotification('FightLab Workout Complete! 🏆', `Completed all ${totalRounds} championship rounds!`);
      } else {
        setTimerPhase('rest');
        const restDur = restMinutes * 60 + restSeconds;
        phaseEndTimestampRef.current = Date.now() + restDur * 1000;
        setSecondsRemaining(restDur);
        if (soundEnabled && coachCalloutsEnabled) {
          setTimeout(() => sound.speakCoachCallout('Breathe deep. Lower your heart rate.'), 600);
        }
        sendBackgroundNotification(`Round ${currentRound} Complete! ⏱️`, `Rest period active (${restDur}s). Breathe deep.`);
      }
    } else if (timerPhase === 'rest') {
      const nextRnd = currentRound + 1;
      playCurrentBell();
      setCurrentRound(nextRnd);
      setTimerPhase('work');
      const workDur = roundMinutes * 60 + roundSeconds;
      phaseEndTimestampRef.current = Date.now() + workDur * 1000;
      setSecondsRemaining(workDur);
      if (soundEnabled && coachCalloutsEnabled) {
        setTimeout(() => sound.speakCoachCallout(`Round ${nextRnd}! Attack the angles!`), 600);
      }
      sendBackgroundNotification(`Round ${nextRnd} Active! 🥊`, `Round ${nextRnd} of ${totalRounds} started.`);
    }
  };

  const startTimer = () => {
    let targetSec = secondsRemaining;
    if (timerPhase === 'idle' || timerPhase === 'finished') {
      setTimerPhase('prep');
      setCurrentRound(1);
      targetSec = prepSeconds;
    } else if (targetSec <= 0) {
      targetSec = roundMinutes * 60 + roundSeconds;
    }
    phaseEndTimestampRef.current = Date.now() + targetSec * 1000;
    setSecondsRemaining(targetSec);
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
    if (phaseEndTimestampRef.current) {
      const rem = Math.max(0, Math.ceil((phaseEndTimestampRef.current - Date.now()) / 1000));
      setSecondsRemaining(rem);
    }
    phaseEndTimestampRef.current = null;
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    clearInterval(timerIntervalRef.current);
    phaseEndTimestampRef.current = null;
    setTimerPhase('idle');
    setCurrentRound(1);
    setSecondsRemaining(roundMinutes * 60 + roundSeconds);
  };

  // Wall-Clock Synchronization function (executes when user leaves app and returns)
  const syncTimerWithWallClock = () => {
    if (!isTimerRunning || !phaseEndTimestampRef.current) return;
    const now = Date.now();
    const remaining = Math.ceil((phaseEndTimestampRef.current - now) / 1000);

    if (remaining > 0) {
      setSecondsRemaining(remaining);
    } else {
      let elapsedPast = Math.abs(remaining);
      let curPhase = timerPhase;
      let curRnd = currentRound;
      const workDur = roundMinutes * 60 + roundSeconds;
      const restDur = restMinutes * 60 + restSeconds;

      while (elapsedPast >= 0) {
        if (curPhase === 'prep') {
          curPhase = 'work';
          if (elapsedPast < workDur) {
            setTimerPhase('work');
            setCurrentRound(curRnd);
            const rem = workDur - elapsedPast;
            phaseEndTimestampRef.current = now + rem * 1000;
            setSecondsRemaining(rem);
            playCurrentBell();
            return;
          }
          elapsedPast -= workDur;
        } else if (curPhase === 'work') {
          if (curRnd >= totalRounds) {
            setTimerPhase('finished');
            setIsTimerRunning(false);
            phaseEndTimestampRef.current = null;
            setSecondsRemaining(0);
            playCurrentBell();
            return;
          }
          curPhase = 'rest';
          if (elapsedPast < restDur) {
            setTimerPhase('rest');
            setCurrentRound(curRnd);
            const rem = restDur - elapsedPast;
            phaseEndTimestampRef.current = now + rem * 1000;
            setSecondsRemaining(rem);
            playCurrentBell();
            return;
          }
          elapsedPast -= restDur;
        } else if (curPhase === 'rest') {
          curRnd += 1;
          curPhase = 'work';
          if (elapsedPast < workDur) {
            setTimerPhase('work');
            setCurrentRound(curRnd);
            const rem = workDur - elapsedPast;
            phaseEndTimestampRef.current = now + rem * 1000;
            setSecondsRemaining(rem);
            playCurrentBell();
            return;
          }
          elapsedPast -= workDur;
        }
      }
    }
  };

  // Background Listeners: VisibilityChange, Window Focus & PageShow
  useEffect(() => {
    const handleVisibilityOrFocus = () => {
      syncTimerWithWallClock();
    };
    document.addEventListener('visibilitychange', handleVisibilityOrFocus);
    window.addEventListener('focus', handleVisibilityOrFocus);
    window.addEventListener('pageshow', handleVisibilityOrFocus);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
      window.removeEventListener('focus', handleVisibilityOrFocus);
      window.removeEventListener('pageshow', handleVisibilityOrFocus);
    };
  }, [isTimerRunning, timerPhase, currentRound, totalRounds, roundMinutes, roundSeconds, restMinutes, restSeconds]);

  // Main Timer Interval in AppProvider (runs across all app screens)
  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = setInterval(() => {
        if (!phaseEndTimestampRef.current) return;
        const now = Date.now();
        const rem = Math.max(0, Math.ceil((phaseEndTimestampRef.current - now) / 1000));
        setSecondsRemaining(rem);

        // 10-second warning sound
        if (rem === 11 && soundEnabled && timerPhase === 'work') {
          sound.playWarningClacker();
        }

        // Corner coach callout at 30 seconds
        if (rem === 31 && soundEnabled && coachCalloutsEnabled && timerPhase === 'work') {
          sound.speakCoachCallout('Thirty seconds! Steal the round!');
        }

        // Corner coach callout at 60 seconds
        if (rem === 61 && soundEnabled && coachCalloutsEnabled && timerPhase === 'work' && (roundMinutes * 60 + roundSeconds >= 120)) {
          sound.speakCoachCallout('One minute left! Keep your hands up!');
        }

        if (rem <= 0) {
          handlePhaseTransition();
        }
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [isTimerRunning, timerPhase, currentRound, totalRounds, soundEnabled, bellSoundType, coachCalloutsEnabled, roundMinutes, roundSeconds, restMinutes, restSeconds]);

  // Update browser Document Title so time is visible in background tabs/OS
  useEffect(() => {
    if (!isTimerRunning && timerPhase === 'idle') {
      document.title = 'FightLab - MMA Training & Learning Platform';
      return;
    }
    const mins = Math.floor(secondsRemaining / 60);
    const secs = secondsRemaining % 60;
    const timeStr = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    const phaseLabel = timerPhase === 'work' ? 'FIGHT' : timerPhase === 'rest' ? 'REST' : timerPhase === 'prep' ? 'PREP' : 'DONE';
    document.title = `[${timeStr} • R${currentRound} ${phaseLabel}] FightLab MMA`;
  }, [isTimerRunning, secondsRemaining, timerPhase, currentRound]);

  // View technique helper
  const viewTechnique = (id: string) => {
    const tech = techniques.find((t) => t.id === id);
    if (tech) {
      setSelectedTechnique(tech);
      setRecentlyViewedIds((prev) => {
        const next = [id, ...prev.filter((i) => i !== id)].slice(0, 8);
        return next;
      });
    }
  };

  // Toggle favorite
  const toggleFavoriteTechnique = (id: string) => {
    setProfile((prev) => {
      const exists = prev.favoriteTechniqueIds.includes(id);
      return {
        ...prev,
        favoriteTechniqueIds: exists
          ? prev.favoriteTechniqueIds.filter((t) => t !== id)
          : [...prev.favoriteTechniqueIds, id]
      };
    });
  };

  // Toggle mastered / learned
  const toggleLearnedTechnique = (id: string) => {
    setProfile((prev) => {
      const exists = prev.learnedTechniqueIds.includes(id);
      const nextLearned = exists
        ? prev.learnedTechniqueIds.filter((t) => t !== id)
        : [...prev.learnedTechniqueIds, id];

      // Update achievements
      setAchievements((achList) =>
        achList.map((ach) => {
          if (ach.id === 'ach-master-10') {
            const progress = nextLearned.length;
            return {
              ...ach,
              progress,
              unlocked: progress >= ach.maxProgress,
              unlockedDate: progress >= ach.maxProgress && !ach.unlocked ? new Date().toLocaleDateString() : ach.unlockedDate
            };
          }
          return ach;
        })
      );

      return {
        ...prev,
        learnedTechniqueIds: nextLearned
      };
    });
  };

  // Log workout
  const logTrainingSession = (sessionData: Omit<TrainingSession, 'id' | 'date'>) => {
    const newSession: TrainingSession = {
      ...sessionData,
      id: `ts-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    const nextSessions = [newSession, ...trainingSessions];
    setTrainingSessions(nextSessions);

    // Update profile stats
    setProfile((prev) => ({
      ...prev,
      totalRounds: prev.totalRounds + sessionData.roundsCompleted
    }));

    // Check achievement progress
    setAchievements((achList) =>
      achList.map((ach) => {
        if (ach.id === 'ach-train-10') {
          const progress = nextSessions.length;
          return {
            ...ach,
            progress,
            unlocked: progress >= 10,
            unlockedDate: progress >= 10 && !ach.unlocked ? new Date().toLocaleDateString() : ach.unlockedDate
          };
        }
        if (ach.id === 'ach-train-50') {
          const progress = nextSessions.length;
          return {
            ...ach,
            progress,
            unlocked: progress >= 50,
            unlockedDate: progress >= 50 && !ach.unlocked ? new Date().toLocaleDateString() : ach.unlockedDate
          };
        }
        return ach;
      })
    );
  };

  // Save shadowbox analysis
  const saveShadowboxAnalysis = (analysis: ShadowboxAnalysis) => {
    setShadowboxHistory((prev) => [analysis, ...prev]);
    // Unlock first AI analysis badge
    setAchievements((achList) =>
      achList.map((ach) => {
        if (ach.id === 'ach-first-ai-analysis') {
          return {
            ...ach,
            progress: 1,
            unlocked: true,
            unlockedDate: ach.unlockedDate || new Date().toLocaleDateString()
          };
        }
        return ach;
      })
    );
  };

  // Toggle challenge completion
  const toggleChallengeComplete = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, completed: !c.completed } : c))
    );
  };

  // Update profile
  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        learnSubTab,
        setLearnSubTab,
        aiCoachSubTab,
        setAiCoachSubTab,
        trainingSubTab,
        setTrainingSubTab,
        techniques,
        positions,
        selectedTechnique,
        setSelectedTechnique,
        activeVideoTechnique,
        setActiveVideoTechnique,
        openTechniqueVideo,
        selectedPositionId,
        setSelectedPositionId,
        recentlyViewedIds,
        viewTechnique,
        profile,
        updateProfile,
        toggleFavoriteTechnique,
        toggleLearnedTechnique,
        trainingSessions,
        logTrainingSession,
        shadowboxHistory,
        saveShadowboxAnalysis,
        challenges,
        toggleChallengeComplete,
        achievements,
        scorecards,
        saveScorecard,
        deleteScorecard,
        // Timer
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
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
