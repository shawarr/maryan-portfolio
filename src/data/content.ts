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
  /* PLACEHOLDER — contact links */
  email: 'hello@example.com',
  linkedin: 'https://linkedin.com/in/your-handle',
  github: 'https://github.com/your-handle',
  resumeUrl: '/resume.pdf', // drop a resume.pdf into /public
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
    { k: 'STATUS', v: 'OPEN TO APPRENTICESHIPS' },
  ],
  /* Calibration gauges — value is 0–100 */
  gauges: [
    { label: 'CAD / DFM', value: 92 },
    { label: 'SIMULATION', value: 78 },
    { label: 'PROTOTYPING', value: 86 },
  ],
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
  /* real photo/render — drop a path in /public and set this to swap out
     the placeholder TechnicalDrawing SVG for the actual project image */
  image?: string
}

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
  },
  {
    id: 'el-huevo',
    index: 'PRJ-002',
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
    accent: 'blueprint',
  },
  {
    id: 'jansen-linkage',
    index: 'PRJ-003',
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
  },
  {
    id: 'insulin-app',
    index: 'PRJ-004',
    title: 'INTELLIGENT INSULIN DOSE-ADJUSTMENT APPLICATION',
    course: 'Intro to AI',
    year: '2024–2025',
    description:
      'This software project centered on creating an automated application to help Type 1 diabetes patients safely adjust their insulin doses at home based on personal health metrics like blood sugar levels, weight, stress, and carbohydrate consumption. The system integrates a predictive Artificial Neural Network (ANN) to calculate the precise dosage, a knowledge-based system for diagnosis, and a Natural Language Processing (NLP) model to process spoken inputs. This takes into consideration older patients and patients unable to read and type easily. My primary role involved Artificial Intelligence and algorithm development; I wrote the core application code and successfully implemented AI algorithms using Python libraries, such as TensorFlow, Keras, and pyttsx3, to drive the application’s intelligence and speech recognition capabilities.',
    annotations: [
      { k: 'AI', v: 'ANN · NLP' },
      { k: 'STACK', v: 'PYTHON · TENSORFLOW' },
      { k: 'FOCUS', v: 'TYPE 1 DIABETES CARE' },
    ],
    specs: [
      { k: 'AI MODEL', v: 'PREDICTIVE ANN' },
      { k: 'NLP', v: 'SPEECH INPUT PARSING' },
      { k: 'INPUTS', v: 'GLUCOSE · WEIGHT · STRESS · CARBS' },
      { k: 'ACCESSIBILITY', v: 'VOICE-FIRST, LOW-LITERACY USERS' },
      { k: 'STACK', v: 'PYTHON · TENSORFLOW · KERAS' },
      { k: 'MY ROLE', v: 'AI + APPLICATION CODE' },
    ],
    tools: ['Python', 'TensorFlow', 'Keras', 'pyttsx3'],
    drawing: 'gear',
    accent: 'blueprint',
  },
  {
    id: 'coffee-vending-machine',
    index: 'PRJ-005',
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
  },
  {
    id: 'adaptive-grippers',
    index: 'PRJ-006',
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
    accent: 'blueprint',
  },
  {
    id: 'rc-car',
    index: 'PRJ-007',
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
  },
  {
    id: 'airfoil-cfd',
    index: 'PRJ-008',
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
    accent: 'blueprint',
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
  },
  {
    id: 'sumo-2025',
    index: 'PRJ-010',
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
    accent: 'blueprint',
  },
]

/* PLACEHOLDER SKILLS — id is just for keys, level is 0–100 */
export const SKILLS = [
  { id: 'sw', name: 'SolidWorks', cat: 'CAD', level: 95 },
  { id: 'f360', name: 'Fusion 360', cat: 'CAD / CAM', level: 88 },
  { id: 'ansys', name: 'ANSYS', cat: 'FEA / CFD', level: 78 },
  { id: 'matlab', name: 'MATLAB', cat: 'ANALYSIS', level: 84 },
  { id: 'python', name: 'Python', cat: 'SCRIPTING', level: 80 },
  { id: 'simulink', name: 'Simulink', cat: 'CONTROLS', level: 70 },
  { id: 'gdt', name: 'GD&T', cat: 'ASME Y14.5', level: 86 },
  { id: 'cnc', name: 'CNC Machining', cat: 'MFG', level: 75 },
  { id: 'print', name: '3D Printing', cat: 'FDM / SLA', level: 92 },
  { id: 'weld', name: 'TIG Welding', cat: 'FAB', level: 62 },
]

export const NAV = [
  { id: 'about', label: 'ABOUT', num: '01' },
  { id: 'projects', label: 'PROJECTS', num: '02' },
  { id: 'skills', label: 'TOOLING', num: '03' },
  { id: 'contact', label: 'CONTACT', num: '04' },
]
