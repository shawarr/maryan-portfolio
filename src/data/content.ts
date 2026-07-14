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
  tagline: 'I design, simulate and build machines — from CAD to chips on the shop floor.',
  location: 'AMMAN, JO', // shown as a HUD readout
  coordinates: '31.9539° N / 35.9106° E',
  /* PLACEHOLDER — contact links */
  email: 'hello@example.com',
  linkedin: 'https://linkedin.com/in/your-handle',
  github: 'https://github.com/your-handle',
  resumeUrl: '/resume.pdf', // drop a resume.pdf into /public
}

export const ABOUT = {
  /* Three narrative phases shown while the About section is pinned */
  phases: [
    {
      kicker: 'PHASE 01 / DESIGN',
      title: 'Parts begin as constraints.',
      body: 'Every project starts in CAD — sketching, constraining, and iterating until the geometry earns its tolerances. I care about the difference between a model that renders well and a part that machines well.',
    },
    {
      kicker: 'PHASE 02 / ANALYSIS',
      title: 'Then the math gets a vote.',
      body: 'FEA, thermal studies, hand calcs to sanity-check the solver. Simulation is where a pretty assembly either survives its load case or goes back to the sketch. I trust the numbers, but I verify them twice.',
    },
    {
      kicker: 'PHASE 03 / BUILD',
      title: 'Finally, it has to exist.',
      body: '3D printers, mills, lathes and a lot of deburring. Manufacturing is the honest phase — the one where datum surfaces, fits and finish stop being annotations and start being real.',
    },
  ],
  /* Spec-sheet lines that populate the HUD panel while scrolling */
  specs: [
    { k: 'DESIGNATION', v: 'B.Sc. MECHANICAL ENGINEERING' },
    { k: 'INSTITUTION', v: 'AL HUSSEIN TECHNICAL UNIVERSITY (HTU)' },
    { k: 'CLASS OF', v: '2027' }, // PLACEHOLDER
    { k: 'GPA', v: '4.0 / 4.0' },
    { k: 'FOCUS', v: 'DESIGN · FEA · MECHATRONICS' },
    { k: 'STATUS', v: 'OPEN TO INTERNSHIPS' },
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
  subtitle: string
  description: string
  /* annotation overlay shown on hover */
  annotations: { k: string; v: string }[]
  /* spec table in the expanded detail view */
  specs: { k: string; v: string }[]
  tools: string[]
  drawing: 'gear' | 'arm' | 'turbine' | 'bracket'
  accent: 'accent' | 'blueprint'
}

/* PLACEHOLDER PROJECTS — replace with real work. `drawing` picks one of the
   built-in SVG technical drawings in src/components/TechnicalDrawing.tsx;
   swap those for real renders/photos when available. */
export const PROJECTS: Project[] = [
  {
    id: 'gearbox',
    index: 'PRJ-001',
    title: 'TWO-STAGE REDUCTION GEARBOX',
    subtitle: 'Machine design coursework — 12:1 ratio',
    description:
      'Designed and manufactured a two-stage spur gearbox for a 500 W input. Sized gears against AGMA bending and contact stress, specified bearings and shaft tolerances, then machined the housing on a 3-axis mill and verified backlash with a dial indicator.',
    annotations: [
      { k: 'MATERIAL', v: 'AISI 4140 / AL 6061-T6' },
      { k: 'RATIO', v: '12.0 : 1' },
      { k: 'TOLERANCE', v: '±0.02 mm' },
    ],
    specs: [
      { k: 'INPUT', v: '500 W @ 3000 RPM' },
      { k: 'OUTPUT TORQUE', v: '18.4 N·m' },
      { k: 'GEARS', v: 'SPUR, MODULE 2.0' },
      { k: 'HOUSING', v: 'AL 6061-T6, CNC MILLED' },
      { k: 'BEARINGS', v: '6204-2RS DEEP GROOVE' },
      { k: 'VERIFICATION', v: 'BACKLASH 0.08–0.12 mm' },
    ],
    tools: ['SolidWorks', 'ANSYS', 'HAAS VF-2', 'GD&T'],
    drawing: 'gear',
    accent: 'accent',
  },
  {
    id: 'robotic-arm',
    index: 'PRJ-002',
    title: '4-DOF ROBOTIC ARM',
    subtitle: 'Mechatronics capstone — pick & place',
    description:
      'Built a 4-DOF desktop arm with 3D-printed structural links and harmonic-style cycloidal reducers. Wrote the inverse kinematics in Python, drove NEMA-17 steppers over a custom controller, and hit ±0.5 mm repeatability across the reachable envelope.',
    annotations: [
      { k: 'REACH', v: '420 mm' },
      { k: 'PAYLOAD', v: '350 g' },
      { k: 'REPEATABILITY', v: '±0.5 mm' },
    ],
    specs: [
      { k: 'ACTUATION', v: '4× NEMA-17 + CYCLOIDAL 20:1' },
      { k: 'STRUCTURE', v: 'PETG-CF, TOPOLOGY OPTIMIZED' },
      { k: 'CONTROL', v: 'PYTHON IK → GRBL-ESP32' },
      { k: 'END EFFECTOR', v: 'PARALLEL GRIPPER, 40 mm' },
      { k: 'MASS', v: '1.9 kg TOTAL' },
      { k: 'CYCLE TIME', v: '4.2 s PICK-TO-PLACE' },
    ],
    tools: ['Fusion 360', 'Python', 'FDM Printing', 'ESP32'],
    drawing: 'arm',
    accent: 'blueprint',
  },
  {
    id: 'turbine',
    index: 'PRJ-003',
    title: 'MICRO WIND TURBINE BLADE',
    subtitle: 'Fluids project — BEM optimized rotor',
    description:
      'Optimized a 600 mm rotor using blade-element momentum theory, targeting low cut-in speed for urban wind. Validated the design in CFD, printed SLA molds, and laid up glass-fiber blades that produced 41 W at 8 m/s in tunnel testing.',
    annotations: [
      { k: 'AIRFOIL', v: 'SG6043' },
      { k: 'TSR', v: '5.5 DESIGN POINT' },
      { k: 'OUTPUT', v: '41 W @ 8 m/s' },
    ],
    specs: [
      { k: 'ROTOR DIA', v: '600 mm, 3 BLADES' },
      { k: 'METHOD', v: 'BEM + CFD (k-ω SST)' },
      { k: 'LAYUP', v: 'GFRP, SLA MOLDS' },
      { k: 'CUT-IN', v: '2.8 m/s' },
      { k: 'CP MAX', v: '0.38 MEASURED' },
      { k: 'TESTING', v: 'OPEN-LOOP WIND TUNNEL' },
    ],
    tools: ['MATLAB', 'ANSYS Fluent', 'SLA Printing', 'Composites'],
    drawing: 'turbine',
    accent: 'blueprint',
  },
  {
    id: 'bracket',
    index: 'PRJ-004',
    title: 'FSAE SUSPENSION BRACKET',
    subtitle: 'Formula student — weight-critical FEA',
    description:
      'Redesigned a steel suspension pickup bracket for the university FSAE car. Topology optimization plus fatigue analysis cut mass 38% while keeping a 2.1 safety factor under worst-case cornering loads. Waterjet cut, welded, and raced.',
    annotations: [
      { k: 'MASS', v: '-38% vs BASELINE' },
      { k: 'SF', v: '2.1 FATIGUE' },
      { k: 'LOAD CASE', v: '3.5g COMBINED' },
    ],
    specs: [
      { k: 'MATERIAL', v: '4130 CHROMOLY, 3 mm' },
      { k: 'OPTIMIZATION', v: 'TOPOLOGY → MANUAL CLEANUP' },
      { k: 'ANALYSIS', v: 'STATIC + FATIGUE (GOODMAN)' },
      { k: 'PROCESS', v: 'WATERJET + TIG WELD' },
      { k: 'MASS', v: '212 g (WAS 340 g)' },
      { k: 'STATUS', v: 'ON CAR, 2 EVENTS' },
    ],
    tools: ['SolidWorks', 'ANSYS', 'Waterjet', 'TIG'],
    drawing: 'bracket',
    accent: 'accent',
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
