/* ==========================================================================
   CONTENT CONFIG — ALL PLACEHOLDER TEXT LIVES HERE.
   Swap names, links, projects and skills in this one file; the components
   only render what they find here.
   ========================================================================== */

export const IDENTITY = {
  /* PLACEHOLDER — the student's real name / tagline */
  name: 'MARYAN BAKIR',
  firstName: 'MARYAN',
  role: 'MECHANICAL ENGINEERING STUDENT',
  tagline: 'I think best with a CAD model open and a simulation running.',
  location: 'AMMAN, JO', // shown as a HUD readout
  coordinates: '31.9539° N / 35.9106° E',
  email: 'bakir.maryan@gmail.com',
  linkedin: 'https://www.linkedin.com/in/maryanbakir',
  /* PLACEHOLDER — no public GitHub link yet */
  github: 'https://github.com/your-handle',
  /* The file itself is named "Maryan Bakir - CV.pdf" in /public so it saves under that
     name even if the browser ignores the download attribute (%20 = a space in a URL).
     There is deliberately no /resume.pdf any more: it existed alongside this for a
     while and anyone reaching it downloaded a file called plain "resume". */
  resumeUrl: '/Maryan%20Bakir%20-%20CV.pdf',
  resumeFileName: 'Maryan Bakir - CV.pdf', // what it saves as on the visitor's computer
}

export const ABOUT = {
  /* Static intro shown while the About section is pinned */
  intro: {
    title: 'Meet The Engineer.',
    body: "I am a fourth-year mechanical engineering student who enjoys turning ambitious ideas into working solutions. Whether it's designing in CAD, validating through simulation, or building prototypes. I am particularly interested in robotics, aerospace engineering, product development, and bridging digital design with the physical world.",
  },
  /* Spec-sheet lines that populate the HUD panel while scrolling */
  specs: [
    { k: 'MAJOR', v: 'B.Sc. MECHANICAL ENGINEERING' },
    { k: 'UNIVERSITY', v: 'AL HUSSEIN TECHNICAL UNIVERSITY (HTU)' },
    { k: 'CLASS OF', v: '2027' }, // PLACEHOLDER
    { k: 'GPA', v: '3.97 / 4.0' },
    { k: 'INTERESTS', v: 'CAD · FEA · AEROSPACE · ROBOTICS' },
    /* An 8-month placement is a graduation requirement, not a vague
       availability. Duration and start date are what let an employer answer
       yes or no without having to write and ask. */
    { k: 'SEEKING', v: '8-MONTH APPRENTICESHIP (DEGREE REQ.)' },
    { k: 'AVAILABLE', v: 'FROM OCTOBER 2026' },
  ],
  /* Calibration gauges — value is 0–100 */
  gauges: [
    { label: 'CAD / DFM', value: 92 },
    { label: 'SIMULATION', value: 78 },
    { label: 'PROTOTYPING', value: 86 },
  ],
}

export type Experience = {
  id: string
  role: string
  org: string
  location: string
  date: string
  summary: string
  /* Lead with work done, not work observed — it is the first thing an
     employer reads and it is what they are scanning for. */
  points: string[]
  /* letter of experience, also listed under CERTIFICATES */
  file?: string
}

export const EXPERIENCE: Experience[] = [
  {
    id: 'zain-2025',
    role: 'Engineering Intern — Electromechanical',
    org: 'Zain Jordan',
    location: 'AMMAN, JO',
    date: 'JUL – AUG 2025',
    summary:
      'Zain Youth Intern program, based with the electromechanical team responsible for the critical power and cooling infrastructure behind Zain’s data centers.',
    points: [
      'Calculated power capacity of UPS and rectifier systems, along with battery capacity and battery backup time for critical power applications.',
      'Performed heating load calculations for two data center rooms in HAP, based on real measured electrical loads.',
      'Studied and applied maintenance bypass operations and redundancy principles in backup power systems.',
      'Researched and delivered presentations on electrical systems and energy calculations.',
      'Shadowed electromechanical engineers across Zain’s data centers, covering UPS systems, rectifiers, batteries, chillers, Evapco units, pumps, generators and fire protection systems.',
      'Completed a two-week training program at The Bunker, Zain’s underground data center and disaster recovery site.',
    ],
    file: '/certificates/cert-07.pdf',
  },
]

export type ProjectMedia = {
  type: 'image' | 'video' | 'model'
  src: string
  /* still frame shown before a video is played, so the slot isn't a black box */
  poster?: string
}

export type Project = {
  id: string
  index: string
  title: string
  course: string
  year: string
  description: string
  /* annotation overlay shown on hover */
  annotations: { k: string; v: string }[]
  /* spec table in the expanded detail view */
  specs: { k: string; v: string }[]
  tools: string[]
  drawing: 'gear' | 'arm' | 'turbine' | 'bracket'
  accent: 'accent' | 'blueprint'
  /* real photos/renders/clips — falls back to the placeholder TechnicalDrawing
     SVG when omitted */
  media?: ProjectMedia[]
  /* Full-detail GLB converted from the project's STEP file. The card shows a
     heavily simplified twin alongside it, named <base>-preview.glb. */
  model?: string
  /* Outward links shown as buttons in the detail view (presentation, report…).
     Must be publicly viewable — a Canva /edit link 403s for everyone else. */
  links?: { label: string; href: string }[]
}

/** Swap ".glb" for "-preview.glb" — the simplified twin used on project cards. */
export const previewSrc = (src: string) => src.replace(/\.glb$/, '-preview.glb')

export const PROJECTS: Project[] = [
  {
    id: 'octobot',
    index: 'PRJ-001',
    title: 'OCTOBOT — OCTOPUS-INSPIRED SOFT-ROBOTIC UNDERWATER ROBOT',
    course: 'Mechanical Engineering Capstone Project',
    year: '2025–2026',
    description:
      'This capstone project involved the development of "OCTOBOT," a soft underwater robot inspired by octopus biology, specifically targeted at marine cleaning and object retrieval tasks. To achieve biomimetic locomotion, the prototype utilizes a linear power-screw actuation system driven by stepper motors to propel six cast-silicone arms through synchronized power and recovery strokes, mimicking an umbrella-like swimming motion. I was responsible for the entire CAD design of the robot, executing multiple iterations and rigorous structural optimizations to refine the complex linkage mechanism, ensure proper component clearance, and accommodate the sealed electronic housings. While the project has been successfully discussed and defended, our team will continue progressing and developing this idea. Our immediate next steps involve optimizing the robot’s hydrodynamic motion in the water and integrating a camera alongside an object detection system to enhance its autonomous capabilities.',
    annotations: [
      { k: 'ARMS', v: '6 · CAST SILICONE' },
      { k: 'ACTUATION', v: 'POWER-SCREW · STEPPER' },
      { k: 'STATUS', v: 'DEFENDED · ONGOING' },
    ],
    specs: [
      { k: 'ARMS', v: '6 CAST-SILICONE ARMS' },
      { k: 'ACTUATION', v: 'LINEAR POWER-SCREW + STEPPER' },
      { k: 'MOTION', v: 'SYNCHRONIZED POWER/RECOVERY STROKE' },
      { k: 'APPLICATION', v: 'MARINE CLEANING & RETRIEVAL' },
      { k: 'STATUS', v: 'DEFENDED — IN CONTINUED DEV.' },
      { k: 'NEXT STEPS', v: 'HYDRODYNAMICS + VISION SYSTEM' },
    ],
    tools: ['CAD Design', 'Structural Optimization', 'Stepper Motors', 'Cast Silicone'],
    drawing: 'turbine',
    accent: 'accent',
    media: [
      { type: 'model', src: '/models/octobot.glb' },
      { type: 'image', src: '/projects/octobot/1.jpg' },
      { type: 'image', src: '/projects/octobot/2.jpg' },
      { type: 'image', src: '/projects/octobot/3.jpg' },
      { type: 'image', src: '/projects/octobot/4.jpg' },
      { type: 'image', src: '/projects/octobot/5.jpg' },
      { type: 'image', src: '/projects/octobot/6.jpg' },
      { type: 'video', src: '/projects/octobot/7.mp4', poster: '/projects/octobot/7-poster.jpg' },
      { type: 'video', src: '/projects/octobot/8.mp4', poster: '/projects/octobot/8-poster.jpg' },
      { type: 'video', src: '/projects/octobot/9.mp4', poster: '/projects/octobot/9-poster.jpg' },
    ],
    model: '/models/octobot.glb',
    links: [{ label: 'VIEW PRESENTATION', href: 'https://canva.link/h8dgv4nuk2qpgt5' }],
  },
  {
    id: 'coffee-vending-machine',
    index: 'PRJ-002',
    title: 'INSTANT-COFFEE VENDING MACHINE PROTOTYPE',
    course: 'Advanced Manufacturing Technology',
    year: '2025–2026',
    description:
      'This project delivered a tabletop instant-coffee vending machine that uses a volumetric metering system to dispense three different instant coffee varieties. The machine relies on a 3D-printed Archimedes-screw auger mechanism to accurately drive the powder into a shared funnel, avoiding cross-contamination and mitigating powder bridging. Focusing on advanced manufacturing, I designed the entire vending machine enclosure and structural body, integrated a ready-made design for the auger mechanism, and manufactured all the physical components using a hybrid approach of FDM 3D printing and laser cutting.',
    annotations: [
      { k: 'DISPENSE', v: 'VOLUMETRIC · 3 BLENDS' },
      { k: 'AUGER', v: 'ARCHIMEDES SCREW' },
      { k: 'BUILD', v: 'FDM + LASER CUT' },
    ],
    specs: [
      { k: 'VARIETIES', v: '3 INSTANT COFFEE BLENDS' },
      { k: 'MECHANISM', v: '3D-PRINTED ARCHIMEDES AUGER' },
      { k: 'METERING', v: 'VOLUMETRIC DISPENSE' },
      { k: 'CONTAMINATION', v: 'CROSS-CONTAM. MITIGATED' },
      { k: 'FABRICATION', v: 'FDM + LASER CUTTING' },
      { k: 'MY ROLE', v: 'ENCLOSURE DESIGN + INTEGRATION' },
    ],
    tools: ['FDM 3D Printing', 'Laser Cutting', 'Archimedes Screw', 'Volumetric Metering'],
    drawing: 'gear',
    accent: 'accent',
    media: [
      { type: 'model', src: '/models/coffee-vending-machine.glb' },
      { type: 'image', src: '/projects/coffee-vending-machine/1.jpg' },
      { type: 'image', src: '/projects/coffee-vending-machine/2.jpg' },
    ],
    model: '/models/coffee-vending-machine.glb',
  },
  {
    id: 'adaptive-grippers',
    index: 'PRJ-003',
    title: 'LIGHTWEIGHT ADAPTIVE ROBOTIC GRIPPERS',
    course: 'Digital & Additive Manufacturing',
    year: '2025–2026',
    description:
      'This project focused on the computational design and fabrication of an underactuated robotic gripper capable of conforming to irregular objects. Utilizing Design for Additive Manufacturing (DFAM) principles, the end-effector integrates compliant mechanisms, snap-fit joints, and topology-optimized structures to achieve high gripping stability with reduced mass. My role centered on digital and additive manufacturing; I optimized a ready-made CAD mechanism by redesigning the adaptive grippers into an angled configuration to increase the grippers’ conformity. Additionally, I conducted advanced topology optimization on the motor and gear cover components using both SolidWorks and nTopology to maximize structural efficiency and minimize weight prior to 3D printing and assembling the prototype.',
    annotations: [
      { k: 'DESIGN', v: 'DFAM · COMPLIANT' },
      { k: 'OPTIMIZED', v: 'TOPOLOGY — MOTOR/GEAR COVER' },
      { k: 'GOAL', v: 'GRIP STABILITY · LOW MASS' },
    ],
    specs: [
      { k: 'APPROACH', v: 'DFAM — DESIGN FOR ADD. MFG.' },
      { k: 'FEATURES', v: 'COMPLIANT MECHANISMS + SNAP-FITS' },
      { k: 'CONFIG', v: 'ANGLED UNDERACTUATED GRIP' },
      { k: 'OPTIMIZATION', v: 'TOPOLOGY — MOTOR + GEAR COVER' },
      { k: 'SOFTWARE', v: 'SOLIDWORKS + NTOPOLOGY' },
      { k: 'GOAL', v: 'HIGH GRIP · LOW MASS' },
    ],
    tools: ['SolidWorks', 'nTopology', 'Topology Optimization', 'DFAM'],
    drawing: 'arm',
    accent: 'accent',
    media: [
      { type: 'model', src: '/models/adaptive-grippers.glb' },
      { type: 'image', src: '/projects/adaptive-grippers/1.png' },
      { type: 'image', src: '/projects/adaptive-grippers/2.png' },
      { type: 'video', src: '/projects/adaptive-grippers/3.mp4', poster: '/projects/adaptive-grippers/3-poster.jpg' },
      { type: 'video', src: '/projects/adaptive-grippers/4.mp4', poster: '/projects/adaptive-grippers/4-poster.jpg' },
    ],
    model: '/models/adaptive-grippers.glb',
  },
  {
    id: 'rc-car',
    index: 'PRJ-004',
    title: 'REMOTE-CONTROLLED TOY CAR',
    course: 'Machine Design',
    year: '2025–2026',
    description:
      'This project involved the complete mechanical design and construction of a compact, rear-wheel-drive RC toy car built on a laser-cut acrylic chassis. The vehicle features a custom-designed two-stage compound spur gearbox and a servo-driven partial Ackermann steering system designed to achieve a top speed of 6 m/s. Applying core machine design principles, I was responsible for designing and fabricating the entire gearbox and determining the optimal gear ratios (achieving a 3.24:1 reduction), as well as performing all the necessary kinematic, torque, shear force, and stress calculations for the shafts and bearings prior to the physical testing phase.',
    annotations: [
      { k: 'RATIO', v: '3.24 : 1' },
      { k: 'TOP SPEED', v: '6 m/s' },
      { k: 'STEERING', v: 'PARTIAL ACKERMANN' },
    ],
    specs: [
      { k: 'DRIVE', v: 'REAR-WHEEL, COMPOUND SPUR GEARBOX' },
      { k: 'RATIO', v: '3.24 : 1 REDUCTION' },
      { k: 'STEERING', v: 'SERVO, PARTIAL ACKERMANN' },
      { k: 'TOP SPEED', v: '6 m/s' },
      { k: 'CHASSIS', v: 'LASER-CUT ACRYLIC' },
      { k: 'ANALYSIS', v: 'KINEMATIC · TORQUE · STRESS' },
    ],
    tools: ['Laser Cutting', 'Gear Train Design', 'Ackermann Steering', 'Stress Analysis'],
    drawing: 'gear',
    accent: 'accent',
    media: [
      { type: 'image', src: '/projects/rc-car/1.png' },
      { type: 'image', src: '/projects/rc-car/2.jpg' },
    ],
  },
  {
    id: 'sumo-2025',
    index: 'PRJ-005',
    title: 'HTU ANNUAL SUMO ROBOTS COMPETITION — 2025',
    course: 'HTU Sumo Robotics Competition',
    year: '2025',
    description:
      'This robot was designed to overcome heavy opponent resistance through enhanced leverage and traction. Modeled in SolidWorks, the vehicle features a custom laser-cut main frame integrated with a heavy-duty, steel front plow designed to slip under rival robots and disrupt their ground contact, as well as prevent rival robots from slipping beneath our robot. The system utilizes high-torque motors managed by an Arduino Uno and H-bridge controllers, fueled by high-amperage Li-Po batteries. This electrical setup is paired with wide, high-friction silicone wheels to maximize grip during high-torque pushing matches. Multiple IR obstacle sensors were integrated onto an elevated platform, enabling multi-directional opponent tracking and rapid tactical positioning without relying on distance measurements. I led the end-to-end mechanical CAD design, and helped develop the autonomous combat logic.',
    annotations: [
      { k: 'PLOW', v: 'STEEL FRONT PLATE' },
      { k: 'WHEELS', v: 'HIGH-FRICTION SILICONE' },
      { k: 'SENSING', v: 'MULTI-DIR IR ARRAY' },
    ],
    specs: [
      { k: 'CHASSIS', v: 'LASER-CUT MAIN FRAME' },
      { k: 'FRONT PLATE', v: 'HEAVY-DUTY STEEL PLOW' },
      { k: 'WHEELS', v: 'HIGH-FRICTION SILICONE' },
      { k: 'CONTROL', v: 'ARDUINO UNO + H-BRIDGE' },
      { k: 'SENSING', v: 'MULTI-DIRECTIONAL IR ARRAY' },
      { k: 'CAD', v: 'SOLIDWORKS' },
    ],
    tools: ['SolidWorks', 'Laser Cutting', 'IR Sensors', 'Arduino Uno'],
    drawing: 'bracket',
    accent: 'accent',
    media: [
      { type: 'model', src: '/models/sumo-2025.glb' },
      { type: 'image', src: '/projects/sumo-2025/1.png' },
      { type: 'image', src: '/projects/sumo-2025/2.jpg' },
      { type: 'video', src: '/projects/sumo-2025/3.mp4', poster: '/projects/sumo-2025/3-poster.jpg' },
    ],
    model: '/models/sumo-2025.glb',
  },
  {
    id: 'insulin-app',
    index: 'PRJ-006',
    title: 'INTELLIGENT INSULIN DOSE-ADJUSTMENT APPLICATION',
    course: 'Intro to AI',
    year: '2024–2025',
    description:
      'This software project is a course prototype exploring how Type 1 diabetes patients might adjust their insulin doses at home based on personal health metrics like blood sugar levels, weight, stress, and carbohydrate consumption. The system combines two different kinds of AI: a knowledge-based system that reasons over reported symptoms using propositional logic to reach a diagnosis, and a predictive Artificial Neural Network (ANN) that estimates the dose adjustment. Both are driven entirely by voice — speech recognition transcribes the patient, pattern-based parsing pulls the clinical values out of an ordinary spoken sentence, and the result is read back aloud. That voice-first design was deliberate: it takes into consideration older patients and patients unable to read and type easily. My primary role involved Artificial Intelligence and algorithm development; I wrote the core application code and implemented the AI components using Python libraries such as TensorFlow, Keras, SpeechRecognition and pyttsx3.',
    annotations: [
      { k: 'AI', v: 'LOGIC + NEURAL NET' },
      { k: 'INTERFACE', v: 'VOICE-DRIVEN' },
      { k: 'FOCUS', v: 'TYPE 1 DIABETES CARE' },
    ],
    specs: [
      { k: 'DIAGNOSIS', v: 'PROPOSITIONAL LOGIC KB' },
      { k: 'DOSE MODEL', v: 'ANN — 64·32·16·1' },
      { k: 'SPEECH', v: 'RECOGNITION + VALUE PARSING' },
      { k: 'INPUTS', v: 'GLUCOSE · WEIGHT · STRESS · CARBS' },
      { k: 'ACCESSIBILITY', v: 'VOICE-FIRST, LOW-LITERACY USERS' },
      { k: 'SCOPE', v: 'COURSE PROTOTYPE — NOT CLINICAL' },
      { k: 'MY ROLE', v: 'AI + APPLICATION CODE' },
    ],
    tools: ['Python', 'TensorFlow', 'Keras', 'SpeechRecognition', 'pyttsx3'],
    drawing: 'gear',
    accent: 'accent',
    media: [
      { type: 'image', src: '/projects/insulin-app/1.svg' },
      { type: 'image', src: '/projects/insulin-app/2.jpg' },
    ],
  },
  {
    id: 'airfoil-cfd',
    index: 'PRJ-007',
    title: 'VIRTUAL ENGINEERING & AERODYNAMIC SIMULATION',
    course: 'Virtual Engineering',
    year: '2024–2025',
    description:
      'This project demonstrates advanced proficiency in Computational Fluid Dynamics (CFD) through the simulation and analysis of 2D fluid flow systems using ANSYS Fluent. The project focused on aeronautical applications, featuring a comprehensive aerodynamic performance study of a NACA 4415 airfoil. The airfoil geometry was generated from raw coordinate data, and the fluid domain was meshed using targeted face sizing and boundary inflation layers. Utilizing the Realizable k-epsilon turbulence model and second-order spatial discretization for high accuracy, simulations were executed across a wide sweep of Angles of Attack (AoA) ranging from -20° to +20°. By extracting and analyzing the lift and drag coefficients, the study successfully identified -6° as the optimal AoA for generating maximum lift while minimizing drag. Overall, this project established and strengthened my capabilities in CAE software workflow, grid generation, turbulence modeling, and quantitative aerodynamic evaluation.',
    annotations: [
      { k: 'AIRFOIL', v: 'NACA 4415' },
      { k: 'OPTIMAL AoA', v: '-6°' },
      { k: 'SOLVER', v: 'ANSYS FLUENT' },
    ],
    specs: [
      { k: 'AIRFOIL', v: 'NACA 4415' },
      { k: 'SOFTWARE', v: 'ANSYS FLUENT' },
      { k: 'TURBULENCE MODEL', v: 'REALIZABLE k-ε' },
      { k: 'AoA SWEEP', v: '-20° TO +20°' },
      { k: 'OPTIMAL AoA', v: '-6° (MAX LIFT / MIN DRAG)' },
      { k: 'DISCRETIZATION', v: '2ND-ORDER SPATIAL' },
    ],
    tools: ['ANSYS Fluent', 'CFD', 'Turbulence Modeling', 'Aerodynamics'],
    drawing: 'turbine',
    accent: 'accent',
    media: [
      { type: 'image', src: '/projects/airfoil-cfd/1.jpg' },
      { type: 'image', src: '/projects/airfoil-cfd/2.jpg' },
    ],
  },
  {
    id: 'cutting-board',
    index: 'PRJ-008',
    title: 'MULTI-FUNCTIONAL CUTTING BOARD',
    course: 'Manufacturing Processes',
    year: '2024–2025',
    description:
      'This project centered on the design and fabrication of a multi-functional wooden cutting board engineered to enhance kitchen efficiency by integrating a retractable phone stand. The development process began with a market study and the use of a House of Quality (HoQ) matrix to translate customer requirements, such as water resistance, food safety, and easy access, into specific product design targets. My role encompassed the complete end-to-end development cycle: I modeled the entire assembly in SolidWorks and constructed a physical prototype using traditional manufacturing techniques, including material removal (shearing, milling, and drilling), adhesive bonding, and mechanical fastening with metal hinges. Furthermore, I developed comprehensive manufacturing flow and process charts, performed a detailed unit cost and financial analysis, and applied Design for Manufacturing (DFM) and Design for Assembly (DFA) principles to minimize part count and simplify future mass production using advanced CNC machining.',
    annotations: [
      { k: 'FEATURE', v: 'RETRACTABLE PHONE STAND' },
      { k: 'METHOD', v: 'HoQ · DFM/DFA' },
      { k: 'BUILD', v: 'SHEAR · MILL · DRILL' },
    ],
    specs: [
      { k: 'MATERIAL', v: 'WOOD' },
      { k: 'FEATURE', v: 'RETRACTABLE PHONE STAND' },
      { k: 'REQUIREMENTS', v: 'HOUSE OF QUALITY (HoQ) MATRIX' },
      { k: 'FABRICATION', v: 'SHEARING · MILLING · DRILLING' },
      { k: 'ASSEMBLY', v: 'ADHESIVE BONDING + METAL HINGES' },
      { k: 'ANALYSIS', v: 'DFM/DFA + UNIT COST' },
    ],
    tools: ['SolidWorks', 'DFM/DFA', 'CNC Machining', 'House of Quality'],
    drawing: 'bracket',
    accent: 'accent',
    media: [
      { type: 'model', src: '/models/cutting-board.glb' },
      { type: 'image', src: '/projects/cutting-board/1.png' },
      { type: 'image', src: '/projects/cutting-board/2.jpg' },
      { type: 'image', src: '/projects/cutting-board/3.jpg' },
      { type: 'image', src: '/projects/cutting-board/4.jpg' },
      { type: 'image', src: '/projects/cutting-board/5.jpg' },
      { type: 'image', src: '/projects/cutting-board/6.jpg' },
    ],
    model: '/models/cutting-board.glb',
  },
  {
    id: 'sumo-2024',
    index: 'PRJ-009',
    title: 'HTU ANNUAL SUMO ROBOTS COMPETITION — 2024',
    course: 'HTU Sumo Robotics Competition',
    year: '2024',
    description:
      'Designed and built for the HTU Sumo Robotics Contest 2024, this autonomous combat robot was engineered to detect, engage, and push opponent robots out of the ring. Built around a folded aluminum sheet-metal box chassis, the robot maintains high structural rigidity and a low center of gravity for higher pushing stability. It features a four-wheel direct motor drive system seamlessly controlled by an Arduino Uno and H-bridge motor drivers, drawing power from high-amperage Li-Po batteries. A low-clearance front aluminum razor wedge is designed to provide the robot with leverage by getting beneath opponent chassis and break their traction. The vehicle integrates three forward-facing IR obstacle sensors for opponent detection, triggering immediate autonomous engagement the moment a target is spotted. My role spanned the complete mechanical design, sheet metal fabrication and box assembly, and developing the autonomous motion logic to deliver a clear competitive edge in combat maneuvers.',
    annotations: [
      { k: 'CHASSIS', v: 'SHEET-METAL BOX' },
      { k: 'WEAPON', v: 'RAZOR WEDGE' },
      { k: 'SENSING', v: '3× IR — AUTO ENGAGE' },
    ],
    specs: [
      { k: 'CHASSIS', v: 'FOLDED ALUMINUM SHEET METAL' },
      { k: 'DRIVE', v: '4-WHEEL DIRECT DRIVE' },
      { k: 'CONTROL', v: 'ARDUINO UNO + H-BRIDGE' },
      { k: 'SENSING', v: '3× FORWARD IR SENSORS' },
      { k: 'WEAPON', v: 'LOW-CLEARANCE RAZOR WEDGE' },
      { k: 'POWER', v: 'HIGH-AMP Li-Po' },
    ],
    tools: ['Arduino Uno', 'Sheet Metal Fab', 'IR Sensors', 'H-Bridge Drivers'],
    drawing: 'bracket',
    accent: 'accent',
    media: [
      { type: 'model', src: '/models/sumo-2024.glb' },
      { type: 'image', src: '/projects/sumo-2024/1.png' },
      { type: 'image', src: '/projects/sumo-2024/2.png' },
      { type: 'image', src: '/projects/sumo-2024/3.jpg' },
    ],
    model: '/models/sumo-2024.glb',
  },
  {
    id: 'jansen-linkage',
    index: 'PRJ-010',
    title: 'JANSEN LINKAGE PLANAR MECHANISM',
    course: 'Mechanical Principles',
    year: '2023–2024',
    description:
      'Inspired by Theo Jansen’s strandbeest, this project focused on designing a complex planar mechanism capable of generating a smooth walking motion using a single rotary motor input. The design utilizes an intricate eight-bar linkage system to create a spider-like robot intended to carry a camera and flashlight for navigating and inspecting tight spaces. For this project, my responsibilities centered on mechanical principles; I designed the full product and optimized the crank slider linkage and leg dimensions to ensure a smooth, non-uniform circular walking motion before translating the concept into a physical prototype using laser cutting technology.',
    annotations: [
      { k: 'LINKAGE', v: '8-BAR · SINGLE INPUT' },
      { k: 'MOTION', v: 'STRANDBEEST WALK' },
      { k: 'BUILD', v: 'LASER-CUT PROTOTYPE' },
    ],
    specs: [
      { k: 'MECHANISM', v: 'EIGHT-BAR LINKAGE' },
      { k: 'INPUT', v: 'SINGLE ROTARY MOTOR' },
      { k: 'MOTION', v: 'NON-UNIFORM CIRCULAR WALK' },
      { k: 'PAYLOAD', v: 'CAMERA + FLASHLIGHT' },
      { k: 'FABRICATION', v: 'LASER-CUT PROTOTYPE' },
      { k: 'MY ROLE', v: 'LINKAGE + LEG OPTIMIZATION' },
    ],
    tools: ['Eight-Bar Linkage', 'Laser Cutting', 'Kinematic Design', 'Mechanism Optimization'],
    drawing: 'arm',
    accent: 'accent',
    media: [
      { type: 'image', src: '/projects/jansen-linkage/1.jpg' },
      { type: 'image', src: '/projects/jansen-linkage/2.png' },
      { type: 'image', src: '/projects/jansen-linkage/3.jpg' },
      { type: 'video', src: '/projects/jansen-linkage/4.mp4', poster: '/projects/jansen-linkage/4-poster.jpg' },
    ],
  },
  {
    id: 'el-huevo',
    index: 'PRJ-011',
    title: 'EL HUEVO: AIR-FRYER INSPIRED EGG COOKER',
    course: 'Engineering Design',
    year: '2022–2023',
    description:
      'This project involved the development of an innovative, automated egg boiler that cooks eggs using a heating plate and a fan for heat distribution, functioning similarly to an air fryer and completely eliminating the need for water. The device features a compact, multi-layered structural design containing electrical components such as an Arduino Uno, a 12V adapter, and a relay, prioritizing user safety and energy conversion. My role focused heavily on engineering design; I contributed to selecting the product specifications and defining its core purpose, designed the final physical product, and developed the software code required to control the cooker via a mobile application using Bluetooth.',
    annotations: [
      { k: 'METHOD', v: 'DRY HEAT · NO WATER' },
      { k: 'CONTROL', v: 'ARDUINO + BLUETOOTH' },
      { k: 'ROLE', v: 'DESIGN + SOFTWARE' },
    ],
    specs: [
      { k: 'HEATING', v: 'RESISTIVE PLATE + FAN' },
      { k: 'CONTROL', v: 'ARDUINO UNO + RELAY' },
      { k: 'POWER', v: '12V ADAPTER' },
      { k: 'INTERFACE', v: 'BLUETOOTH MOBILE APP' },
      { k: 'WATER USE', v: 'NONE — DRY COOKING' },
      { k: 'MY ROLE', v: 'PRODUCT DESIGN + FIRMWARE' },
    ],
    tools: ['Arduino Uno', 'Bluetooth App', 'Relay Control', 'Product Design'],
    drawing: 'bracket',
    accent: 'accent',
    media: [
      { type: 'image', src: '/projects/el-huevo/1.png' },
      { type: 'image', src: '/projects/el-huevo/2.png' },
      { type: 'video', src: '/projects/el-huevo/3.mp4', poster: '/projects/el-huevo/3-poster.jpg' },
    ],
  },
]

/* Real skills pulled from the CV (soft skills — attention to detail, comms,
   etc. — intentionally left out), plus workshop/fabrication skills added on
   top. No proficiency numbers: each tile flips to reveal its category
   instead of claiming a self-assessed score. */
export const SKILLS = [
  { id: 'sw', name: 'SolidWorks', cat: 'CAD' },
  { id: 'autocad', name: 'AutoCAD', cat: 'CAD' },
  { id: 'ntop', name: 'nTopology', cat: 'TOPOLOGY OPTIMIZATION' },
  { id: 'reverse-eng', name: 'Reverse Engineering', cat: 'DESIGN' },

  { id: 'ansys', name: 'ANSYS', cat: 'FEA / CFD' },
  { id: 'abaqus', name: 'Abaqus', cat: 'FEA' },
  { id: 'matlab', name: 'MATLAB', cat: 'ANALYSIS' },
  { id: 'mathematica', name: 'Wolfram Mathematica', cat: 'ANALYSIS' },
  { id: 'ees', name: 'Engineering Equation Solver', cat: 'THERMO ANALYSIS' },
  { id: 'multisim', name: 'Multisim', cat: 'CIRCUIT SIMULATION' },
  { id: 'hap', name: 'HAP', cat: 'HVAC LOAD ANALYSIS' },
  { id: 'loggerpro', name: 'LoggerPro', cat: 'DATA ACQUISITION' },

  { id: 'arduino', name: 'Arduino IDE', cat: 'EMBEDDED' },
  { id: 'c', name: 'C Programming', cat: 'PROGRAMMING' },
  { id: 'python', name: 'Python', cat: 'SCRIPTING' },
  { id: 'msproject', name: 'Microsoft Project', cat: 'PROJECT MANAGEMENT' },

  { id: 'cnc', name: 'CNC Machining', cat: 'MANUFACTURING' },
  { id: 'laser', name: 'Laser Cutting', cat: 'FABRICATION' },
  { id: 'gdt', name: 'GD&T', cat: 'ASME Y14.5' },
  { id: 'tig', name: 'TIG Welding', cat: 'WELDING (AWS)' },
  { id: 'mig', name: 'MIG Welding', cat: 'WELDING (AWS)' },

  { id: 'cura', name: 'Ultimaker Cura', cat: 'SLICING SOFTWARE' },
  { id: 'fdm', name: 'FDM Printing', cat: '3D PRINTING' },
  { id: 'sla', name: 'SLA Printing', cat: '3D PRINTING' },
]

export type Certificate = {
  id: string
  title: string
  org: string
  date: string
  note: string
  file: string
  preview: string
}

export const CERTIFICATES: Certificate[] = [
  {
    id: 'control-systems',
    title: 'Control Systems',
    org: 'HTUx — Al Hussein Technical University Online Academy',
    date: 'JAN 2026',
    note: 'Module of the Mobile RobotiX pathway, covering control systems and PID controllers.',
    file: '/certificates/cert-01.pdf',
    preview: '/certificates/preview-01.jpg',
  },
  {
    id: 'zain-internship',
    title: 'Letter of Experience — Engineering Intern',
    org: 'Zain Jordan',
    date: 'JUL–AUG 2025',
    note: 'Engineering internship in the electromechanical department, Zain Youth Intern program.',
    file: '/certificates/cert-07.pdf',
    preview: '/certificates/preview-07.jpg',
  },
  {
    id: 'solidworks-additive',
    title: 'SOLIDWORKS Additive Manufacturing Associate',
    org: 'Dassault Systèmes',
    date: 'NOV 2024',
    note: 'Official certification in additive manufacturing design, credential C-FCVZJQR37L.',
    file: '/certificates/cert-04.pdf',
    preview: '/certificates/preview-04.jpg',
  },
  {
    id: 'solidworks-cad',
    title: 'SOLIDWORKS CAD Design Associate',
    org: 'Dassault Systèmes',
    date: 'NOV 2024',
    note: 'Official CSWA-level certification, credential C-JQTNDV6R8P.',
    file: '/certificates/cert-03.pdf',
    preview: '/certificates/preview-03.jpg',
  },
  {
    id: 'sumo-robots',
    title: 'SUMO Robots',
    org: 'HTUx — Al Hussein Technical University Online Academy',
    date: 'JUL 2024',
    note: 'Course on the design and control of autonomous SUMO combat robots.',
    file: '/certificates/cert-02.pdf',
    preview: '/certificates/preview-02.jpg',
  },
  {
    id: 'egg-boiler-creativity',
    title: 'Certificate of Appreciation — Creativity Award',
    org: 'Al Hussein Technical University, Mechanical Dept.',
    date: 'JUN 2023',
    note: 'Awarded for building "El Huevo," an automated egg boiler, in the Creativity category.',
    file: '/certificates/cert-06.pdf',
    preview: '/certificates/preview-06.jpg',
  },
  {
    id: 'ap-scholar',
    title: 'AP Scholar with Distinction',
    org: 'College Board',
    date: 'JUL 2022',
    note: 'Awarded for an average score of 3.5+ across 5 AP exams, with 3 or higher on each.',
    file: '/certificates/cert-05.pdf',
    preview: '/certificates/preview-05.jpg',
  },
]

export const NAV = [
  { id: 'about', label: 'ABOUT', num: '01' },
  { id: 'experience', label: 'EXPERIENCE', num: '02' },
  { id: 'projects', label: 'PROJECTS', num: '03' },
  { id: 'skills', label: 'TOOLING', num: '04' },
  { id: 'contact', label: 'CONTACT', num: '05' },
]
