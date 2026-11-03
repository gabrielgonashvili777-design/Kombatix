export type Discipline = 'Boxing' | 'Muay Thai' | 'Wrestling' | 'BJJ' | 'MMA' | 'Judo / Sambo';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface StepInstruction {
  phase: string;
  instruction: string;
  keyCue: string;
}

export interface Technique {
  id: string;
  name: string;
  discipline: Discipline;
  category: string;
  difficulty: Difficulty;
  description: string;
  steps: StepInstruction[];
  commonMistakes: { mistake: string; fix: string }[];
  relatedTechniqueIds: string[];
  imageKey: 'striking' | 'bjj' | 'wrestling' | 'hero';
  externalResourceUrl: string;
  externalResourceTitle: string;
  drillSuggestion: string;
  videoDuration?: string;
  videoInstructor?: string;
  videoYoutubeId?: string;
}

export interface GrapplingOption {
  name: string;
  type: 'Submission' | 'Sweep' | 'Strike' | 'Escape' | 'Posture' | 'Transition';
  description: string;
  difficulty: Difficulty;
}

export interface BjjPosition {
  id: string;
  name: string;
  type: 'Neutral / Guard' | 'Dominant Top' | 'Inferior Bottom' | 'Back Mount';
  description: string;
  keyConcepts: string[];
  offensiveOptions: GrapplingOption[];
  defensiveOptions: GrapplingOption[];
  transitions: { toPositionId: string; description: string; direction: 'Top' | 'Bottom' | 'Neutral' }[];
  proTip: string;
  imageKey: 'bjj' | 'wrestling';
}

export interface ShadowboxAnalysis {
  id: string;
  date: string;
  stance: 'Orthodox' | 'Southpaw' | 'Switch';
  overallScore: number;
  categoryScores: {
    guard: number;
    stance: number;
    footwork: number;
    balance: number;
    punchTechnique: number;
    headMovement: number;
    coordination: number;
  };
  strengths: string[];
  areasForImprovement: string[];
  recommendations: string[];
  recommendedDrills: string[];
  summary: string;
  isAiEvaluated: boolean;
  evaluatorNote?: string;
}

export interface TrainingSession {
  id: string;
  date: string;
  type: 'Timer' | 'Shadowbox' | 'Technique Drill' | 'Sparring' | 'BJJ Roll';
  roundsCompleted: number;
  durationMinutes: number;
  discipline: Discipline;
  notes: string;
  rpe: number; // 1-10
}

export interface UserProfile {
  id: string;
  username: string;
  nickname: string;
  rank: string;
  avatarUrl: string;
  preferredDiscipline: Discipline;
  stance: 'Orthodox' | 'Southpaw' | 'Switch';
  experience: Difficulty;
  weightClass: string;
  streakDays: number;
  totalRounds: number;
  favoriteTechniqueIds: string[];
  learnedTechniqueIds: string[];
  completedChallengeIds: string[];
  weeklyRoundGoal: number;
  privacy: 'public' | 'gym' | 'private';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'Technique' | 'Training' | 'AI Analysis' | 'Mastery';
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedDate?: string;
}

export interface DailyChallenge {
  id: string;
  title: string;
  discipline: Discipline;
  description: string;
  targetCount: number;
  unit: string;
  xp: number;
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: string;
  isRealAi?: boolean;
}

export interface OpponentArchetype {
  id: string;
  name: string;
  style: Discipline | 'Hybrid Striker / Wrestler';
  tagline: string;
  description: string;
  primaryWeapons: string[];
  vulnerabilities: string[];
  keyAdvice: string;
}

export interface FightGamePlan {
  id: string;
  archetypeId: string;
  archetypeName: string;
  fighterStance: string;
  opponentStance: string;
  winCondition: string;
  distanceManagement: string;
  cageStrategy: string;
  roundPlans: {
    round: number;
    objective: string;
    strikingFocus: string;
    grapplingFocus: string;
    dangerAlert: string;
  }[];
  keyCombinations: string[];
  defensiveChecklist: string[];
}

export interface FightSimScenario {
  id: string;
  round: number;
  timeRemaining: string;
  situation: string;
  opponentAction: string;
  choices: {
    text: string;
    outcome: string;
    isOptimal: boolean;
    fightIqPoints: number;
  }[];
}

export interface RoundStats {
  round: number;
  redScore: number;
  blueScore: number;
  redSigStrikes: number;
  blueSigStrikes: number;
  redTakedowns: number;
  blueTakedowns: number;
  redControlSeconds: number;
  blueControlSeconds: number;
  redKnockdowns: number;
  blueKnockdowns: number;
}

export interface SparringScorecard {
  id: string;
  date: string;
  opponentName: string;
  weightClass: string;
  rounds: RoundStats[];
  finalDecision: string;
  notes: string;
}
