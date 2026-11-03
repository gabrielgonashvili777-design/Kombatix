import {
  Technique,
  BjjPosition,
  DailyChallenge,
  Achievement,
  OpponentArchetype,
  FightGamePlan,
  FightSimScenario
} from '../types';

export const APP_IMAGES = {
  hero: '/src/assets/images/hero_mma_fighter_1793692164782.jpg',
  striking: '/src/assets/images/striking_shadowboxing_1793692167036.jpg',
  bjj: '/src/assets/images/bjj_grappling_action_1793692167589.jpg',
  wrestling: '/src/assets/images/wrestling_takedown_1793692167647.jpg',
};

export const MMA_TECHNIQUES: Technique[] = [
  // ---------------- BOXING ----------------
  {
    id: 'box-jab',
    name: 'The Lead Jab',
    discipline: 'Boxing',
    category: 'Striking / Fundamentals',
    difficulty: 'Beginner',
    description: 'The cornerstone of combat striking. The jab establishes range, disrupts opponent rhythm, blinds vision for combinations, and scores points with minimal exposure.',
    steps: [
      {
        phase: 'Stance & Loading',
        instruction: 'Stand in athletic stance with weight distributed 50/50. Hands high, rear hand glued to your cheekbone, elbows tucked.',
        keyCue: 'Do not telegraph by pulling the hand back before extending.'
      },
      {
        phase: 'Extension & Rotation',
        instruction: 'Step forward slightly with lead foot while extending the lead fist straight out like a piston. Rotate fist 90 degrees right at the moment of impact so thumb faces downward-inward.',
        keyCue: 'Elevate lead shoulder to guard your chin from counter overhands.'
      },
      {
        phase: 'Snap & Retraction',
        instruction: 'Snap the punch with high velocity and instantly retract along the exact same linear trajectory back to your cheek.',
        keyCue: 'Never drop your lead hand to your chest upon recovery.'
      }
    ],
    commonMistakes: [
      { mistake: 'Flaring the lead elbow outwards like a chicken wing', fix: 'Keep elbow pointing straight down at the mat until the final rotation snap.' },
      { mistake: 'Dropping the rear hand while firing the jab', fix: 'Glue rear thumb to temple or cheekbone to prevent taking an overhand counter.' },
      { mistake: 'Overreaching past your center of gravity', fix: 'Take a micro 2-inch step with the lead foot instead of leaning your head forward.' }
    ],
    relatedTechniqueIds: ['box-cross', 'box-slip', 'box-lead-hook'],
    imageKey: 'striking',
    videoYoutubeId: 'ArQ50PXMCj4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=ArQ50PXMCj4',
    externalResourceTitle: 'How to Throw the Perfect Jab in Boxing - Tony Jeffries',
    drillSuggestion: '3 rounds x 3 min: Double jab, lateral pivot, single jab to the body.'
  },
  {
    id: 'box-cross',
    name: 'Rear Cross (Straight Right/Left)',
    discipline: 'Boxing',
    category: 'Striking / Power Punches',
    difficulty: 'Beginner',
    description: 'The primary power straight punch. Driven from the rear foot, transferred through hips and core, delivering maximum linear kinetic energy while keeping chin guarded.',
    steps: [
      {
        phase: 'Initiation from Floor',
        instruction: 'Drive through the ball of the rear foot, pivoting rear heel outward as if extinguishing a cigarette.',
        keyCue: 'Power originates from foot friction and hip rotation, not the arm muscles.'
      },
      {
        phase: 'Torso Rotation & Extension',
        instruction: 'Rotate hips and torso 45 degrees, driving rear shoulder forward while extending the punch down the center pipe.',
        keyCue: 'Tuck chin into the rising rear shoulder collar.'
      },
      {
        phase: 'Recovery & Angle Exit',
        instruction: 'After impact, snap hand back to high guard and reset hips square or slip slightly off line.',
        keyCue: 'Do not stay parked in the pocket after committing weight.'
      }
    ],
    commonMistakes: [
      { mistake: 'Lifting rear foot off the mat entirely', fix: 'Keep the ball of the rear foot grounded to maintain base and balance.' },
      { mistake: 'Dropping lead hand while rotating', fix: 'Keep lead hand posted defensively in front of jaw.' }
    ],
    relatedTechniqueIds: ['box-jab', 'box-lead-hook', 'mma-feint-overhand'],
    imageKey: 'striking',
    videoYoutubeId: 'sK-6Ujp3KYY',
    externalResourceUrl: 'https://www.youtube.com/watch?v=sK-6Ujp3KYY',
    externalResourceTitle: 'How to Throw the Perfect Cross (Straight Right) - Tony Jeffries',
    drillSuggestion: '50 reps slow motion focusing on rear hip rotation, followed by 3x3min 1-2 combination drilling.'
  },
  {
    id: 'box-lead-hook',
    name: 'Lead Hook (Punch #3)',
    discipline: 'Boxing',
    category: 'Striking / Power Punches',
    difficulty: 'Intermediate',
    description: 'A devasating short-range hook designed to loop around the opponent guard and land flush on the jawline or temple, generating tremendous rotational torque.',
    steps: [
      {
        phase: 'Weight Shift & Load',
        instruction: 'Shift 60% of weight onto lead leg during a slip or following a rear cross to load the lead hip spring.',
        keyCue: 'Do not pull the hand back; let the torso load the strike.'
      },
      {
        phase: 'Horizontal Swing & Pivot',
        instruction: 'Pivot the lead foot 90 degrees on the ball, swinging lead arm in a tight horizontal arc with elbow bent at 90 degrees.',
        keyCue: 'Keep elbow, wrist, and shoulder on the exact same horizontal plane upon impact.'
      },
      {
        phase: 'Follow-Through & Shield',
        instruction: 'Stop the punch at opponent centerline without over-swinging, immediately returning lead glove to guard.',
        keyCue: 'Rear hand remains glued to cheek to block counters.'
      }
    ],
    commonMistakes: [
      { mistake: 'Over-swinging wildly past opponent centerline', fix: 'Lock elbow at 90 degrees and stop fist once it crosses the nose axis.' },
      { mistake: 'Throwing arm punch without pivoting lead foot', fix: 'Drive hip inward like slamming a car door.' }
    ],
    relatedTechniqueIds: ['box-jab', 'box-cross', 'box-slip'],
    imageKey: 'striking',
    videoYoutubeId: 'tyH4tYzgSqU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=tyH4tYzgSqU',
    externalResourceTitle: 'The PROPER Way To Throw The Hook - Tony Jeffries',
    drillSuggestion: 'Practice 1-2-Lead Hook on heavy bag or shadowbox with 3-second pause at hip pivot.'
  },
  {
    id: 'box-uppercut',
    name: 'Rear Uppercut',
    discipline: 'Boxing',
    category: 'Striking / Inside Fighting',
    difficulty: 'Intermediate',
    description: 'A lethal vertical punch delivered in close range, driving upward between the opponent guard or punishing fighters who duck their heads forward.',
    steps: [
      {
        phase: 'Level Dip',
        instruction: 'Bend knees and dip rear shoulder slightly, lowering center of gravity rather than dropping hand.',
        keyCue: 'Never drop your hand below your belt line.'
      },
      {
        phase: 'Upward Leg Drive',
        instruction: 'Explode upward through legs and core, driving fist upward with palm facing your chest.',
        keyCue: 'Drive with leg extension; keep punch compact.'
      },
      {
        phase: 'Tight Return',
        instruction: 'Snap directly back to defensive shell as you stand tall.',
        keyCue: 'Lead hand must remain vigilant against incoming hooks.'
      }
    ],
    commonMistakes: [
      { mistake: 'Bowling ball motion winding up from hip', fix: 'Keep fist close to collarbone and lift with knee extension.' },
      { mistake: 'Leaning upper body backwards', fix: 'Keep head tucked forward with chin down.' }
    ],
    relatedTechniqueIds: ['box-lead-hook', 'box-cross', 'box-bob-weave'],
    imageKey: 'striking',
    videoYoutubeId: 'b33rufECWs0',
    externalResourceUrl: 'https://www.youtube.com/watch?v=b33rufECWs0',
    externalResourceTitle: 'How to Throw the Uppercut - Tony Jeffries',
    drillSuggestion: 'Slip rear -> Rear uppercut -> Lead hook -> Exit 45 degrees.'
  },
  {
    id: 'box-slip',
    name: 'The Slip & Centerline Evasion',
    discipline: 'Boxing',
    category: 'Defense / Head Movement',
    difficulty: 'Beginner',
    description: 'Evading straight punches by moving your head just inches off the central trajectory while loading your hips for immediate counter strikes.',
    steps: [
      {
        phase: 'Anticipation',
        instruction: 'Watch opponent chest and shoulder line rather than gloves to detect early telegraphs.',
        keyCue: 'Keep eyes on opponent throughout the movement.'
      },
      {
        phase: 'Lateral Crunch',
        instruction: 'Rotate shoulders and crunch obliques slightly so the oncoming punch grazes past your ear.',
        keyCue: 'Move only 2-3 inches—excessive movement wastes energy.'
      },
      {
        phase: 'Loaded Counter',
        instruction: 'Use the compressed hip spring to fire a counter cross or lead hook as you return.',
        keyCue: 'A slip without a counter is a wasted defensive opportunity.'
      }
    ],
    commonMistakes: [
      { mistake: 'Bending at the waist and staring at the mat', fix: 'Bend knees and crunch obliques; eyes remain locked forward.' },
      { mistake: 'Sliding straight backwards in a flat line', fix: 'Move diagonally forward-outside to cut angles.' }
    ],
    relatedTechniqueIds: ['box-bob-weave', 'box-shoulder-roll', 'box-jab'],
    imageKey: 'hero',
    videoYoutubeId: 'DOWc7NMSuEQ',
    externalResourceUrl: 'https://www.youtube.com/watch?v=DOWc7NMSuEQ',
    externalResourceTitle: 'How to SLIP Punches FASTER in Boxing - Tony Jeffries',
    drillSuggestion: 'Slip cord drill: 3 rounds walking along a taut string, slipping under each step.'
  },
  {
    id: 'box-bob-weave',
    name: 'Bob & Weave (The Roll)',
    discipline: 'Boxing',
    category: 'Defense / Head Movement',
    difficulty: 'Intermediate',
    description: 'Rolling underneath incoming hooks in a smooth U-shaped arc with the legs, resurfacing on the opponent blind flank.',
    steps: [
      {
        phase: 'Read Hook Arc',
        instruction: 'Identify the wide rotational path of opponent hook.',
        keyCue: 'Maintain hands glued to temples.'
      },
      {
        phase: 'Squat & Roll Underneath',
        instruction: 'Drop your hips 6 inches by bending knees and roll your torso under the punch in a smooth horseshoe motion.',
        keyCue: 'Do not bend your spine forward; keep back athletic.'
      },
      {
        phase: 'Ascend with Hook/Cross',
        instruction: 'Drive legs up on the outside of opponent punch, unloading with your own hook to body or head.',
        keyCue: 'Pop up like a coiled spring into position.'
      }
    ],
    commonMistakes: [
      { mistake: 'Looking down at feet during the roll', fix: 'Keep eyes up on the opponent chin level throughout.' },
      { mistake: 'Rolling too low into potential knee strikes (MMA danger)', fix: 'Keep dip minimal in MMA; only duck enough to clear gloves.' }
    ],
    relatedTechniqueIds: ['box-slip', 'box-lead-hook', 'box-pivot'],
    imageKey: 'striking',
    videoYoutubeId: 'DOWc7NMSuEQ',
    externalResourceUrl: 'https://www.youtube.com/watch?v=DOWc7NMSuEQ',
    externalResourceTitle: 'Boxing Head Movement & Rolling Under Hooks - Tony Jeffries',
    drillSuggestion: 'Slip-Slip-Roll-Cross combination shadowboxing rounds.'
  },
  {
    id: 'box-shoulder-roll',
    name: 'Shoulder Roll (Philly Shell Concept)',
    discipline: 'Boxing',
    category: 'Defense / Guard Positioning',
    difficulty: 'Advanced',
    description: 'A sophisticated defensive stance where the lead shoulder is elevated to deflect straight punches while the rear hand catches hooks and counters instantly.',
    steps: [
      {
        phase: 'Posture Alignment',
        instruction: 'Lead shoulder raised high to cover chin, lead arm draped across stomach to protect body, rear hand glued to right cheek.',
        keyCue: 'Angle body 60 degrees away from opponent centerline.'
      },
      {
        phase: 'Deflective Twist',
        instruction: 'Rotate lead shoulder into oncoming cross or jab so impact glides harmlessly off the shoulder cap.',
        keyCue: 'Relax upper shoulder muscles to let force glance off.'
      },
      {
        phase: 'Spring Counter',
        instruction: 'Uncoil rear cross or check hook immediately as the opponent punch skids away.',
        keyCue: 'Time your shot at the exact climax of their extension.'
      }
    ],
    commonMistakes: [
      { mistake: 'Attempting Philly shell against high kicks in MMA without modification', fix: 'Use high guard if head kicks or elbows are in range.' },
      { mistake: 'Leaving lead chin exposed by dropping shoulder', fix: 'Shoulder must tuck tightly beneath the ear.' }
    ],
    relatedTechniqueIds: ['box-slip', 'box-cross'],
    imageKey: 'hero',
    videoYoutubeId: 'FSVcmMd9bR4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=FSVcmMd9bR4',
    externalResourceTitle: 'Philly Shell & Shoulder Roll Fundamentals - Tony Jeffries',
    drillSuggestion: 'Partner drill or mirror drill catching straight shots with lead shoulder deflection.'
  },
  {
    id: 'box-pivot',
    name: 'Lead Foot Pivot & Angle Cut',
    discipline: 'Boxing',
    category: 'Footwork / Ring Craft',
    difficulty: 'Intermediate',
    description: 'Nailing the lead foot into the canvas and swinging the rear leg 45 to 90 degrees to escape ropes/cage pressure and create open striking avenues.',
    steps: [
      {
        phase: 'Anchor Lead Foot',
        instruction: 'Place ball of lead foot firmly while opponent rushes in straight line.',
        keyCue: 'Treat lead foot like a compass needle pivot point.'
      },
      {
        phase: 'Swing Rear Foot',
        instruction: 'Sweep rear foot laterally 90 degrees while maintaining balance and guard.',
        keyCue: 'Your head moves completely off their attack runway.'
      },
      {
        phase: 'Establish New Stance',
        instruction: 'Catch your weight instantly in your fighting stance and fire cross or check hook.',
        keyCue: 'Be ready to strike before opponent turns to face you.'
      }
    ],
    commonMistakes: [
      { mistake: 'Crossing feet during pivot', fix: 'Swing rear leg behind in a clean arc; never cross legs.' },
      { mistake: 'Losing high guard while turning', fix: 'Hands remain glued to cheekbones.' }
    ],
    relatedTechniqueIds: ['box-lead-hook', 'mma-cage-cutoff'],
    imageKey: 'striking',
    videoYoutubeId: 'KODMvHfTfX0',
    externalResourceUrl: 'https://www.youtube.com/watch?v=KODMvHfTfX0',
    externalResourceTitle: 'Boxing Basics: How to Move & Pivot - Tony Jeffries',
    drillSuggestion: 'Agility cone footwork: Step jab, pivot 90 degrees around cone, fire 2-3.'
  },

  // ---------------- MUAY THAI ----------------
  {
    id: 'mt-low-kick',
    name: 'Rear Low Kick (Leg Chopper)',
    discipline: 'Muay Thai',
    category: 'Kicks / Lower Body',
    difficulty: 'Beginner',
    description: 'One of the most destructive strikes in combat sports. Swung like a baseball bat into opponent quadricep or calf to compromise mobility, base, and takedown drive.',
    steps: [
      {
        phase: 'Step 45 Degrees',
        instruction: 'Step lead foot 45 degrees outside opponent lead leg, opening lead hip for full rotation.',
        keyCue: 'Step off the centerline to clear incoming straight punches.'
      },
      {
        phase: 'Swing & Hip Turn',
        instruction: 'Turn rear hip completely over so belly button faces opposite wall. Strike with hard lower third of tibia shin bone.',
        keyCue: 'Swing rear arm down for counterbalance while lead hand shields face.'
      },
      {
        phase: 'Impact & Snap Reset',
        instruction: 'Chop through the leg muscle like cutting down a tree, rebounding leg immediately into stance.',
        keyCue: 'Aim through the target, not to the surface.'
      }
    ],
    commonMistakes: [
      { mistake: 'Kicking with the fragile foot/instep instead of shin', fix: 'Condition and land exclusively with the dense lower tibia bone.' },
      { mistake: 'Dropping opposite hand, exposing head to counter hook', fix: 'Glue lead hand to temple or post onto opponent forehead.' }
    ],
    relatedTechniqueIds: ['mt-switch-kick', 'mt-teep', 'box-jab'],
    imageKey: 'striking',
    videoYoutubeId: 'zBMr-FsmxqU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=zBMr-FsmxqU',
    externalResourceTitle: 'Muay Thai Stance & Low Kick Mechanics - Sean Fagan',
    drillSuggestion: '100 low kicks on heavy bag alternating with check defense.'
  },
  {
    id: 'mt-switch-kick',
    name: 'Lead Switch Kick (Body / Head)',
    discipline: 'Muay Thai',
    category: 'Kicks / Midsection',
    difficulty: 'Intermediate',
    description: 'A lightning-fast kick targeting opponent liver, ribs, or neck by micro-switching feet to transform lead leg into a rear power strike with zero delay.',
    steps: [
      {
        phase: 'The Micro-Switch',
        instruction: 'Hop slightly and switch stance in place: lead foot slides back, rear foot steps 45 degrees forward.',
        keyCue: 'Stay low and compact; do not jump high.'
      },
      {
        phase: 'Shin Elevation',
        instruction: 'Rotate hips violently and drive left shin up into opponent right ribs or head.',
        keyCue: 'Turn hip completely over so shin lands horizontally.'
      },
      {
        phase: 'Return to Orthodox',
        instruction: 'Retract leg cleanly and land back into natural orthodox stance.',
        keyCue: 'Maintain balanced posture to check any counter kicks.'
      }
    ],
    commonMistakes: [
      { mistake: 'Jumping high in the air during the switch', fix: 'Keep feet scraping the canvas for maximum quickness.' },
      { mistake: 'Failing to turn hips over, resulting in weak slapping kick', fix: 'Point knee and hip directly into opponent ribs.' }
    ],
    relatedTechniqueIds: ['mt-low-kick', 'mt-teep'],
    imageKey: 'striking',
    videoYoutubeId: 'zBMr-FsmxqU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=zBMr-FsmxqU',
    externalResourceTitle: 'Lead Switch Kick Technique & Power - Sean Fagan',
    drillSuggestion: 'Switch kick speed ladder: 20 rapid switch kicks on pads.'
  },
  {
    id: 'mt-teep',
    name: 'Front Teep (The Push Kick)',
    discipline: 'Muay Thai',
    category: 'Kicks / Distance Control',
    difficulty: 'Beginner',
    description: 'The martial arts equivalent of the jab with the leg. Used to impale the opponent midsection, push them back, disrupt blitz attacks, and manage range.',
    steps: [
      {
        phase: 'Chamber Knee',
        instruction: 'Lift lead knee high to chest level like a coiled pistol.',
        keyCue: 'Knee points directly at target before extending.'
      },
      {
        phase: 'Hip Thrust Extension',
        instruction: 'Thrust hips forward aggressively, pushing ball of foot into opponent sternum or bladder.',
        keyCue: 'Flex toes back; strike with ball of foot.'
      },
      {
        phase: 'Snap Chamber Back',
        instruction: 'Pull foot straight back to knee chamber before dropping down into stance.',
        keyCue: 'Prevents opponent from catching the kicking leg.'
      }
    ],
    commonMistakes: [
      { mistake: 'Leaving kicking leg floating out to get caught and taken down', fix: 'Retract twice as fast as you extend.' },
      { mistake: 'Kicking with flat foot or toes', fix: 'Curl toes backward to pierce with the rigid ball of foot.' }
    ],
    relatedTechniqueIds: ['mt-low-kick', 'wrest-sprawl'],
    imageKey: 'striking',
    videoYoutubeId: 'elLMNnEAfLk',
    externalResourceUrl: 'https://www.youtube.com/watch?v=elLMNnEAfLk',
    externalResourceTitle: 'How to Throw a Powerful Teep Push Kick - Sean Fagan',
    drillSuggestion: 'Partner teep sparring: Intercept partner forward advances with timed teeps.'
  },
  {
    id: 'mt-spear-knee',
    name: 'Spear Knee (Straight Knee Strike)',
    discipline: 'Muay Thai',
    category: 'Knees / Midsection',
    difficulty: 'Intermediate',
    description: 'A forward-thrusting knee designed to pierce through opponent guard and fracture ribs or knock the wind out of their diaphragm.',
    steps: [
      {
        phase: 'Post or Collar Grip',
        instruction: 'Post lead hand on opponent forehead or neck to pull them slightly forward.',
        keyCue: 'Control opponent head to limit their ability to retreat.'
      },
      {
        phase: 'Hip Drive & Toe Point',
        instruction: 'Thrust hips forward like a spear, pointing toes downward to sharpen the kneecap point.',
        keyCue: 'Lean upper body slightly back to counterbalance powerful hip thrust.'
      },
      {
        phase: 'Step-Down Reset',
        instruction: 'Step knee straight down into strong base.',
        keyCue: 'Immediately frame against counter takedowns.'
      }
    ],
    commonMistakes: [
      { mistake: 'Lifting knee upward instead of thrusting forward', fix: 'Drive hips forward horizontally into opponent abdomen.' },
      { mistake: 'Leaving toes relaxed', fix: 'Point toes down to make patella bone razor sharp.' }
    ],
    relatedTechniqueIds: ['mt-clinch-plum', 'mt-elbow'],
    imageKey: 'hero',
    videoYoutubeId: 'EKFytLBP-Iw',
    externalResourceUrl: 'https://www.youtube.com/watch?v=EKFytLBP-Iw',
    externalResourceTitle: 'Muay Thai Clinch & Knee Strike Mechanics - Sean Fagan',
    drillSuggestion: 'Heavy bag clinch knee drills: 50 thrusting knees with hip pop.'
  },
  {
    id: 'mt-elbow',
    name: 'Horizontal Cutting Elbow',
    discipline: 'Muay Thai',
    category: 'Elbows / Close Quarters',
    difficulty: 'Intermediate',
    description: 'A razor-sharp close-range strike utilizing the olecranon bone point to slice skin over eyebrows or knock out opponents inside the pocket.',
    steps: [
      {
        phase: 'Pocket Entry',
        instruction: 'Close distance safely behind a jab or inside a collar tie clinch.',
        keyCue: 'Keep opposite hand raised in tight telephone shield.'
      },
      {
        phase: 'Thumb to Chest & Rotate',
        instruction: 'Bring thumb to collarbone/chest to lock forearm tight, rotating torso and slicing elbow horizontally across jaw.',
        keyCue: 'Rotate shoulders as if throwing a tight hook.'
      },
      {
        phase: 'Reset or Follow',
        instruction: 'Loop around and recover guard or follow with an immediate rear elbow.',
        keyCue: 'Stay compact to avoid being caught on the inside.'
      }
    ],
    commonMistakes: [
      { mistake: 'Throwing elbow from wide distance where it misses', fix: 'Only throw when chest-to-chest or inside 18 inches.' },
      { mistake: 'Opening hand and loosening forearm tension', fix: 'Thumb tight to collarbone locks the bone structure rigid.' }
    ],
    relatedTechniqueIds: ['mt-clinch-plum', 'mt-spear-knee'],
    imageKey: 'striking',
    videoYoutubeId: '2nViNSWq0cw',
    externalResourceUrl: 'https://www.youtube.com/watch?v=2nViNSWq0cw',
    externalResourceTitle: 'Muay Thai Clinch Trapping & Elbow Technique - Sean Fagan',
    drillSuggestion: 'Shadowbox combinations: 1-2 -> Level-change entry -> Horizontal elbow.'
  },
  {
    id: 'mt-clinch-plum',
    name: 'Muay Thai Clinch (Double Collar Tie / Plum)',
    discipline: 'Muay Thai',
    category: 'Clinch / Control',
    difficulty: 'Intermediate',
    description: 'Controlling opponent crown and neck with both hands cupped behind head to steer their posture down into devastating knee strikes and elbow sweeps.',
    steps: [
      {
        phase: 'Crown Grip Acquisition',
        instruction: 'Swim arms inside opponent guard. Cup hands one over the other behind the highest point of crown.',
        keyCue: 'Never interlace fingers; stack palms over crown.'
      },
      {
        phase: 'Elbow Compression',
        instruction: 'Squeeze forearms against opponent collarbones, pinning their head to your chest.',
        keyCue: 'Break their spine alignment so their eyes point down at mat.'
      },
      {
        phase: 'Steer & Knee',
        instruction: 'Pull head down and rotate their torso while driving knees into ribs.',
        keyCue: 'Off-balance opponent continuously so they cannot swing power punches.'
      }
    ],
    commonMistakes: [
      { mistake: 'Interlacing fingers (vulnerable to broken fingers)', fix: 'Stack palm on back of opposite hand.' },
      { mistake: 'Allowing opponent to swim underhooks inside', fix: 'Keep elbows tight together in the center.' }
    ],
    relatedTechniqueIds: ['mt-spear-knee', 'wrest-underhook'],
    imageKey: 'hero',
    videoYoutubeId: 'EKFytLBP-Iw',
    externalResourceUrl: 'https://www.youtube.com/watch?v=EKFytLBP-Iw',
    externalResourceTitle: 'Muay Thai Clinch Positioning & Escapes - Sean Fagan',
    drillSuggestion: 'Clinch swimming rounds: 3x3min battling for inside collar tie control.'
  },

  // ---------------- WRESTLING ----------------
  {
    id: 'wrest-level-change',
    name: 'Level Change & Penetration Step',
    discipline: 'Wrestling',
    category: 'Takedowns / Fundamentals',
    difficulty: 'Beginner',
    description: 'The foundational athletic mechanism behind all leg takedowns. Dropping hips without bending spine and shooting the lead knee deep between opponent feet.',
    steps: [
      {
        phase: 'Level Change',
        instruction: 'Lower your center of gravity by bending at knees and ankles while keeping chest tall and eyes up.',
        keyCue: 'Never bend at waist; maintain strong erect spinal posture.'
      },
      {
        phase: 'Penetration Step',
        instruction: 'Step lead foot deeply between opponent legs, sliding lead knee onto canvas mat like a spear.',
        keyCue: 'Trail leg follows instantly to provide explosive forward propulsion.'
      },
      {
        phase: 'Head Up & Drive',
        instruction: 'Drive head and forehead into opponent chest or sternum while wrapping both legs.',
        keyCue: 'Head in the chest controls their spine and neutralizes counter guillotines.'
      }
    ],
    commonMistakes: [
      { mistake: 'Ducking head down towards opponent waist (walks right into guillotine choke)', fix: 'Keep chin up, neck packed, forehead buried into sternum.' },
      { mistake: 'Shooting from too far outside without setting up with strikes', fix: 'Touch opponent lead hand before shooting to ensure in range.' }
    ],
    relatedTechniqueIds: ['wrest-double-leg', 'wrest-single-leg', 'mma-feint-overhand'],
    imageKey: 'wrestling',
    videoYoutubeId: 'vFvl1tdr8l4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=vFvl1tdr8l4',
    externalResourceTitle: 'Wrestling Level Change & Penetration Step - Cary Kolat',
    drillSuggestion: '50 continuous penetration steps across the mat, popping back to stance.'
  },
  {
    id: 'wrest-double-leg',
    name: 'Blast Double-Leg Takedown',
    discipline: 'Wrestling',
    category: 'Takedowns / Core',
    difficulty: 'Intermediate',
    description: 'Explosive takedown driving straight through opponent hips, cup-gripping behind both knees, and turning the corner to slam opponent to the mat.',
    steps: [
      {
        phase: 'Jab Setup & Level Drop',
        instruction: 'Throw jab to lift opponent hands, instantly changing levels beneath their eye line.',
        keyCue: 'Shoot under their punches when their hips are stationary.'
      },
      {
        phase: 'Deep Drive & Knee Wrap',
        instruction: 'Shoot penetration step between their legs, driving forehead into chest while wrapping arms behind knee joints.',
        keyCue: 'Pull their knees towards you as your forehead drives their chest away.'
      },
      {
        phase: 'Turn the Corner',
        instruction: 'Step trail foot out 45 degrees, angle your hips, and drive diagonally to dump them onto their back into side control.',
        keyCue: 'Never stay underneath their full guard; cut the angle immediately.'
      }
    ],
    commonMistakes: [
      { mistake: 'Stopping forward drive upon contact', fix: 'Keep legs pumping forward until opponent touches canvas.' },
      { mistake: 'Reaching with arms before hips arrive', fix: 'Hips must penetrate past opponent knees.' }
    ],
    relatedTechniqueIds: ['wrest-single-leg', 'wrest-sprawl', 'bjj-side-control'],
    imageKey: 'wrestling',
    videoYoutubeId: 'vFvl1tdr8l4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=vFvl1tdr8l4',
    externalResourceTitle: 'Double Leg Head Drive - Cary Kolat Wrestling Moves',
    drillSuggestion: 'Double leg repetitions against wall pads and live mat drills.'
  },
  {
    id: 'wrest-single-leg',
    name: 'Single-Leg Takedown (Run the Pipe)',
    discipline: 'Wrestling',
    category: 'Takedowns / Core',
    difficulty: 'Intermediate',
    description: 'Isolating one of opponent legs between your thighs, lifting it onto your hip shelf, and circling backwards to force them to the floor.',
    steps: [
      {
        phase: 'Angle Entry',
        instruction: 'Snatch opponent lead leg, wrapping both hands around calf/thigh with forehead pressed into their ribs.',
        keyCue: 'Keep head on the inside of their chest to prevent head locks.'
      },
      {
        phase: 'Shelf the Leg',
        instruction: 'Elevate opponent leg, pinching it between your legs or hoisting it onto your hip.',
        keyCue: 'Posture tall with back straight to support weight.'
      },
      {
        phase: 'Run the Pipe Finish',
        instruction: 'Take a deep back step in a circular motion like pulling a heavy rug, dropping opponent to hip.',
        keyCue: 'Rotate in the direction of their captured heel.'
      }
    ],
    commonMistakes: [
      { mistake: 'Leaving head on the outside (exposes to guillotine or switch counter)', fix: 'Bury head tight into opponent ribcage or sternum.' },
      { mistake: 'Bending back instead of using leg power', fix: 'Squat and stand tall with athletic glute drive.' }
    ],
    relatedTechniqueIds: ['wrest-double-leg', 'wrest-sprawl', 'bjj-half-guard'],
    imageKey: 'wrestling',
    videoYoutubeId: 'mRIDD2zoKJ8',
    externalResourceUrl: 'https://www.youtube.com/watch?v=mRIDD2zoKJ8',
    externalResourceTitle: 'Single Leg Takedown Breakdown - Cary Kolat / Stephan Kesting',
    drillSuggestion: 'Single leg chain drill: High single -> Run the pipe -> Step through.'
  },
  {
    id: 'wrest-sprawl',
    name: 'The Sprawl & Cross-Face Defense',
    discipline: 'Wrestling',
    category: 'Defense / Takedown Defense',
    difficulty: 'Beginner',
    description: 'The primary defense against all leg takedowns. Throwing your hips backwards and downward, driving massive hip weight onto opponent neck and shoulders.',
    steps: [
      {
        phase: 'Instant Reaction',
        instruction: 'As opponent changes level, drop your hands to frame on their shoulders or head.',
        keyCue: 'Fight their head before their hands touch your legs.'
      },
      {
        phase: 'Kick Hips Back & Mat Drive',
        instruction: 'Violently kick both legs straight back, slamming your pelvic bone into the back of their neck/upper back.',
        keyCue: 'Hips heavy like an anvil; shoelaces flat on the mat.'
      },
      {
        phase: 'Cross-Face & Spin Behind',
        instruction: 'Drive forearm across opponent nose/cheek (cross-face) to turn their head away, spinning behind to take the back.',
        keyCue: 'Where the head goes, the body follows.'
      }
    ],
    commonMistakes: [
      { mistake: 'Hesitating and letting opponent lock hands around knees', fix: 'Sprawl the instant their level drops; do not wait for contact.' },
      { mistake: 'Staying on your knees instead of driving hip weight down', fix: 'Legs must be completely extended back with hips glued to their head.' }
    ],
    relatedTechniqueIds: ['wrest-double-leg', 'bjj-turtle', 'mma-cage-wallwalk'],
    imageKey: 'wrestling',
    videoYoutubeId: 'QMVavyxjlNU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=QMVavyxjlNU',
    externalResourceTitle: 'Best Sprawl Position To Stop Leg Attack - Cary Kolat',
    drillSuggestion: 'Sprawl reflex drill: Partner claps hands or feints shot, explosive sprawl reset 20 reps.'
  },
  {
    id: 'wrest-underhook',
    name: 'Underhook Control & Front Headlock',
    discipline: 'Wrestling',
    category: 'Clinch / Control',
    difficulty: 'Intermediate',
    description: 'Pummeling an arm under opponent armpit to control their shoulder girdle, posture, and off-balance them for throws, cage pins, or snapdowns.',
    steps: [
      {
        phase: 'Pummel Inside',
        instruction: 'Dig your forearm up through opponent armpit, gripping over their far shoulder with high elbow.',
        keyCue: 'Elbow must be higher than your shoulder to control leverage.'
      },
      {
        phase: 'Head Position Battle',
        instruction: 'Bury your forehead under their chin or into their temple to block their forward gaze.',
        keyCue: 'Head position wins 80% of wrestling clinches.'
      },
      {
        phase: 'Snapdown or Knee Pick',
        instruction: 'Jack up underhook to open their stance, or snap their head down into front headlock.',
        keyCue: 'Threaten both upper body throws and low leg picks simultaneously.'
      }
    ],
    commonMistakes: [
      { mistake: 'Weak low elbow that allows opponent to overhook/whizzer you easily', fix: 'Jack elbow up towards ceiling to keep their shoulder pinned.' },
      { mistake: 'Staying squared up in front of them', fix: 'Angle your torso 45 degrees into their underhook side.' }
    ],
    relatedTechniqueIds: ['mt-clinch-plum', 'mma-cage-wallwalk', 'bjj-turtle'],
    imageKey: 'wrestling',
    videoYoutubeId: '5IHQpcz-Qq8',
    externalResourceUrl: 'https://www.youtube.com/watch?v=5IHQpcz-Qq8',
    externalResourceTitle: 'Underhook Control & Front Headlock - Shane Fazen',
    drillSuggestion: 'Pummeling flow: 5-minute continuous inside underhook pummeling with partner.'
  },

  // ---------------- BRAZILIAN JIU-JITSU ----------------
  {
    id: 'bjj-closed-guard',
    name: 'Closed Guard Fundamentals',
    discipline: 'BJJ',
    category: 'Guard / Ground Combat',
    difficulty: 'Beginner',
    description: 'Bottom practitioner wraps their legs completely around the opponent torso, locking ankles behind the lower back. Neutral in point scoring, but heavily offensive for bottom fighter.',
    steps: [
      {
        phase: 'Ankle Lock & Hip Clamping',
        instruction: 'Lock ankles behind opponent lower back, squeezing adductor thighs tight around their ribs.',
        keyCue: 'Keep hips light and mobile rather than resting flat on the mat.'
      },
      {
        phase: 'Posture Breakdown',
        instruction: 'Pull knees to chest while pulling opponent head/collar down with both hands to break their erect spine.',
        keyCue: 'An opponent without posture cannot land effective ground-and-pound or pass.'
      },
      {
        phase: 'Overhook & Attack Threat',
        instruction: 'Wrap an overhook around their arm and control far wrist, opening pathways for kimuras, armbars, and sweeps.',
        keyCue: 'Never stay inactive on your back; constantly off-balance them.'
      }
    ],
    commonMistakes: [
      { mistake: 'Allowing opponent to post hands on your chest and stand tall', fix: 'Use knee pulls to constantly collapse their posting arms.' },
      { mistake: 'Crossing ankles loosely down around their hips where you get stacked', fix: 'Keep ankles locked high near their kidney line.' }
    ],
    relatedTechniqueIds: ['bjj-armbar', 'bjj-triangle', 'bjj-half-guard'],
    imageKey: 'bjj',
    videoYoutubeId: 'KKxD5kdOkk0',
    externalResourceUrl: 'https://www.youtube.com/watch?v=KKxD5kdOkk0',
    externalResourceTitle: 'BJJ Closed Guard Principles - Stephan Kesting',
    drillSuggestion: 'Positional sparring: Top player tries to break guard, bottom player attacks sweeps/subs.'
  },
  {
    id: 'bjj-armbar',
    name: 'Straight Armbar from Guard',
    discipline: 'BJJ',
    category: 'Submissions / Joint Locks',
    difficulty: 'Beginner',
    description: 'A classic hyperextension submission against opponent elbow joint, isolating the arm between thighs and driving hips upward into the fulcrum.',
    steps: [
      {
        phase: 'Isolate & Pull Arm Across',
        instruction: 'Secure two-on-one control on opponent right wrist and tricep, pulling the arm across your centerline.',
        keyCue: 'Opponent elbow must cross your navel line.'
      },
      {
        phase: 'High Guard & Perpendicular Pivot',
        instruction: 'Place left foot on opponent hip, pivot body 90 degrees perpendicular, and clamp right leg high over their shoulder blade.',
        keyCue: 'Bite down hard with calves to prevent opponent from stacking.'
      },
      {
        phase: 'Leg Over Head & Hip Extension',
        instruction: 'Swing left leg cleanly over opponent face. Pinch knees together, hold wrist with thumbs pointing up, and gently lift hips.',
        keyCue: 'Thumb must point towards ceiling for proper elbow fulcrum.'
      }
    ],
    commonMistakes: [
      { mistake: 'Spreading knees apart while lifting hips', fix: 'Pinch knees tightly together to prevent elbow slip.' },
      { mistake: 'Allowing opponent to stack you and smash your neck', fix: 'Push opponent face away with your leg and scoop their far leg to sweep.' }
    ],
    relatedTechniqueIds: ['bjj-closed-guard', 'bjj-triangle'],
    imageKey: 'bjj',
    videoYoutubeId: 'AV9NorNMWl4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=AV9NorNMWl4',
    externalResourceTitle: 'Armbar from Guard: 3 Most Common Errors - Stephan Kesting',
    drillSuggestion: 'Armbar rotation reps: 20 repetitions each side smoothly without pausing.'
  },
  {
    id: 'bjj-triangle',
    name: 'The Triangle Choke (Sankaku-Jime)',
    discipline: 'BJJ',
    category: 'Submissions / Strangles',
    difficulty: 'Intermediate',
    description: 'Forming a figure-four lock with your legs around opponent head and one arm, compressing carotid arteries with their own shoulder and your inner thigh.',
    steps: [
      {
        phase: 'One-In, One-Out Control',
        instruction: 'Push one opponent arm down to their belly while pulling other arm forward over your shoulder.',
        keyCue: 'Ensure one arm is trapped inside and one arm is outside the guard.'
      },
      {
        phase: 'Lock Figure-Four',
        instruction: 'Shoot hips high and clamp ankles behind their neck. Pull trapped arm across your chest.',
        keyCue: 'Arm across chest ensures their own shoulder chokes their carotid artery.'
      },
      {
        phase: 'Angle Cut & Squeeze',
        instruction: 'Underhook their free arm or leg to pivot 45 degrees, lock shin under knee pit, and squeeze knees together while pulling head down.',
        keyCue: 'Cutting an angle eliminates neck space and finishes the choke with minimal effort.'
      }
    ],
    commonMistakes: [
      { mistake: 'Locking over your own foot instead of your shin (breaks your own ankle)', fix: 'Adjust hips so your shin lies flat under your opposite knee crease.' },
      { mistake: 'Leaving trapped arm on the wrong side', fix: 'Cross their arm firmly across your torso before locking.' }
    ],
    relatedTechniqueIds: ['bjj-closed-guard', 'bjj-armbar'],
    imageKey: 'bjj',
    videoYoutubeId: 'szAvJFvIzx4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=szAvJFvIzx4',
    externalResourceTitle: 'How to Escape & Finish Triangle Choke - Stephan Kesting',
    drillSuggestion: 'Triangle setup flow: Overhook to wrist shove to triangle catch.'
  },
  {
    id: 'bjj-half-guard',
    name: 'Half Guard & Knee Shield Control',
    discipline: 'BJJ',
    category: 'Guard / Retention',
    difficulty: 'Intermediate',
    description: 'Trapping one of opponent legs between your two legs while maintaining active frames (knee shield) to prevent being flattened out and initiate sweeps.',
    steps: [
      {
        phase: 'Get on Your Hip',
        instruction: 'Never stay flat on your back. Turn 90 degrees onto your bottom hip facing your opponent.',
        keyCue: 'Flat back is the enemy in half guard.'
      },
      {
        phase: 'Insert Knee Shield',
        instruction: 'Place top knee across opponent chest like a rigid diagonal barrier. Collar tie or post with top hand.',
        keyCue: 'Knee shield prevents opponent from establishing crossface.'
      },
      {
        phase: 'Underhook Dogfight Entry',
        instruction: 'Collapse knee shield when opponent pressures, shoot deep underhook, and come up to knees in dogfight position.',
        keyCue: 'High underhook allows you to take their back or sweep to top.'
      }
    ],
    commonMistakes: [
      { mistake: 'Allowing top player to secure a deep crossface and flatten your shoulders', fix: 'Protect neck with top frame; tuck chin into top shoulder.' },
      { mistake: 'Losing bottom leg lock', fix: 'Figure-four (lockdown) or tight ankle hook on their shin.' }
    ],
    relatedTechniqueIds: ['bjj-closed-guard', 'bjj-side-control', 'bjj-back-take'],
    imageKey: 'bjj',
    videoYoutubeId: '5ALqUk9uefk',
    externalResourceUrl: 'https://www.youtube.com/watch?v=5ALqUk9uefk',
    externalResourceTitle: 'Half Guard & Knee Shield Control - Stephan Kesting',
    drillSuggestion: 'Dogfight sparring: Start from half guard underhook, wrestle up to takedown.'
  },
  {
    id: 'bjj-side-control',
    name: 'Side Control Top & Heavy Pressure',
    discipline: 'BJJ',
    category: 'Pins / Dominant Positions',
    difficulty: 'Beginner',
    description: 'Perpendicular chest-to-chest pin neutralizing bottom player hips, securing crossface and far underhook to establish complete control and hunt submissions.',
    steps: [
      {
        phase: 'Crossface & Far Underhook',
        instruction: 'Wrap near arm under opponent neck, driving shoulder into their jaw (shoulder of justice) to turn their head away.',
        keyCue: 'Turning their head disables their ability to bridge towards you.'
      },
      {
        phase: 'Far Underhook & Base',
        instruction: 'Swim far hand under opponent far armpit to block their frame and isolate their upper torso.',
        keyCue: 'Keep knees wide and hips low to the canvas.'
      },
      {
        phase: 'Pressure & Transition',
        instruction: 'Transfer weight through chest sternum, ready to step into full mount or north-south.',
        keyCue: 'Breathe smoothly and maintain constant downward gravitational pressure.'
      }
    ],
    commonMistakes: [
      { mistake: 'Carrying weight on knees instead of opponent chest', fix: 'Lift knees slightly or spread wide so all 100% of bodyweight rests on their lungs.' },
      { mistake: 'Leaving near elbow open for bottom player to insert guard knee', fix: 'Glue near knee to opponent hip at all times.' }
    ],
    relatedTechniqueIds: ['bjj-mount', 'bjj-half-guard', 'mma-gnp'],
    imageKey: 'bjj',
    videoYoutubeId: '5ALqUk9uefk',
    externalResourceUrl: 'https://www.youtube.com/watch?v=5ALqUk9uefk',
    externalResourceTitle: 'How to Escape Tight Side Control - Stephan Kesting',
    drillSuggestion: 'Side control retention: Bottom player tries to shrimp for 2 minutes.'
  },
  {
    id: 'bjj-mount',
    name: 'Full Mount Control & Posture',
    discipline: 'BJJ',
    category: 'Pins / Dominant Positions',
    difficulty: 'Intermediate',
    description: 'Sitting straddled over opponent torso with knees tight to armpits (high mount) or hips low with grapevines, completely dominating the fight.',
    steps: [
      {
        phase: 'Base & Arm Posts',
        instruction: 'Place knees wide on either side of ribs, posting hands wide in a tripod to absorb bucking and bridges.',
        keyCue: 'Ride the bucking wave rather than tensing up.'
      },
      {
        phase: 'High Mount Slide',
        instruction: 'Work knees progressively up into opponent armpits, isolating their arms above their head.',
        keyCue: 'High mount negates hip bridges completely.'
      },
      {
        phase: 'Attack Selection',
        instruction: 'Threaten mounted triangle, armbar, or ground-and-pound strikes from safety.',
        keyCue: 'Never lean too far forward without base.'
      }
    ],
    commonMistakes: [
      { mistake: 'Staying in low mount while opponent bridges aggressively (gets rolled)', fix: 'Slide into high mount where bridges cannot reach your center of gravity.' },
      { mistake: 'Crossing feet under opponent back where they can ankle lock you', fix: 'Grapevine legs or pinch knees tight into armpits.' }
    ],
    relatedTechniqueIds: ['bjj-side-control', 'bjj-back-take', 'mma-gnp'],
    imageKey: 'bjj',
    videoYoutubeId: 'ygfnLjP6YQU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=ygfnLjP6YQU',
    externalResourceTitle: 'High-Level Sidemount & Mount Escape - Stephan Kesting',
    drillSuggestion: 'Mount survival drill: 3 minutes maintaining mount against active bridges.'
  },
  {
    id: 'bjj-back-take',
    name: 'Back Control & Seatbelt Grip',
    discipline: 'BJJ',
    category: 'Control / Highest Value Position',
    difficulty: 'Intermediate',
    description: 'The pinnacle position in grappling and MMA. Positioning behind opponent shoulders with two hooks inside thighs and a seatbelt grip, leaving them with zero offensive options.',
    steps: [
      {
        phase: 'Seatbelt Harness',
        instruction: 'Wrap one arm over opponent shoulder (strangling arm) and one arm under their opposite armpit (control arm). Gable grip hands together.',
        keyCue: 'Strangling arm hand covers the control arm hand for protection.'
      },
      {
        phase: 'Insert Both Hooks',
        instruction: 'Hook your heels into opponent inner thighs without crossing your ankles.',
        keyCue: 'Crossing ankles on the back allows opponent to execute a painful counter footlock.'
      },
      {
        phase: 'Chest-to-Back Glue',
        instruction: 'Glue your chest directly to their spine, resting your chin on the overhook side shoulder.',
        keyCue: 'Follow their roll; maintain chest contact like a backpack.'
      }
    ],
    commonMistakes: [
      { mistake: 'Crossing feet across opponent waist (fatal footlock trap)', fix: 'Keep heels flared out into thighs; never cross ankles.' },
      { mistake: 'Losing chest contact by leaning backwards', fix: 'Stay tight against their shoulder blades.' }
    ],
    relatedTechniqueIds: ['bjj-mount', 'bjj-turtle'],
    imageKey: 'bjj',
    videoYoutubeId: '176SLdBhj_A',
    externalResourceUrl: 'https://www.youtube.com/watch?v=176SLdBhj_A',
    externalResourceTitle: 'A Rear Naked Choke Tutorial - Stephan Kesting',
    drillSuggestion: 'Rear naked choke setup flow: Hand fighting to clean neck bite.'
  },
  {
    id: 'bjj-elbow-escape',
    name: 'Elbow-Knee Escape (Shrimping from Mount/Side)',
    discipline: 'BJJ',
    category: 'Escapes / Fundamentals',
    difficulty: 'Beginner',
    description: 'The essential escape technique in Brazilian Jiu-Jitsu. Creating space with forearm frames and sliding knee to touch elbow to recover guard.',
    steps: [
      {
        phase: 'Frame Alignment',
        instruction: 'Place one forearm across opponent hip bone and other forearm across neck or bicep.',
        keyCue: 'Never push with straight arms; use skeletal frames.'
      },
      {
        phase: 'Bridge & Shrimp',
        instruction: 'Bridge hips up explosively to create space, then hip-escape (shrimp) your butt backwards towards your heels.',
        keyCue: 'Move your hips away from opponent, not opponent away from you.'
      },
      {
        phase: 'Knee-Elbow Connection',
        instruction: 'Slide your bottom knee through the gap until knee touches your elbow, recovering half guard or full guard.',
        keyCue: 'Connect knee to elbow to close the door against their counter pass.'
      }
    ],
    commonMistakes: [
      { mistake: 'Pushing with flat palms and extended arms (leads directly to armbars)', fix: 'Keep elbows tucked to ribs and frame with rigid forearms.' },
      { mistake: 'Trying to shrimp while flat on your back', fix: 'Turn onto your side before hip escaping.' }
    ],
    relatedTechniqueIds: ['bjj-closed-guard', 'bjj-half-guard'],
    imageKey: 'bjj',
    videoYoutubeId: 'ygfnLjP6YQU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=ygfnLjP6YQU',
    externalResourceTitle: 'Elbow-Knee Escape (Shrimping from Mount) - Stephan Kesting',
    drillSuggestion: 'Shrimping warm-up: 50 side-to-side shrimping repetitions across mat.'
  },

  // ---------------- MMA SPECIFIC ----------------
  {
    id: 'mma-cage-wallwalk',
    name: 'Cage Wall Walk & Takedown Defense',
    discipline: 'MMA',
    category: 'MMA Fundamentals / Cage Work',
    difficulty: 'Intermediate',
    description: 'Using the octagon cage fence as an elevator to stand up from bottom pins or defend single/double leg drives with whizzers and posture.',
    steps: [
      {
        phase: 'Back to the Fence',
        instruction: 'Scoot your shoulders and hips immediately until your spine is flat against the fence chain-link.',
        keyCue: 'The cage prevents opponent from getting behind you.'
      },
      {
        phase: 'Head Posture & Base',
        instruction: 'Dig your forehead under opponent chin, establishing a strong whizzer (overhook) on the attack side.',
        keyCue: 'Keep head higher than opponent head.'
      },
      {
        phase: 'Feet Walk Up',
        instruction: 'Post hands on canvas and walk feet back underneath your hips, sliding your spine up the fence into standing position.',
        keyCue: 'Once standing, widen base and circle off the fence.'
      }
    ],
    commonMistakes: [
      { mistake: 'Staying flat in the center of the mat instead of heading to cage', fix: 'In MMA, sprint your hips to the fence immediately when taken down.' },
      { mistake: 'Grabbing the chain-link fence with fingers (illegal and risks broken fingers)', fix: 'Push with open palms; never interlock fingers in the wire.' }
    ],
    relatedTechniqueIds: ['wrest-sprawl', 'mma-gnp'],
    imageKey: 'hero',
    videoYoutubeId: 'EgfYvACoxdQ',
    externalResourceUrl: 'https://www.youtube.com/watch?v=EgfYvACoxdQ',
    externalResourceTitle: 'Tricks to Use the Cage in MMA - fightTIPS',
    drillSuggestion: 'Wall walk intervals: 5 reps from bottom side against the cage back to feet.'
  },
  {
    id: 'mma-gnp',
    name: 'Ground-and-Pound Mechanics',
    discipline: 'MMA',
    category: 'MMA Fundamentals / Striking on Ground',
    difficulty: 'Intermediate',
    description: 'Effective striking from dominant ground positions without getting caught in submissions, controlling opponent wrists while dropping heavy elbows and hammerfists.',
    steps: [
      {
        phase: 'Postural Dominance',
        instruction: 'Establish posture: sit back on heels or clamp opponent wrists to their ribs to deny upkicks.',
        keyCue: 'Never strike while leaning recklessly forward into an open guard.'
      },
      {
        phase: 'Wrist Pin & Frame',
        instruction: 'Pin opponent wrist to the canvas with one hand, creating a free runway for strikes with the other.',
        keyCue: 'Control their defense first before throwing power.'
      },
      {
        phase: 'Short Elbows & Hammerfists',
        instruction: 'Drop short, vertical elbows and hammerfists that do not require wide wind-ups that allow escapes.',
        keyCue: 'Short strikes maximize impact while keeping hips stable.'
      }
    ],
    commonMistakes: [
      { mistake: 'Winding up large swinging punches that expose you to armbars and triangles', fix: 'Keep strikes inside a 12-inch corridor; use short elbows and hammerfists.' },
      { mistake: 'Focusing 100% on striking and losing positional control', fix: 'Position before submission, and position before ground-and-pound.' }
    ],
    relatedTechniqueIds: ['bjj-mount', 'bjj-side-control', 'mt-elbow'],
    imageKey: 'striking',
    videoYoutubeId: 'EgfYvACoxdQ',
    externalResourceUrl: 'https://www.youtube.com/watch?v=EgfYvACoxdQ',
    externalResourceTitle: 'Ground and Pound Striking Posture - fightTIPS',
    drillSuggestion: 'Heavy bag ground strikes: 3 rounds x 3 min of mount transitions and strikes.'
  },
  {
    id: 'mma-feint-overhand',
    name: 'Level-Change Feint to Overhand Right',
    discipline: 'MMA',
    category: 'MMA Fundamentals / Striking Transitions',
    difficulty: 'Advanced',
    description: 'The signature MMA knockout setup. Faking a wrestling takedown level-change to freeze opponent hands and drop their guard, looping a devastating overhand over top.',
    steps: [
      {
        phase: 'Takedown Threat Establishment',
        instruction: 'Show early wrestling shots in rounds 1-2 so opponent is conditioned to drop hands to sprawl.',
        keyCue: 'The feint only works if the takedown threat is real.'
      },
      {
        phase: 'The Level Drop & Eyes Down',
        instruction: 'Drop your hips 6 inches, look directly at opponent thighs, and take a quick half-penetration step.',
        keyCue: 'Opponent hands will naturally drop to protect legs.'
      },
      {
        phase: 'Unleash Looping Overhand',
        instruction: 'Explode up and loop your rear overhand punch right over top of their dropped lead shoulder onto their jaw.',
        keyCue: 'Step lead foot 45 degrees outside to clear their potential counter.'
      }
    ],
    commonMistakes: [
      { mistake: 'Telegraphing the strike by cocking hand back', fix: 'Let the upward drive of your hips propel the punch.' },
      { mistake: 'Looking up too early during the feint', fix: 'Sell the takedown with your eyes focused on their waist.' }
    ],
    relatedTechniqueIds: ['wrest-level-change', 'box-cross'],
    imageKey: 'hero',
    videoYoutubeId: 'sK-6Ujp3KYY',
    externalResourceUrl: 'https://www.youtube.com/watch?v=sK-6Ujp3KYY',
    externalResourceTitle: 'Level-Change Feint to Overhand Right - Tony Jeffries',
    drillSuggestion: 'Feint drilling: Feint shot -> Overhand -> Takedown follow-up.'
  },
  {
    id: 'mma-cage-cutoff',
    name: 'Octagon Cage Cut-Off & Pressure',
    discipline: 'MMA',
    category: 'MMA Fundamentals / Ring Generalship',
    difficulty: 'Intermediate',
    description: 'Denying opponent escape routes through small diagonal lateral steps, herding them backward until their shoulders touch the fence where striking accuracy increases 40%.',
    steps: [
      {
        phase: 'Lateral Step Matching',
        instruction: 'Never chase opponent in straight lines. If they circle left, step diagonally left to cut their escape route.',
        keyCue: 'Step with outside foot first; stay wide and athletic.'
      },
      {
        phase: 'Teep & Lead Hook Herding',
        instruction: 'Fire lead hooks on their circling side and teeps down the center to funnel them into the dead zone.',
        keyCue: 'Use strikes as walls to guide their movement.'
      },
      {
        phase: 'Trap at the Fence',
        instruction: 'Once opponent is within 3 feet of fence, shorten distance and unleash combinations or clinch.',
        keyCue: 'Do not rush in wildly; maintain cage trap.'
      }
    ],
    commonMistakes: [
      { mistake: 'Following directly behind opponent like a dog chasing a car', fix: 'Move laterally to cut off chords of the circle, not the circumference.' },
      { mistake: 'Crossing feet while moving laterally', fix: 'Push off trailing foot; maintain wide athletic base.' }
    ],
    relatedTechniqueIds: ['box-pivot', 'mt-low-kick'],
    imageKey: 'hero',
    videoYoutubeId: '5IHQpcz-Qq8',
    externalResourceUrl: 'https://www.youtube.com/watch?v=5IHQpcz-Qq8',
    externalResourceTitle: 'Shane Fazen on How to Keep Fight Standing - fightTIPS',
    drillSuggestion: 'Cage perimeter footwork: 3 rounds shadowing opponent along fence boundary.'
  },
  {
    id: 'mt-calf-kick',
    name: 'Outside & Inside Calf Kick',
    discipline: 'Muay Thai',
    category: 'Kicks / Modern MMA Meta',
    difficulty: 'Intermediate',
    description: 'The definitive striking innovation of modern MMA. Targeting the common peroneal nerve just below the knee to deaden the lead foot, drop stance stability, and shut down wrestling shots.',
    steps: [
      {
        phase: 'Angle Step & Micro Feint',
        instruction: 'Throw a blinding lead jab or shoulder feint while stepping the lead foot 30 degrees outside the opponent lead foot runway.',
        keyCue: 'Do not raise your hips high; stay low to disguise the kick trajectory.'
      },
      {
        phase: 'Horizontal Shin Whip',
        instruction: 'Whip the lower third of your tibia horizontally like a baseball bat into the fleshy exterior of their calf muscle below the fibular head.',
        keyCue: 'Aim through the nerve bundle; kick through the bone rather than slapping the surface.'
      },
      {
        phase: 'Immediate Retraction & Level Check',
        instruction: 'Snap the kicking leg back into stance immediately to avoid counter straight crosses or leg catch takedowns.',
        keyCue: 'Keep rear hand glued to temple to defend incoming overhand counters.'
      }
    ],
    commonMistakes: [
      { mistake: 'Kicking too high directly into the thick knee joint (risks shin fracture)', fix: 'Target 3 to 4 inches below the knee joint crease into the soft calf belly.' },
      { mistake: 'Dropping the lead hand while swinging the rear arm', fix: 'Keep lead hand framing opponent eyes or chin throughout.' }
    ],
    relatedTechniqueIds: ['mt-low-kick', 'box-jab', 'box-pivot'],
    imageKey: 'striking',
    videoYoutubeId: 'zBMr-FsmxqU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=zBMr-FsmxqU',
    externalResourceTitle: 'Low Kick & Calf Kick Mechanics - Sean Fagan',
    drillSuggestion: 'Heavy bag: 50 calf kicks per side focusing on snapping the leg back in 0.3 seconds.'
  },
  {
    id: 'bjj-guillotine',
    name: 'High-Elbow Arm-In Guillotine Choke',
    discipline: 'BJJ',
    category: 'Submissions / Front Headlock',
    difficulty: 'Intermediate',
    description: 'The supreme counter to takedown shoots. Wrapping the neck as opponent changes level, threading the choking wrist under the trachea and elevating the elbow over the shoulder (Marcelotine).',
    steps: [
      {
        phase: 'Front Headlock Chin Cup',
        instruction: 'As opponent shoots for your hips, sprawl or snap down, wrapping your right forearm under their chin to cup their throat.',
        keyCue: 'Radial bone must lock directly against the carotid artery and windpipe.'
      },
      {
        phase: 'High-Elbow Shoulder Throw (Marcelotine)',
        instruction: 'Throw your right elbow high over opponent back/shoulder while linking hands with a five-finger or gable grip.',
        keyCue: 'High elbow traps their neck in a vice with zero room to pop out.'
      },
      {
        phase: 'Guard Pull & Full Arch',
        instruction: 'Jump to closed guard or wrap a high butterfly hook, crunching your ribs to your hips while arching your spine backwards.',
        keyCue: 'Squeeze with your lats and core; do not rely purely on bicep strength.'
      }
    ],
    commonMistakes: [
      { mistake: 'Squeezing with a low elbow that allows opponent to pass to Von Flue choke', fix: 'Elevate choking elbow high over their trap and shoulder blade.' },
      { mistake: 'Staying on your knees where opponent can complete their double leg drive', fix: 'Close your guard around their hips to stretch their spine.' }
    ],
    relatedTechniqueIds: ['wrest-sprawl', 'wrest-level-change', 'bjj-closed-guard'],
    imageKey: 'bjj',
    videoYoutubeId: 'szAvJFvIzx4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=szAvJFvIzx4',
    externalResourceTitle: 'High-Elbow Guillotine Choke Masterclass - Stephan Kesting',
    drillSuggestion: 'Sprawl-to-guillotine repetition: Partner shoots soft double, instant chin wrap and arch.'
  },
  {
    id: 'bjj-kimura-trap',
    name: 'The Kimura Trap System',
    discipline: 'BJJ',
    category: 'Grappling / Transitional Matrix',
    difficulty: 'Advanced',
    description: 'A multi-positional figure-four grip control that serves as an elevator to pass guards, transition straight to the back, counter single legs, or execute finishing shoulder locks.',
    steps: [
      {
        phase: 'Figure-Four Wrist Catch',
        instruction: 'Reach over opponent tricep and under their forearm, locking your hand onto your own opposite wrist in a figure-four (double wrist lock).',
        keyCue: 'Never grip with thumbs; use a monkey hook grip for maximum torque.'
      },
      {
        phase: 'Torso Elevation & Step-Over',
        instruction: 'Keep opponent hand pinned behind their back at a 90-degree angle, using the grip to roll over their shoulder or step your leg over into the T-Kimura position.',
        keyCue: 'Their trapped arm is a steering wheel that controls their entire spinal column.'
      },
      {
        phase: 'Back Take or Finish Slide',
        instruction: 'Step over their head into the armbar, or slide your hips underneath to take back control with both hooks.',
        keyCue: 'Maintain the grip even during scrambles; it dictates the position.'
      }
    ],
    commonMistakes: [
      { mistake: 'Extending your arms straight and losing the 90-degree bend', fix: 'Glue their forearm to your sternum to prevent them from straightening the arm.' },
      { mistake: 'Using thumb grips that can be stripped', fix: 'Thumbless monkey grip ensures unbreakable friction.' }
    ],
    relatedTechniqueIds: ['bjj-half-guard', 'bjj-back-take', 'bjj-side-control'],
    imageKey: 'bjj',
    videoYoutubeId: 'AV9NorNMWl4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=AV9NorNMWl4',
    externalResourceTitle: 'Kimura Trap System & Back Takes - Stephan Kesting',
    drillSuggestion: 'Kimura roll from half guard: 20 reps alternating back-take and armbar finishes.'
  },
  {
    id: 'wrest-bodylock-cage',
    name: 'Cage Bodylock & Mat Return Takedown',
    discipline: 'Wrestling',
    category: 'Takedowns / Cage Wrestling',
    difficulty: 'Intermediate',
    description: 'The preferred takedown of modern championship wrestlers. Locking hands around opponent lower back against the cage fence and tripping or popping their hips backwards.',
    steps: [
      {
        phase: 'Inside Pummel & Lock',
        instruction: 'Pummel both arms under opponent armpits (double underhooks) and lock a tight gable or S-grip around their lumbar spine.',
        keyCue: 'Head pressed under their chin to pin their head back against the cage.'
      },
      {
        phase: 'Hips In & Off-Balance',
        instruction: 'Suck opponent hips off the fence into your own belt line, collapsing their upright defensive posture.',
        keyCue: 'Your hips must be lower than their hips.'
      },
      {
        phase: 'Inside Trip & Mat Return',
        instruction: 'Reap your lead foot behind their heel (inside trip) while arching backwards and rotating to dump them flat onto the canvas.',
        keyCue: 'Land immediately in top half guard or mount without releasing control.'
      }
    ],
    commonMistakes: [
      { mistake: 'Leaving space between your chest and their back (leaves open to whizzers)', fix: 'Glue your chest to their ribcage; eliminate all daylight.' },
      { mistake: 'Attempting to lift purely with lower back muscles', fix: 'Squat and drive with quads and glutes.' }
    ],
    relatedTechniqueIds: ['wrest-underhook', 'mma-cage-wallwalk', 'bjj-side-control'],
    imageKey: 'wrestling',
    videoYoutubeId: 'vFvl1tdr8l4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=vFvl1tdr8l4',
    externalResourceTitle: 'Body Lock & Mat Return Against the Wall - Cary Kolat',
    drillSuggestion: 'Wall bodylock drill: 10 repetitions popping partner off wall and tripping to mat.'
  },
  {
    id: 'box-check-hook',
    name: 'Check Lead Hook on the Backfoot',
    discipline: 'Boxing',
    category: 'Striking / Counter Punching',
    difficulty: 'Advanced',
    description: 'The quintessential counter against hyper-aggressive rushers. Pivoting 90 degrees on the lead foot while hooking cleanly across their chin as they charge past you.',
    steps: [
      {
        phase: 'Lure the Rush',
        instruction: 'Stand light on your feet. When the opponent charges forward with straight punches or a blitz, anchor your lead foot ball firmly.',
        keyCue: 'Do not panic and retreat in a straight line.'
      },
      {
        phase: 'Pivot & Hook Simultaneously',
        instruction: 'Swing your rear foot in a 90-degree lateral arc to the right while uncoiling a crisp, short lead hook into their jawline.',
        keyCue: 'Their own forward rushing momentum multiplies the impact force exponentially.'
      },
      {
        phase: 'Angle Exit',
        instruction: 'Glide out into the open space you just created, completely behind the opponent blind side.',
        keyCue: 'Be ready to fire a follow-up straight cross if they wobble.'
      }
    ],
    commonMistakes: [
      { mistake: 'Stepping straight backward before hooking (drives you into the fence)', fix: 'Pivot laterally around them rather than stepping backward.' },
      { mistake: 'Dropping the rear hand while pivoting', fix: 'Rear glove stays glued to cheekbone.' }
    ],
    relatedTechniqueIds: ['box-lead-hook', 'box-pivot', 'mma-cage-cutoff'],
    imageKey: 'striking',
    videoYoutubeId: 'tyH4tYzgSqU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=tyH4tYzgSqU',
    externalResourceTitle: 'How to Throw a Check Hook in Boxing - Tony Jeffries',
    drillSuggestion: 'Partner rush drill: Partner steps in with jab-cross pads, defender check hooks and pivots 90 degrees.'
  },
  // ---------------- ADDITIONAL BJJ & SUBMISSION GRAPPLING ----------------
  {
    id: 'bjj-rnc',
    name: 'Rear-Naked Choke (Mata Leão)',
    discipline: 'BJJ',
    category: 'Submissions / Strangles',
    difficulty: 'Beginner',
    description: 'The undisputed king of all combat submissions. Applied from back control, wrapping the forearm around the neck with a bicep grip, using chest expansion to compress both carotid arteries simultaneously.',
    steps: [
      {
        phase: 'Neck Deep Bite',
        instruction: 'From back control with seatbelt grip, slide your strangling arm deep across opponent throat until your elbow aligns directly under their chin point.',
        keyCue: 'Your elbow crease must align directly with their trachea windpipe.'
      },
      {
        phase: 'Bicep Grip Lock',
        instruction: 'Slide your choking hand across to grip your opposite arm bicep. Hide your support hand behind the crown of their head like sliding a letter into an envelope.',
        keyCue: 'Never place your support hand on their forehead where they can grab fingers.'
      },
      {
        phase: 'Chest Inflation & Elbow Squeeze',
        instruction: 'Drop your head tight to their ear, puff your chest out into their upper spine, and gently squeeze your elbows together like scissors.',
        keyCue: 'Do not jerk or wrench; smooth carotid blood restriction produces tap in 4-6 seconds.'
      }
    ],
    commonMistakes: [
      { mistake: 'Choking over the chin without getting under (mandible crush instead of clean blood choke)', fix: 'Saw forearm back and forth or use knuckles under the nose to lift the chin.' },
      { mistake: 'Crossing ankles across opponent waist while applying choke', fix: 'Keep heels dug into inner thighs to avoid counter ankle lock.' }
    ],
    relatedTechniqueIds: ['bjj-back-take', 'bjj-turtle', 'bjj-armbar'],
    imageKey: 'bjj',
    videoYoutubeId: '176SLdBhj_A',
    externalResourceUrl: 'https://www.youtube.com/watch?v=176SLdBhj_A',
    externalResourceTitle: 'A Rear Naked Choke Tutorial - Stephan Kesting',
    drillSuggestion: 'Back-take to RNC transition: 20 repetitions chaining seatbelt grip to finish.'
  },
  {
    id: 'bjj-darce',
    name: 'The D\'Arce Choke (Brabo Choke)',
    discipline: 'BJJ',
    category: 'Submissions / Front Headlock',
    difficulty: 'Intermediate',
    description: 'A devastating arm-in choke popularized by modern MMA fighters like Tony Ferguson and Dustin Poirier. Shooting the arm through opponent armpit and across the neck, locking on the opposite bicep.',
    steps: [
      {
        phase: 'Underhook Shoot (Armpit to Neck)',
        instruction: 'When opponent shoots an underhook in half guard or turtle, thread your lead arm under their armpit and out the other side of their neck.',
        keyCue: 'Bury your wrist bone past their neck until your palm reaches their opposite trap.'
      },
      {
        phase: 'Bicep Lock & Grip Connection',
        instruction: 'Lock your choking hand onto your opposite bicep in a figure-four grip, cupping their lat muscle with your free hand.',
        keyCue: 'Collapse their trapped shoulder inward to seal the carotid space.'
      },
      {
        phase: 'Walk Hips & Sprawl Finish',
        instruction: 'Drop your hip to the mat, walk your feet towards their legs to bend their spine, and squeeze your chest forward.',
        keyCue: 'Trap their top leg with your legs if possible to prevent rolls.'
      }
    ],
    commonMistakes: [
      { mistake: 'Trying to finish while staying high on your knees without dropping weight', fix: 'Drop hip flat and drive your chest into the back of their trapped tricep.' },
      { mistake: 'Shooting arm from the neck side rather than armpit side (that is an Anaconda)', fix: 'D\'Arce enters through armpit first and exits past the neck.' }
    ],
    relatedTechniqueIds: ['bjj-anaconda', 'bjj-guillotine', 'wrest-sprawl'],
    imageKey: 'bjj',
    videoYoutubeId: 'szAvJFvIzx4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=szAvJFvIzx4',
    externalResourceTitle: 'How to Finish the D\'Arce Choke Every Time - Stephan Kesting',
    drillSuggestion: 'Half-guard top underhook counter: Partner digs underhook, instant D\'Arce slide and lock.'
  },
  {
    id: 'bjj-anaconda',
    name: 'The Anaconda Choke & Gator Roll',
    discipline: 'BJJ',
    category: 'Submissions / Front Headlock',
    difficulty: 'Intermediate',
    description: 'The front-headlock sibling of the D\'Arce. Entering arm under the neck first and exiting past the armpit, rolling over your shoulder (gator roll) to trap their body and compress the neck.',
    steps: [
      {
        phase: 'Neck-to-Armpit Thread',
        instruction: 'From front headlock or stuffed takedown, thread lead arm under opponent neck and out through their near armpit.',
        keyCue: 'Arm enters past the throat first (opposite of D\'Arce).'
      },
      {
        phase: 'Bicep Grip Lock',
        instruction: 'Grip your opposite bicep with the choking hand, posting your free hand on their upper back.',
        keyCue: 'Keep head tight to their tricep to prevent posture.'
      },
      {
        phase: 'Gator Roll & Leg Trap',
        instruction: 'Roll over your inside shoulder in a violent rotational barrel roll (gator roll), trapping their legs with your own and walking hips in.',
        keyCue: 'Bite down with chin and squeeze lats together.'
      }
    ],
    commonMistakes: [
      { mistake: 'Rolling toward the trapped arm side instead of under your own choking arm', fix: 'Roll over your choking shoulder to trap their head under your ribcage.' },
      { mistake: 'Loosening grip during the rotation', fix: 'Lock the bicep clamp tight before initiating the roll.' }
    ],
    relatedTechniqueIds: ['bjj-darce', 'bjj-guillotine', 'wrest-sprawl'],
    imageKey: 'bjj',
    videoYoutubeId: 'szAvJFvIzx4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=szAvJFvIzx4',
    externalResourceTitle: 'Anaconda Choke & Gator Roll Masterclass - Stephan Kesting',
    drillSuggestion: 'Front headlock flow: Sprawl -> Snapdown -> Thread arm -> Gator roll finish.'
  },
  {
    id: 'bjj-kimura-guard',
    name: 'Kimura Shoulder Lock from Closed Guard',
    discipline: 'BJJ',
    category: 'Submissions / Joint Locks',
    difficulty: 'Beginner',
    description: 'The fundamental double-wrist lock shoulder submission. When opponent posts a hand on your chest or mat, sit up over their arm and crank their hand behind their shoulder blade.',
    steps: [
      {
        phase: 'Wrist Pin & Sit Up',
        instruction: 'When opponent posts their hand on the canvas, trap their wrist with same-side hand (thumb over wrist) and sit up diagonally over their shoulder.',
        keyCue: 'Chest-to-shoulder contact is mandatory when sitting up.'
      },
      {
        phase: 'Thread Arm & Figure-Four',
        instruction: 'Wrap your free arm over their tricep and under their forearm, grabbing your own wrist in a secure figure-four lock.',
        keyCue: 'Maintain 90-degree bend at their elbow at all times.'
      },
      {
        phase: 'Hip Escape & Rotate to Ceiling',
        instruction: 'Fall back onto your side, push their wrist towards their ear/head in a steering wheel motion, and bridge your hips.',
        keyCue: 'Keep their elbow pinned to your chest; do not let their arm straighten.'
      }
    ],
    commonMistakes: [
      { mistake: 'Trying to finish while lying flat on your back', fix: 'Turn onto your side facing their trapped arm for leverage.' },
      { mistake: 'Allowing opponent to straighten their arm into an armbar escape', fix: 'Lock elbow at 90 degrees tight to your ribcage.' }
    ],
    relatedTechniqueIds: ['bjj-armbar', 'bjj-kimura-trap', 'bjj-closed-guard'],
    imageKey: 'bjj',
    videoYoutubeId: 'AV9NorNMWl4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=AV9NorNMWl4',
    externalResourceTitle: 'Kimura From Guard: Details that Make it Work - Stephan Kesting',
    drillSuggestion: 'Sit-up kimura reps: 25 fluid sit-ups locking the figure-four grip.'
  },
  {
    id: 'bjj-americana',
    name: 'Americana Keylock from Side Control & Mount',
    discipline: 'BJJ',
    category: 'Submissions / Joint Locks',
    difficulty: 'Beginner',
    description: 'A powerful rotational shoulder lock targeting the rotator cuff. Pinning opponent wrist to the canvas with an L-shaped arm and sliding forearm underneath to lift the elbow.',
    steps: [
      {
        phase: 'Wrist Pin to Canvas',
        instruction: 'From top side control or full mount, use both hands to pin opponent near wrist flat to the mat beside their head.',
        keyCue: 'Bend their arm in a 90-degree L-shape with fingers pointing towards ceiling.'
      },
      {
        phase: 'Underhook Wrist Lock',
        instruction: 'Slide your bottom arm under their tricep and grip your own top wrist in a thumbless figure-four lock.',
        keyCue: 'Keep your elbows glued tight to their neck and ribs.'
      },
      {
        phase: 'Paintbrush Slide & Lift',
        instruction: 'Drag their knuckles along the mat like painting a brush down toward their hip while elevating their elbow gently.',
        keyCue: 'Do not lift wrist off canvas; drag downward and lift elbow.'
      }
    ],
    commonMistakes: [
      { mistake: 'Lifting their hand off the mat instead of sliding it down', fix: 'Keep the back of their hand glued to the canvas like paintbrush bristles.' },
      { mistake: 'Leaving space between your chest and their torso (they roll you)', fix: 'Maintain heavy sternum-to-chest downward pressure.' }
    ],
    relatedTechniqueIds: ['bjj-side-control', 'bjj-mount', 'bjj-kimura-guard'],
    imageKey: 'bjj',
    videoYoutubeId: '5ALqUk9uefk',
    externalResourceUrl: 'https://www.youtube.com/watch?v=5ALqUk9uefk',
    externalResourceTitle: 'Americana & Side Control Submission Mechanics - Stephan Kesting',
    drillSuggestion: 'Mount transition to Americana: 10 reps per side without losing heavy chest pressure.'
  },
  {
    id: 'bjj-straight-ankle',
    name: 'Straight Ankle Lock (Ashi Garami)',
    discipline: 'BJJ',
    category: 'Submissions / Leg Locks',
    difficulty: 'Intermediate',
    description: 'The foundational legal leg lock across all rule sets. Trapping the opponent leg in Ashi Garami (single leg X), wrapping the achilles tendon with the wrist bone, and arching hips backward.',
    steps: [
      {
        phase: 'Ashi Garami Entanglement',
        instruction: 'Fall back onto your hip, placing outside foot on opponent hip bone and threading inside foot under their hamstring.',
        keyCue: 'Clamp knees together to immobilize their knee line.'
      },
      {
        phase: 'Achilles Guillotine Wrap',
        instruction: 'Slide the bony blade of your forearm under their Achilles tendon, high above the heel. Lock hands in a tight gable grip.',
        keyCue: 'Hide their toes deep under your armpit; do not leave foot loose.'
      },
      {
        phase: 'Belly-Down Arch',
        instruction: 'Roll your shoulders toward the mat, look back over your shoulder, and thrust hips forward into their Achilles.',
        keyCue: 'Arch with your glutes and hamstrings like a bow.'
      }
    ],
    commonMistakes: [
      { mistake: 'Wrapping too high on the calf muscle where there is no leverage', fix: 'Wrist bone must sit right on the thin Achilles tendon above heel.' },
      { mistake: 'Allowing opponent to push your foot off their hip and stand up', fix: 'Flare toes out on their hip to maintain active distance frame.' }
    ],
    relatedTechniqueIds: ['bjj-inside-heelhook', 'bjj-half-guard', 'bjj-open-guard'],
    imageKey: 'bjj',
    videoYoutubeId: 'szAvJFvIzx4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=szAvJFvIzx4',
    externalResourceTitle: 'Straight Ankle Lock Mastery & Ashi Garami - Stephan Kesting',
    drillSuggestion: 'Ashi Garami entry from open guard: 20 reps sliding into leg entanglement.'
  },
  {
    id: 'bjj-inside-heelhook',
    name: 'Inside Heel Hook & 50/50 Entanglement',
    discipline: 'BJJ',
    category: 'Submissions / Leg Locks',
    difficulty: 'Advanced',
    description: 'The most dangerous submission in modern submission grappling and MMA. Isolating the opponent heel in an entanglement, using forearm rotation to twist the knee joint to catastrophic ligament tear.',
    steps: [
      {
        phase: 'Knee Line Control',
        instruction: 'Establish tight leg entanglement (Inside Senkaku / 50/50), ensuring opponent knee is trapped past your hip line.',
        keyCue: 'If opponent clears their knee line, the heel hook is dead.'
      },
      {
        phase: 'Heel Dig & Radial Catch',
        instruction: 'Cup the opponent heel with your wrist bone, wrapping their toes under your armpit.',
        keyCue: 'Grip with bone-on-heel friction; do not slip on sweat.'
      },
      {
        phase: 'Rotational Bridge',
        instruction: 'Pinch knees like a vice, bridge hips gently, and rotate your upper torso in the direction of their toes.',
        keyCue: 'Apply with extreme control in training; tap immediately when heel is caught.'
      }
    ],
    commonMistakes: [
      { mistake: 'Trying to twist with arm strength without locking the knee joint', fix: 'Clamp your knees around their thigh to immobilize the femur.' },
      { mistake: 'Applying fast explosive force in sparring (causes ACL/MCL rupture)', fix: 'Always apply gradual pressure and release upon verbal tap.' }
    ],
    relatedTechniqueIds: ['bjj-straight-ankle', 'bjj-half-guard'],
    imageKey: 'bjj',
    videoYoutubeId: 'szAvJFvIzx4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=szAvJFvIzx4',
    externalResourceTitle: 'Inside Heel Hook Mechanics & Safety - Stephan Kesting',
    drillSuggestion: 'Leg entanglement transition: Butterfly guard entry into inside ashi garami.'
  },
  {
    id: 'bjj-omoplata',
    name: 'The Omoplata Shoulder Lock & Sweep',
    discipline: 'BJJ',
    category: 'Submissions / Joint Locks',
    difficulty: 'Intermediate',
    description: 'Using your legs to isolate opponent shoulder in a kimura-style mechanism. Threading the leg over their tricep from guard, sitting up, and driving forward to hyperextend the shoulder.',
    steps: [
      {
        phase: 'Over-the-Shoulder Kick',
        instruction: 'From closed or spider guard, control opponent sleeve/wrist, kick your leg over their shoulder, and angle your body 90 degrees.',
        keyCue: 'Trap their arm behind your knee joint crease.'
      },
      {
        phase: 'Sit Up & Posture Block',
        instruction: 'Sit up aggressively, reaching your arm across their waist to prevent them from somersault rolling out of the hold.',
        keyCue: 'Belt grip or waist frame prevents their forward roll escape.'
      },
      {
        phase: 'Whisper in Ear Finish',
        instruction: 'Angle both feet away from opponent, scoot hips away, and lean your chest forward as if whispering into their far ear.',
        keyCue: 'Leaning forward rotates the humerus bone into full shoulder lock.'
      }
    ],
    commonMistakes: [
      { mistake: 'Allowing opponent to roll forward and escape to side control', fix: 'Reach over their back with your arm immediately upon sitting up.' },
      { mistake: 'Sitting straight back instead of angling feet out', fix: 'Slide feet parallel to opponent body and lean forward.' }
    ],
    relatedTechniqueIds: ['bjj-triangle', 'bjj-armbar', 'bjj-kimura-guard'],
    imageKey: 'bjj',
    videoYoutubeId: 'AV9NorNMWl4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=AV9NorNMWl4',
    externalResourceTitle: 'The Omoplata: Step-by-Step Breakdown - Stephan Kesting',
    drillSuggestion: 'Triangle to Omoplata switch: Flow between triangle, armbar, and omoplata.'
  },
  {
    id: 'bjj-scissor-sweep',
    name: 'Scissor Sweep from Closed Guard',
    discipline: 'BJJ',
    category: 'Sweeps / Fundamentals',
    difficulty: 'Beginner',
    description: 'The premier off-balancing sweep taught to every white belt. Breaking opponent base with collar-sleeve grips, sliding lead shin across their ribs, and chopping their support knee.',
    steps: [
      {
        phase: 'Collar & Sleeve Grips',
        instruction: 'Grip opponent same-side collar with lead hand and opposite sleeve with other hand. Turn onto your hip 45 degrees.',
        keyCue: 'Never stay flat on your back when attempting to sweep.'
      },
      {
        phase: 'Insert Knee Shield',
        instruction: 'Slide your top shin diagonally across opponent chest/belly like a barrier. Drop your bottom leg flat along the canvas beside their knee.',
        keyCue: 'Top shin acts as a piston pulling them over your hips.'
      },
      {
        phase: 'Scissor Action & Mount Recovery',
        instruction: 'Pull opponent forward with collar grip while kicking top leg through and chopping bottom leg back like a pair of scissors.',
        keyCue: 'Follow through immediately onto your knees to secure top mount.'
      }
    ],
    commonMistakes: [
      { mistake: 'Trying to scissor while opponent weight is back on their heels', fix: 'Pull them forward with collar grip onto your chest before kicking.' },
      { mistake: 'Bottom leg stays hooked under their thigh instead of chopping floor', fix: 'Chop their support knee off the mat to take away their kickstand.' }
    ],
    relatedTechniqueIds: ['bjj-closed-guard', 'bjj-hip-bump-sweep', 'bjj-mount'],
    imageKey: 'bjj',
    videoYoutubeId: 'KKxD5kdOkk0',
    externalResourceUrl: 'https://www.youtube.com/watch?v=KKxD5kdOkk0',
    externalResourceTitle: 'Scissor Sweep Mastery & Details - Stephan Kesting',
    drillSuggestion: 'Alternating scissor sweeps from closed guard: 20 reps smoothly with partner.'
  },
  {
    id: 'bjj-hip-bump-sweep',
    name: 'Hip Bump Sweep (Kimura Dilemma)',
    discipline: 'BJJ',
    category: 'Sweeps / Dynamic Reversals',
    difficulty: 'Beginner',
    description: 'When opponent postures upright in your closed guard, uncross ankles, post on hand, and launch your hips explosively into their chest to roll them into mount.',
    steps: [
      {
        phase: 'Read the Posture',
        instruction: 'As opponent pushes off your chest to sit tall and break guard, open ankles and post your right hand flat behind you.',
        keyCue: 'Sit up in the exact rhythm of their backward posture.'
      },
      {
        phase: 'Overhook Trapping Arm',
        instruction: 'Drape your left arm across opponent chest, trapping their opposite tricep tight so they cannot post a hand.',
        keyCue: 'If they cannot post their hand, they must fall.'
      },
      {
        phase: 'Explosive Hip Drive',
        instruction: 'Thrust your hips into their floating ribs, driving your pelvis upward and rolling over your opposite shoulder into full mount.',
        keyCue: 'Lift hips high into their chest; do not slide along canvas.'
      }
    ],
    commonMistakes: [
      { mistake: 'Allowing opponent to post their hand (sweep fails)', fix: 'If they post hand, drop straight into the Kimura shoulder lock or Guillotine.' },
      { mistake: 'Posting on elbow instead of palm (limits hip height)', fix: 'Post firmly on open palm to get maximum elevation.' }
    ],
    relatedTechniqueIds: ['bjj-closed-guard', 'bjj-kimura-guard', 'bjj-triangle'],
    imageKey: 'bjj',
    videoYoutubeId: 'KKxD5kdOkk0',
    externalResourceUrl: 'https://www.youtube.com/watch?v=KKxD5kdOkk0',
    externalResourceTitle: 'Hip Bump Sweep & Kimura Counter Dilemma - Stephan Kesting',
    drillSuggestion: 'Sweep dilemma drill: Hip bump -> partner posts -> drop into Kimura.'
  },
  {
    id: 'bjj-flower-sweep',
    name: 'Pendulum / Flower Sweep from Guard',
    discipline: 'BJJ',
    category: 'Sweeps / Rotational Momentum',
    difficulty: 'Intermediate',
    description: 'A beautiful rotational sweep utilizing leg swing momentum. Underhooking opponent leg or arm, swinging outside leg like a pendulum, and rolling into full mount.',
    steps: [
      {
        phase: 'Underhook the Leg',
        instruction: 'From closed guard, pull opponent sleeve across your centerline, dive your arm deep under their opposite leg knee pit.',
        keyCue: 'Hug their thigh tight to your shoulder.'
      },
      {
        phase: 'Pendulum Leg Swing',
        instruction: 'Open guard, swing your outside leg out wide in a deep arc to generate rotational momentum, and chop other leg under their armpit.',
        keyCue: 'Leg swing creates effortless rotational torque.'
      },
      {
        phase: 'Roll to High Mount',
        instruction: 'Keep holding the underhooked leg to prevent their base, rolling smoothly on top into mount.',
        keyCue: 'Land with knees wide and establish posture immediately.'
      }
    ],
    commonMistakes: [
      { mistake: 'Failing to pull the arm across before sweeping', fix: 'If they have an arm free, they post and kill the momentum.' },
      { mistake: 'Short leg swing with no momentum', fix: 'Kick outside leg wide like a clock pendulum.' }
    ],
    relatedTechniqueIds: ['bjj-closed-guard', 'bjj-armbar', 'bjj-mount'],
    imageKey: 'bjj',
    videoYoutubeId: 'KKxD5kdOkk0',
    externalResourceUrl: 'https://www.youtube.com/watch?v=KKxD5kdOkk0',
    externalResourceTitle: 'Pendulum Flower Sweep Breakdown - Stephan Kesting',
    drillSuggestion: 'Pendulum sweep to armbar combo drill: 15 reps per side.'
  },
  {
    id: 'bjj-knee-slice',
    name: 'Knee Slice Guard Pass (Knee Cut)',
    discipline: 'BJJ',
    category: 'Passing / Fundamental Pressure',
    difficulty: 'Intermediate',
    description: 'The highest percentage guard pass in professional BJJ and MMA. Driving one knee diagonally across bottom opponent thigh into side control while winning the underhook battle.',
    steps: [
      {
        phase: 'Underhook & Collar Grip',
        instruction: 'Step inside opponent half/open guard. Secure a deep underhook on the passing side, pulling their far shoulder tight to your chest.',
        keyCue: 'Winning the underhook prevents bottom fighter from taking your back.'
      },
      {
        phase: 'Diagonal Knee Slice',
        instruction: 'Slide your lead knee diagonally across opponent thigh towards the canvas, slicing across their hip.',
        keyCue: 'Point knee towards mat; keep head low under their chin.'
      },
      {
        phase: 'Clear Ankle & Settle Side Control',
        instruction: 'Kick trailing foot free of their half guard hook and drop hips flat into heavy side control.',
        keyCue: 'Establish crossface immediately to stop them from turning.'
      }
    ],
    commonMistakes: [
      { mistake: 'Slicing knee without securing the underhook first (gives up back take)', fix: 'Underhook is mandatory before sliding the knee across.' },
      { mistake: 'Leaving head high where opponent can guillotine or push you away', fix: 'Bury your forehead under their chin on the underhook side.' }
    ],
    relatedTechniqueIds: ['bjj-half-guard', 'bjj-side-control', 'wrest-underhook'],
    imageKey: 'bjj',
    videoYoutubeId: '5ALqUk9uefk',
    externalResourceUrl: 'https://www.youtube.com/watch?v=5ALqUk9uefk',
    externalResourceTitle: 'How to Master the Knee Cut Guard Pass - Stephan Kesting',
    drillSuggestion: 'Knee slice pass repetitions: 20 alternating reps clearing half guard.'
  },
  {
    id: 'bjj-toreando-pass',
    name: 'Toreando (Bullfighter) Guard Pass',
    discipline: 'BJJ',
    category: 'Passing / Speed & Mobility',
    difficulty: 'Beginner',
    description: 'A dynamic standing pass named after bullfighting. Gripping both knees of bottom open guard, shoving their legs aside, and sprinting into side control or knee-on-belly.',
    steps: [
      {
        phase: 'Pant Cuff / Knee Grips',
        instruction: 'Stand over opponent open guard with athletic posture. Grip the outside of both knees or pant cuffs firmly.',
        keyCue: 'Lock arms straight with elbows pointing out to deflect upkicks.'
      },
      {
        phase: 'Push-Pull Redirection',
        instruction: 'Step in, push their knees toward their chest to compress their hips, then violently swing both legs to one side.',
        keyCue: 'Move their legs like guiding a steering wheel.'
      },
      {
        phase: 'Sprint to North-South / Side',
        instruction: 'Drop your hip and sprint your feet around their redirected legs directly into side control or neon-belly.',
        keyCue: 'Settle weight immediately before they can shrimp.'
      }
    ],
    commonMistakes: [
      { mistake: 'Bending over with head forward (gets snapped down into guillotine)', fix: 'Keep hips low, spine erect, eyes forward on their sternum.' },
      { mistake: 'Slowing down halfway through the turn', fix: 'Explode around the legs in one continuous sprint.' }
    ],
    relatedTechniqueIds: ['bjj-open-guard', 'bjj-side-control'],
    imageKey: 'bjj',
    videoYoutubeId: '5ALqUk9uefk',
    externalResourceUrl: 'https://www.youtube.com/watch?v=5ALqUk9uefk',
    externalResourceTitle: 'Toreando Guard Pass Masterclass - Stephan Kesting',
    drillSuggestion: 'Toreando speed passing drill: 30 reps side-to-side against active open guard.'
  },
  {
    id: 'bjj-north-south-choke',
    name: 'North-South Choke',
    discipline: 'BJJ',
    category: 'Submissions / Upper Body Strangles',
    difficulty: 'Advanced',
    description: 'Marcelo Garcia\'s signature submission. From north-south position, wrapping your arm under opponent neck, dropping your ribcage flat to the mat, and sliding back to seal the airway.',
    steps: [
      {
        phase: 'Head Wrap in North-South',
        instruction: 'From side control, spin to north-south position (69 position with your head facing their feet). Wrap arm under their throat.',
        keyCue: 'Wrap deep until your bicep touches their neck.'
      },
      {
        phase: 'Drop Lat to Mat',
        instruction: 'Drop your armpit and lat flat onto the canvas right next to their neck, locking your hands palm-to-palm.',
        keyCue: 'Your lat muscle must touch the canvas to eliminate all daylight.'
      },
      {
        phase: 'Sprawl Backward & Squeeze',
        instruction: 'Sprawl your legs straight back like an alligator and slide your torso 2 inches backward. Squeeze lats together.',
        keyCue: 'Sliding backward pulls their chin into your bicep.'
      }
    ],
    commonMistakes: [
      { mistake: 'Squeezing with chest high off the mat', fix: 'Chest and lats must be completely flat to the floor.' },
      { mistake: 'Pulling upward on the neck rather than sliding backward', fix: 'Slide your hips back like a seal sliding down an ice ramp.' }
    ],
    relatedTechniqueIds: ['bjj-side-control', 'bjj-guillotine'],
    imageKey: 'bjj',
    videoYoutubeId: 'ygfnLjP6YQU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=ygfnLjP6YQU',
    externalResourceTitle: 'North South Choke Details from Marcelo Garcia - Stephan Kesting',
    drillSuggestion: 'Side control spin to North-South choke: 15 reps locking the lat seal.'
  },
  {
    id: 'bjj-granby-roll',
    name: 'Granby Roll Inversion from Turtle',
    discipline: 'BJJ',
    category: 'Escapes / Inversions',
    difficulty: 'Intermediate',
    description: 'A slick, high-level acrobatic escape from bottom turtle or front headlock. Rolling across your shoulder blades in a continuous inversion to recover full closed guard.',
    steps: [
      {
        phase: 'Shoulder Drop & Arm Post',
        instruction: 'From turtle position, tuck your chin tight to your chest, post outside arm on mat, and drop inside shoulder to the canvas.',
        keyCue: 'Never roll on your head or neck; roll strictly across your shoulders.'
      },
      {
        phase: 'Inverted Back Roll',
        instruction: 'Kick both legs upward, rolling smoothly across your upper back and shoulder blades 180 degrees.',
        keyCue: 'Legs swing over your face like an open book.'
      },
      {
        phase: 'Catch Full Guard',
        instruction: 'As your hips rotate to face the opponent, catch their torso with your legs and lock ankles into closed guard.',
        keyCue: 'Keep hands up to catch their wrists upon landing.'
      }
    ],
    commonMistakes: [
      { mistake: 'Rolling over the crown of your head (risks neck strain)', fix: 'Tuck chin to chest and roll strictly across the trapezius shoulder bridge.' },
      { mistake: 'Opening legs wide so opponent takes your back during roll', fix: 'Keep knees tight to chest during the inversion.' }
    ],
    relatedTechniqueIds: ['bjj-turtle', 'bjj-closed-guard', 'wrest-sprawl'],
    imageKey: 'bjj',
    videoYoutubeId: 'QMVavyxjlNU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=QMVavyxjlNU',
    externalResourceTitle: 'Granby Roll Defense from Turtle - Cary Kolat / Stephan Kesting',
    drillSuggestion: 'Solo Granby roll line drills: 20 inversions across the training mat.'
  },
  {
    id: 'bjj-technical-standup',
    name: 'Technical Stand-Up from Guard / Ground',
    discipline: 'BJJ',
    category: 'Escapes / Street & MMA Essential',
    difficulty: 'Beginner',
    description: 'The single most critical safety skill in martial arts. Standing up from the ground with an active hand shield and chin protection while keeping your head out of strike range.',
    steps: [
      {
        phase: 'Seated Frame Stance',
        instruction: 'Sit on bottom hip. Post right hand on canvas behind your hip, lift left foot flat on mat in front. Extend left hand forward in a defensive shield.',
        keyCue: 'Left hand guards your chin and measures distance from opponent.'
      },
      {
        phase: 'Elevate Hips on Tripod',
        instruction: 'Push through your grounded right hand and front left foot to elevate your hips off the canvas.',
        keyCue: 'Weight is supported by diagonal hand and foot.'
      },
      {
        phase: 'Slide Trailing Leg Back & Stand',
        instruction: 'Thread bottom right leg backwards under your hips, planting your foot behind your posting hand and rising directly into your fighting stance.',
        keyCue: 'Head moves away from opponent as you rise; never stand straight forward.'
      }
    ],
    commonMistakes: [
      { mistake: 'Standing up leaning forward with both hands on the floor (eats head kicks/knees)', fix: 'Keep one hand shielding your face at all times.' },
      { mistake: 'Turning your back to the opponent to stand up', fix: 'Keep eyes locked on opponent chin throughout the entire motion.' }
    ],
    relatedTechniqueIds: ['bjj-closed-guard', 'mma-cage-wallwalk'],
    imageKey: 'hero',
    videoYoutubeId: 'KKxD5kdOkk0',
    externalResourceUrl: 'https://www.youtube.com/watch?v=KKxD5kdOkk0',
    externalResourceTitle: 'How to Do a Technical Standup - Stephan Kesting',
    drillSuggestion: '50 technical standups: Push up, frame, step back into orthodox fighting stance.'
  },
  {
    id: 'bjj-butterfly-guard',
    name: 'Butterfly Guard & Hook Sweeps',
    discipline: 'BJJ',
    category: 'Guard / Seated Elevation',
    difficulty: 'Intermediate',
    description: 'A dynamic open guard with practitioner seated, inserting instep hooks under opponent inner thighs. Used to elevate, sweep directly to mount, or transition into leg locks.',
    steps: [
      {
        phase: 'Seated Posture & Instep Hooks',
        instruction: 'Sit upright with knees bent wide, flexing your insteps under opponent inner thighs. Secure an overhook on one arm and underhook on the other.',
        keyCue: 'Never lie flat on back in butterfly guard; sit forward aggressively.'
      },
      {
        phase: 'Off-Balance Fall to Shoulder',
        instruction: 'Pull opponent forward onto your lap, falling diagonally onto your side shoulder (never straight back onto your spine).',
        keyCue: 'Load their full weight onto your elevated hook.'
      },
      {
        phase: 'Elevator Kick & Mount Follow',
        instruction: 'Extend your loaded hook leg upward like an elevator while chopping your bottom leg, rolling opponent over into top mount.',
        keyCue: 'Ride the wave straight on top; do not let them disengage.'
      }
    ],
    commonMistakes: [
      { mistake: 'Falling straight backward onto your flat spine (destroys elevation angle)', fix: 'Fall diagonally onto your shoulder to create lifting leverage.' },
      { mistake: 'Leaving hooks loose without flexing toes back', fix: 'Active hooks: dorsiflex ankles to lock behind opponent knees.' }
    ],
    relatedTechniqueIds: ['bjj-open-guard', 'bjj-half-guard', 'bjj-mount'],
    imageKey: 'bjj',
    videoYoutubeId: 'szAvJFvIzx4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=szAvJFvIzx4',
    externalResourceTitle: 'Butterfly Guard Hook Sweep Mechanics - Stephan Kesting',
    drillSuggestion: 'Butterfly hook lift drill: 20 partner lifts alternating sides.'
  },
  {
    id: 'bjj-ezekiel',
    name: 'Ezekiel Choke from Mount & Guard',
    discipline: 'BJJ',
    category: 'Submissions / Strangles',
    difficulty: 'Intermediate',
    description: 'A sneaky, unforgiving trachea and carotid compression choke. Sliding an arm behind opponent neck, grabbing your own sleeve or wrist, and driving the opposite fist into their windpipe.',
    steps: [
      {
        phase: 'Wrap Arm Behind Neck',
        instruction: 'From top full mount or inside opponent guard, wrap left arm deep under opponent neck until hand reaches opposite shoulder.',
        keyCue: 'Keep head low on opponent chest to prevent bucking.'
      },
      {
        phase: 'Grip Sleeve or Wrist',
        instruction: 'Insert four fingers into your own opposite sleeve (gi) or clamp your wrist tightly (no-gi version).',
        keyCue: 'Lock the loop around their neck.'
      },
      {
        phase: 'Drive Blade Across Trachea',
        instruction: 'Slide your free fist or forearm blade across opponent throat, pushing down with your fist while pulling upward with your bottom arm.',
        keyCue: 'Scissor your forearms together like a nutcracker.'
      }
    ],
    commonMistakes: [
      { mistake: 'Reaching with both hands while mounted without base (gets bridged easily)', fix: 'Keep knees pinched tight in high mount before locking hands.' },
      { mistake: 'Using open fingers instead of a closed fist blade', fix: 'Form a tight fist blade to concentrate pressure on the trachea.' }
    ],
    relatedTechniqueIds: ['bjj-mount', 'bjj-side-control'],
    imageKey: 'bjj',
    videoYoutubeId: 'ygfnLjP6YQU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=ygfnLjP6YQU',
    externalResourceTitle: 'The Ezekiel Choke (Gi & No Gi) - Stephan Kesting',
    drillSuggestion: 'Mount control to Ezekiel choke: 15 reps locking the scissor grip.'
  },
  // ---------------- WRESTLING & STRIKING EXTRAS ----------------
  {
    id: 'wrest-duck-under',
    name: 'The Duck Under Takedown to Back Take',
    discipline: 'Wrestling',
    category: 'Takedowns / Angle Attacks',
    difficulty: 'Intermediate',
    description: 'An elite wrestling maneuver that bypasses sprawls completely. Shrugging opponent collar tie arm upward while dropping level and sliding under their tricep directly onto their back.',
    steps: [
      {
        phase: 'Bait Collar Tie',
        instruction: 'Engage opponent in collar tie clinch. Control their tricep with your opposite hand, lifting their elbow slightly.',
        keyCue: 'Lure them to push forward into your collar tie.'
      },
      {
        phase: 'Level Drop & Shoulder Shrug',
        instruction: 'Drop your hips 6 inches, step lead foot deep outside their stance, and shrug your head under their raised elbow.',
        keyCue: 'Slide your head under their armpit like putting on a t-shirt.'
      },
      {
        phase: 'Pop to Standing Rear Waistlock',
        instruction: 'Explode up behind their back, locking both arms around their waist in a tight rear standing bodylock.',
        keyCue: 'Ready to execute rear mat return or take back with hooks.'
      }
    ],
    commonMistakes: [
      { mistake: 'Ducking under while standing tall (gets head locked)', fix: 'Change levels with knees before sliding under.' },
      { mistake: 'Failing to step outside their foot runway', fix: 'Penetrate deep past their hip line.' }
    ],
    relatedTechniqueIds: ['wrest-underhook', 'wrest-bodylock-cage', 'bjj-back-take'],
    imageKey: 'wrestling',
    videoYoutubeId: 'vFvl1tdr8l4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=vFvl1tdr8l4',
    externalResourceTitle: 'Duck Under Takedown & Back Take - Cary Kolat',
    drillSuggestion: 'Duck under chain drill: 20 repetitions alternating sides into rear bodylock.'
  },
  {
    id: 'wrest-inside-trip',
    name: 'Inside Trip Takedown (Ouchi Gari)',
    discipline: 'Wrestling',
    category: 'Takedowns / Clinch Trips',
    difficulty: 'Intermediate',
    description: 'A classic Greco-Roman and Judo throw adapted for MMA. Locking an overhook or collar tie, driving chest weight forward, and reaping your lead leg behind their calf to slam them onto their back.',
    steps: [
      {
        phase: 'Establish Upper Body Clinch',
        instruction: 'Secure an overhook/underhook (50/50 clinch) or collar tie, pulling opponent forward to make their lead leg carry heavy weight.',
        keyCue: 'Their weight must be loaded onto their lead heel.'
      },
      {
        phase: 'Inside Leg Reap (Hook the Heel)',
        instruction: 'Step your support foot close, thread your lead leg between their legs, and hook your calf behind their lead calf tendon.',
        keyCue: 'Reap their support leg away from the canvas.'
      },
      {
        phase: 'Chest Drive into Mat',
        instruction: 'Drive your chest diagonally forward like a linebacker, taking their base away as you land directly in top mount.',
        keyCue: 'Follow them down; land with heavy chest-to-chest pressure.'
      }
    ],
    commonMistakes: [
      { mistake: 'Reaping leg without driving chest forward (leaves you off-balance)', fix: 'Upper body drive and lower body reap must occur simultaneously.' },
      { mistake: 'Reaching with foot before establishing upper body tie', fix: 'Control their shoulders first.' }
    ],
    relatedTechniqueIds: ['wrest-bodylock-cage', 'wrest-double-leg', 'bjj-mount'],
    imageKey: 'wrestling',
    videoYoutubeId: 'QMVavyxjlNU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=QMVavyxjlNU',
    externalResourceTitle: 'Inside Trip Takedown Technique - Cary Kolat',
    drillSuggestion: 'Wall clinch inside trip reps: 15 reps popping partner off cage onto mat.'
  },
  {
    id: 'mt-question-mark-kick',
    name: 'The Question Mark Kick (Brazilian Kick)',
    discipline: 'Muay Thai',
    category: 'Kicks / Feints & Head Kicks',
    difficulty: 'Advanced',
    description: 'A legendary visual trick kick. Chambering the knee straight down the centerline as if throwing a front teep to drop opponent guard, then whipping the hip over to snap shin into their temple.',
    steps: [
      {
        phase: 'The Front Teep Disguise',
        instruction: 'Lift lead knee high straight up down the center pipe, pointing knee at opponent stomach like a front push kick.',
        keyCue: 'Opponent will drop their hands and flare elbows to catch the teep.'
      },
      {
        phase: 'The Hip Roll & Question Mark Arc',
        instruction: 'At the apex of the chamber, violently pivot support foot 180 degrees, roll your hip over, and whip your foot in an arc up into their head.',
        keyCue: 'The trajectory changes from vertical to horizontal at the last split-second.'
      },
      {
        phase: 'Land & Recover',
        instruction: 'Chop shin bone across their neck/jawline, snapping leg immediately back to stance.',
        keyCue: 'Keep opposite hand glued to temple to defend counter hooks.'
      }
    ],
    commonMistakes: [
      { mistake: 'Swinging kick wide from the start (destroys the surprise element)', fix: 'Chamber must look 100% identical to a front teep.' },
      { mistake: 'Failing to pivot support foot 180 degrees', fix: 'Turn support heel completely toward opponent to allow full hip rotation.' }
    ],
    relatedTechniqueIds: ['mt-teep', 'mt-switch-kick'],
    imageKey: 'striking',
    videoYoutubeId: 'zBMr-FsmxqU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=zBMr-FsmxqU',
    externalResourceTitle: 'Question Mark Kick Tutorial - Sean Fagan',
    drillSuggestion: 'Chamber switch drill: 20 front teeps, followed by 10 question mark kicks.'
  },
  {
    id: 'mma-spinning-back-kick',
    name: 'Spinning Back Kick to the Liver',
    discipline: 'MMA',
    category: 'Striking / Power Strikes',
    difficulty: 'Advanced',
    description: 'One of the hardest impact strikes in martial arts. Pivoting on lead foot, spotting opponent liver over your shoulder, and driving heel straight backward like a mule kick.',
    steps: [
      {
        phase: 'Lead Foot Step & Turn',
        instruction: 'Step lead foot slightly across opponent centerline, turning support heel to point at opponent.',
        keyCue: 'Turning the heel opens your hips for the linear mule kick.'
      },
      {
        phase: 'Spotting the Target Over Shoulder',
        instruction: 'Turn head first to spot opponent liver/solar plexus with your eyes before kicking.',
        keyCue: 'Never kick blind; eyes must acquire target first.'
      },
      {
        phase: 'Piston Heel Extension',
        instruction: 'Thrust rear heel straight back in a tight linear piston into their floating ribs, driving hips backward.',
        keyCue: 'Drive heel like a spear straight into their liver.'
      }
    ],
    commonMistakes: [
      { mistake: 'Swinging leg wide like a wheel kick (slow and easy to duck)', fix: 'Drive straight back down the center line like a piston.' },
      { mistake: 'Kicking without turning head to spot target first', fix: 'Head turns first; foot follows.' }
    ],
    relatedTechniqueIds: ['mt-teep', 'mt-low-kick'],
    imageKey: 'hero',
    videoYoutubeId: '5IHQpcz-Qq8',
    externalResourceUrl: 'https://www.youtube.com/watch?v=5IHQpcz-Qq8',
    externalResourceTitle: 'How to Throw a Devastating Spinning Back Kick - Shane Fazen',
    drillSuggestion: 'Heavy bag: 30 spinning back kicks aiming for center logo with heel strike.'
  },
  {
    id: 'box-pull-counter',
    name: 'The Pull Counter (Lean-Back Straight Right)',
    discipline: 'Boxing',
    category: 'Striking / Counter Punching',
    difficulty: 'Advanced',
    description: 'Floyd Mayweather\'s signature counter. Leaning upper body back 2 inches to let opponent jab graze harmlessly past your chin, then snapping your rear cross straight down the pipe.',
    steps: [
      {
        phase: 'Bait the Jab',
        instruction: 'Stay in range with hands slightly relaxed to tempt opponent into firing a lead jab.',
        keyCue: 'Keep weight 50/50 ready to shift to rear foot.'
      },
      {
        phase: 'The Pull (Micro Lean-Back)',
        instruction: 'Shift weight onto rear leg, pulling head back 2 inches just enough for their punch to miss by air.',
        keyCue: 'Do not lean back too far; just enough to clear the leather.'
      },
      {
        phase: 'Spring Forward Cross',
        instruction: 'Explode off the rear foot like a released coil, firing your rear cross down the center before they can retract their jab.',
        keyCue: 'Time your punch at the exact climax of their extension.'
      }
    ],
    commonMistakes: [
      { mistake: 'Leaning back off-balance onto your heels (can be knocked over easily)', fix: 'Keep knees bent and ball of rear foot anchored to the mat.' },
      { mistake: 'Delaying counter until opponent has already recovered guard', fix: 'Counter must fire simultaneously as their punch misses.' }
    ],
    relatedTechniqueIds: ['box-cross', 'box-slip', 'box-shoulder-roll'],
    imageKey: 'striking',
    videoYoutubeId: 'sK-6Ujp3KYY',
    externalResourceUrl: 'https://www.youtube.com/watch?v=sK-6Ujp3KYY',
    externalResourceTitle: 'How to Master the Pull Counter in Boxing - Tony Jeffries',
    drillSuggestion: 'Partner drill: Partner jabs, defender pulls back 2 inches and tags chest with cross.'
  },
  // ---------------- EXPANDED BOXING ----------------
  {
    id: 'box-liver-punch',
    name: 'The Left Hook to the Liver (#5)',
    discipline: 'Boxing',
    category: 'Striking / Body Digs',
    difficulty: 'Intermediate',
    description: 'The most feared single-punch knockout strike in combat sports. Slips under the floating rib cage on the opponent right side, directly impacting the nerve-dense liver organ and instantly shutting down their diaphragm and legs.',
    steps: [
      {
        phase: 'Slip & Level Shift',
        instruction: 'Slip your head slightly outside opponent jab while dropping your hips 4 inches to load the lead leg spring.',
        keyCue: 'Do not drop your head below your waist; bend at the knees.'
      },
      {
        phase: '45-Degree Upward Dig',
        instruction: 'Drive through your lead foot and pivot lead hip, driving fist upward at a 45-degree angle thumb up directly under their floating 9th rib.',
        keyCue: 'Aim through the liver toward their opposite shoulder blade.'
      },
      {
        phase: 'Compact Shielded Recovery',
        instruction: 'Snap the punch back along the exact entry corridor straight to high guard.',
        keyCue: 'Keep rear hand glued to temple to block counter overhands.'
      }
    ],
    commonMistakes: [
      { mistake: 'Throwing flat horizontal hook to the arm instead of 45-degree dig underneath ribs', fix: 'Angle fist 45 degrees upward to slide directly under the rib cage.' },
      { mistake: 'Dropping rear hand while digging the body hook', fix: 'Glue rear glove to cheek to prevent taking an overhand right.' }
    ],
    relatedTechniqueIds: ['box-lead-hook', 'box-slip', 'mt-switch-kick'],
    imageKey: 'striking',
    videoYoutubeId: 'tyH4tYzgSqU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=tyH4tYzgSqU',
    externalResourceTitle: 'How to Land the Left Hook to the Liver - Tony Jeffries',
    drillSuggestion: 'Bag drill: Jab to the head -> Slip lead -> Left hook to the liver -> Exit angle.'
  },
  {
    id: 'box-overhand-right',
    name: 'The Overhand Right (The Casting Punch)',
    discipline: 'Boxing',
    category: 'Striking / Power Punches',
    difficulty: 'Intermediate',
    description: 'The premier knockout punch against taller opponents or jab-heavy fighters. Arc looping up and over the opponent lead shoulder while taking your head off the centerline to avoid return fire.',
    steps: [
      {
        phase: 'Head Offline Dip',
        instruction: 'Step your lead foot 3 inches to the left, dipping your head outside their jab line as you initiate the rear hip drive.',
        keyCue: 'Your head must leave the center corridor before the fist lands.'
      },
      {
        phase: 'Arcing Trajectory & Shoulder Elevation',
        instruction: 'Cast your rear arm in a descending rainbow arc over their lead guard, rotating fist so your thumb points down at the mat on impact.',
        keyCue: 'Elevate your right shoulder to touch your jaw for chin protection.'
      },
      {
        phase: 'Weight Transfer & Follow-Through',
        instruction: 'Commit 70% of your body weight through their jawline, landing with a solid base without falling forward.',
        keyCue: 'Keep lead hand posted defensively in front of your face.'
      }
    ],
    commonMistakes: [
      { mistake: 'Winding up wildly behind your back (telegraphs the punch completely)', fix: 'Let the punch travel straight from your cheek in a tight arc.' },
      { mistake: 'Keeping head on the centerline while throwing power', fix: 'Dip head diagonally forward-left to slip under their straight punch.' }
    ],
    relatedTechniqueIds: ['box-cross', 'mma-feint-overhand', 'box-slip'],
    imageKey: 'striking',
    videoYoutubeId: 'sK-6Ujp3KYY',
    externalResourceUrl: 'https://www.youtube.com/watch?v=sK-6Ujp3KYY',
    externalResourceTitle: 'The Secret to the Overhand Right - Tony Jeffries',
    drillSuggestion: 'Pad work: Slip jab -> Overhand right -> Left hook -> Pivot exit.'
  },
  {
    id: 'box-gazelle-punch',
    name: 'The Gazelle Punch (Leaping Lead Hook)',
    discipline: 'Boxing',
    category: 'Striking / Dynamic Attacks',
    difficulty: 'Advanced',
    description: 'Made famous by Floyd Patterson and Mike Tyson. A sudden explosive leap off both feet that transforms a lead hook or shovel hook into a high-momentum airborne strike that closes massive distance in 0.2 seconds.',
    steps: [
      {
        phase: 'Crouch & Compression',
        instruction: 'Drop into a deep athletic crouch beneath the opponent radar, loading kinetic potential in both calves and quads.',
        keyCue: 'Keep guard high and eyes fixed on opponent sternum.'
      },
      {
        phase: 'Bi-Pedal Spring',
        instruction: 'Explode forward and slightly upward in a short 12-inch hop off both feet, propelling your entire body weight into the air.',
        keyCue: 'Drive upward with legs; do not lean waist forward.'
      },
      {
        phase: 'Airborne Hook Snap',
        instruction: 'Uncoil your lead hook at the peak of the leap, snapping through opponent jaw just as your lead foot touches down.',
        keyCue: 'Land in a solid base ready for a rear cross follow-up.'
      }
    ],
    commonMistakes: [
      { mistake: 'Jumping too high into the air (loses balance and risks takedowns in MMA)', fix: 'Keep leap low and horizontal, just skimming the mat surface.' },
      { mistake: 'Throwing without chin tucked into collarbone', fix: 'Bite down on mouthpiece and bury chin in chest.' }
    ],
    relatedTechniqueIds: ['box-lead-hook', 'box-bob-weave', 'mma-superman-punch'],
    imageKey: 'striking',
    videoYoutubeId: 'ArQ50PXMCj4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=ArQ50PXMCj4',
    externalResourceTitle: 'Mike Tyson Gazelle Punch Breakdown & Mechanics',
    drillSuggestion: 'Hop & hook bag drill: 3 sets of 10 explosive leaping hooks on heavy bag.'
  },
  {
    id: 'box-pivot-step',
    name: '90-Degree L-Step Pivot & Angle Creation',
    discipline: 'Boxing',
    category: 'Footwork / Ring Geometry',
    difficulty: 'Intermediate',
    description: 'Vasiliy Lomachenko\'s signature geometry shift. Stepping your lead foot outside the opponent lead foot and swinging your rear leg 90 degrees around them to create an uncontested flank angle.',
    steps: [
      {
        phase: 'Lead Foot Outside Placement',
        instruction: 'Step your lead foot 4 inches to the outside of their lead foot while throwing a blinding pawing jab.',
        keyCue: 'Winning outside foot position wins the punching angle.'
      },
      {
        phase: 'Rear Leg Compass Swing',
        instruction: 'Anchor on the ball of your lead foot and swing your rear leg in a 90-degree lateral arc around their blind flank.',
        keyCue: 'Spin like a compass needle; do not drag your feet.'
      },
      {
        phase: 'Square Up & Fire',
        instruction: 'Reset into your stance perpendicular to the opponent profile and unload straight crosses or liver hooks.',
        keyCue: 'They must turn their entire body before they can strike back.'
      }
    ],
    commonMistakes: [
      { mistake: 'Crossing your feet during the pivot (destroys balance)', fix: 'Pivot strictly on the lead ball of foot while rear foot glides.' },
      { mistake: 'Pivoting without throwing a jab to blind their vision', fix: 'Occupy their guard with a pawing jab as you initiate the step.' }
    ],
    relatedTechniqueIds: ['box-jab', 'box-check-hook', 'mma-cage-cutoff'],
    imageKey: 'striking',
    videoYoutubeId: 'DOWc7NMSuEQ',
    externalResourceUrl: 'https://www.youtube.com/watch?v=DOWc7NMSuEQ',
    externalResourceTitle: 'Lomachenko Footwork & Angle Creation - Tony Jeffries',
    drillSuggestion: 'Cone pivot drill: Place cone on mat, step past and pivot 90 degrees 50 times.'
  },
  {
    id: 'box-shovel-hook',
    name: 'The Shovel Hook (45-Degree Body Rip)',
    discipline: 'Boxing',
    category: 'Striking / Inside Fighting',
    difficulty: 'Intermediate',
    description: 'A vicious hybrid punch between an uppercut and a hook. Fired at a diagonal 45-degree trajectory to bypass straight elbow shields and rip into the spleen or solar plexus.',
    steps: [
      {
        phase: 'Inside Pocket Slip',
        instruction: 'From inside range, dip your shoulder down and outward toward the side of the punch to load your oblique.',
        keyCue: 'Keep elbows tucked tightly against your own ribs.'
      },
      {
        phase: 'Diagonal Forearm Drive',
        instruction: 'Drive the punch upward and inward at a 45-degree angle, palm turned midway between horizontal and vertical.',
        keyCue: 'Drive with hip rotation and quad extension.'
      },
      {
        phase: 'Pocket Shield Return',
        instruction: 'Immediately rebound back to high guard or frame their collar tie with your forearm.',
        keyCue: 'Do not admire your work in the pocket.'
      }
    ],
    commonMistakes: [
      { mistake: 'Winding up from behind the hip line', fix: 'Keep punch compact; travel distance should not exceed 14 inches.' },
      { mistake: 'Staring down at their body (exposes chin to head kicks/uppercuts)', fix: 'Keep eyes on opponent collarbones.' }
    ],
    relatedTechniqueIds: ['box-uppercut', 'box-liver-punch'],
    imageKey: 'striking',
    videoYoutubeId: 'b33rufECWs0',
    externalResourceUrl: 'https://www.youtube.com/watch?v=b33rufECWs0',
    externalResourceTitle: 'How to Throw Shovel Hooks - Tony Jeffries',
    drillSuggestion: 'Heavy bag: 3 rounds inside fighting, alternating shovel hooks to liver and spleen.'
  },
  {
    id: 'box-parry-counter',
    name: 'Rear Hand Parry to Straight Cross Counter',
    discipline: 'Boxing',
    category: 'Defense / Counter Striking',
    difficulty: 'Beginner',
    description: 'The cleanest fundamental counter in boxing. Redirecting the opponent incoming lead jab with a gentle 1-inch palm tap, clearing the central highway for an instantaneous rear cross.',
    steps: [
      {
        phase: 'Micro Palm Tap',
        instruction: 'As opponent jabs, flick your open rear palm 1 inch forward and across to deflect the fist past your left shoulder.',
        keyCue: 'Do not reach forward for the punch; catch it at your cheekbone.'
      },
      {
        phase: 'Immediate Centerline Penetration',
        instruction: 'The split second their glove is deflected, drive your rear cross directly down the vacated center pipeline.',
        keyCue: 'Deflection and counter occur in one continuous beat: 1-2.'
      },
      {
        phase: 'Reset & Angle Exit',
        instruction: 'Retract your right hand and step 45 degrees to exit the pocket safely.',
        keyCue: 'Never stay standing in front of their loaded rear hand.'
      }
    ],
    commonMistakes: [
      { mistake: 'Reaching hands forward away from face to swat at punch (opens face to feints)', fix: 'Parry strictly within a 2-inch envelope in front of your cheek.' },
      { mistake: 'Waiting to see if the parry worked before initiating counter', fix: 'Parry and cross must be trained as a single simultaneous reflex.' }
    ],
    relatedTechniqueIds: ['box-jab', 'box-cross', 'box-slip'],
    imageKey: 'striking',
    videoYoutubeId: 'sK-6Ujp3KYY',
    externalResourceUrl: 'https://www.youtube.com/watch?v=sK-6Ujp3KYY',
    externalResourceTitle: 'How to Catch and Counter Punches - Tony Jeffries',
    drillSuggestion: 'Partner 1-2 drill: Partner jabs, defender parries and counters with straight right 50 reps.'
  },

  // ---------------- EXPANDED MUAY THAI & KICKBOXING ----------------
  {
    id: 'mt-switch-roundhouse',
    name: 'The Switch Roundhouse Kick',
    discipline: 'Muay Thai',
    category: 'Kicks / Dynamic Kicking',
    difficulty: 'Intermediate',
    description: 'A staple of elite Muay Thai. Quickly hopping feet to swap lead and rear legs in a micro-second, converting the lead leg into a full power rear kick to attack opponent ribs or arms without telegraphed step-ins.',
    steps: [
      {
        phase: 'The Micro Hop Switch',
        instruction: 'Hop both feet simultaneously: lead foot moves back under hips, rear foot steps slightly forward and outward at a 45-degree angle.',
        keyCue: 'Keep head level; do not bounce vertically in the air.'
      },
      {
        phase: 'Hip Roll & Shin Whip',
        instruction: 'Whip your now-rear leg in a wide upward arc, pivoting support foot 120 degrees on the ball of the foot and rolling your hip over flat.',
        keyCue: 'Drive the middle of your shin bone through their floating ribs or tricep.'
      },
      {
        phase: 'Arm Whip & Shield',
        instruction: 'Swing kicking-side arm downward to counterbalance torque while pressing opposite glove tight to your cheek.',
        keyCue: 'Arm whip accelerates the rotational speed of the shin.'
      }
    ],
    commonMistakes: [
      { mistake: 'Stepping forward with back foot instead of switching in place (slow and telegraphed)', fix: 'Both feet must change position simultaneously in a quick scissor hop.' },
      { mistake: 'Slapping with the instep/foot instead of digging with shin bone', fix: 'Contact must be made with the hard lower third of the tibia.' }
    ],
    relatedTechniqueIds: ['mt-low-kick', 'mt-teep', 'mt-question-mark-kick'],
    imageKey: 'striking',
    videoYoutubeId: 'zBMr-FsmxqU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=zBMr-FsmxqU',
    externalResourceTitle: 'How to Perfect the Switch Kick in Muay Thai - Sean Fagan',
    drillSuggestion: 'Heavy bag switch kicks: 5 sets of 20 rapid switch kicks with full hip commitment.'
  },
  {
    id: 'mt-lead-push-teep',
    name: 'The Lead Push Kick (The Teep)',
    discipline: 'Muay Thai',
    category: 'Kicks / Distance Control',
    difficulty: 'Beginner',
    description: 'The martial arts equivalent of the boxing jab. Stabbing the ball of the lead foot into opponent stomach, chest, or hips to break momentum, punish rushers, and dictate engagement range.',
    steps: [
      {
        phase: 'High Knee Chamber',
        instruction: 'Elevate your lead knee straight up to your chest with toes flared back like a spear.',
        keyCue: 'Chamber knee high; do not swing the foot up from the mat.'
      },
      {
        phase: 'Hip Thrust & Spear Extension',
        instruction: 'Thrust your hips forward like opening a locked door with your pelvis, driving the ball of your foot straight into their solar plexus.',
        keyCue: 'Drive from the hips, not just knee extension.'
      },
      {
        phase: 'Quick Retraction to Base',
        instruction: 'Snap the foot back to chamber before placing it cleanly back on the mat in fighting stance.',
        keyCue: 'Never let the kicking leg hang out where opponent can catch it.'
      }
    ],
    commonMistakes: [
      { mistake: 'Kicking with flat foot or toes forward (risks breaking toes)', fix: 'Pull toes back and strike exclusively with the muscular ball of the foot.' },
      { mistake: 'Leaning backward excessively during kick (destroys base if opponent steps back)', fix: 'Keep upper body tall and athletic; thrust comes from pelvis.' }
    ],
    relatedTechniqueIds: ['mt-switch-kick', 'mt-question-mark-kick', 'box-jab'],
    imageKey: 'striking',
    videoYoutubeId: 'zBMr-FsmxqU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=zBMr-FsmxqU',
    externalResourceTitle: 'Mastering the Muay Thai Teep - Sean Fagan',
    drillSuggestion: 'Heavy bag rhythm teeps: 3 rounds maintaining heavy bag swing distance purely with lead teeps.'
  },
  {
    id: 'mt-spinning-back-fist',
    name: 'The Spinning Backfist Knockout',
    discipline: 'Muay Thai',
    category: 'Striking / Rotational Attacks',
    difficulty: 'Advanced',
    description: 'A sudden, blinding rotational strike. Stepping across opponent centerline to disguise entry, rotating 360 degrees on the lead foot ball, and whipping the back of the fist or forearm into the temple.',
    steps: [
      {
        phase: 'Disguised Step Across',
        instruction: 'Step lead foot diagonally across opponent centerline, setting up the rotational axis while throwing a low feint.',
        keyCue: 'Stepping across hides the spin initiation.'
      },
      {
        phase: 'Head Turn & Target Acquisition',
        instruction: 'Whip your head around 360 degrees first so your eyes spot opponent jaw before the arm extends.',
        keyCue: 'Never strike blind; eyes lock onto target before fist impact.'
      },
      {
        phase: 'Forearm / Fist Whip',
        instruction: 'Uncoil the striking arm with a slight bend at the elbow, striking with the muscular forearm or padded back of fist.',
        keyCue: 'Opposite hand stays glued to cheek to prevent counter hooks.'
      }
    ],
    commonMistakes: [
      { mistake: 'Spinning with head trailing behind the arm (causes dizziness and blind misses)', fix: 'Spot the target with your eyes like a ballet dancer spotting a pirouette.' },
      { mistake: 'Over-rotating and spinning 450 degrees out of control', fix: 'Plant rear foot firmly to brake rotation immediately upon impact.' }
    ],
    relatedTechniqueIds: ['mma-spinning-back-kick', 'box-lead-hook'],
    imageKey: 'striking',
    videoYoutubeId: '5IHQpcz-Qq8',
    externalResourceUrl: 'https://www.youtube.com/watch?v=5IHQpcz-Qq8',
    externalResourceTitle: 'How to Throw a Devastating Spinning Backfist - fightTIPS',
    drillSuggestion: 'Target pad spin drill: 20 reps per side focusing on instantaneous head spotting.'
  },
  {
    id: 'mt-flying-knee',
    name: 'The Flying Switch Knee (The Masvidal Sprinter)',
    discipline: 'Muay Thai',
    category: 'Striking / Airborne Attacks',
    difficulty: 'Advanced',
    description: 'One of the most catastrophic knockout weapons in combat history. Feigning a low attack or level change, sprinting off the lead leg, and driving the rear knee like a supersonic missile into opponent chin.',
    steps: [
      {
        phase: 'Approach & Level Drop Feint',
        instruction: 'Explode forward with 2 rapid sprint steps, dropping eye level slightly to bait opponent into dropping hands or shooting for a takedown.',
        keyCue: 'Make them think you are shooting or throwing low.'
      },
      {
        phase: 'Launch Off Lead Leg',
        instruction: 'Drive down violently through your lead leg to launch your entire body upward and forward toward their head.',
        keyCue: 'Drive upward momentum through your hips and core.'
      },
      {
        phase: 'Switch & Spear the Knee',
        instruction: 'In mid-air, drive your rear knee forward like a battering ram, pointing the patella bone directly through their jawline.',
        keyCue: 'Lock ankles and point toes down to harden knee joint.'
      }
    ],
    commonMistakes: [
      { mistake: 'Jumping purely straight up instead of forward into their space', fix: 'Trajectory must be 60% forward penetration and 40% elevation.' },
      { mistake: 'Dropping guard during the leap (eats counter crosses)', fix: 'Keep both gloves framed in front of face during flight.' }
    ],
    relatedTechniqueIds: ['mt-clinch-plum', 'box-overhand-right'],
    imageKey: 'striking',
    videoYoutubeId: 'EgfYvACoxdQ',
    externalResourceUrl: 'https://www.youtube.com/watch?v=EgfYvACoxdQ',
    externalResourceTitle: 'Flying Knee Knockout Breakdown & Mechanics - fightTIPS',
    drillSuggestion: 'Heavy bag launch drills: 15 explosive flying knees per side on suspended bag.'
  },
  {
    id: 'mt-plum-spear-knees',
    name: 'The Double Collar Tie (Plum) & Spear Knees',
    discipline: 'Muay Thai',
    category: 'Clinch / Domination',
    difficulty: 'Intermediate',
    description: 'The iconic Muay Thai clinch posture. Interlocking hands behind the crown of opponent head, using forearm frames to bend their spine downward while driving piercing knees into their ribs and liver.',
    steps: [
      {
        phase: 'Crown Hand Interlock',
        instruction: 'Place one palm over the back of the other across the crown of their skull (never interlock fingers). Squeeze elbows together.',
        keyCue: 'Your forearms must clamp their collarbones like a vice.'
      },
      {
        phase: 'Spine Curvature & Head Pull',
        instruction: 'Pull their head downward into your chest while arching your own hips back to create space for strikes.',
        keyCue: 'Where the head goes, the spine must follow.'
      },
      {
        phase: 'Spear Knee Drive',
        instruction: 'Step up on the toes of your base foot and drive your knee straight forward like a spear into their solar plexus or floating ribs.',
        keyCue: 'Drive the knee forward through their spine, not upward.'
      }
    ],
    commonMistakes: [
      { mistake: 'Interlocking fingers (can cause broken fingers when opponent fights hands)', fix: 'Stack palms over each other or grip wrists.' },
      { mistake: 'Standing flat on heels while kneeing (loses 50% power and balance)', fix: 'Rise onto the ball of the support foot to lengthen reach and hip drive.' }
    ],
    relatedTechniqueIds: ['mt-flying-knee', 'wrest-underhook-knee-tap', 'mma-cage-overunder-pin'],
    imageKey: 'striking',
    videoYoutubeId: 'zBMr-FsmxqU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=zBMr-FsmxqU',
    externalResourceTitle: 'Muay Thai Clinch Mastery & Knees - Sean Fagan',
    drillSuggestion: 'Clinch rounds: 3x3 min clinch pummeling with light spear knee touches.'
  },
  {
    id: 'mt-horizontal-elbow',
    name: 'Horizontal Slashing Elbow',
    discipline: 'Muay Thai',
    category: 'Striking / Cuts & Stoppages',
    difficulty: 'Intermediate',
    description: 'The sharpest blade in striking. Stepping deep into the pocket, rotating your hips 90 degrees, and slicing the razor-sharp olecranon bone across opponent brow or nose bridge to generate fight-ending lacerations.',
    steps: [
      {
        phase: 'Pocket Step & Hand Guard',
        instruction: 'Step your lead foot inside opponent guard. Glue non-striking hand to your temple with open palm facing your ear.',
        keyCue: 'Close the distance; elbows are lethal only within 12 inches.'
      },
      {
        phase: 'Olecranon Horizontal Slice',
        instruction: 'Fold forearm tight to bicep to sharpen elbow point. Rotate hips and slice elbow horizontally across their face.',
        keyCue: 'Keep elbow parallel to canvas; cut through like a razor blade.'
      },
      {
        phase: 'Frame & Exit',
        instruction: 'Post your forearm across their collarbone immediately after impact to prevent counter headbutts or hooks.',
        keyCue: 'Frame off opponent to reset distance.'
      }
    ],
    commonMistakes: [
      { mistake: 'Leaving forearm open at 90 degrees (blunts the impact and risks getting trapped)', fix: 'Pinch fist tight to chest/collarbone to create the sharpest bone point.' },
      { mistake: 'Throwing elbow from too far away (reaches and gets countered)', fix: 'Setup with a blinding jab before stepping in to slash.' }
    ],
    relatedTechniqueIds: ['box-lead-hook', 'mt-clinch-plum', 'mma-gnp-posture-break'],
    imageKey: 'striking',
    videoYoutubeId: 'zBMr-FsmxqU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=zBMr-FsmxqU',
    externalResourceTitle: 'How to Throw Deadly Elbows in Muay Thai - Sean Fagan',
    drillSuggestion: 'Elbow pad combinations: Jab -> Cross -> Step-in horizontal elbow -> Collar tie.'
  },
  {
    id: 'mt-spinning-wheel-kick',
    name: 'Spinning Wheel Kick (Heel Hook Kick)',
    discipline: 'Muay Thai',
    category: 'Kicks / Highlight Knockouts',
    difficulty: 'Advanced',
    description: 'The Edson Barboza highlight-reel weapon. Spinning 360 degrees on the lead ball of foot, whipping the stiffened heel bone in an overhead circular trajectory to detonate on opponent jaw or temple.',
    steps: [
      {
        phase: 'Diagonal Setup Step',
        instruction: 'Step lead foot 45 degrees across opponent centerline, turning your lead heel directly toward them.',
        keyCue: 'Turning the heel unlocks hip rotation.'
      },
      {
        phase: 'Head Snap & Spotting',
        instruction: 'Whip head around first to spot opponent chin through the rotation. Keep hands shielding your face.',
        keyCue: 'Target acquisition occurs before leg extension.'
      },
      {
        phase: 'Circular Heel Whip',
        instruction: 'Swing kicking leg in a rising circular arc, locking knee straight right as the hard calcaneus heel bone connects with their temple.',
        keyCue: 'Strike with the bottom of the heel; follow through 360 degrees back to stance.'
      }
    ],
    commonMistakes: [
      { mistake: 'Striking with soft toes or instep instead of the solid heel bone', fix: 'Flex ankle so heel bone acts as a stone hammer.' },
      { mistake: 'Dropping guard during spin, leaving jaw exposed to counters', fix: 'Keep hands tight around ears throughout the 360-degree rotation.' }
    ],
    relatedTechniqueIds: ['mt-question-mark-kick', 'mma-spinning-back-kick'],
    imageKey: 'hero',
    videoYoutubeId: '5IHQpcz-Qq8',
    externalResourceUrl: 'https://www.youtube.com/watch?v=5IHQpcz-Qq8',
    externalResourceTitle: 'How to Throw a Spinning Wheel Kick - fightTIPS',
    drillSuggestion: 'Slow motion balance rotations: 15 reps focusing on clean 360-degree landing.'
  },
  {
    id: 'mt-kick-catch-sweep',
    name: 'Roundhouse Catch to Inside Leg Sweep',
    discipline: 'Muay Thai',
    category: 'Defense / Counters & Dumps',
    difficulty: 'Intermediate',
    description: 'The classic Muay Thai punish for aggressive kickers. Scooping opponent middle roundhouse kick with your lead arm, stepping in deep, and sweeping their remaining support foot to slam them on their back.',
    steps: [
      {
        phase: 'Absorb & Scoop Catch',
        instruction: 'Slide your hips back 2 inches to absorb kick momentum while scooping your lead forearm under their ankle and clamping your elbow.',
        keyCue: 'Clamp the leg tight to your ribs like holding a football.'
      },
      {
        phase: 'Inside Foot Penetration',
        instruction: 'Take a deep step forward with your lead foot right next to their standing support foot.',
        keyCue: 'Close the distance immediately so they cannot hop away.'
      },
      {
        phase: 'Reaping Shin Sweep',
        instruction: 'Reap your rear calf or instep behind their standing calf, kicking their support leg out from under them while pulling their caught leg forward.',
        keyCue: 'Pull leg forward while kicking their support leg backward.'
      }
    ],
    commonMistakes: [
      { mistake: 'Reaching with both hands to catch kick (leaves chin wide open to head kicks)', fix: 'Keep rear hand glued to face; catch with lead arm and rib cage clamp.' },
      { mistake: 'Holding caught leg without sweeping immediately (allows them to punch you)', fix: 'Execute sweep within 0.5 seconds of catching.' }
    ],
    relatedTechniqueIds: ['mt-switch-kick', 'wrest-inside-trip', 'judo-osoto-gari'],
    imageKey: 'striking',
    videoYoutubeId: 'zBMr-FsmxqU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=zBMr-FsmxqU',
    externalResourceTitle: 'Muay Thai Kick Catches and Sweeps - Sean Fagan',
    drillSuggestion: 'Partner catch & sweep drill: Partner throws light body kick, defender catches and sweeps 20 reps.'
  },

  // ---------------- EXPANDED WRESTLING ----------------
  {
    id: 'wrest-blast-double',
    name: 'The Blast Double Leg Takedown',
    discipline: 'Wrestling',
    category: 'Takedowns / Penetration Shots',
    difficulty: 'Intermediate',
    description: 'Jordan Burroughs\' unstoppable signature shot. Dropping level and driving your forehead straight into opponent sternum like a battering ram, running through their hips and picking both knees to slam them flat.',
    steps: [
      {
        phase: 'Level Change & Head Position',
        instruction: 'Lower your elevation by bending knees, exploding forward with lead penetration step. Aim your forehead directly at the center of their sternum.',
        keyCue: 'Head in the center of the chest stops all guillotine choke threats.'
      },
      {
        phase: 'Cup the Knee Pits',
        instruction: 'Wrap both arms behind their knee pits or hamstrings, cupping their legs tight to your chest.',
        keyCue: 'Do not drop your knees to the mat; stay on your feet and run.'
      },
      {
        phase: 'Drive Through the Hips',
        instruction: 'Drive your feet like a linebacker pushing a sled, running your feet through their center until they collapse backwards onto the canvas.',
        keyCue: 'Run through them, not down to the mat.'
      }
    ],
    commonMistakes: [
      { mistake: 'Bending at the waist and looking down at mat (eats knees and sprawls)', fix: 'Keep back flat, neck rigid, and eyes looking through their chest.' },
      { mistake: 'Dropping to both knees prematurely and losing forward drive', fix: 'Drive continuously off your feet until opponent back touches canvas.' }
    ],
    relatedTechniqueIds: ['wrest-sweep-single', 'wrest-high-crotch', 'mma-jab-blast-takedown'],
    imageKey: 'wrestling',
    videoYoutubeId: 'vFvl1tdr8l4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=vFvl1tdr8l4',
    externalResourceTitle: 'Jordan Burroughs Blast Double Leg Technique - Cary Kolat',
    drillSuggestion: 'Shot sprint reps: 30 blast double entries driving partner into wall crash pad.'
  },
  {
    id: 'wrest-sweep-single',
    name: 'Sweep Single Leg to Run the Pipe',
    discipline: 'Wrestling',
    category: 'Takedowns / Single Leg Attacks',
    difficulty: 'Beginner',
    description: 'The highest percentage takedown in wrestling and MMA. Circling outside opponent lead leg, dropping to one knee to wrap their ankle, elevating the leg between your thighs, and running the pipe to finish.',
    steps: [
      {
        phase: 'Outside Angle Penetration',
        instruction: 'Step lead foot outside their lead foot, dropping your lead knee to the mat while wrapping your arms around their lead ankle and calf.',
        keyCue: 'Keep head pressed firmly into their ribs to deny counter whizzers.'
      },
      {
        phase: 'Elevate & Shelf the Leg',
        instruction: 'Drive up off the mat, lifting opponent leg between your own thighs (shelfing the leg).',
        keyCue: 'Pinch your knees tight to trap their ankle.'
      },
      {
        phase: 'Run the Pipe Finish',
        instruction: 'Step back with your outside foot in a circular arc while pulling their leg downward like flushing a toilet, dumping opponent onto their hip.',
        keyCue: 'Rotate your shoulders and run backward in a circle.'
      }
    ],
    commonMistakes: [
      { mistake: 'Putting head on outside of hip (leaves you vulnerable to guillotine chokes)', fix: 'Keep head glued to their ribs with ear to chest.' },
      { mistake: 'Trying to lift with lower back instead of driving with legs', fix: 'Keep spine upright and drive through glutes.' }
    ],
    relatedTechniqueIds: ['wrest-blast-double', 'wrest-high-crotch', 'wrest-whizzer-kick'],
    imageKey: 'wrestling',
    videoYoutubeId: 'vFvl1tdr8l4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=vFvl1tdr8l4',
    externalResourceTitle: 'Sweep Single Leg and Run the Pipe - Cary Kolat',
    drillSuggestion: 'Single leg chain drilling: 20 sweep singles each side finishing directly in side control.'
  },
  {
    id: 'wrest-high-crotch',
    name: 'High Crotch to Double Leg Dump',
    discipline: 'Wrestling',
    category: 'Takedowns / Penetration Shots',
    difficulty: 'Intermediate',
    description: 'The preferred shot of Olympic champions. Penetrating deep between opponent legs, wrapping the lead arm deep into their crotch, popping head outside their hip, and transitioning across to a double leg dump.',
    steps: [
      {
        phase: 'Deep Penetration Step',
        instruction: 'Change levels and drive your lead knee deep between opponent feet. Shoot your lead arm deep through their crotch to cup the far hamstring.',
        keyCue: 'Your chest must contact their thigh; head posts outside their hip.'
      },
      {
        phase: 'Turn the Corner',
        instruction: 'Pop your hips upward and pivot 90 degrees around their body to face their flank.',
        keyCue: 'Drive through your outside leg to turn the corner.'
      },
      {
        phase: 'Switch to Double Leg Dump',
        instruction: 'Release crotch grip and slide arm across to far knee, running your feet to dump opponent sideways onto their back.',
        keyCue: 'Switching to double leg prevents opponent from executing a chest wrap.'
      }
    ],
    commonMistakes: [
      { mistake: 'Leaving head inside chest (turns into awkward single leg)', fix: 'Head must be glued to outside of their hip bone.' },
      { mistake: 'Failing to turn corner immediately after penetration', fix: 'Rotate 90 degrees instantly to neutralize their sprawl.' }
    ],
    relatedTechniqueIds: ['wrest-blast-double', 'wrest-sweep-single', 'wrest-underhook-knee-tap'],
    imageKey: 'wrestling',
    videoYoutubeId: 'vFvl1tdr8l4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=vFvl1tdr8l4',
    externalResourceTitle: 'High Crotch Takedown to Double Leg Switch - Cary Kolat',
    drillSuggestion: 'High crotch corner turn drill: 25 reps practicing the 90-degree corner switch.'
  },
  {
    id: 'wrest-underhook-knee-tap',
    name: 'Dominant Underhook to Far Knee Tap',
    discipline: 'Wrestling',
    category: 'Clinch Takedowns / Upper Body',
    difficulty: 'Intermediate',
    description: 'Randy Couture\'s signature Greco-MMA weapon. Establishing a deep inside underhook, jacking opponent shoulder up to shift their weight onto far leg, and reaching down to tap their knee while driving forward.',
    steps: [
      {
        phase: 'Pummel & High Underhook',
        instruction: 'Pummel your right arm under opponent armpit, placing palm flat on their opposite shoulder blade. Jack your elbow high to elevate their shoulder.',
        keyCue: 'Your head must win inside position against their neck.'
      },
      {
        phase: 'Weight Shift Drive',
        instruction: 'Drive your chest forward into them, forcing all their body weight onto their far back leg.',
        keyCue: 'Load all their weight onto their heels.'
      },
      {
        phase: 'Knee Tap & Dump',
        instruction: 'Reach your free left hand down to block behind their far knee, driving your upper body through their underhooked side to tip them over.',
        keyCue: 'Block the knee like a kickstand; drive upper body forward.'
      }
    ],
    commonMistakes: [
      { mistake: 'Leaving underhook shallow at the tricep (opponent can whizzer easily)', fix: 'Thread underhook deep until your shoulder touches their armpit.' },
      { mistake: 'Losing head position (opponent ducks under your arm)', fix: 'Keep your temple glued into their cheek/neck.' }
    ],
    relatedTechniqueIds: ['wrest-bodylock-cage', 'judo-harai-goshi', 'mma-cage-overunder-pin'],
    imageKey: 'wrestling',
    videoYoutubeId: 'vFvl1tdr8l4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=vFvl1tdr8l4',
    externalResourceTitle: 'Underhook Knee Tap Takedown - Cary Kolat',
    drillSuggestion: 'Underhook pummeling to knee tap: 15 reps alternating sides.'
  },
  {
    id: 'wrest-firemans-carry',
    name: 'Fireman\'s Carry / Kata Guruma Dump',
    discipline: 'Wrestling',
    category: 'Takedowns / Throws',
    difficulty: 'Intermediate',
    description: 'A spectacular, high-impact throw. Controlling an inside bicep tie, dropping directly between opponent legs onto both knees, pulling their arm across your shoulders, and dumping them sideways over your back.',
    steps: [
      {
        phase: 'Inside Bicep Control & Level Drop',
        instruction: 'Secure a 2-on-1 or collar-bicep tie on opponent left arm. Drop rapidly to your knees between their feet.',
        keyCue: 'Pull their captured arm tight across your chest.'
      },
      {
        phase: 'Deep Crotch Underhook',
        instruction: 'Thread your free right arm deep between their legs, hooking their right inner thigh onto your shoulders.',
        keyCue: 'Load their pelvis directly onto your upper back.'
      },
      {
        phase: 'Sideways Roll & Dump',
        instruction: 'Tilt your head to the left and roll across your shoulder, dumping opponent over your head onto their back.',
        keyCue: 'Follow them down to secure side control or crucifix position.'
      }
    ],
    commonMistakes: [
      { mistake: 'Reaching for leg without controlling bicep (leaves you open to crucifix/submission)', fix: 'Pull bicep tight to your collarbone like a seatbelt.' },
      { mistake: 'Trying to stand up with their weight instead of rolling sideways', fix: 'Roll laterally toward your non-shooting shoulder.' }
    ],
    relatedTechniqueIds: ['wrest-high-crotch', 'judo-drop-seoi-nage'],
    imageKey: 'wrestling',
    videoYoutubeId: 'vFvl1tdr8l4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=vFvl1tdr8l4',
    externalResourceTitle: 'Fireman\'s Carry Takedown Breakdown - Cary Kolat',
    drillSuggestion: 'Knee drop fireman entries: 20 reps onto crash mats with partner.'
  },
  {
    id: 'wrest-front-headlock-cow',
    name: 'Front Headlock to Cow Catcher & Go-Behind',
    discipline: 'Wrestling',
    category: 'Takedowns / Front Headlock Attacks',
    difficulty: 'Intermediate',
    description: 'The supreme punish when opponent shoots a weak takedown. Snapping their head down into your chest, securing a chin-and-tricep grip, and either spinning behind for back control or cow-catching them to their back.',
    steps: [
      {
        phase: 'Snap Down & Chin Cup',
        instruction: 'Sprawl on their shot, snap your palms behind their neck, and pull their forehead into your sternum. Cup their chin with your right hand.',
        keyCue: 'Put all your upper body weight on the back of their neck.'
      },
      {
        phase: 'Tricep Control & Posture Break',
        instruction: 'Clamp their left tricep with your left hand, squeezing your elbows together tight around their skull.',
        keyCue: 'Never let their forehead raise off your chest.'
      },
      {
        phase: 'Spin to Go-Behind or Cow Catch',
        instruction: 'Shrug their head under your chest and sprint your feet in a circle behind their hips, securing waist control.',
        keyCue: 'Circle toward the tricep control side.'
      }
    ],
    commonMistakes: [
      { mistake: 'Staying on knees (lets opponent stand back up or shoot under)', fix: 'Stay on your toes with knees hovering 2 inches off the mat.' },
      { mistake: 'Reaching around waist prematurely before clearing head', fix: 'Lock chin and tricep until head is completely bypassed.' }
    ],
    relatedTechniqueIds: ['bjj-guillotine', 'bjj-darce-choke', 'bjj-anaconda-choke'],
    imageKey: 'wrestling',
    videoYoutubeId: 'vFvl1tdr8l4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=vFvl1tdr8l4',
    externalResourceTitle: 'Front Headlock Offense & Go-Behind - Cary Kolat',
    drillSuggestion: 'Snap down to spin behind: 25 rapid reps alternating left and right.'
  },
  {
    id: 'wrest-whizzer-kick',
    name: 'Whizzer Defense to Lateral Mat Return',
    discipline: 'Wrestling',
    category: 'Defense / Single Leg Counters',
    difficulty: 'Intermediate',
    description: 'The primary defense against single leg takedowns. Overhooking opponent attacking arm (the whizzer), driving shoulder downward into their clavicle, and kicking your trapped leg back to break their grip or toss them to mat.',
    steps: [
      {
        phase: 'Overhook Whizzer Insertion',
        instruction: 'As opponent wraps your leg, drive your same-side arm over their shoulder and thread forearm under their armpit (the whizzer).',
        keyCue: 'Grip your own thigh or opponent far wrist.'
      },
      {
        phase: 'Heavy Shoulder Pressure',
        instruction: 'Drive your whizzer shoulder downward into their collarbone, forcing their head toward the mat.',
        keyCue: 'The whizzer must break their posture, not just hold on.'
      },
      {
        phase: 'Mule Kick & Turn',
        instruction: 'Mule-kick your trapped leg backward with maximum velocity while twisting your hips to face opponent.',
        keyCue: 'Kicking leg back snaps their wrist grips apart.'
      }
    ],
    commonMistakes: [
      { mistake: 'Allowing opponent to keep head up on your chest', fix: 'Drive whizzer shoulder down so their forehead points at the floor.' },
      { mistake: 'Pulling upward on whizzer arm (helps opponent finish takedown)', fix: 'Push DOWN with shoulder; elevate only their wrist.' }
    ],
    relatedTechniqueIds: ['wrest-sweep-single', 'wrest-underhook-knee-tap'],
    imageKey: 'wrestling',
    videoYoutubeId: 'vFvl1tdr8l4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=vFvl1tdr8l4',
    externalResourceTitle: 'The Whizzer Takedown Defense - Cary Kolat',
    drillSuggestion: 'Single leg defense drill: Partner shoots single, defender locks whizzer and kicks leg free 30 reps.'
  },
  {
    id: 'wrest-ankle-pick',
    name: 'Collar Tie Snap Down to Ankle Pick',
    discipline: 'Wrestling',
    category: 'Takedowns / Ankle Attacks',
    difficulty: 'Intermediate',
    description: 'Cael Sanderson\'s signature weapon. Engaging in a collar tie, violently snapping opponent head down to force all their weight onto their lead foot, and reaching down to snatch the heel while driving forward.',
    steps: [
      {
        phase: 'Collar Tie & Heavy Snap',
        instruction: 'Establish heavy collar tie behind opponent crown. Snap their head down toward your lead knee with full body weight.',
        keyCue: 'Force them to step their lead foot forward to catch balance.'
      },
      {
        phase: 'Level Drop & Heel Snatch',
        instruction: 'As their lead foot plants, drop your elevation and cup your hand around the back of their heel (Achilles tendon).',
        keyCue: 'Do not drop to your knees; keep your base athletic.'
      },
      {
        phase: 'Forward Chest Drive',
        instruction: 'Drive your collar tie hand forward through their head while lifting their trapped heel off the mat.',
        keyCue: 'Push the head, pull the heel: creates an unstoppable lever.'
      }
    ],
    commonMistakes: [
      { mistake: 'Reaching for heel without snapping their head forward first', fix: 'Their weight must be 100% committed to the lead heel before you snatch.' },
      { mistake: 'Letting go of collar tie when reaching for ankle', fix: 'Keep one hand on their neck; the head is the steering wheel.' }
    ],
    relatedTechniqueIds: ['wrest-sweep-single', 'wrest-inside-trip'],
    imageKey: 'wrestling',
    videoYoutubeId: 'vFvl1tdr8l4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=vFvl1tdr8l4',
    externalResourceTitle: 'Ankle Pick from Collar Tie - Cary Kolat',
    drillSuggestion: 'Snap down ankle pick timing drill: 20 reps alternating lead legs.'
  },

  // ---------------- JUDO & SAMBO ----------------
  {
    id: 'judo-harai-goshi',
    name: 'Harai Goshi (Sweeping Hip Throw)',
    discipline: 'Judo / Sambo',
    category: 'Takedowns / Hip Throws',
    difficulty: 'Advanced',
    description: 'Ronda Rousey\'s devastating MMA weapon. Overhooking or collar-tying opponent, stepping your hips across their pelvis, and sweeping your rear thigh backward like a scythe to launch them through the air.',
    steps: [
      {
        phase: 'Off-Balancing (Kuzushi)',
        instruction: 'Pull opponent forward with sleeve/wrist grip while stepping lead foot across their centerline to load their weight onto your hip.',
        keyCue: 'Load their ribcage flush against your lat.'
      },
      {
        phase: 'Hip Placement & Pivot',
        instruction: 'Pivot 180 degrees so your back faces their chest, inserting your hip across their belt line.',
        keyCue: 'Your hips must be slightly lower than opponent hips.'
      },
      {
        phase: 'Sweeping Thigh Reaping (Harai)',
        instruction: 'Sweep your right leg backward against their right thigh, kicking their leg up into the air while rotating your upper body.',
        keyCue: 'Rotate your head toward the floor; where eyes look, opponent flies.'
      }
    ],
    commonMistakes: [
      { mistake: 'Trying to lift with hip without sweeping leg (opponent hops over hip)', fix: 'The thigh sweep must reap their support leg high into the air.' },
      { mistake: 'Failing to pull opponent forward during entry', fix: 'Kuzushi (off-balancing) must eliminate all space between chests.' }
    ],
    relatedTechniqueIds: ['judo-osoto-gari', 'judo-uchi-mata', 'wrest-bodylock-cage'],
    imageKey: 'wrestling',
    videoYoutubeId: 'vFvl1tdr8l4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=vFvl1tdr8l4',
    externalResourceTitle: 'Harai Goshi (Sweeping Hip Throw) Breakdown - Shintaro Higashi',
    drillSuggestion: 'Uchi-komi fit-ins: 30 shadow entries focusing on hip contact and leg sweeping arc.'
  },
  {
    id: 'judo-osoto-gari',
    name: 'Osoto Gari (Major Outer Reap)',
    discipline: 'Judo / Sambo',
    category: 'Takedowns / Leg Reaps',
    difficulty: 'Beginner',
    description: 'The premier backward throw in grappling. Breaking opponent balance diagonally backward onto their heel, driving your chest through theirs, and violently reaping your leg behind their support knee to slam them onto the mat.',
    steps: [
      {
        phase: 'Deep Penetration Step & Chest Clamp',
        instruction: 'Step your lead foot deep outside their lead foot, clamping your chest tight against their shoulder and pulling down on their elbow.',
        keyCue: 'Drive their balance completely onto their trailing heel.'
      },
      {
        phase: 'High Leg Chamber',
        instruction: 'Swing your attacking leg forward high past their hip, pointing your toes to prepare the reap.',
        keyCue: 'Chamber leg high like kicking a soccer ball.'
      },
      {
        phase: 'Violent Backward Reap',
        instruction: 'Chop your hamstring violently backward behind their knee pit, reaping their leg into the air as your chest drives through.',
        keyCue: 'Follow them down; land heavy in top scarf hold (Kesa Gatame).'
      }
    ],
    commonMistakes: [
      { mistake: 'Reaping with leg while keeping chest back (opponent counters with Osoto Gaeshi)', fix: 'Chest must drive forward aggressively through opponent clavicle.' },
      { mistake: 'Stepping too far away with support foot', fix: 'Plant support foot within 4 inches of their lead foot.' }
    ],
    relatedTechniqueIds: ['judo-harai-goshi', 'wrest-inside-trip'],
    imageKey: 'wrestling',
    videoYoutubeId: 'vFvl1tdr8l4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=vFvl1tdr8l4',
    externalResourceTitle: 'Osoto Gari in MMA & No-Gi Grappling - Shintaro Higashi',
    drillSuggestion: 'Crash mat throwing reps: 20 repetitions each side driving partner onto mat.'
  },
  {
    id: 'judo-drop-seoi-nage',
    name: 'Drop Seoi Nage (Two-Knee Shoulder Throw)',
    discipline: 'Judo / Sambo',
    category: 'Takedowns / Shoulder Throws',
    difficulty: 'Advanced',
    description: 'An explosive sacrifice throw. Controlling an inside wrist or overhook, turning 180 degrees and dropping straight onto both knees underneath opponent center of gravity, whipping them over your shoulder onto the canvas.',
    steps: [
      {
        phase: 'Upward Sleeve Pull',
        instruction: 'Pull opponent right sleeve high like checking a wristwatch, opening space under their armpit.',
        keyCue: 'Pull upward to elevate their center of gravity.'
      },
      {
        phase: 'Two-Knee Drop Entry',
        instruction: 'Turn 180 degrees and drop rapidly onto both knees directly between opponent feet, clamping your elbow under their armpit.',
        keyCue: 'Drop your hips below their knees.'
      },
      {
        phase: 'Arch & Forward Throw',
        instruction: 'Explode upward off your toes and arch forward, pulling opponent over your back and slamming them onto their shoulders.',
        keyCue: 'Look at the floor in front of you as you throw.'
      }
    ],
    commonMistakes: [
      { mistake: 'Dropping to knees too far in front of opponent (they collapse on your back)', fix: 'Drop directly between their feet, hips glued to their shins.' },
      { mistake: 'Failing to pull sleeve upward before dropping', fix: 'Elevate their arm to expose their center of gravity.' }
    ],
    relatedTechniqueIds: ['wrest-firemans-carry', 'judo-harai-goshi'],
    imageKey: 'wrestling',
    videoYoutubeId: 'vFvl1tdr8l4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=vFvl1tdr8l4',
    externalResourceTitle: 'Drop Seoi Nage Mechanics - Shintaro Higashi',
    drillSuggestion: 'Bungee band shoulder throw entries: 50 explosive drop entries.'
  },
  {
    id: 'judo-uchi-mata',
    name: 'Uchi Mata (Inner Thigh Throw)',
    discipline: 'Judo / Sambo',
    category: 'Takedowns / Throws',
    difficulty: 'Advanced',
    description: 'Widely considered the most beautiful and high-amplitude throw in grappling. Driving your leg deep between opponent thighs, lifting their inner groin with your hamstring while pivoting forward to send them flipping.',
    steps: [
      {
        phase: 'High Collar / Underhook Clamp',
        instruction: 'Establish a dominant underhook or neck tie. Pull opponent forward to make them step heavy on their lead toes.',
        keyCue: 'Break their posture forward onto their tiptoes.'
      },
      {
        phase: 'Centerline Foot Pivot',
        instruction: 'Step your support foot directly between their feet, pivoting your hips 180 degrees.',
        keyCue: 'Back touches their chest; hips aligned.'
      },
      {
        phase: 'Hamstring Elevator Lift',
        instruction: 'Kick your right leg straight up between their thighs, lifting their inner thigh toward the ceiling while your upper body dips forward.',
        keyCue: 'Act like a teeter-totter: head goes down, leg goes up.'
      }
    ],
    commonMistakes: [
      { mistake: 'Kicking with the foot instead of lifting with the hamstring/groin', fix: 'Contact must be made with the upper rear thigh against their inner thigh.' },
      { mistake: 'Staying upright during the kick (opponent sprawls and takes back)', fix: 'Dip upper torso down toward your support foot.' }
    ],
    relatedTechniqueIds: ['judo-harai-goshi', 'wrest-whizzer-kick'],
    imageKey: 'wrestling',
    videoYoutubeId: 'vFvl1tdr8l4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=vFvl1tdr8l4',
    externalResourceTitle: 'Uchi Mata Step-by-Step Tutorial - Shintaro Higashi',
    drillSuggestion: 'Shadow Uchi Mata teeter-totter reps: 30 balance reps per side.'
  },
  {
    id: 'sambo-victor-roll',
    name: 'Sambo Victor Roll to Straight Kneebar',
    discipline: 'Judo / Sambo',
    category: 'Submissions / Leg Attacks',
    difficulty: 'Advanced',
    description: 'The signature submission of Combat Sambo. From a standing waistlock or over a turtled opponent, diving into an acrobatic forward somersault roll, hooking opponent far leg with both thighs, and hyperextending their knee.',
    steps: [
      {
        phase: 'Rear Waistlock / Turtle Hook',
        instruction: 'From standing rear waistlock or side turtle, secure a tight belt or hip grip on opponent far hip.',
        keyCue: 'Keep chest glued to opponent lower back.'
      },
      {
        phase: 'Somersault Forward Roll',
        instruction: 'Dive over your outside shoulder in a forward roll, threading your inside leg between their legs to trap their far knee.',
        keyCue: 'Roll strictly across your shoulders, never on top of your neck.'
      },
      {
        phase: 'Kneebar Lock & Hip Extension',
        instruction: 'Pinch both knees around opponent thigh, trap their heel in your armpit, and thrust your hips forward into the back of their knee.',
        keyCue: 'Extend hips gently; kneebars hyper-extend the cruciate ligaments quickly.'
      }
    ],
    commonMistakes: [
      { mistake: 'Landing with opponent knee cap facing sideways (turns into ineffective twist)', fix: 'Keep opponent kneecap pointing directly at your groin/chest.' },
      { mistake: 'Rolling loosely without securing far hip (opponent slips out)', fix: 'Maintain tight chest clamp throughout the inversion.' }
    ],
    relatedTechniqueIds: ['bjj-inside-heel-hook', 'bjj-straight-ankle-lock'],
    imageKey: 'bjj',
    videoYoutubeId: 'QMVavyxjlNU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=QMVavyxjlNU',
    externalResourceTitle: 'Sambo Victor Roll to Kneebar Breakdown - Stephan Kesting',
    drillSuggestion: 'Solo forward roll leg catch drill: 20 inversions on mat.'
  },
  {
    id: 'sambo-russian-tie',
    name: 'Russian 2-on-1 Tie to Outside Foot Trip',
    discipline: 'Judo / Sambo',
    category: 'Takedowns / Arm Control',
    difficulty: 'Intermediate',
    description: 'The supreme Sambo control tie. Isolating opponent wrist with one hand and clamping their upper bicep with the other, pinning their arm to your chest, walking them in a circle and tripping their outside heel.',
    steps: [
      {
        phase: 'Clear Collar Tie to 2-on-1',
        instruction: 'When opponent reaches for collar tie, pop your shoulder up, strip their wrist with your same-side hand, and wrap your other arm over their bicep.',
        keyCue: 'Clamp their wrist to your hip and their tricep to your chest.'
      },
      {
        phase: 'Shoulder Pressure & Walk',
        instruction: 'Drive your shoulder downward into their deltoid, twisting their torso and forcing their head toward the mat.',
        keyCue: 'Weight must break their posture; do not stand upright.'
      },
      {
        phase: 'Outside Foot Trip',
        instruction: 'Circle opponent to load their weight onto near leg, reaching your foot behind their heel to trip them flat onto their stomach.',
        keyCue: 'Keep 2-on-1 grip as they land to establish immediate back control.'
      }
    ],
    commonMistakes: [
      { mistake: 'Holding arm away from your chest (allows opponent to yank arm back)', fix: 'Glue their arm to your ribcage with both forearms like a locked safe.' },
      { mistake: 'Failing to drive shoulder into opponent deltoid', fix: 'Use your chest weight to torque their shoulder inward.' }
    ],
    relatedTechniqueIds: ['wrest-duck-under', 'wrest-underhook-knee-tap', 'mma-dagestani-handcuff'],
    imageKey: 'wrestling',
    videoYoutubeId: 'vFvl1tdr8l4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=vFvl1tdr8l4',
    externalResourceTitle: 'Russian 2 on 1 Tie Takedown Mastery - Cary Kolat',
    drillSuggestion: 'Russian 2-on-1 pummeling & foot sweeps: 25 reps alternating arms.'
  },
  {
    id: 'wrest-lateral-drop',
    name: 'Greco-Roman Lateral Drop / Belly-to-Belly Suplex',
    discipline: 'Judo / Sambo',
    category: 'Takedowns / Upper Body Throws',
    difficulty: 'Advanced',
    description: 'The ultimate high-amplitude Greco-Roman counter. From an over-under clinch when opponent aggressively pushes into your chest, arching your spine sideways, dropping your hips, and launching them overhead.',
    steps: [
      {
        phase: 'Over-Under Clinch Bait',
        instruction: 'Secure an overhook on one side and a deep underhook on the other. Allow opponent to drive their chest into yours with forward momentum.',
        keyCue: 'Use their own pushing forward aggression against them.'
      },
      {
        phase: 'Sideways Hip Drop & Arch',
        instruction: 'Step your lead foot between their feet, drop your bottom hip to the mat, and arch your thoracic spine diagonally sideways.',
        keyCue: 'Never arch straight back; arch sideways over your overhook shoulder.'
      },
      {
        phase: 'High Elevation Pop & Roll',
        instruction: 'Pop your hips upward like an explosive bridge, launching opponent over your chest and following through into top mount.',
        keyCue: 'Bridge through your toes and land with heavy chest-to-chest pressure.'
      }
    ],
    commonMistakes: [
      { mistake: 'Arching straight backward (opponent lands directly on top of you in mount)', fix: 'Throw sideways across your lat; hips rotate 90 degrees during the flight.' },
      { mistake: 'Initiating throw when opponent is pulling back', fix: 'Only launch when opponent is pushing heavily into your chest.' }
    ],
    relatedTechniqueIds: ['judo-harai-goshi', 'wrest-bodylock-cage', 'bjj-mount'],
    imageKey: 'wrestling',
    videoYoutubeId: 'vFvl1tdr8l4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=vFvl1tdr8l4',
    externalResourceTitle: 'How to Hit a Lateral Drop - Cary Kolat',
    drillSuggestion: 'Partner crash pad lateral drops: 15 reps on high-density foam mat.'
  },

  // ---------------- MMA CAGE WORK, STRIKING & GNP ----------------
  {
    id: 'mma-dagestani-handcuff',
    name: 'Dagestani Handcuff & Wrist Ride',
    discipline: 'MMA',
    category: 'Ground-and-Pound / Cage Control',
    difficulty: 'Intermediate',
    description: 'Khabib Nurmagomedov and Islam Makhachev\'s signature dominance. Trapping opponent wrist behind their back while mounted or in turtle, taking away their posting arm, and raining down unanswered strikes.',
    steps: [
      {
        phase: 'Tripod Half Guard Flatten',
        instruction: 'From top half guard or turtle against the cage, flatten opponent hips and reach underneath their stomach to grip their far wrist.',
        keyCue: 'Grip their wrist with four fingers wrapped tight like a bracelet.'
      },
      {
        phase: 'Pull Wrist to Lumbar Spine',
        instruction: 'Yank their trapped wrist behind their lower back (handcuff position), pinning their hand flat against their tailbone.',
        keyCue: 'Once their hand is pinned, they have zero posts to defend strikes.'
      },
      {
        phase: 'Unanswered Hammerfists & Punches',
        instruction: 'Post your weight on your hips and unleash heavy downward right hands and elbows into their jaw and temple.',
        keyCue: 'Referees will stop the fight quickly if a fighter cannot post to defend.'
      }
    ],
    commonMistakes: [
      { mistake: 'Reaching for wrist while posturing high (opponent rolls under to sweep)', fix: 'Keep chest heavy on their shoulder blades while securing the handcuff.' },
      { mistake: 'Releasing wrist grip to throw two-handed punches', fix: 'Maintain the single-hand handcuff lock at all times.' }
    ],
    relatedTechniqueIds: ['mma-gnp', 'bjj-side-control', 'sambo-russian-tie'],
    imageKey: 'hero',
    videoYoutubeId: 'EgfYvACoxdQ',
    externalResourceUrl: 'https://www.youtube.com/watch?v=EgfYvACoxdQ',
    externalResourceTitle: 'Khabib Dagestani Handcuff Breakdown & Mechanics - fightTIPS',
    drillSuggestion: 'GnP wrist control drill: 3 rounds maintaining wrist pin while throwing 30 strikes per round.'
  },
  {
    id: 'mma-cage-wall-walk',
    name: 'Octagon Wall Walk to Stand-Up',
    discipline: 'MMA',
    category: 'Cage Work / Escapes & Scrambles',
    difficulty: 'Beginner',
    description: 'The fundamental survival skill of modern MMA champions. When taken down against the fence, scooting your back flat to the cage wire, using open palms to walk up the fence while denying mat returns.',
    steps: [
      {
        phase: 'Scoot Hips to Fence',
        instruction: 'Do not stay flat on mat. Shrimp and crab-walk backward until your entire spine and buttocks are glued against the octagon wire.',
        keyCue: 'Fence wire prevents opponent from circling to take your back.'
      },
      {
        phase: 'Head Post & Open Palm Walk',
        instruction: 'Drive back of head into fence, post open palms flat on the chain-link (no finger grabbing), and plant feet on the canvas.',
        keyCue: 'Walk your feet underneath your hips one small step at a time.'
      },
      {
        phase: 'Underhook Pummel & Separation',
        instruction: 'As you reach standing, dig a deep underhook, turn to face opponent, and frame their chin to break free into the center.',
        keyCue: 'Pummel underhook before separating to avoid getting double-legged back down.'
      }
    ],
    commonMistakes: [
      { mistake: 'Curling toes or fingers through the cage mesh (illegal foul, referee deduction)', fix: 'Keep palms flat; push with open hands.' },
      { mistake: 'Trying to stand up away from the cage (opponent takes your back easily)', fix: 'Back must remain connected to fence until standing.' }
    ],
    relatedTechniqueIds: ['bjj-technical-standup', 'wrest-whizzer-kick', 'wrest-bodylock-cage'],
    imageKey: 'hero',
    videoYoutubeId: 'EgfYvACoxdQ',
    externalResourceUrl: 'https://www.youtube.com/watch?v=EgfYvACoxdQ',
    externalResourceTitle: 'How to Wall Walk in MMA - fightTIPS',
    drillSuggestion: 'Cage standup intervals: 10 reps starting seated against cage with partner riding hips.'
  },
  {
    id: 'mma-superman-punch',
    name: 'The Superman Punch off Kick Feint',
    discipline: 'MMA',
    category: 'Striking / Dynamic Transitions',
    difficulty: 'Intermediate',
    description: 'Georges St-Pierre\'s favorite entry weapon. Faking a lead leg roundhouse or teep to freeze opponent guard, kicking the leg backward in mid-air to propel an airborne straight right straight down the pipe.',
    steps: [
      {
        phase: 'Condition with Low Kicks',
        instruction: 'Throw 2 or 3 solid lead leg body kicks early in the round so opponent expects the kick.',
        keyCue: 'The feint requires opponent anticipation.'
      },
      {
        phase: 'Lift Knee & Disguise',
        instruction: 'Lift your lead knee straight up as if firing another body roundhouse kick, causing opponent to drop hands to check or catch.',
        keyCue: 'Sell the kick chamber completely.'
      },
      {
        phase: 'Backward Leg Kick & Piston Cross',
        instruction: 'Kick your lifted leg violently backward like a mule while punching straight forward with your rear cross down their centerline.',
        keyCue: 'Kicking leg back propels your torso forward like a cannon.'
      }
    ],
    commonMistakes: [
      { mistake: 'Jumping high off the ground (slow and easy to counter with a straight punch)', fix: 'Keep hop low and linear; propulsion comes from hip counter-balance.' },
      { mistake: 'Dropping lead hand while throwing the punch', fix: 'Keep lead hand up to shield face from counter hooks.' }
    ],
    relatedTechniqueIds: ['box-cross', 'mt-teep', 'mt-switch-kick'],
    imageKey: 'striking',
    videoYoutubeId: 'sK-6Ujp3KYY',
    externalResourceUrl: 'https://www.youtube.com/watch?v=sK-6Ujp3KYY',
    externalResourceTitle: 'GSP Superman Punch Breakdown - Tony Jeffries',
    drillSuggestion: 'Feint to superman punch: 30 heavy bag repetitions focusing on explosive leg snap.'
  },
  {
    id: 'mma-cage-overunder-pin',
    name: 'Cage Over-Under Pinning & Foot Stomps',
    discipline: 'MMA',
    category: 'Cage Work / Attrition & Control',
    difficulty: 'Beginner',
    description: 'The attrition strategy utilized by Kamaru Usman and Randy Couture. Pinning opponent shoulders flat against the fence with an over-under clinch, driving forehead into chin, and stomping insteps to break mobility.',
    steps: [
      {
        phase: 'Cage Slam & Forehead Pin',
        instruction: 'Drive opponent into fence. Press your forehead into the nook of their neck/jaw to pin their head back against the cage pad.',
        keyCue: 'Keep your hips low and wider than their base.'
      },
      {
        phase: 'Deep Underhook & Bicep Clamp',
        instruction: 'Lock a deep underhook on one side, clamping their opposite tricep tight to your ribs.',
        keyCue: 'Squeeze their torso; eliminate all space to throw strikes.'
      },
      {
        phase: 'Heel Stomps & Knee Taps',
        instruction: 'Drive your heel down onto their bare insteps, peppering short knees to their outer thighs to drain their leg endurance.',
        keyCue: 'Keep continuous pressure; referee will separate if inactive.'
      }
    ],
    commonMistakes: [
      { mistake: 'Standing tall and narrow (opponent circles and reverses position against cage)', fix: 'Keep a wide 60/40 athletic base with hips lower than opponent.' },
      { mistake: 'Allowing opponent to get double underhooks', fix: 'Fight aggressively for at least one deep underhook and head position.' }
    ],
    relatedTechniqueIds: ['wrest-bodylock-cage', 'mt-clinch-plum', 'mma-dagestani-handcuff'],
    imageKey: 'hero',
    videoYoutubeId: 'EgfYvACoxdQ',
    externalResourceUrl: 'https://www.youtube.com/watch?v=EgfYvACoxdQ',
    externalResourceTitle: 'Cage Control & Clinch Pressure - fightTIPS',
    drillSuggestion: 'Wall pinning isometric drill: 3 rounds x 2 min maintaining cage pin against partner resistance.'
  },
  {
    id: 'mma-gnp-posture-break',
    name: 'Guard Posture Breaking & Short Elbow Slashes',
    discipline: 'MMA',
    category: 'Ground-and-Pound / Close Range GnP',
    difficulty: 'Intermediate',
    description: 'Fighter techniques for landing devastating strikes from inside opponent guard without opening up to armbars or triangles. Pinning opponent head with forearm frames and driving short 6-inch vertical elbows into facial bones.',
    steps: [
      {
        phase: 'Heavy Chest & Crown Control',
        instruction: 'Clamp your left arm around opponent crown of head, pulling their forehead tight into your chest so they cannot see incoming strikes.',
        keyCue: 'Breaking their posture takes away all their submission setups.'
      },
      {
        phase: 'Compact 6-Inch Corridor',
        instruction: 'Do not wind up your right arm wide. Raise your elbow just 6 to 8 inches off their face, keeping forearm folded tight.',
        keyCue: 'Short strikes land with 100% bone density without giving them your arm.'
      },
      {
        phase: 'Downward Olecranon Slices',
        instruction: 'Drive point of elbow down into their eyebrow or cheekbone in a tight vertical piston, scraping across the skin.',
        keyCue: 'Rotational hip twist generates knockout power even in a 6-inch path.'
      }
    ],
    commonMistakes: [
      { mistake: 'Posturing tall and throwing wide haymaker swings (eats armbars and triangles)', fix: 'Stay tight inside opponent chest or posture completely out with wrist pins.' },
      { mistake: 'Striking without breaking opponent posture first', fix: 'Break posture first; strike second.' }
    ],
    relatedTechniqueIds: ['mma-gnp', 'mt-horizontal-elbow', 'bjj-mount'],
    imageKey: 'striking',
    videoYoutubeId: 'EgfYvACoxdQ',
    externalResourceUrl: 'https://www.youtube.com/watch?v=EgfYvACoxdQ',
    externalResourceTitle: 'Ground and Pound Elbows & Posture - fightTIPS',
    drillSuggestion: 'Heavy bag ground elbows: 3x3 min rounds practicing short 6-inch elbow strikes.'
  },
  {
    id: 'mma-jab-blast-takedown',
    name: 'Blinding Jab to Level Change Blast Takedown',
    discipline: 'MMA',
    category: 'MMA Fundamentals / Striking to Grappling',
    difficulty: 'Intermediate',
    description: 'The quintessential MMA transition. Throwing a sharp, high-volume lead jab to force opponent hands up to high guard, then changing level immediately underneath their counter hook to execute an uncontested blast shot.',
    steps: [
      {
        phase: 'The Blinding Lead Jab',
        instruction: 'Fire a crisp lead jab directly at opponent forehead or eyes to anchor their guard in a high shell.',
        keyCue: 'Punch doesn\'t need to knockout; it needs to freeze their eyes and hands.'
      },
      {
        phase: 'Immediate Level Drop',
        instruction: 'The microsecond the jab lands, bend your knees 8 inches, dropping your hips directly under their sightline.',
        keyCue: 'Do not retract jab and wait; change levels while your glove is still in their face.'
      },
      {
        phase: 'Blast Penetration Step',
        instruction: 'Explode forward with lead knee driving between their legs, wrapping both legs behind the knees and driving through their hips.',
        keyCue: 'Their hands will be up by their ears while your hands are locked behind their knees.'
      }
    ],
    commonMistakes: [
      { mistake: 'Pausing between the jab and the takedown shot (gives them time to sprawl)', fix: 'Level change must happen simultaneously with the jab retraction.' },
      { mistake: 'Looking down at the mat when shooting', fix: 'Keep eyes up and back straight to absorb potential sprawls.' }
    ],
    relatedTechniqueIds: ['box-jab', 'wrest-blast-double', 'mma-feint-overhand'],
    imageKey: 'hero',
    videoYoutubeId: 'vFvl1tdr8l4',
    externalResourceUrl: 'https://www.youtube.com/watch?v=vFvl1tdr8l4',
    externalResourceTitle: 'Boxing to Takedown Transitions in MMA - fightTIPS',
    drillSuggestion: 'Shadow combination drill: Double jab -> Immediate level change -> Double leg penetration step 40 reps.'
  },

  // ---------------- EXPANDED BJJ & SUBMISSION GRAPPLING ----------------
  {
    id: 'bjj-darce-choke',
    name: 'The D\'Arce Choke (Brabo Choke) from Front Headlock',
    discipline: 'BJJ',
    category: 'Submissions / Head & Arm Strangles',
    difficulty: 'Intermediate',
    description: 'The premier submission of modern MMA (Tony Ferguson / Khamzat Chimaev). Threading your arm through opponent armpit and across their throat, locking a bicep grip (figure-four), and sprawling flat to constrict carotid arteries.',
    steps: [
      {
        phase: 'Deep Armpit Threading',
        instruction: 'From front headlock or turtle, shoot your right arm under opponent right armpit and all the way across their neck until your hand pokes out near their far ear.',
        keyCue: 'Your arm must shoot deep: armpit to neck.'
      },
      {
        phase: 'Bicep Grip Figure-Four',
        instruction: 'Grab your own left bicep with your right hand. Place your left hand flat on their upper back or shoulder blade.',
        keyCue: 'Lock the figure-four grip tight like a rear naked choke.'
      },
      {
        phase: 'Hip Drop & Sprawl Squeeze',
        instruction: 'Drop your right hip flat to the mat, walk your legs toward opponent hips to trap their legs, and squeeze your chest forward.',
        keyCue: 'Compress their shoulder directly into their own carotid artery.'
      }
    ],
    commonMistakes: [
      { mistake: 'Attempting to lock bicep with shallow arm depth (slips off)', fix: 'Saw your arm back and forth until fingers clear the far side of their neck.' },
      { mistake: 'Staying up on knees instead of dropping your hip to the canvas', fix: 'Drop hip flat to mat to eliminate space under their chest.' }
    ],
    relatedTechniqueIds: ['bjj-anaconda-choke', 'bjj-guillotine', 'wrest-front-headlock-cow'],
    imageKey: 'bjj',
    videoYoutubeId: 'ygfnLjP6YQU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=ygfnLjP6YQU',
    externalResourceTitle: 'How to Do the D\'Arce Choke - Stephan Kesting',
    drillSuggestion: 'Sprawl to D\'Arce transitions: 20 repetitions each side locking the bicep grip.'
  },
  {
    id: 'bjj-anaconda-choke',
    name: 'The Anaconda Choke & Gator Roll',
    discipline: 'BJJ',
    category: 'Submissions / Head & Arm Strangles',
    difficulty: 'Intermediate',
    description: 'Charles Oliveira\'s lethal front headlock submission. Threading arm under opponent throat first and out their armpit, locking a figure-four grip, and performing a continuous gator roll over your shoulder to trap and strangle.',
    steps: [
      {
        phase: 'Throat-First Threading',
        instruction: 'From front headlock, thread your left arm under opponent throat and out through their left armpit (opposite of D\'Arce).',
        keyCue: 'Arm enters under the neck and exits under the armpit.'
      },
      {
        phase: 'Lock the Bicep Grip',
        instruction: 'Lock your left hand onto your right bicep. Place right hand flat behind opponent back.',
        keyCue: 'Keep elbows pinched tight together.'
      },
      {
        phase: 'The Gator Roll Finish',
        instruction: 'Tuck your head under their chest and roll over your left shoulder in a violent rotational barrel roll, trapping their legs with your own.',
        keyCue: 'Walk your hips toward opponent like an accordion as you squeeze.'
      }
    ],
    commonMistakes: [
      { mistake: 'Confusing entry arm with D\'Arce (Anaconda is neck-to-armpit; D\'Arce is armpit-to-neck)', fix: 'Remember: Anaconda wraps the throat first.' },
      { mistake: 'Rolling over opponent head instead of rolling over your own shoulder', fix: 'Drop shoulder to mat and roll sideways like an alligator.' }
    ],
    relatedTechniqueIds: ['bjj-darce-choke', 'bjj-guillotine'],
    imageKey: 'bjj',
    videoYoutubeId: 'ygfnLjP6YQU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=ygfnLjP6YQU',
    externalResourceTitle: 'The Anaconda Choke Step-by-Step - Stephan Kesting',
    drillSuggestion: 'Gator roll repetitions: 15 smooth gator rolls locking ankles around partner legs.'
  },
  {
    id: 'bjj-inside-heel-hook',
    name: 'Inside Heel Hook from 50/50 & The Saddle',
    discipline: 'BJJ',
    category: 'Leg Entanglements / Submissions',
    difficulty: 'Advanced',
    description: 'The most catastrophic submission in modern submission grappling (Gordon Ryan / Lachlan Giles). Controlling the knee line in the Saddle (411 position), cupping the inside heel with the radial bone, and rotating hips to tear the ACL.',
    steps: [
      {
        phase: 'Knee Line Control in Saddle',
        instruction: 'From the Saddle/Honey Hole position, triangle your legs over opponent far thigh, ensuring their knee joint is trapped deep below your belt line.',
        keyCue: 'He who controls the knee line controls the leg lock.'
      },
      {
        phase: 'Radial Bone Heel Bite',
        instruction: 'Cup the point of their heel with the sharp radial wrist bone of your top arm. Connect hands in a gable grip or bicep grip.',
        keyCue: 'Tuck their toes into your armpit so their foot cannot rotate.'
      },
      {
        phase: 'Hip Rotation & Bridge',
        instruction: 'Bridge your hips up into the side of their knee while rotating your upper body toward the mat. Squeeze slowly in training.',
        keyCue: 'Rotate with your entire torso, not just your arms.'
      }
    ],
    commonMistakes: [
      { mistake: 'Attempting to twist before securing the knee line (opponent easily kicks leg free)', fix: 'Pinch knees tight; their knee must be completely trapped before going for the heel.' },
      { mistake: 'Yanking violently in training (causes instant ACL/meniscus rupture)', fix: 'Apply smooth, slow rotational tension and release on tap.' }
    ],
    relatedTechniqueIds: ['bjj-outside-heel-hook', 'bjj-straight-ankle-lock', 'sambo-victor-roll'],
    imageKey: 'bjj',
    videoYoutubeId: 'QMVavyxjlNU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=QMVavyxjlNU',
    externalResourceTitle: 'Inside Heel Hook Mechanics from the Saddle - Stephan Kesting',
    drillSuggestion: 'Saddle entry flow: 15 reps entering the saddle, controlling the knee line, and biting the heel.'
  },
  {
    id: 'bjj-outside-heel-hook',
    name: 'Outside Heel Hook from Standard Ashi Garami',
    discipline: 'BJJ',
    category: 'Leg Entanglements / Submissions',
    difficulty: 'Advanced',
    description: 'The cornerstone outside rotational leg lock. From standard single-leg X (Ashi Garami), clamping opponent foot in your armpit, cupping their heel with your wrist bone, and arching backward to twist the knee joint.',
    steps: [
      {
        phase: 'Single-Leg X Clamp (Ashi Garami)',
        instruction: 'Outside foot placed on opponent far hip, inside foot curled underneath their hamstring. Clamp your knees together.',
        keyCue: 'Pinch knees tight to immobilize opponent femur.'
      },
      {
        phase: 'Armpit Foot Clamp & Heel Catch',
        instruction: 'Tuck opponent toes tight into your armpit, sliding your wrist bone underneath the outside rim of their calcaneus heel.',
        keyCue: 'Lock their foot like a vise in your armpit crease.'
      },
      {
        phase: 'Arch Backward & Torso Twist',
        instruction: 'Lock a gable grip, look over your outside shoulder, and arch your hips forward while twisting your shoulders.',
        keyCue: 'Arch with hips; twist with shoulders.'
      }
    ],
    commonMistakes: [
      { mistake: 'Letting opponent toes slip out of armpit (loses all rotational leverage)', fix: 'Clamp armpit down firmly onto their toes.' },
      { mistake: 'Twisting with arm biceps instead of engaging hip bridge', fix: 'Bridge hips forward into their knee joint.' }
    ],
    relatedTechniqueIds: ['bjj-inside-heel-hook', 'bjj-straight-ankle-lock'],
    imageKey: 'bjj',
    videoYoutubeId: 'QMVavyxjlNU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=QMVavyxjlNU',
    externalResourceTitle: 'Outside Heel Hook Mechanics & Details - Stephan Kesting',
    drillSuggestion: 'Ashi Garami entry to heel bite: 20 reps switching between straight ankle and outside heel hook.'
  },
  {
    id: 'bjj-straight-ankle-lock',
    name: 'Botinha Straight Ankle Lock & Rib Arch',
    discipline: 'BJJ',
    category: 'Leg Entanglements / Submissions',
    difficulty: 'Beginner',
    description: 'The IBJJF white-to-black belt legal leg lock. Wrapping the blade of your forearm tight under opponent Achilles tendon, turning onto your hip, and arching your ribcage backward to hyperextend the ankle joint.',
    steps: [
      {
        phase: 'Ashi Garami Foot Placement',
        instruction: 'Wrap your outside leg around opponent thigh, placing foot on their far hip. Thread inside leg under their hamstring.',
        keyCue: 'Pinch your knees tight to keep them from standing.'
      },
      {
        phase: 'Achilles Forearm Notch Bite',
        instruction: 'Slide your forearm blade under their Achilles tendon right above the heel bone. Lock your hands in a guillotine or figure-four grip.',
        keyCue: 'Slide your hand high on your chest; do not leave elbow loose.'
      },
      {
        phase: 'Hip Turn & Thoracic Arch',
        instruction: 'Turn onto your side facing their toes, tuck your shoulder to the mat, and arch your upper back and ribs backward.',
        keyCue: 'Look at the mat behind you and arch like a bow.'
      }
    ],
    commonMistakes: [
      { mistake: 'Staying flat on your back (opponent kicks through your grip easily)', fix: 'Turn completely onto your ribs on the side of the lock.' },
      { mistake: 'Wrapping forearm too high on the calf muscle', fix: 'Blade of forearm must sit directly against the tender Achilles tendon notch.' }
    ],
    relatedTechniqueIds: ['bjj-outside-heel-hook', 'bjj-inside-heel-hook'],
    imageKey: 'bjj',
    videoYoutubeId: 'QMVavyxjlNU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=QMVavyxjlNU',
    externalResourceTitle: 'How to Do a Straight Ankle Lock - Stephan Kesting',
    drillSuggestion: 'Straight ankle lock repetitions: 20 reps per side focusing on the rib arch finish.'
  },
  {
    id: 'bjj-arm-triangle',
    name: 'Arm Triangle Choke (Kata Gatame) from Mount',
    discipline: 'BJJ',
    category: 'Submissions / Head & Arm Strangles',
    difficulty: 'Intermediate',
    description: 'The heavyweight championship submission (Brock Lesnar / Islam Makhachev). Trapping opponent arm across their own neck, locking hands in a gable grip, dismounting into side control, and driving shoulder forward to restrict blood flow.',
    steps: [
      {
        phase: 'Arm Push Across Neck',
        instruction: 'From mount or side control, drive opponent far arm across their own throat using your head or forearm.',
        keyCue: 'Their own shoulder must press against one carotid artery.'
      },
      {
        phase: 'Neck Wrap & Gable Grip',
        instruction: 'Slide your choking arm deep under their neck, locking palms together in a tight gable grip or grabbing your own bicep.',
        keyCue: 'Drop your temple right next to their trapped ear.'
      },
      {
        phase: 'Dismount & Sprawl Squeeze',
        instruction: 'Step your leg off to the side, sprawling flat on your belly like an alligator. Walk your hips in a circle toward their head while driving shoulder forward.',
        keyCue: 'Sprawl flat to the canvas; drive your neck into their neck.'
      }
    ],
    commonMistakes: [
      { mistake: 'Squeezing while still mounted (often fails because angle is off by 30 degrees)', fix: 'Dismount to the side of the choke and sprawl belly-to-mat.' },
      { mistake: 'Leaving space between your head and their shoulder', fix: 'Glue your cheek to their bicep to trap their arm firmly across their neck.' }
    ],
    relatedTechniqueIds: ['bjj-mount', 'bjj-side-control', 'bjj-darce-choke'],
    imageKey: 'bjj',
    videoYoutubeId: 'ygfnLjP6YQU',
    externalResourceUrl: 'https://www.youtube.com/watch?v=ygfnLjP6YQU',
    externalResourceTitle: 'Arm Triangle Choke (Kata Gatame) Finishing Details - Stephan Kesting',
    drillSuggestion: 'Mount to Arm Triangle transition: 15 reps setting up the head-and-arm clamp.'
  },
  {
    id: 'bjj-berimbolo-back',
    name: 'The Berimbolo Inversion to Rear Back Mount',
    discipline: 'BJJ',
    category: 'Transitions / Modern Inversions',
    difficulty: 'Advanced',
    description: 'The defining revolution of modern sport Jiu-Jitsu (Miyao / Mendes brothers). From De La Riva guard, pushing opponent backward, inverting upside down on your shoulders, and spinning through their legs to take their back.',
    steps: [
      {
        phase: 'De La Riva Hook & Belt Grip',
        instruction: 'Establish deep De La Riva hook on opponent lead leg, gripping their pants/ankle with lead hand and belt/waist with rear hand.',
        keyCue: 'Kick through to off-balance them onto their butt.'
      },
      {
        phase: 'Shoulder Inversion Spin',
        instruction: 'Tuck chin to chest, invert onto your upper shoulder blades, and thread your free leg behind their far knee.',
        keyCue: 'Roll strictly across your trapezius; never pivot on neck.'
      },
      {
        phase: 'Crab Ride to Double Hooks',
        instruction: 'Spin through their legs into the crab ride position, kicking your legs through to insert both back hooks as you take seatbelt control.',
        keyCue: 'Maintain belt grip until second hook is established.'
      }
    ],
    commonMistakes: [
      { mistake: 'Rolling on top of your neck (causes severe neck compression)', fix: 'Tuck chin firmly to sternum and invert across shoulder line.' },
      { mistake: 'Releasing belt grip during inversion (opponent scrambles up)', fix: 'Keep death grip on their belt or waistband throughout the 360-degree spin.' }
    ],
    relatedTechniqueIds: ['bjj-back-take', 'bjj-granby-roll', 'bjj-rnc'],
    imageKey: 'bjj',
    videoYoutubeId: '176SLdBhj_A',
    externalResourceUrl: 'https://www.youtube.com/watch?v=176SLdBhj_A',
    externalResourceTitle: 'How to Do the Berimbolo Step-by-Step - Stephan Kesting',
    drillSuggestion: 'Solo inversion rolls: 20 reps inverted shoulder rolls across mat.'
  },
  {
    id: 'bjj-twister-lock',
    name: 'The Twister (Wrestler\'s Guillotine Spine Lock)',
    discipline: 'BJJ',
    category: 'Submissions / Spine & Neck Cranks',
    difficulty: 'Advanced',
    description: 'Eddie Bravo\'s 10th Planet signature submission. From back mount, locking the lockdown on opponent far leg, threading an underhook under their far arm, clasping hands behind their neck, and torquing the cervical spine.',
    steps: [
      {
        phase: 'Lockdown on Far Leg',
        instruction: 'From back control, wrap both your legs around opponent far leg, locking a double-grapevine lockdown to immobilize their hips.',
        keyCue: 'Lockdown prevents opponent from rotating their pelvis.'
      },
      {
        phase: 'Far Arm Underhook Thread',
        instruction: 'Thread your arm under their far armpit (duck under the arm), pulling their arm behind your neck to expose their head.',
        keyCue: 'Pin their arm behind your neck like a scarf.'
      },
      {
        phase: 'Gable Grip Cervical Rotation',
        instruction: 'Lock your hands in a gable grip behind the crown of their skull. Pull their head toward your chest while driving your hips away.',
        keyCue: 'Torque with extreme caution in training; causes tremendous rotational spinal tension.'
      }
    ],
    commonMistakes: [
      { mistake: 'Losing control of the leg lockdown (opponent turns into your guard)', fix: 'Lockdown on the leg must be 100% rigid before attacking the head.' },
      { mistake: 'Pulling head straight up instead of rotating it sideways', fix: 'The submission relies on rotational twisting of the cervical spine.' }
    ],
    relatedTechniqueIds: ['bjj-back-take', 'wrest-front-headlock-cow', 'bjj-rnc'],
    imageKey: 'bjj',
    videoYoutubeId: 'KKxD5kdOkk0',
    externalResourceUrl: 'https://www.youtube.com/watch?v=KKxD5kdOkk0',
    externalResourceTitle: 'The Twister Submission Mechanics - 10th Planet Jiu-Jitsu',
    drillSuggestion: 'Truck to Twister entry drills: 10 slow controlled entries with partner.'
  }
];

// ----------------------------------------------------
// BJJ POSITIONS EXPLORER DATA
// ----------------------------------------------------
export const BJJ_POSITIONS: BjjPosition[] = [
  {
    id: 'pos-closed-guard',
    name: 'Closed Guard',
    type: 'Neutral / Guard',
    description: 'Bottom practitioner wraps their legs completely around the opponent torso, locking ankles behind the lower back. Neutral in point scoring, but heavily offensive for bottom fighter.',
    keyConcepts: [
      'Break opponent posture using knee pulls and collar grips.',
      'Maintain active hips—do not rest flat on the mat.',
      'Keep ankles crossed high near opponent kidney line.',
      'Control wrists to deny ground-and-pound strikes.'
    ],
    offensiveOptions: [
      { name: 'Triangle Choke', type: 'Submission', description: 'Trap one arm in, one arm out; figure-four legs around head.', difficulty: 'Intermediate' },
      { name: 'Straight Armbar', type: 'Submission', description: 'Pivot 90 degrees perpendicular, clamp leg over face, extend hips.', difficulty: 'Beginner' },
      { name: 'Kimura Shoulder Lock', type: 'Submission', description: 'Figure-four grip on far wrist and rotate shoulder outward.', difficulty: 'Beginner' },
      { name: 'Scissor Sweep', type: 'Sweep', description: 'Shin across belly, scissor legs to reverse opponent onto back.', difficulty: 'Beginner' },
      { name: 'Hip Bump Sweep', type: 'Sweep', description: 'Sit up when opponent postures, drive hips into their chest to reverse.', difficulty: 'Intermediate' }
    ],
    defensiveOptions: [
      { name: 'Postural Spine Alignment', type: 'Posture', description: 'Keep hands on opponent floating ribs, look up at ceiling, do not bend neck.', difficulty: 'Beginner' },
      { name: 'Standing Guard Break', type: 'Escape', description: 'Stand up one foot at a time, push down on knee to pop ankles apart.', difficulty: 'Intermediate' },
      { name: 'Combat Base Open', type: 'Escape', description: 'Slide one knee into the tailbone and angle hips back to break lock.', difficulty: 'Beginner' }
    ],
    transitions: [
      { toPositionId: 'pos-open-guard', description: 'Open ankles to establish distance frames, spider guard, or De La Riva', direction: 'Neutral' },
      { toPositionId: 'pos-half-guard', description: 'Top player forces one leg through while passing', direction: 'Bottom' },
      { toPositionId: 'pos-mount', description: 'Bottom player executes hip bump sweep directly into full mount', direction: 'Top' }
    ],
    proTip: 'In MMA, never let the top fighter stand tall in closed guard—their downward punches carry devastating gravity assist.',
    imageKey: 'bjj'
  },
  {
    id: 'pos-open-guard',
    name: 'Open Guard (De La Riva & Butterfly)',
    type: 'Neutral / Guard',
    description: 'Bottom fighter keeps legs unlocked, using feet planted on opponent hips, biceps, or wrapped around legs (De La Riva hook) to manage distance and off-balance.',
    keyConcepts: [
      'Maintain 4 points of contact at all times (2 feet, 2 hands).',
      'Never allow top player to control both pant cuffs simultaneously.',
      'Keep your feet actively pushing and pulling like shock absorbers.',
      'Look for elevated butterfly hooks to launch overhead sweeps.'
    ],
    offensiveOptions: [
      { name: 'De La Riva Sickle Sweep', type: 'Sweep', description: 'Hook outside of lead leg, pull sleeve, kick far ankle.', difficulty: 'Intermediate' },
      { name: 'Butterfly Elevator Sweep', type: 'Sweep', description: 'Instep hook under thigh, overhook far arm, elevate directly to mount.', difficulty: 'Intermediate' },
      { name: 'Omoplata Shoulder Lock', type: 'Submission', description: 'Kick leg over shoulder, sit up, apply rotational leverage to shoulder.', difficulty: 'Advanced' },
      { name: 'Tripod Sweep', type: 'Sweep', description: 'Foot on hip, hand grips heel, push-pull to drop opponent backward.', difficulty: 'Beginner' }
    ],
    defensiveOptions: [
      { name: 'Toreando Guard Pass', type: 'Escape', description: 'Grip both knees, push legs to one side, sprint into side control.', difficulty: 'Beginner' },
      { name: 'Knee Slice Pass', type: 'Escape', description: 'Slide lead shin diagonally across thigh into underhook side control.', difficulty: 'Intermediate' }
    ],
    transitions: [
      { toPositionId: 'pos-closed-guard', description: 'Pull opponent back into closed guard when they attempt to disengage', direction: 'Neutral' },
      { toPositionId: 'pos-half-guard', description: 'Trap one leg as opponent initiates a knee slice pass', direction: 'Bottom' },
      { toPositionId: 'pos-side-control', description: 'Top player clears legs and settles into side control', direction: 'Top' }
    ],
    proTip: 'Open guard requires high hip mobility. If opponent attempts to disengage and stand, use technical stand-up immediately.',
    imageKey: 'bjj'
  },
  {
    id: 'pos-half-guard',
    name: 'Half Guard & Knee Shield',
    type: 'Neutral / Guard',
    description: 'Bottom practitioner isolates one of top opponent legs between their own legs, maintaining knee shield or underhook. The battleground for MMA ground transitions.',
    keyConcepts: [
      'Never stay flat on your back; stay on bottom hip.',
      'Battle for the underhook—whoever gets the underhook usually wins half guard.',
      'Use knee shield frame to protect your neck from crossface pressure.',
      'Keep head tucked under opponent chin.'
    ],
    offensiveOptions: [
      { name: 'Dogfight Back Take', type: 'Transition', description: 'Underhook up to knees, wrap waist, slip behind for hooks.', difficulty: 'Intermediate' },
      { name: 'Old School Sweep', type: 'Sweep', description: 'Reach behind to grab far toe, elevate and roll opponent onto back.', difficulty: 'Intermediate' },
      { name: 'Kimura from Bottom Half', type: 'Submission', description: 'Attack bent arm when top player posts hand on mat.', difficulty: 'Intermediate' },
      { name: 'Ground Strikes (Top)', type: 'Strike', description: 'Top player postures with head pin and drops short elbows.', difficulty: 'Beginner' }
    ],
    defensiveOptions: [
      { name: 'Crossface & Whizzer (Top)', type: 'Posture', description: 'Drive shoulder into bottom jaw to turn their head and flatten hips.', difficulty: 'Beginner' },
      { name: 'Whizzer Counter & Sprawl', type: 'Escape', description: 'Top player uses overhook to nullify bottom dogfight sweep.', difficulty: 'Intermediate' }
    ],
    transitions: [
      { toPositionId: 'pos-closed-guard', description: 'Shrimp hips back and slide trapped leg through into closed guard', direction: 'Bottom' },
      { toPositionId: 'pos-side-control', description: 'Top player slides trapped knee free into side control', direction: 'Top' },
      { toPositionId: 'pos-back-control', description: 'Bottom player secures dogfight underhook and climbs onto back', direction: 'Top' }
    ],
    proTip: 'MMA legends like Khabib Nurmagomedov use top half guard to triangle-lock bottom opponent legs against the cage for brutal ground-and-pound.',
    imageKey: 'bjj'
  },
  {
    id: 'pos-side-control',
    name: 'Side Control',
    type: 'Dominant Top',
    description: 'Top player is positioned perpendicular across bottom opponent chest, pinning their shoulders to the mat while controlling neck and far armpit.',
    keyConcepts: [
      'Crossface shoulder pressure controls bottom player head direction.',
      'Underhook far arm prevents bottom player from turning into turtle.',
      'Drop hips low with wide knee base or scarf-hold switch.',
      'Bottom player must frame with forearms; never push with flat hands.'
    ],
    offensiveOptions: [
      { name: 'Americana Keylock', type: 'Submission', description: 'Pin near wrist to mat, slide arm underneath elbow, rotate upward.', difficulty: 'Beginner' },
      { name: 'Kimura Shoulder Lock', type: 'Submission', description: 'Trap far arm wrist and crank behind opponent back.', difficulty: 'Intermediate' },
      { name: 'Straight Armbar from Top', type: 'Submission', description: 'Step near leg over head, isolate extended arm, fall back.', difficulty: 'Intermediate' },
      { name: 'Knee on Belly Pop', type: 'Transition', description: 'Drive near knee onto solar plexus for intense pressure and striking.', difficulty: 'Intermediate' }
    ],
    defensiveOptions: [
      { name: 'Elbow-Knee Escape (Shrimp)', type: 'Escape', description: 'Frame forearm on hip, bridge, shrimp hips out, insert bottom knee.', difficulty: 'Beginner' },
      { name: 'Underhook Turn to Turtle', type: 'Escape', description: 'Dig inside underhook, bridge into opponent, turn onto knees.', difficulty: 'Intermediate' },
      { name: 'Harpoon / Roll Sweep', type: 'Sweep', description: 'Trap opponent far arm when they reach, bridge diagonally over shoulder.', difficulty: 'Advanced' }
    ],
    transitions: [
      { toPositionId: 'pos-mount', description: 'Slide near knee smoothly across opponent stomach into full mount', direction: 'Top' },
      { toPositionId: 'pos-turtle', description: 'Bottom player turns away to belly to avoid punches', direction: 'Neutral' },
      { toPositionId: 'pos-half-guard', description: 'Bottom player sneaks knee in and captures one leg', direction: 'Bottom' }
    ],
    proTip: 'In MMA, side control is the premier position to deliver short knees to the ribs and downward elbows to the facial structure.',
    imageKey: 'bjj'
  },
  {
    id: 'pos-mount',
    name: 'Full Mount',
    type: 'Dominant Top',
    description: 'Top practitioner sits straddling the torso of the opponent. 4 points under BJJ scoring rules and the most terrifying striking platform in MMA.',
    keyConcepts: [
      'Keep knees wide or slide high under opponent armpits.',
      'Post hands in wide tripod to cushion aggressive bucking.',
      'Isolate opponent elbows away from their ribcage.',
      'Bottom player must bridge diagonally, never straight up.'
    ],
    offensiveOptions: [
      { name: 'Mounted Armbar', type: 'Submission', description: 'Slide knee high, pivot 90 degrees, swing leg over face.', difficulty: 'Intermediate' },
      { name: 'Mounted Triangle', type: 'Submission', description: 'Thread shin under neck and lock legs while mounted.', difficulty: 'Advanced' },
      { name: 'Ground-and-Pound Barrage', type: 'Strike', description: 'Post on forehead with one hand, drop heavy vertical hammerfists.', difficulty: 'Beginner' },
      { name: 'Ezekiel Choke', type: 'Submission', description: 'Sleeve/wrist wrap around neck with fist driven into windpipe.', difficulty: 'Intermediate' }
    ],
    defensiveOptions: [
      { name: 'Upa Bridge & Roll (Trap & Roll)', type: 'Escape', description: 'Trap same-side arm and foot, explosive diagonal bridge to reverse.', difficulty: 'Beginner' },
      { name: 'Elbow Escape to Half Guard', type: 'Escape', description: 'Frame on knee, flat turn to side, wiggle knee through into half guard.', difficulty: 'Beginner' },
      { name: 'Kip Escape', type: 'Escape', description: 'Slide knees straight up under opponent hips and pop legs into butterfly.', difficulty: 'Advanced' }
    ],
    transitions: [
      { toPositionId: 'pos-back-control', description: 'Opponent turns belly down to escape punches, giving up back hooks', direction: 'Top' },
      { toPositionId: 'pos-side-control', description: 'Top player steps off to side control to tighten an arm submission', direction: 'Top' },
      { toPositionId: 'pos-closed-guard', description: 'Bottom player executes successful bridge and roll into top guard', direction: 'Bottom' }
    ],
    proTip: 'High mount (knees in the armpits) completely nullifies the bottom player bridge power because your hips are above their levers.',
    imageKey: 'bjj'
  },
  {
    id: 'pos-back-control',
    name: 'Back Control (Back Mount)',
    type: 'Back Mount',
    description: 'Top practitioner attaches to the opponent back like a backpack with both heel hooks inside thighs and a seatbelt grip around chest. The highest percentage submission spot in combat history.',
    keyConcepts: [
      'Strangling arm goes over the shoulder; control arm goes under armpit.',
      'Never cross ankles across opponent abdomen (leaves open to ankle lock).',
      'Keep your chest glued to their spine at all times.',
      'Follow opponent if they roll from left to right.'
    ],
    offensiveOptions: [
      { name: 'Rear-Naked Choke (Mata Leão)', type: 'Submission', description: 'Forearm under chin, biceps grip, palm behind head, inflate chest.', difficulty: 'Beginner' },
      { name: 'Short Choke', type: 'Submission', description: 'Blade of wrist across trachea with palm-to-palm grip.', difficulty: 'Beginner' },
      { name: 'Bow & Arrow Choke (Gi)', type: 'Submission', description: 'Collar grip with far knee hook, arch back like shooting an arrow.', difficulty: 'Intermediate' },
      { name: 'Body Triangle Lock', type: 'Posture', description: 'Figure-four legs around waist to crush diaphragm and restrict breathing.', difficulty: 'Intermediate' }
    ],
    defensiveOptions: [
      { name: 'Two-on-One Hand Fight', type: 'Escape', description: 'Grab strangling wrist with both hands immediately to keep chin tucked.', difficulty: 'Beginner' },
      { name: 'Scoot Hips Off Centerline', type: 'Escape', description: 'Slide hips to the underhook side and put shoulder blades on mat.', difficulty: 'Intermediate' },
      { name: 'Turn into Guard', type: 'Escape', description: 'Clear near hook, pivot chest 180 degrees to face opponent in guard.', difficulty: 'Intermediate' }
    ],
    transitions: [
      { toPositionId: 'pos-mount', description: 'Opponent rolls to face you and you transition straight into full mount', direction: 'Top' },
      { toPositionId: 'pos-turtle', description: 'Opponent rolls belly down while defending hooks', direction: 'Neutral' },
      { toPositionId: 'pos-closed-guard', description: 'Bottom player slips shoulders to mat and recovers closed guard', direction: 'Bottom' }
    ],
    proTip: '90% of MMA fighters who secure back control with more than 2 minutes on the clock either submit the opponent or earn a referee stoppage.',
    imageKey: 'bjj'
  },
  {
    id: 'pos-turtle',
    name: 'Turtle Position',
    type: 'Inferior Bottom',
    description: 'Fighter is on hands and knees with elbows tucked into thighs and head lowered. Common defensive refuge after failed takedowns or to prevent guard passes.',
    keyConcepts: [
      'Keep elbows and knees glued together to deny hooks.',
      'Protect neck with tight chin tuck and hands guarding collar/throat.',
      'Do not remain static; explode immediately to stand up or roll.',
      'Top player looks to insert hooks or snap down into front headlock.'
    ],
    offensiveOptions: [
      { name: 'Granby Roll', type: 'Escape', description: 'Shoulder roll across the mat to invert and recover full guard.', difficulty: 'Intermediate' },
      { name: 'Peterson Roll / Sit-Through', type: 'Sweep', description: 'Trap opponent wrist, sit out, and roll them across your hips.', difficulty: 'Intermediate' },
      { name: 'Bulldog / Clock Choke (Top)', type: 'Submission', description: 'Top player grips collar or neck and walks around like hands of clock.', difficulty: 'Intermediate' },
      { name: 'Peruvian Necktie / Anaconda (Top)', type: 'Submission', description: 'Front headlock arm-in strangle rolling opponent over.', difficulty: 'Advanced' }
    ],
    defensiveOptions: [
      { name: 'Quadpod Standup (MMA)', type: 'Escape', description: 'Pop up onto four feet, back into the cage, and stand up.', difficulty: 'Beginner' },
      { name: 'Peel Far Hook', type: 'Escape', description: 'Reach back to push opponent incoming heel away before it locks.', difficulty: 'Beginner' }
    ],
    transitions: [
      { toPositionId: 'pos-back-control', description: 'Top player inserts both hooks and secures seatbelt grip', direction: 'Top' },
      { toPositionId: 'pos-side-control', description: 'Top player breaks down turtle arms to flatten opponent onto back', direction: 'Top' },
      { toPositionId: 'pos-closed-guard', description: 'Bottom player executes Granby roll or sit-through back into guard', direction: 'Bottom' }
    ],
    proTip: 'In modern MMA, turtle is heavily preferred over staying flat on your back in guard because it allows the athlete to explode directly up against the fence.',
    imageKey: 'wrestling'
  }
];

// ----------------------------------------------------
// DAILY CHALLENGES & ACHIEVEMENTS DATA
// ----------------------------------------------------
export const INITIAL_DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: 'dc-1',
    title: 'The Piston 100',
    discipline: 'Boxing',
    description: 'Throw 100 crisp lead jabs focusing on chin tuck and shoulder height.',
    targetCount: 100,
    unit: 'Jabs',
    xp: 150,
    completed: false
  },
  {
    id: 'dc-2',
    title: 'Sprawl Reflex Test',
    discipline: 'Wrestling',
    description: 'Execute 30 explosive sprawls kicking both hips completely to the floor.',
    targetCount: 30,
    unit: 'Sprawls',
    xp: 200,
    completed: false
  },
  {
    id: 'dc-3',
    title: 'Championship Round',
    discipline: 'MMA',
    description: 'Complete one 5-minute continuous round of MMA shadowboxing with striking & level changes.',
    targetCount: 5,
    unit: 'Minutes',
    xp: 250,
    completed: true
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-technique',
    title: 'First Step on the Mat',
    description: 'Learn and review your first technique in the MMA library.',
    icon: 'BookOpen',
    category: 'Technique',
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    unlockedDate: 'Oct 24, 2026'
  },
  {
    id: 'ach-first-session',
    title: 'First Sweat Logged',
    description: 'Complete and record your first training timer session.',
    icon: 'Timer',
    category: 'Training',
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    unlockedDate: 'Oct 25, 2026'
  },
  {
    id: 'ach-master-10',
    title: 'Arsenal Builder',
    description: 'Mark 10 different MMA techniques as mastered.',
    icon: 'Award',
    category: 'Mastery',
    progress: 4,
    maxProgress: 10,
    unlocked: false
  },
  {
    id: 'ach-train-10',
    title: 'Gym Regular',
    description: 'Complete 10 round timer or shadowbox sessions.',
    icon: 'Dumbbell',
    category: 'Training',
    progress: 6,
    maxProgress: 10,
    unlocked: false
  },
  {
    id: 'ach-train-50',
    title: 'Iron Veteran',
    description: 'Complete 50 training sessions in FightLab.',
    icon: 'Shield',
    category: 'Training',
    progress: 6,
    maxProgress: 50,
    unlocked: false
  },
  {
    id: 'ach-first-ai-analysis',
    title: 'AI Lab Biometrics',
    description: 'Run your first shadowboxing biomechanical scan.',
    icon: 'Cpu',
    category: 'AI Analysis',
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    unlockedDate: 'Oct 28, 2026'
  },
  {
    id: 'ach-bjj-explorer',
    title: 'Grappling Cartographer',
    description: 'Inspect all 7 core Brazilian Jiu-Jitsu positions in the explorer.',
    icon: 'Compass',
    category: 'Mastery',
    progress: 5,
    maxProgress: 7,
    unlocked: false
  },
  {
    id: 'ach-well-rounded',
    title: 'Complete Mixed Martial Artist',
    description: 'Master at least one technique in Boxing, Muay Thai, Wrestling, BJJ, and MMA.',
    icon: 'Zap',
    category: 'Technique',
    progress: 3,
    maxProgress: 5,
    unlocked: false
  }
];

// ----------------------------------------------------
// OPPONENT FIGHTER ARCHETYPES (GAME PLAN LAB)
// ----------------------------------------------------
export const OPPONENT_ARCHETYPES: OpponentArchetype[] = [
  {
    id: 'arch-wrestler',
    name: 'Collegiate Blast Wrestler',
    style: 'Wrestling',
    tagline: 'High-pressure takedown artist with relentless chain wrestling against the fence.',
    description: 'Relies on feints to shoot explosive double and single legs, driving opponents into the cage and using wrist rides and bodylocks for grinding top control.',
    primaryWeapons: ['Blast Double-Leg', 'Cage Wall Mat Return', 'Heavy Sprawl Pin', 'Wrist Control Ground-and-Pound'],
    vulnerabilities: ['Teeps to the sternum as level drops', 'High-Elbow Guillotine on entry', 'Uppercuts & flying knees', 'Gas tank fade in round 3'],
    keyAdvice: 'Keep your hips off the fence at all costs. Circle constantly and make them shoot through clean air.'
  },
  {
    id: 'arch-bjj-sub',
    name: 'BJJ Submission Specialist',
    style: 'BJJ',
    tagline: 'Dangerous guard puller, leg lock tactician, and back-take opportunist.',
    description: 'Comfortable fighting off the back, looking to drag scrambles to the floor, invert into 50/50 heel hooks, or capitalize on over-aggressive ground strikes to snatch armbars.',
    primaryWeapons: ['Kimura Trap System', 'Heel Hook / Knee Bar entries', 'Triangle Choke from Guard', 'Back Take from Half Guard Dogfight'],
    vulnerabilities: ['Heavy defensive posture in top half guard', 'Disengaging and forcing standups', 'Calf kicks on wide grappling stance', 'Short elbows inside the pocket'],
    keyAdvice: 'Do not follow them into their guard. Make the referee stand them up and punish them with low kicks.'
  },
  {
    id: 'arch-pressure-boxer',
    name: 'Aggressive Pressure Boxer',
    style: 'Boxing',
    tagline: 'Relentless forward swarm, heavy hooks in the pocket, and high punch volume.',
    description: 'Closes distance behind a double jab, cuts off the cage, and traps opponents in the phone booth to rip alternating hooks to the liver and temple.',
    primaryWeapons: ['Overhand Right', 'Lead Hook to Liver', '1-2-3 Inside Combinations', 'Forward Head Butt / Collar Tie Clashing'],
    vulnerabilities: ['Check hook on the 90-degree pivot', 'Outside calf kicks on heavy lead leg', 'Level change reactive double leg', 'Front teep push kick to sternum'],
    keyAdvice: 'Never back up in a straight line. Every time they step forward, pivot 90 degrees and make them punch empty space.'
  },
  {
    id: 'arch-muay-thai',
    name: 'Muay Thai Clinch & Kick Specialist',
    style: 'Muay Thai',
    tagline: 'Bone-shattering low kicks, devastating plum clinch knees, and razor elbows.',
    description: 'Fights tall with an upright stance, chopping down the opponent lead leg with calf kicks and pulling the neck into double collar ties to pierce the midsection with knees.',
    primaryWeapons: ['Outside Calf Kick', 'Double Collar Tie Plum Clinch', 'Horizontal Cutting Elbows', 'Switch High Kick'],
    vulnerabilities: ['Catching kicks for single leg sweeps', 'Boxing combinations through the upright guard', 'Cage wrestling pins', 'Overhands looping over low kicks'],
    keyAdvice: 'Time their calf kick with a counter cross down the pipe, and duck under the clinch collar ties into double legs.'
  },
  {
    id: 'arch-counter-sniper',
    name: 'Distance Sniper / Counter-Striker',
    style: 'Hybrid Striker / Wrestler',
    tagline: 'Wide karate-style stance, elusive footwork, and devastating pull counters.',
    description: 'Circles the outside perimeter of the octagon, luring opponents to rush in out of frustration and timing them with pinpoint rear straights or flying knees.',
    primaryWeapons: ['Pull Counter Right Hand', 'Check Left Hook', 'Spinning Back Kick', 'Lead Hand Frame Eye-Pokes'],
    vulnerabilities: ['Herding them into the cage fence', 'Inside calf kicks destroying their wide stance', 'Heavy body strikes to deplete lungs', 'Clinch pins against the wire'],
    keyAdvice: 'Do not chase. Cut off the cage with small diagonal steps and attack the body to slow down their footwork.'
  }
];

// ----------------------------------------------------
// DEFAULT GAME PLANS FOR ARCHETYPES
// ----------------------------------------------------
export const DEFAULT_GAME_PLANS: Record<string, FightGamePlan> = {
  'arch-wrestler': {
    id: 'gp-wrestler',
    archetypeId: 'arch-wrestler',
    archetypeName: 'Collegiate Blast Wrestler',
    fighterStance: 'Orthodox',
    opponentStance: 'Orthodox',
    winCondition: 'Stuffed takedowns -> Fatigue in round 2 -> TKO via counter striking against the cage in round 3.',
    distanceManagement: 'Maintain long range (kicking distance). Never linger in the mid-range pocket where level changes occur.',
    cageStrategy: 'Never let your heels touch within 3 feet of the fence. Circle immediately whenever your shoulders feel the cage.',
    roundPlans: [
      {
        round: 1,
        objective: 'Survive early explosive shots; establish reactive sprawl and teep threat.',
        strikingFocus: 'Front teeps to midsection, crisp 1-2 down the pipe. No high kicks that can be caught.',
        grapplingFocus: 'Instant sprawl with heavy hips. Cross-face hard to turn their chin away.',
        dangerAlert: 'Watch for the fake jab straight into a double-leg drive in the first 90 seconds.'
      },
      {
        round: 2,
        objective: 'Attack the gas tank; punish failed takedown attempts with front headlocks.',
        strikingFocus: 'Calf kicks as they reset from sprawls. Dig lead hook to the liver.',
        grapplingFocus: 'Threaten the High-Elbow Guillotine to force them to hesitate on their shots.',
        dangerAlert: 'Do not accept bottom guard if taken down; wall-walk immediately to your feet.'
      },
      {
        round: 3,
        objective: 'Pace push & finish: Wrestler will be dragging their feet with low hands.',
        strikingFocus: 'Fake takedown level change into overhand right. High volume 1-2-3 combinations.',
        grapplingFocus: 'Turn them around against the cage and deliver knees to the thighs.',
        dangerAlert: 'Desperation shoot in the final 60 seconds keep hips back.'
      }
    ],
    keyCombinations: [
      'Jab - Teep - Lateral Pivot',
      'Sprawl - Crossface - Spin Behind - Knee to Body',
      'Level Change Feint - Overhand Right'
    ],
    defensiveChecklist: [
      'Chin tucked, hands at eye level, knees bent 20 degrees',
      'Never cross ankles or take long retreating strides',
      'Forehead under their chin in every clinch exchange',
      'Whizzer overhook high to ceiling if they reach your hips'
    ]
  },
  'arch-pressure-boxer': {
    id: 'gp-boxer',
    archetypeId: 'arch-pressure-boxer',
    archetypeName: 'Aggressive Pressure Boxer',
    fighterStance: 'Orthodox',
    opponentStance: 'Orthodox',
    winCondition: 'Deaden lead leg with calf kicks -> Counter the rush with check hooks -> Take down in round 2 when frustrated.',
    distanceManagement: 'Keep distance long or clinch tight. Never fight in their sweet spot (the pocket / mid-range).',
    cageStrategy: 'Pivot 90 degrees around their lead foot as they swarm. Keep the fight in the center mat.',
    roundPlans: [
      {
        round: 1,
        objective: 'Calf kick destruction & lateral pivots. Refuse to stand and trade in the phone booth.',
        strikingFocus: 'Outside calf kicks on their heavy lead leg. Check lead hook as they rush.',
        grapplingFocus: 'Clinch with underhooks whenever they get past your range to stall their punch momentum.',
        dangerAlert: 'Watch out for their looping overhand right following the jab.'
      },
      {
        round: 2,
        objective: 'Change levels: Level-change takedowns when their lead leg is compromised.',
        strikingFocus: '1-2 down the center, lead foot pivot, exit 45 degrees.',
        grapplingFocus: 'Blast double-leg takedown under their wide hooks, pass into side control.',
        dangerAlert: 'Do not drop hands when exiting exchanges; keep your rear hand glued to temple.'
      },
      {
        round: 3,
        objective: 'Dominant top control and ground-and-pound stoppage or decision victory.',
        strikingFocus: 'Short elbows and hammerfists from mount/side control.',
        grapplingFocus: 'Secure the back if they roll belly down.',
        dangerAlert: 'Wild haymakers in the final 30 seconds maintain high guard.'
      }
    ],
    keyCombinations: [
      'Jab - Outside Calf Kick - Pivot 90',
      'Check Hook - Cross - Exit',
      'Slip Left - Double Leg Takedown'
    ],
    defensiveChecklist: [
      'Shoulder elevated on jab to block counter overhands',
      '90-degree lead foot pivot on every rush',
      'Underhook immediately if pushed to the cage',
      'Never back straight up into the fence'
    ]
  }
};

// ----------------------------------------------------
// TACTICAL SPARRING SIMULATION SCENARIOS
// ----------------------------------------------------
export const FIGHT_SIM_SCENARIOS: FightSimScenario[] = [
  {
    id: 'sim-1',
    round: 1,
    timeRemaining: '03:42',
    situation: 'You are in the center of the octagon. Opponent feints a heavy jab and shoots a deep penetration step double-leg takedown straight for your hips!',
    opponentAction: 'Explosive double-leg shoot with forehead aiming into your chest.',
    choices: [
      {
        text: 'Kick both legs back violently into a heavy sprawl, drive hips onto their head, and crossface.',
        outcome: 'Perfect defense! Your hips flatten their drive onto the canvas, stuffing the takedown and giving you front headlock control.',
        isOptimal: true,
        fightIqPoints: 100
      },
      {
        text: 'Stand tall and try to land a counter rear uppercut.',
        outcome: 'Risky! Your punch grazes their ear, but their momentum drives right through your hips and slams you flat onto your back.',
        isOptimal: false,
        fightIqPoints: 20
      },
      {
        text: 'Pull closed guard immediately and wrap your arms around their neck.',
        outcome: 'You end up on your back on the mat. Under MMA scoring, this gives the opponent top control and round scoring credit.',
        isOptimal: false,
        fightIqPoints: 40
      }
    ]
  },
  {
    id: 'sim-2',
    round: 2,
    timeRemaining: '02:15',
    situation: 'Opponent is charging forward into the pocket with wild alternating hooks, pushing you towards the cage fence.',
    opponentAction: 'Aggressive 3-punch forward rush with chin exposed.',
    choices: [
      {
        text: 'Anchor lead foot, pivot 90 degrees to the outside, and fire a crisp check lead hook across their chin.',
        outcome: 'Flawless counter! The opponent rushes straight into your check hook, wobbles, and you circle cleanly into the open center mat.',
        isOptimal: true,
        fightIqPoints: 100
      },
      {
        text: 'Backpedal straight backwards in a straight line with hands up.',
        outcome: 'Disaster! Your back hits the chain-link fence, trapping you as the opponent unloads heavy combinations to your body and head.',
        isOptimal: false,
        fightIqPoints: 10
      },
      {
        text: 'Drop your hands and try to duck underneath their waist.',
        outcome: 'Dangerous! You duck right into their trailing knee, suffering a cut over your eyebrow.',
        isOptimal: false,
        fightIqPoints: 15
      }
    ]
  },
  {
    id: 'sim-3',
    round: 3,
    timeRemaining: '01:10',
    situation: 'You have taken the opponent down and settled into top half guard. Opponent is attempting to dig an underhook to get to their knees.',
    opponentAction: 'Bottom fighter bridging and reaching up with an underhook for a dogfight sweep.',
    choices: [
      {
        text: 'Whizzer the underhook immediately, drive a heavy crossface with your opposite shoulder, and flatten their hips.',
        outcome: 'Total positional dominance! Your crossface turns their chin away, neutralizing their bridge and opening up short elbows.',
        isOptimal: true,
        fightIqPoints: 100
      },
      {
        text: 'Reach with both hands around their head and try to guillotine them.',
        outcome: 'Countered! Reaching gives up your base; the bottom fighter rolls you directly into bottom side control.',
        isOptimal: false,
        fightIqPoints: 25
      },
      {
        text: 'Stand up completely and walk away.',
        outcome: 'Referee allows the opponent to stand up unscathed, giving up hard-earned ground control in the final round.',
        isOptimal: false,
        fightIqPoints: 35
      }
    ]
  }
];

// ----------------------------------------------------
// OFFICIAL MMA WEIGHT CLASSES & SAFE HYDRATION PROTOCOL
// ----------------------------------------------------
export const WEIGHT_CLASSES_GUIDE = [
  { name: 'Strawweight', limitLbs: 115, limitKg: 52.2, typicalWalkWeightLbs: '125 - 130 lbs' },
  { name: 'Flyweight', limitLbs: 125, limitKg: 56.7, typicalWalkWeightLbs: '138 - 145 lbs' },
  { name: 'Bantamweight', limitLbs: 135, limitKg: 61.2, typicalWalkWeightLbs: '150 - 158 lbs' },
  { name: 'Featherweight', limitLbs: 145, limitKg: 65.8, typicalWalkWeightLbs: '162 - 170 lbs' },
  { name: 'Lightweight', limitLbs: 155, limitKg: 70.3, typicalWalkWeightLbs: '172 - 182 lbs' },
  { name: 'Welterweight', limitLbs: 170, limitKg: 77.1, typicalWalkWeightLbs: '188 - 198 lbs' },
  { name: 'Middleweight', limitLbs: 185, limitKg: 83.9, typicalWalkWeightLbs: '202 - 215 lbs' },
  { name: 'Light Heavyweight', limitLbs: 205, limitKg: 93.0, typicalWalkWeightLbs: '220 - 235 lbs' },
  { name: 'Heavyweight', limitLbs: 265, limitKg: 120.2, typicalWalkWeightLbs: '240 - 265+ lbs' }
];

export const SAFE_WATER_CUT_PROTOCOL = [
  { day: 'Day 5 (Sun)', waterIntake: '2.0 Gallons', sodium: 'Normal / High', carbs: 'Moderate (100g)', notes: 'Hyper-hydration phase starts. Flushes aldosterone hormones.' },
  { day: 'Day 4 (Mon)', waterIntake: '1.5 Gallons', sodium: 'Moderate', carbs: 'Low (60g)', notes: 'Maintain steady sweat output. Kidneys enter high excretion mode.' },
  { day: 'Day 3 (Tue)', waterIntake: '1.0 Gallon', sodium: 'Zero added sodium', carbs: 'Very low (30g)', notes: 'Cut out all processed foods, salts, and high-fiber vegetables.' },
  { day: 'Day 2 (Wed)', waterIntake: '0.5 Gallon', sodium: 'Zero sodium', carbs: 'Zero carbs', notes: 'Body continues flushing water despite restricted fluid intake.' },
  { day: 'Day 1 (Thu)', waterIntake: 'Sip only (0.25 Gal max)', sodium: 'Zero', carbs: 'Zero', notes: 'Sauna / Epsom salt hot bath sessions (20 min intervals). Check weight hourly.' },
  { day: 'Weigh-In Day (Fri)', waterIntake: 'Ice chips until scale', sodium: 'None', carbs: 'None', notes: 'Make official championship weight. Immediately start rehydration protocol after stepping off scale.' }
];

export const REHYDRATION_PROTOCOL = [
  { step: '0 - 30 Mins Post-Scale', action: 'Sip 1L Oral Rehydration Solution (ORS) with sodium, potassium, and glucose in room temperature water.' },
  { step: '30 - 90 Mins Post-Scale', action: 'Consume easily digestible carbohydrates (white rice, banana, applesauce) with lean protein (turkey, white fish).' },
  { step: '2 - 6 Hours Post-Scale', action: 'Continue drinking 500ml electrolyte fluids per hour until urine turns pale yellow. Reintroduce healthy fats.' },
  { step: 'Fight Night', action: 'Fighter should regain 8% to 12% of body mass safely with full muscular glycogen replenishment.' }
];
