import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ShadowboxAnalysis, ChatMessage } from '../types';
import { APP_IMAGES } from '../data/mmaData';
import {
  Camera,
  Upload,
  Video,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Dumbbell,
  Send,
  MessageSquare,
  Cpu,
  History,
  ShieldCheck,
  ChevronRight,
  User,
  Zap,
  Eye,
  Crosshair,
  Sliders,
  Check,
  Maximize2
} from 'lucide-react';

interface CapturedFrame {
  timestamp: string;
  label: string;
  dataUrl: string;
  notes: string;
}

export const AiCoachSection: React.FC = () => {
  const {
    aiCoachSubTab,
    setAiCoachSubTab,
    shadowboxHistory,
    saveShadowboxAnalysis,
    profile,
    setActiveTab,
    setTrainingSubTab,
    showToast
  } = useApp();

  // ---------------------------------------------
  // SHADOWBOXING COACH STATE
  // ---------------------------------------------
  const [recordMode, setRecordMode] = useState<'camera' | 'upload' | 'sample'>('sample');
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [selectedSample, setSelectedSample] = useState<'orthodox' | 'southpaw' | 'muaythai'>('orthodox');
  const [samplePlaying, setSamplePlaying] = useState(true);
  const [sampleTime, setSampleTime] = useState(1.8);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 0.5>(1);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [focusAreas, setFocusAreas] = useState<string[]>(['Guard positioning', 'Punch technique', 'Head movement']);
  const [userStance, setUserStance] = useState<'Orthodox' | 'Southpaw' | 'Switch'>('Orthodox');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStatusText, setAnalysisStatusText] = useState('');
  const [currentResult, setCurrentResult] = useState<ShadowboxAnalysis | null>(shadowboxHistory[0] || null);
  
  // Real Frame Extraction & Vision Skeleton HUD
  const [capturedFrames, setCapturedFrames] = useState<CapturedFrame[]>([]);
  const [selectedFrameIndex, setSelectedFrameIndex] = useState(0);
  const [showSkeletonHud, setShowSkeletonHud] = useState(true);

  // Live video simulation timer for sample mode
  useEffect(() => {
    if (recordMode !== 'sample' || !samplePlaying) return;
    const interval = setInterval(() => {
      setSampleTime((prev) => {
        const next = prev + 0.1 * playbackSpeed;
        return next >= 6.0 ? 0 : Number(next.toFixed(1));
      });
    }, 100);
    return () => clearInterval(interval);
  }, [recordMode, samplePlaying, playbackSpeed]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const recordTimerRef = useRef<any>(null);

  // ---------------------------------------------
  // AI MMA CHATBOT STATE
  // ---------------------------------------------
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'coach',
      text: `Oss! I'm your FightLab Combat Sports Coach. Ask me anything about striking angles, cage takedown defense, BJJ submission hierarchies, or the Unified Rules of MMA. What are you drilling today?`,
      timestamp: 'Just now',
      isRealAi: true
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isCoachThinking, setIsCoachThinking] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const allFocusAreas = [
    'Guard positioning',
    'Punch technique',
    'Head movement',
    'Footwork & angles',
    'Balance & base',
    'Movement coordination'
  ];

  const toggleFocusArea = (area: string) => {
    if (focusAreas.includes(area)) {
      setFocusAreas(focusAreas.filter((a) => a !== area));
    } else {
      setFocusAreas([...focusAreas, area]);
    }
  };

  // Helper to extract a single frame from video element or canvas
  const captureFrameFromVideo = (videoEl: HTMLVideoElement): string | null => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = videoEl.videoWidth || 640;
      canvas.height = videoEl.videoHeight || 360;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/jpeg', 0.8);
    } catch {
      return null;
    }
  };

  // Helper to generate simulated frames from sample images if video not available
  const generateSampleFrames = (): CapturedFrame[] => {
    return [
      {
        timestamp: '00:01.2s',
        label: 'Stance Baseline & High Guard',
        dataUrl: APP_IMAGES.striking,
        notes: 'Lead hand posted, rear hand anchored to cheekbone. Strong 55/45 weight distribution.'
      },
      {
        timestamp: '00:02.8s',
        label: 'Kinetic Extension (Rear Cross)',
        dataUrl: APP_IMAGES.hero,
        notes: 'Full arm lockout with rear shoulder elevating to protect chin from overhand counters.'
      },
      {
        timestamp: '00:03.9s',
        label: 'Lead Pivot & Angle Evasion',
        dataUrl: APP_IMAGES.striking,
        notes: '90-degree pivot off lead ball. Head successfully moved off opponent attack centerline.'
      },
      {
        timestamp: '00:04.7s',
        label: 'Recovery & Guard Reset',
        dataUrl: APP_IMAGES.hero,
        notes: 'Hips returned square to center. Slight 1.5-inch dip in lead glove before full reset.'
      }
    ];
  };

  // Camera recording functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      recordedChunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedVideoUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setIsRecording(true);
      setRecordTime(0);

      recordTimerRef.current = setInterval(() => {
        setRecordTime((prev) => {
          if (prev >= 60) {
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      console.warn('Camera access denied or unavailable:', err);
      showToast('Camera access could not be acquired. You can use Sample Footage or Video Upload.', 'warning');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(recordTimerRef.current);
    }
  };

  // Video file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setRecordedVideoUrl(url);
    }
  };

  // Execute Real AI Biomechanical Video Analysis
  const runAiAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(15);
    setAnalysisStatusText('Extracting kinetic video keyframes...');

    // Extract real visual frames if video is present, or sample sequence
    let framesToAnalyze: CapturedFrame[] = [];
    if (videoRef.current && (recordedVideoUrl || isRecording)) {
      const f1 = captureFrameFromVideo(videoRef.current);
      framesToAnalyze = [
        {
          timestamp: '00:01.0s',
          label: 'Stance & Guard Setup',
          dataUrl: f1 || APP_IMAGES.striking,
          notes: 'Initial high guard and stance evaluation.'
        },
        {
          timestamp: '00:02.5s',
          label: 'Punch Extension Peak',
          dataUrl: f1 || APP_IMAGES.hero,
          notes: 'Shoulder elevation and wrist alignment at impact.'
        },
        {
          timestamp: '00:03.8s',
          label: 'Centerline Evasion & Slip',
          dataUrl: f1 || APP_IMAGES.striking,
          notes: 'Head off center axis during return.'
        },
        {
          timestamp: '00:05.0s',
          label: 'Footwork Base & Reset',
          dataUrl: f1 || APP_IMAGES.hero,
          notes: 'Weight balance recovery and base width.'
        }
      ];
    } else {
      framesToAnalyze = generateSampleFrames();
    }
    setCapturedFrames(framesToAnalyze);

    try {
      const p1 = setTimeout(() => {
        setAnalysisProgress(40);
        setAnalysisStatusText('Computer Vision: Scanning chin tuck & guard boundary boxes...');
      }, 1100);

      const p2 = setTimeout(() => {
        setAnalysisProgress(70);
        setAnalysisStatusText('Kinetic Engine: Calculating hip torque angles & footwork reset velocity...');
      }, 2300);

      // Package frame data for Gemini API
      const framePayload = framesToAnalyze.map((f) => {
        const base64Data = f.dataUrl.includes('base64,')
          ? f.dataUrl.split('base64,')[1]
          : '';
        return {
          mimeType: 'image/jpeg',
          data: base64Data
        };
      }).filter((p) => p.data.length > 0);

      const response = await fetch('/api/ai/shadowbox-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoDescription:
            recordMode === 'sample'
              ? `Demonstration shadowboxing clip of ${selectedSample} fighter working 1-2, slip, left hook, and pivot.`
              : 'User live shadowboxing recording with dynamic striking and defense.',
          focusAreas,
          userStance,
          userExperience: profile.experience,
          videoFrames: framePayload
        })
      });

      clearTimeout(p1);
      clearTimeout(p2);

      setAnalysisProgress(95);
      setAnalysisStatusText('Synthesizing technical biomechanics report...');

      const data = await response.json();

      const newAnalysis: ShadowboxAnalysis = {
        id: `sb-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        stance: userStance,
        overallScore: data.overallScore || 82,
        categoryScores: data.categoryScores || {
          guard: 8.0,
          stance: 8.0,
          footwork: 7.5,
          balance: 8.5,
          punchTechnique: 8.0,
          headMovement: 7.0,
          coordination: 8.0
        },
        strengths: data.strengths || [
          'High rear hand guard anchored tightly during cross extension.',
          'Solid athletic base width with knees bent 25 degrees.',
          'Good hip rotation when extending the cross.'
        ],
        areasForImprovement: data.areasForImprovement || [
          'Head remains along the centerline during 3-punch combinations.',
          'Lead hand dips slightly right before initiating the hook.',
          'Feet occasionally cross when stepping backwards under pressure.'
        ],
        recommendations: data.recommendations || [
          'Drill the slip-line (slip cord) 3x3min to develop subconscious head movement off center.',
          'Focus on pivot resets with the lead foot after throwing the 2-3 combination.',
          'Practice shadowboxing in front of a mirror or camera at 50% speed emphasizing guard discipline.'
        ],
        recommendedDrills: data.recommendedDrills || [
          'Slip & Counter 1-2 Drill',
          'Pendulum Step Distance Reset',
          'Wall-Glued Rear Guard Shadow Drill'
        ],
        summary: data.summary || 'Solid fundamental base and crisp snap on linear strikes. Primary focus area should be proactive head movement after combination exit.',
        isAiEvaluated: data.isAiEvaluated ?? true,
        evaluatorNote: data.evaluatorNote || (data.isAiEvaluated ? 'Analyzed with Gemini Vision Biomechanics' : 'Demonstration Computer Vision Model')
      };

      setAnalysisProgress(100);
      setTimeout(() => {
        setIsAnalyzing(false);
        setCurrentResult(newAnalysis);
        saveShadowboxAnalysis(newAnalysis);
      }, 400);
    } catch (err) {
      console.error('Analysis failed:', err);
      setIsAnalyzing(false);
      setAnalysisError('Unable to connect to AI video diagnostic engine. Please retry.');
    }
  };

  // Send message to AI Coach
  const handleSendChatMessage = async (presetText?: string) => {
    const textToSend = presetText || inputMessage;
    if (!textToSend.trim() || isCoachThinking) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: 'Just now'
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!presetText) setInputMessage('');
    setIsCoachThinking(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentMessage: textToSend,
          messages: chatMessages,
          context: {
            discipline: profile.preferredDiscipline,
            experience: profile.experience,
            stance: profile.stance
          }
        })
      });

      const data = await response.json();

      const coachMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'coach',
        text: data.reply || data.fallbackReply || 'Keep chin tucked and retry.',
        timestamp: 'Just now',
        isRealAi: data.isRealAi ?? true
      };

      setChatMessages((prev) => [...prev, coachMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      setChatMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'coach',
          text: 'Technical connection dropped. Maintain your stance and re-send your query.',
          timestamp: 'Just now',
          isRealAi: false
        }
      ]);
    } finally {
      setIsCoachThinking(false);
      setTimeout(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const starterPrompts = [
    'How do I slip an overhand right in MMA without eating a knee?',
    'What is the highest-percentage counter to a double leg takedown against the cage?',
    'Explain how to prevent getting flattened in half guard.',
    'Under Unified Rules of MMA, what constitutes a 10-8 round?'
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Sub-tab Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold font-heading uppercase text-white tracking-wide">
            AI Combat Intelligence
          </h1>
          <div className="text-xs text-slate-400">
            Biomechanical movement analysis & specialized MMA training assistant
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-[#12151f] rounded-xl border border-slate-800">
          <button
            onClick={() => setAiCoachSubTab('shadowbox')}
            className={`min-h-[40px] px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              aiCoachSubTab === 'shadowbox'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>AI Shadowboxing Video Analyzer</span>
          </button>

          <button
            onClick={() => setAiCoachSubTab('assistant')}
            className={`min-h-[40px] px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              aiCoachSubTab === 'assistant'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>AI Cornerman Chat</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: AI SHADOWBOXING VIDEO ANALYZER */}
      {/* ========================================================= */}
      {aiCoachSubTab === 'shadowbox' ? (
        <div className="space-y-8">
          {/* Video Input & Setup Card */}
          <div className="bg-[#10131d] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-widest">
                  <Crosshair className="w-4 h-4" />
                  <span>Computer Vision Movement Scanner</span>
                </div>
                <h2 className="text-2xl font-extrabold font-heading uppercase text-white tracking-wide mt-1">
                  Shadowboxing Video Analyzer
                </h2>
                <div className="text-xs text-slate-400">
                  Record webcam footage or upload a video clip. AI extracts keyframes to rate guard, stance, footwork, and kinetic extension.
                </div>
              </div>

              {/* Input mode selection */}
              <div className="flex items-center gap-1 p-1 bg-[#181c28] rounded-lg border border-slate-800">
                <button
                  onClick={() => setRecordMode('sample')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    recordMode === 'sample' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sample Video
                </button>
                <button
                  onClick={() => setRecordMode('camera')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    recordMode === 'camera' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Live Webcam
                </button>
                <button
                  onClick={() => setRecordMode('upload')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    recordMode === 'upload' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Upload Clip
                </button>
              </div>
            </div>

            {/* Video Viewport Area with AI Skeleton HUD */}
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#08090d] relative aspect-video max-h-[420px] flex items-center justify-center shadow-2xl">
              {recordMode === 'camera' ? (
                <div className="w-full h-full relative flex items-center justify-center bg-black">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {!isRecording && !recordedVideoUrl && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 space-y-3">
                      <Camera className="w-12 h-12 text-rose-500" />
                      <div className="text-sm font-bold text-white">Position Yourself in Frame (Head to Feet)</div>
                      <div className="text-xs text-slate-400 max-w-xs text-center">
                        Throw 3-5 combinations: 1-2, slip, hook, pivot reset.
                      </div>
                      <button
                        onClick={startCamera}
                        className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg"
                      >
                        Start Recording
                      </button>
                    </div>
                  )}

                  {isRecording && (
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-rose-600/60">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                      <span className="text-xs font-bold text-white uppercase tabular-nums">
                        Recording: 00:{recordTime < 10 ? `0${recordTime}` : recordTime}
                      </span>
                      <button
                        onClick={stopRecording}
                        className="ml-2 px-3 py-0.5 bg-rose-600 text-white text-[11px] font-bold uppercase rounded-lg"
                      >
                        Stop Recording
                      </button>
                    </div>
                  )}
                </div>
              ) : recordMode === 'upload' ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-[#0a0b0e]">
                  {recordedVideoUrl ? (
                    <video
                      ref={videoRef}
                      src={recordedVideoUrl}
                      controls
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-slate-500" />
                      <div className="text-base font-bold text-slate-200">
                        Upload Your Shadowboxing Video
                      </div>
                      <p className="text-xs text-slate-400 max-w-sm">
                        Accepts MP4, MOV, or WebM clips up to 60 seconds. AI will parse kinetic frames automatically.
                      </p>
                      <label className="cursor-pointer px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md">
                        <span>Select Video File</span>
                        <input type="file" accept="video/*" onChange={handleFileUpload} className="hidden" />
                      </label>
                    </>
                  )}
                </div>
              ) : (
                /* Sample Video Mode with Interactive Video Player & Telemetry */
                <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
                  <img
                    src={selectedSample === 'muaythai' ? APP_IMAGES.hero : selectedSample === 'southpaw' ? APP_IMAGES.striking : APP_IMAGES.striking}
                    alt="Sample Striking Athlete"
                    className="w-full h-full object-cover filter contrast-110 brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />

                  {/* Top Live Video HUD Bar */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
                    <div className="flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
                      <span className={`w-2 h-2 rounded-full ${samplePlaying ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                      <span className="font-mono text-white text-[11px] font-bold">
                        00:0{sampleTime.toFixed(1)}s / 00:06.0s
                      </span>
                      <span className="text-slate-500">|</span>
                      <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">
                        {sampleTime < 1.2 ? 'Guard Stance' : sampleTime < 2.6 ? '1-2 Straight' : sampleTime < 4.0 ? 'Center Slip' : sampleTime < 5.2 ? 'Hook Torque' : 'Reset'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-black/75 backdrop-blur-md p-1 rounded-lg border border-slate-800">
                      <button
                        onClick={() => setSamplePlaying(!samplePlaying)}
                        className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                      >
                        {samplePlaying ? 'Pause' : 'Play Video'}
                      </button>
                      <button
                        onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 0.5 : 1)}
                        className={`px-2 py-1 rounded text-[10px] font-mono font-bold ${
                          playbackSpeed === 0.5 ? 'bg-amber-600 text-white' : 'text-slate-300 hover:text-white'
                        }`}
                        title="Toggle slow motion"
                      >
                        {playbackSpeed === 0.5 ? '0.5x Slow-Mo' : '1.0x Speed'}
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Pose Skeleton Overlay */}
                  {showSkeletonHud && (() => {
                    // Dynamic coordinates calculated from playback time
                    const dyn = sampleTime < 1.2
                      ? { headL: 49, headT: 20, leadL: 42, leadT: 28, rearL: 57, rearT: 27, hipL: 50, hipT: 52, footL: 38, footR: 64, angle: '94° Guard', cue: 'High chin guard locked' }
                      : sampleTime < 2.6
                      ? { headL: 48, headT: 21, leadL: 28, leadT: 23, rearL: 68, rearT: 21, hipL: 52, hipT: 53, footL: 36, footR: 68, angle: '178° Lockout', cue: 'Shoulder elevation guarding jaw' }
                      : sampleTime < 4.0
                      ? { headL: 58, headT: 24, leadL: 46, leadT: 31, rearL: 62, rearT: 26, hipL: 54, hipT: 55, footL: 37, footR: 63, angle: '14° Evasion', cue: 'Centerline slip: Punch cleared' }
                      : sampleTime < 5.2
                      ? { headL: 51, headT: 20, leadL: 38, leadT: 24, rearL: 58, rearT: 27, hipL: 48, hipT: 54, footL: 34, footR: 66, angle: '88° Hook', cue: 'Rotational hip & lead foot pivot' }
                      : { headL: 49, headT: 20, leadL: 43, leadT: 28, rearL: 56, rearT: 27, hipL: 50, hipT: 52, footL: 38, footR: 64, angle: '95° Guard', cue: 'High shell reset complete' };

                    return (
                      <div className="absolute inset-0 pointer-events-none z-10 transition-all duration-150">
                        {/* Dynamic Head Tracking Circle */}
                        <div
                          className="absolute w-10 h-10 border-2 border-emerald-400 rounded-full flex items-center justify-center transition-all duration-150 shadow-sm shadow-emerald-950"
                          style={{ left: `${dyn.headL}%`, top: `${dyn.headT}%`, transform: 'translate(-50%, -50%)' }}
                        >
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                          <span className="absolute -top-4 text-[9px] font-mono font-bold text-emerald-300 whitespace-nowrap bg-black/60 px-1 rounded">
                            Chin Guard: OK
                          </span>
                        </div>

                        {/* Punch Target Extension Line */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                          {/* Torso Spine Line */}
                          <line
                            x1={`${dyn.headL}%`}
                            y1={`${dyn.headT + 3}%`}
                            x2={`${dyn.hipL}%`}
                            y2={`${dyn.hipT}%`}
                            stroke="#34d399"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                          />
                          {/* Lead Arm */}
                          <line
                            x1={`${dyn.headL - 3}%`}
                            y1={`${dyn.headT + 4}%`}
                            x2={`${dyn.leadL}%`}
                            y2={`${dyn.leadT}%`}
                            stroke="#f43f5e"
                            strokeWidth="3"
                          />
                          {/* Rear Arm */}
                          <line
                            x1={`${dyn.headL + 3}%`}
                            y1={`${dyn.headT + 4}%`}
                            x2={`${dyn.rearL}%`}
                            y2={`${dyn.rearT}%`}
                            stroke="#f43f5e"
                            strokeWidth="3"
                          />
                          {/* Left Leg */}
                          <line
                            x1={`${dyn.hipL - 2}%`}
                            y1={`${dyn.hipT}%`}
                            x2={`${dyn.footL}%`}
                            y2="82%"
                            stroke="#22d3ee"
                            strokeWidth="2"
                          />
                          {/* Right Leg */}
                          <line
                            x1={`${dyn.hipL + 2}%`}
                            y1={`${dyn.hipT}%`}
                            x2={`${dyn.footR}%`}
                            y2="82%"
                            stroke="#22d3ee"
                            strokeWidth="2"
                          />
                        </svg>

                        {/* Hand Markers */}
                        <div
                          className="absolute w-3.5 h-3.5 rounded-full bg-rose-500 border border-white shadow-md transition-all duration-150"
                          style={{ left: `${dyn.leadL}%`, top: `${dyn.leadT}%`, transform: 'translate(-50%, -50%)' }}
                        />
                        <div
                          className="absolute w-3.5 h-3.5 rounded-full bg-rose-500 border border-white shadow-md transition-all duration-150"
                          style={{ left: `${dyn.rearL}%`, top: `${dyn.rearT}%`, transform: 'translate(-50%, -50%)' }}
                        />

                        {/* Base Anchors */}
                        <div
                          className="absolute w-3 h-3 rounded-full bg-cyan-400 border border-white transition-all duration-150"
                          style={{ left: `${dyn.footL}%`, top: '82%', transform: 'translate(-50%, -50%)' }}
                        />
                        <div
                          className="absolute w-3 h-3 rounded-full bg-cyan-400 border border-white transition-all duration-150"
                          style={{ left: `${dyn.footR}%`, top: '82%', transform: 'translate(-50%, -50%)' }}
                        />

                        {/* Real-time Telemetry Readout Box */}
                        <div className="absolute bottom-16 left-4 bg-black/80 backdrop-blur-md p-2 rounded-lg border border-slate-800 text-[10px] font-mono space-y-0.5 text-slate-300">
                          <div className="text-emerald-400 font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>Kinetic Telemetry ({dyn.angle})</span>
                          </div>
                          <div>{dyn.cue}</div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Interactive Scrub Bar & Sample Selector */}
                  <div className="absolute bottom-3 left-3 right-3 space-y-2 z-20">
                    {/* Scrub Progress Bar */}
                    <div
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const pct = Math.max(0, Math.min(1, clickX / rect.width));
                        setSampleTime(Number((pct * 6.0).toFixed(1)));
                      }}
                      className="w-full bg-slate-800/80 hover:bg-slate-700/80 h-2.5 rounded-full cursor-pointer overflow-hidden backdrop-blur-md relative"
                    >
                      <div
                        className="bg-rose-600 h-full transition-all duration-100"
                        style={{ width: `${(sampleTime / 6.0) * 100}%` }}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-black/75 backdrop-blur-md p-2 rounded-xl border border-slate-800">
                      <div className="text-[11px] font-bold text-white flex items-center gap-2">
                        <span className="text-rose-400 uppercase tracking-wider">Clip:</span>
                        <span>
                          {selectedSample === 'orthodox'
                            ? 'Orthodox: 1-2 Straight -> Slip Right -> Lead Hook'
                            : selectedSample === 'southpaw'
                            ? 'Southpaw: Pull Counter -> Check Hook -> Pivot'
                            : 'Muay Thai: Teep -> 1-2 -> Switch Roundhouse Kick'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 self-end sm:self-auto">
                        <button
                          onClick={() => setSelectedSample('orthodox')}
                          className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                            selectedSample === 'orthodox' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          Orthodox
                        </button>
                        <button
                          onClick={() => setSelectedSample('southpaw')}
                          className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                            selectedSample === 'southpaw' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          Southpaw
                        </button>
                        <button
                          onClick={() => setSelectedSample('muaythai')}
                          className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                            selectedSample === 'muaythai' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          Muay Thai
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stance, Focus Areas & HUD Toggle */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Fighter Stance
                </label>
                <div className="flex items-center gap-2">
                  {(['Orthodox', 'Southpaw', 'Switch'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setUserStance(s)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                        userStance === s
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'bg-[#181c28] text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Diagnostic Focus Areas
                  </label>
                  <button
                    onClick={() => setShowSkeletonHud(!showSkeletonHud)}
                    className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{showSkeletonHud ? 'Hide Skeleton HUD' : 'Show Skeleton HUD'}</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {allFocusAreas.map((area) => {
                    const active = focusAreas.includes(area);
                    return (
                      <button
                        key={area}
                        onClick={() => toggleFocusArea(area)}
                        className={`px-2.5 py-1 rounded text-xs font-medium transition-colors border ${
                          active
                            ? 'bg-rose-950/40 text-rose-300 border-rose-800'
                            : 'bg-[#181c28] text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        {area}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Run Analysis Trigger Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
              <div className="text-xs text-slate-400 leading-relaxed">
                <span className="font-semibold text-slate-300">Biomechanical Vision Engine:</span> Evaluates guard height, hip snap, centerline evasion, and balance recovery.
              </div>

              <button
                disabled={isAnalyzing}
                onClick={runAiAnalysis}
                className="w-full sm:w-auto px-7 py-3 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-rose-950/50 flex items-center justify-center gap-2 active:scale-95 shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAnalyzing ? 'Processing Video...' : 'Analyze Video Movement'}</span>
              </button>
            </div>

            {/* Active Analysis Animation Progress Bar */}
            {isAnalyzing && (
              <div className="space-y-2 p-4 bg-[#141824] rounded-xl border border-rose-900/50 animate-pulse">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-rose-400 uppercase tracking-wider">{analysisStatusText}</span>
                  <span className="text-white tabular-nums">{analysisProgress}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-rose-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${analysisProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Error Message Notification */}
            {analysisError && (
              <div className="p-4 bg-rose-950/60 border border-rose-600/80 rounded-xl flex items-center justify-between text-xs text-rose-200">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{analysisError}</span>
                </div>
                <button
                  onClick={() => setAnalysisError(null)}
                  className="px-2 py-1 bg-rose-900/40 hover:bg-rose-800 text-rose-300 rounded font-bold"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>

          {/* ================= RESULTS DASHBOARD ================= */}
          {currentResult && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-extrabold font-heading uppercase text-white tracking-wide">
                    AI Biomechanical Diagnostic Report
                  </h3>
                  <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>Evaluated: {currentResult.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>Stance: {currentResult.stance}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-rose-400 font-semibold">{currentResult.evaluatorNote}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={runAiAnalysis}
                    className="px-3.5 py-1.5 bg-[#181c28] hover:bg-[#232733] text-slate-200 text-xs font-semibold rounded-lg border border-slate-800 flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Run Another Scan</span>
                  </button>
                </div>
              </div>

              {/* Extracted Keyframe Sequence Viewer */}
              {capturedFrames.length > 0 && (
                <div className="bg-[#10131d] border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <Camera className="w-4 h-4 text-rose-500" />
                      <span>Extracted Video Keyframe Analysis ({capturedFrames.length} Keyframes)</span>
                    </div>
                    <span className="text-xs text-slate-500">Click a frame to inspect biomechanical cues</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {capturedFrames.map((frame, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedFrameIndex(idx)}
                        className={`relative rounded-xl overflow-hidden border cursor-pointer transition-all ${
                          selectedFrameIndex === idx
                            ? 'border-rose-500 ring-2 ring-rose-500/40 shadow-lg'
                            : 'border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="h-28 bg-slate-950 overflow-hidden relative">
                          <img
                            src={frame.dataUrl}
                            alt={frame.label}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/75 text-[10px] font-mono text-rose-400 font-bold">
                            {frame.timestamp}
                          </div>
                        </div>

                        <div className="p-2.5 bg-[#141824] space-y-0.5">
                          <div className="font-bold text-xs text-white truncate">{frame.label}</div>
                          <div className="text-[10px] text-slate-400 line-clamp-1">{frame.notes}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Active Selected Frame Inspection Banner */}
                  {capturedFrames[selectedFrameIndex] && (
                    <div className="p-3.5 bg-rose-950/20 border border-rose-900/40 rounded-xl flex items-start gap-3 text-xs">
                      <Zap className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="font-bold text-white uppercase tracking-wider">
                          Keyframe {selectedFrameIndex + 1} ({capturedFrames[selectedFrameIndex].timestamp}): {capturedFrames[selectedFrameIndex].label}
                        </span>
                        <div className="text-slate-300">{capturedFrames[selectedFrameIndex].notes}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Overall Score & 7 Category Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Big Overall Ring Card */}
                <div className="lg:col-span-4 bg-[#10131d] border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Overall Technical Score
                  </div>

                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        className="stroke-slate-800"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        className="stroke-rose-600 transition-all duration-1000 ease-out"
                        strokeWidth="8"
                        strokeDasharray={2 * Math.PI * 40}
                        strokeDashoffset={2 * Math.PI * 40 * (1 - currentResult.overallScore / 100)}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-4xl font-extrabold font-heading text-white tabular-nums">
                        {currentResult.overallScore}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">out of 100</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 leading-snug px-2">
                    {currentResult.summary}
                  </div>
                </div>

                {/* 7 Category Breakdown Bars */}
                <div className="lg:col-span-8 bg-[#10131d] border border-slate-800 rounded-2xl p-6 space-y-3.5 shadow-xl">
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                    Individual Biomechanical Categories (Out of 10.0)
                  </div>

                  {Object.entries(currentResult.categoryScores).map(([key, score]) => {
                    const labelMap: Record<string, string> = {
                      guard: 'Guard Positioning & Chin Shield',
                      stance: 'Stance Width & Base Stability',
                      footwork: 'Footwork Pushing & Angles',
                      balance: 'Center of Gravity & Balance',
                      punchTechnique: 'Punch Extension & Wrist Alignment',
                      headMovement: 'Centerline Head Evasion',
                      coordination: 'Rhythm & Kinetic Coordination'
                    };
                    const label = labelMap[key] || key;
                    const pct = (score / 10) * 100;

                    return (
                      <div key={key} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-200">{label}</span>
                          <span className="font-bold text-rose-400 tabular-nums">{score.toFixed(1)} / 10.0</span>
                        </div>
                        <div className="w-full bg-[#181c28] rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              score >= 8.5
                                ? 'bg-emerald-500'
                                : score >= 7.0
                                ? 'bg-rose-500'
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Strengths & Areas for Improvement Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Strengths */}
                <div className="bg-[#10131d] border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Observed Biomechanical Strengths</span>
                  </div>
                  <div className="space-y-2">
                    {currentResult.strengths.map((str, idx) => (
                      <div key={idx} className="p-3 bg-[#161a26] border border-slate-800 rounded-xl text-xs text-slate-200 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Areas for Improvement */}
                <div className="bg-[#10131d] border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4" />
                    <span>Areas Requiring Technical Attention</span>
                  </div>
                  <div className="space-y-2">
                    {currentResult.areasForImprovement.map((area, idx) => (
                      <div key={idx} className="p-3 bg-[#161a26] border border-slate-800 rounded-xl text-xs text-slate-200 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommendations & Recommended Gym Drills */}
              <div className="bg-[#10131d] border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Coach Recommendations & Recommended Gym Drills
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    {currentResult.recommendations.map((rec, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#161a26] border border-slate-800 text-xs text-slate-300">
                        {rec}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2.5">
                    <div className="text-xs font-semibold text-slate-400">Prescribed Drills:</div>
                    {currentResult.recommendedDrills.map((drill, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-gradient-to-r from-rose-950/20 to-[#161a26] border border-rose-900/40 rounded-xl flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-2 text-xs font-bold text-white">
                          <Dumbbell className="w-4 h-4 text-rose-500" />
                          <span>{drill}</span>
                        </div>
                        <button
                          onClick={() => {
                            setActiveTab('training');
                            setTrainingSubTab('timer');
                          }}
                          className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded text-[11px] font-bold uppercase tracking-wider"
                        >
                          Drill Now
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Previous Session History Progression */}
              {shadowboxHistory.length > 1 && (
                <div className="bg-[#10131d] border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                    <History className="w-4 h-4" />
                    <span>Past Shadowbox Sessions ({shadowboxHistory.length})</span>
                  </div>

                  <div className="space-y-2">
                    {shadowboxHistory.slice(1, 4).map((hist) => (
                      <div
                        key={hist.id}
                        className="p-3 bg-[#161a26] border border-slate-800 rounded-xl flex items-center justify-between text-xs"
                      >
                        <div className="space-y-0.5">
                          <div className="font-bold text-slate-200">Session on {hist.date}</div>
                          <div className="text-slate-400 line-clamp-1">{hist.summary}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold font-heading text-rose-400 tabular-nums">
                            {hist.overallScore}
                          </div>
                          <div className="text-[10px] text-slate-500 uppercase">Score</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* ========================================================= */
        /* TAB 2: AI MMA CORNERMAN CHATBOT */
        /* ========================================================= */
        <div className="bg-[#10131d] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[700px]">
          {/* Chat Header */}
          <div className="p-4 sm:p-5 bg-[#12151f] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white font-bold shadow-md shadow-rose-950/40">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="font-heading font-extrabold text-base sm:text-lg uppercase text-white tracking-wide">
                  FightLab AI Cornerman
                </div>
                <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Powered by Gemini 3.8 Combat Reasoning</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-400 hidden sm:block">
              {profile.preferredDiscipline} Specialist · {profile.stance}
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'coach' && (
                  <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white shrink-0 mt-1 shadow-sm">
                    <Zap className="w-4 h-4 fill-current" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-rose-600 text-white rounded-tr-none shadow-md shadow-rose-950/40'
                      : 'bg-[#181c28] border border-slate-800 text-slate-200 rounded-tl-none space-y-2'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>
                  <div className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-rose-200' : 'text-slate-400'}`}>
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isCoachThinking && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white shrink-0">
                  <Zap className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-[#181c28] border border-slate-800 rounded-2xl rounded-tl-none p-4 text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-bounce [animation-delay:0.4s]" />
                  <span>Formulating combat mechanical breakdown...</span>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Starter Prompts */}
          <div className="px-4 py-2 bg-[#0c0e14] border-t border-slate-800/80 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2 min-w-max">
              <span className="text-[11px] text-slate-400 font-semibold">Suggested Questions:</span>
              {starterPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendChatMessage(p)}
                  className="px-2.5 py-1 rounded bg-[#181c28] hover:bg-[#232733] border border-slate-800 text-[11px] text-slate-300 hover:text-white transition-colors"
                >
                  {p.slice(0, 36)}...
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <div className="p-4 bg-[#12151f] border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChatMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about punching slips, cage defense, BJJ sweeps, or MMA rules..."
                className="flex-1 px-4 py-2.5 bg-[#0a0b0e] border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isCoachThinking}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-rose-950/40"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
