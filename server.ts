import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '25mb' }));

// Initialize Google GenAI client if GEMINI_API_KEY is present
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Could not initialize GoogleGenAI client:', err);
  }
}

// ----------------------------------------------------
// 1. AI MMA Assistant Chat API
// ----------------------------------------------------
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { messages, currentMessage, context } = req.body;

    if (!currentMessage || typeof currentMessage !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      return res.json({
        reply: `**Notice:** Live Gemini API key is currently not configured on this environment.

Here is technical combat advice based on MMA fundamentals:
When focusing on **"${currentMessage.slice(0, 50)}"**, keep these principles in mind:
1. **Weight Distribution & Kinetic Chain:** Every strike and grapple begins with hip engagement and rooted feet.
2. **Defensive Responsibility:** Never sacrifice high guard or cage awareness during forward transitions.
3. **Recovery & Angle Cutting:** Reset off the center line immediately after initiating an exchange.`,
        isRealAi: false,
      });
    }

    const systemInstruction = `You are FightLab's Head MMA Coach & Combat Sports Analyst.
You possess world-class technical knowledge across:
- Boxing (angles, counter-punching, shoulder roll, slips, cadence)
- Brazilian Jiu-Jitsu (guard retention, positional hierarchy, submissions, sweeps)
- Collegiate & Freestyle Wrestling (level change, head control, underhooks, cage wrestling)
- Muay Thai (teeps, plum clinch, low leg kicks, elbows, balance)
- Mixed Martial Arts (MMA transitions, ground-and-pound mechanics, cage defense, Unified Rules of MMA scoring)

Tone: Technical, encouraging, highly precise, concise, and focused on safety and realistic mechanics.
Structure responses clearly with short bullet points, key technical cues, common errors to avoid, and safe gym drilling recommendations.
If asked about medical injuries, clarify that you provide mechanical advice and advise consulting a medical professional.`;

    const formattedHistory = Array.isArray(messages)
      ? messages.slice(-8).map((m: any) => ({
          role: m.sender === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }],
        }))
      : [];

    const promptText = context
      ? `[User Context: Current discipline: ${context.discipline || 'MMA'}, Level: ${context.experience || 'Intermediate'}]\n\nQuestion: ${currentMessage}`
      : currentMessage;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        ...formattedHistory,
        {
          role: 'user',
          parts: [{ text: promptText }],
        },
      ],
      config: {
        systemInstruction,
      },
    });

    const reply = response.text || 'Coach could not generate advice at this moment. Keep your guard up and retry.';
    return res.json({ reply, isRealAi: true });
  } catch (error: any) {
    console.error('Error in /api/ai/chat:', error);
    return res.status(500).json({
      error: 'Failed to contact AI Coach',
      details: error.message || String(error),
      fallbackReply: 'Maintain distance and protect your chin. System encountered a temporary error connecting to the AI Coach.',
    });
  }
});

// ----------------------------------------------------
// 2. AI Shadowboxing Video / Movement Analyzer API
// ----------------------------------------------------
app.post('/api/ai/shadowbox-analyze', async (req, res) => {
  try {
    const { videoDescription, focusAreas, userStance, userExperience, videoFrames } = req.body;

    if (!ai) {
      // Graceful fallback clearly flagged
      return res.json({
        isAiEvaluated: false,
        overallScore: 78,
        categoryScores: {
          guard: 8.0,
          stance: 7.5,
          footwork: 7.0,
          balance: 8.5,
          punchTechnique: 8.0,
          headMovement: 7.0,
          coordination: 8.0,
        },
        strengths: [
          'High rear hand guard glued to cheek while throwing the jab.',
          'Solid base width with knees bent, maintaining athletic posture.',
          'Good hip rotation when extending the cross.',
        ],
        areasForImprovement: [
          'Lead hand dips slightly right before initiating the hook.',
          'Head stays along the centerline during 3-punch combinations.',
          'Feet occasionally cross when stepping backwards under simulated pressure.',
        ],
        recommendations: [
          'Drill the slip-line (slip cord) 3x3min to develop subconscious head movement off the center line.',
          'Focus on pivot resets with the lead foot after throwing the 2-3 combination.',
          'Practice shadowboxing in front of a mirror or camera at 50% speed emphasizing guard discipline.',
        ],
        recommendedDrills: [
          'Slip & Counter 1-2 Drill',
          'Pendulum Step Distance Reset',
          'Wall-Glued Rear Guard Shadow Drill',
        ],
        summary:
          'Demonstration Analysis: Solid fundamental base and crisp snap on linear strikes. Primary focus area should be proactive head movement after combination exit.',
        evaluatorNote: 'Simulated demonstration review (configure Gemini API key for live computer vision processing).',
      });
    }

    const systemInstruction = `You are an elite MMA Striking & Biomechanics Coach analyzing a fighter's shadowboxing workout.
Evaluate movement mechanics across the standard 7 boxing/MMA categories:
1. Guard positioning (hands up, chin tucked, elbows tight)
2. Stance (feet shoulder-width, athletic weight balance 50/50 or 60/40)
3. Footwork (pushing off opposite foot, no crossing feet, pivot control)
4. Balance (head over center of gravity, non-overextended)
5. Punch technique (kinetic chain, hip snap, shoulder elevation, wrist alignment)
6. Head movement (moving off center line before and after firing)
7. Movement coordination (rhythm, reset speed, breathing)

Return realistic, constructive, and rigorous scoring out of 10 for each category, plus an overall score out of 100.
Identify 3 concrete strengths, 3 specific areas for improvement, 3 actionable drills, and an encouraging 2-sentence summary.`;

    let parts: any[] = [];

    // If frame images are provided
    if (Array.isArray(videoFrames) && videoFrames.length > 0) {
      for (const frame of videoFrames.slice(0, 4)) {
        if (frame.data && frame.mimeType) {
          parts.push({
            inlineData: {
              mimeType: frame.mimeType,
              data: frame.data,
            },
          });
        }
      }
    }

    const promptText = `Analyze this shadowboxing session:
- Fighter Stance: ${userStance || 'Orthodox'}
- Experience Level: ${userExperience || 'Intermediate'}
- Focus Areas: ${focusAreas ? focusAreas.join(', ') : 'All combat striking essentials'}
- Routine Notes: ${videoDescription || 'Standard 3-minute shadowboxing round focusing on jabs, crosses, hooks, slips, and angle exits.'}`;

    parts.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts },
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallScore: { type: Type.INTEGER, description: 'Score between 0 and 100' },
            categoryScores: {
              type: Type.OBJECT,
              properties: {
                guard: { type: Type.NUMBER, description: '0.0 to 10.0' },
                stance: { type: Type.NUMBER, description: '0.0 to 10.0' },
                footwork: { type: Type.NUMBER, description: '0.0 to 10.0' },
                balance: { type: Type.NUMBER, description: '0.0 to 10.0' },
                punchTechnique: { type: Type.NUMBER, description: '0.0 to 10.0' },
                headMovement: { type: Type.NUMBER, description: '0.0 to 10.0' },
                coordination: { type: Type.NUMBER, description: '0.0 to 10.0' },
              },
              required: ['guard', 'stance', 'footwork', 'balance', 'punchTechnique', 'headMovement', 'coordination'],
            },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            areasForImprovement: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendedDrills: { type: Type.ARRAY, items: { type: Type.STRING } },
            summary: { type: Type.STRING },
          },
          required: ['overallScore', 'categoryScores', 'strengths', 'areasForImprovement', 'recommendations', 'recommendedDrills', 'summary'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({
      ...parsed,
      isAiEvaluated: true,
      evaluatorNote: 'Analyzed using Gemini AI biomechanics analysis.',
    });
  } catch (error: any) {
    console.error('Error analyzing shadowbox:', error);
    // Return fallback with clear indicator
    return res.json({
      isAiEvaluated: false,
      overallScore: 76,
      categoryScores: {
        guard: 7.5,
        stance: 8.0,
        footwork: 7.0,
        balance: 8.0,
        punchTechnique: 8.0,
        headMovement: 6.5,
        coordination: 7.5,
      },
      strengths: [
        'Crisp straight punch extension with full arm lockouts.',
        'Good chin tuck behind the shoulder on the jab.',
        'Balanced athletic weight distribution in stance.',
      ],
      areasForImprovement: [
        'Slight tell/drop of the rear hand when initiating combos.',
        'Head remains stationary during multi-punch bursts.',
        'Recovery step is slower when retreating laterally.',
      ],
      recommendations: [
        'Incorporate slip counters right after every combination.',
        'Use agility ladder footwork drills to increase speed on lateral pivots.',
        'Maintain eye contact on opponent level without glancing at the floor.',
      ],
      recommendedDrills: ['Mirror Check 1-2-Slip', 'L-Step Lateral Cut', 'Double Teep to High Kick'],
      summary:
        'Technical Review: Strong offensive output with good extension. Work on defensive resets and post-punch head evasion.',
      evaluatorNote: 'Analysis demonstration mode (fallback applied).',
    });
  }
});

// ----------------------------------------------------
// 3. AI Fight Strategy & Game Plan Generator API
// ----------------------------------------------------
app.post('/api/ai/gameplan', async (req, res) => {
  try {
    const { opponentArchetype, opponentStance, userStance, userDiscipline, fighterNotes } = req.body;

    if (!ai) {
      return res.json({
        isRealAi: false,
        winCondition: `Control the centerline, neutralize ${opponentArchetype?.name || 'opponent'} primary threat, and dictate round pace with angle cuts.`,
        distanceManagement: 'Stay on the outside kicking perimeter; avoid trading in the 50/50 mid-range pocket.',
        cageStrategy: 'Circle towards the opponent weak side; maintain minimum 4-foot buffer from the fence.',
        roundPlans: [
          {
            round: 1,
            objective: 'Download timing, establish lead jab and calf kick range, and stuff initial attacks.',
            strikingFocus: 'High volume lead hand probing, front teeps to sternum to disrupt forward momentum.',
            grapplingFocus: 'Sprawl heavily on any level change. Overhook whizzer if pushed to the cage.',
            dangerAlert: 'Do not overcommit on power hooks in the opening two minutes.'
          },
          {
            round: 2,
            objective: 'Accelerate output as opponent rhythm becomes predictable; initiate level-change feints.',
            strikingFocus: '1-2 combination into 90-degree lead pivot. Dig lead hook into floating ribs.',
            grapplingFocus: 'Attack reactive double legs when opponent over-swings.',
            dangerAlert: 'Watch for counter overhand rights when exiting the exchange.'
          },
          {
            round: 3,
            objective: 'Championship round push: High pace, cage cutoff, and dominant positional control.',
            strikingFocus: 'Level-change feint into overhand right. Continuous head-body combinations.',
            grapplingFocus: 'Establish top half guard or mount to drain remaining clock and seal the decision.',
            dangerAlert: 'Desperation flurries in the final 30 seconds; keep chin glued behind shoulder.'
          }
        ],
        keyCombinations: [
          'Lead Jab - Outside Calf Kick - Angle Exit 45',
          'Level-Change Feint - Overhand Right',
          'Check Hook on Pivot - Rear Cross Down the Pipe'
        ],
        defensiveChecklist: [
          'High rear guard glued to temple to absorb overhands',
          'Sprawl reflex: kick hips to canvas immediately upon level drop',
          'Never retreat in a linear straight line toward the cage fence',
          'Underhook pummeling: head position higher than opponent chin'
        ]
      });
    }

    const systemInstruction = `You are a world-championship MMA Head Coach (like Trevor Wittman, Javier Mendez, or Greg Jackson) building a tactical fight blueprint.
Analyze the matchup between the user and the opponent style. Provide a rigorous, realistic, high-IQ 3-round fight game plan following the Unified Rules of MMA.
Output JSON with:
- winCondition: 1-sentence overarching victory path
- distanceManagement: range discipline and positioning advice
- cageStrategy: octagon positioning (center control, wall defense, cutting angles)
- roundPlans: array of 3 rounds, each with { round, objective, strikingFocus, grapplingFocus, dangerAlert }
- keyCombinations: 3 specific combat striking combinations to drill
- defensiveChecklist: 4 critical defensive responsibilities`;

    const promptText = `Generate custom MMA fight game plan:
- Fighter Stance: ${userStance || 'Orthodox'}
- Fighter Discipline: ${userDiscipline || 'MMA'}
- Opponent Style: ${opponentArchetype?.name || 'Balanced Striker/Grappler'} (${opponentArchetype?.style || 'MMA'})
- Opponent Stance: ${opponentStance || 'Orthodox'}
- Opponent Primary Weapons: ${opponentArchetype?.primaryWeapons ? opponentArchetype.primaryWeapons.join(', ') : 'Standard MMA attacks'}
- Opponent Vulnerabilities: ${opponentArchetype?.vulnerabilities ? opponentArchetype.vulnerabilities.join(', ') : 'Standard openings'}
- Additional Notes: ${fighterNotes || 'Standard 3x5min MMA bout'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: promptText }],
        },
      ],
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            winCondition: { type: Type.STRING },
            distanceManagement: { type: Type.STRING },
            cageStrategy: { type: Type.STRING },
            roundPlans: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  round: { type: Type.INTEGER },
                  objective: { type: Type.STRING },
                  strikingFocus: { type: Type.STRING },
                  grapplingFocus: { type: Type.STRING },
                  dangerAlert: { type: Type.STRING },
                },
                required: ['round', 'objective', 'strikingFocus', 'grapplingFocus', 'dangerAlert'],
              },
            },
            keyCombinations: { type: Type.ARRAY, items: { type: Type.STRING } },
            defensiveChecklist: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['winCondition', 'distanceManagement', 'cageStrategy', 'roundPlans', 'keyCombinations', 'defensiveChecklist'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({
      ...parsed,
      isRealAi: true,
    });
  } catch (error: any) {
    console.error('Error generating gameplan:', error);
    return res.status(500).json({
      error: 'Could not generate fight game plan',
      details: error.message || String(error),
    });
  }
});

// ----------------------------------------------------
// Express & Vite integration
// ----------------------------------------------------
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FightLab server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
