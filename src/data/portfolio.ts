/* ============================================================
   PORTFOLIO DATA — Yom Somnang
   Single source of truth for every section.
   Replace `asset` paths with real scans / screenshots when ready.
   ============================================================ */

export const PROFILE = {
  name: "Yom Somnang",
  first: "YOM",
  last: "SOMNANG",
  role: "IT Student / Junior Web Developer",
  university: "Royal University of Phnom Penh",
  universityShort: "RUPP",
  faculty: "Faculty of Science",
  degree: "Bachelor of Information Technology",
  period: "2024 — Present",
  location: "Cambodia",
  city: "Phnom Penh",
  timezone: "Asia/Phnom_Penh",
  utc: "UTC+07",
  languages: ["Khmer", "English"],
  github: "somnangyom84-ctrl",
  githubUrl: "https://github.com/somnangyom84-ctrl",
  repoIndexUrl: "https://github.com/somnangyom84-ctrl?tab=repositories",
  tagline:
    "I'm an Information Technology student passionate about Web Development, Programming, Databases, Networking and Modern Technology.",
  intro: [
    "I am Yom Somnang, an Information Technology student at the Royal University of Phnom Penh, Faculty of Science. I build for the web — interfaces that stay fast on a mid-range phone, markup that reads cleanly, and data layers that do not fall over when the record count grows.",
    "My work sits between design and engineering: I care about the spacing of a label as much as the index on a query. Most of what I know came from shipping small systems end to end — an e-commerce build, two management systems, and a run of front-end sites where I owned everything from the first wireframe to the last commit.",
    "Right now I am looking for an internship or junior role where I can work inside a real codebase, take review seriously, and keep levelling up on JavaScript, React, PHP and relational databases.",
  ],
  focus: [
    "Front-end engineering",
    "CRUD & database design",
    "Responsive layout systems",
    "Network fundamentals",
    "UI craft & accessibility",
  ],
};

export const NAV_ITEMS = [
  { id: "home", label: "Home", index: "01" },
  { id: "about", label: "About", index: "02" },
  { id: "skills", label: "Skills", index: "03" },
  { id: "projects", label: "Projects", index: "04" },
  { id: "education", label: "Education", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
] as const;

export const HERO_STATS = [
  { value: 7, suffix: "", label: "Projects built" },
  { value: 20, suffix: "+", label: "Technologies" },
  { value: 4, suffix: "", label: "Skill domains" },
  { value: 2025, suffix: "", label: "Cohort year", raw: true },
];

export const TICKER = [
  "HTML5",
  "CSS3",
  "JAVASCRIPT",
  "REACT.JS",
  "BOOTSTRAP",
  "PHP",
  "JAVA",
  "C / C++",
  "C#",
  "SQL",
  "GIT & GITHUB",
  "CISCO PACKET TRACER",
  "RESPONSIVE DESIGN",
  "UI / UX",
  "CRUD SYSTEMS",
  "NETWORKING",
];

/* ---------------------------------------------------------------- SKILLS */

export type SkillIcon =
  | "markup"
  | "style"
  | "grid"
  | "script"
  | "dom"
  | "atom"
  | "device"
  | "palette"
  | "server"
  | "cup"
  | "chip"
  | "brackets"
  | "hash"
  | "database"
  | "table"
  | "sync"
  | "branch"
  | "cloud"
  | "router"
  | "network";

export type SkillGroup = {
  id: string;
  index: string;
  title: string;
  caption: string;
  accent: string;
  skills: { name: string; level: number; icon: SkillIcon }[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "frontend",
    index: "01",
    title: "Frontend",
    caption: "Interfaces, layout systems and browser behaviour",
    accent: "#02D2E3",
    skills: [
      { name: "HTML5", level: 92, icon: "markup" },
      { name: "CSS3", level: 88, icon: "style" },
      { name: "Bootstrap", level: 84, icon: "grid" },
      { name: "JavaScript", level: 82, icon: "script" },
      { name: "DOM Manipulation", level: 80, icon: "dom" },
      { name: "React.js", level: 68, icon: "atom" },
      { name: "Responsive Web Design", level: 90, icon: "device" },
      { name: "UI / UX Design", level: 72, icon: "palette" },
    ],
  },
  {
    id: "backend",
    index: "02",
    title: "Backend & Programming",
    caption: "Server logic, application code and fundamentals",
    accent: "#FFB020",
    skills: [
      { name: "PHP", level: 78, icon: "server" },
      { name: "Java", level: 74, icon: "cup" },
      { name: "C", level: 70, icon: "chip" },
      { name: "C++", level: 66, icon: "brackets" },
      { name: "C#", level: 64, icon: "hash" },
    ],
  },
  {
    id: "database",
    index: "03",
    title: "Database",
    caption: "Relational modelling, queries and record lifecycles",
    accent: "#9BE564",
    skills: [
      { name: "SQL", level: 80, icon: "database" },
      { name: "Database Management", level: 76, icon: "table" },
      { name: "CRUD Operations", level: 86, icon: "sync" },
    ],
  },
  {
    id: "tools",
    index: "04",
    title: "Tools & Networking",
    caption: "Version control, simulation and infrastructure basics",
    accent: "#3D7BFF",
    skills: [
      { name: "Git", level: 78, icon: "branch" },
      { name: "GitHub", level: 82, icon: "cloud" },
      { name: "Cisco Packet Tracer", level: 74, icon: "router" },
      { name: "Computer Networking", level: 72, icon: "network" },
    ],
  },
];

/* -------------------------------------------------------------- PROJECTS */

export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: "Web App" | "Website" | "System";
  year: string;
  role: string;
  accent: string;
  art: "shop" | "movie" | "coffee" | "petshop" | "province" | "employee" | "library";
  summary: string;
  detail: string;
  features: string[];
  tech: string[];
  metrics: { label: string; value: string }[];
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: "shop-pets",
    index: "01",
    title: "Shop-Pets",
    subtitle: "E-Commerce Web Application",
    category: "Web App",
    year: "2025",
    role: "Full build — front-end, PHP backend, database",
    accent: "#02D2E3",
    art: "shop",
    featured: true,
    summary:
      "A complete online pet store: catalogue, cart, checkout flow and an admin side for managing products, orders and stock.",
    detail:
      "Shop-Pets is the largest thing I have shipped so far. The storefront reads its catalogue from a MySQL database through PHP, renders product grids responsively, and keeps a session-based cart that survives navigation. The admin area handles the full record lifecycle for products, categories and orders, with server-side validation on every write and image uploads stored against the product record.",
    features: [
      "Product catalogue with category filtering and search",
      "Session cart with quantity updates and order summary",
      "Customer registration, login and hashed credentials",
      "Admin dashboard — create, edit, delete products and orders",
      "Image upload with server-side type and size validation",
      "Responsive Bootstrap layout tuned for mobile checkout",
    ],
    tech: ["PHP", "MySQL", "JavaScript", "Bootstrap", "CSS3", "HTML5"],
    metrics: [
      { label: "Modules", value: "06" },
      { label: "Tables", value: "08" },
      { label: "Role", value: "Solo" },
    ],
  },
  {
    id: "movie-site",
    index: "02",
    title: "Movie Website",
    subtitle: "Streaming catalogue interface",
    category: "Website",
    year: "2025",
    role: "Front-end development & UI design",
    accent: "#FF3D8B",
    art: "movie",
    summary:
      "A dark cinematic browsing experience with poster rails, a hero feature banner, genre filtering and a detail view per title.",
    detail:
      "Built to practise data-driven DOM work. Titles are held as structured JavaScript objects and every rail, card and detail panel is rendered from that data, so adding a film is a one-line change. The interface leans on horizontal scroll rails, keyboard-reachable cards and a filter bar that narrows the grid by genre without a page reload.",
    features: [
      "Data-driven rendering of poster rails and grids",
      "Hero feature banner with rotating spotlight title",
      "Genre filter chips with instant re-render",
      "Detail panel with synopsis, rating and cast list",
      "Keyboard accessible cards and focus states",
    ],
    tech: ["JavaScript", "DOM Manipulation", "CSS3", "HTML5"],
    metrics: [
      { label: "Views", value: "04" },
      { label: "Data", value: "Local" },
      { label: "Role", value: "Solo" },
    ],
  },
  {
    id: "coffee-site",
    index: "03",
    title: "Coffee Website",
    subtitle: "Brand & menu site for a café",
    category: "Website",
    year: "2024",
    role: "Design & front-end build",
    accent: "#FF6A2B",
    art: "coffee",
    summary:
      "A warm single-page café site: menu board, story section, gallery and an order enquiry form with client-side validation.",
    detail:
      "A layout-first project. The page is built as a sequence of full-bleed sections with a sticky section nav, scroll-triggered reveals and a menu board rendered from a price list array. The enquiry form validates in the browser and gives inline field-level feedback rather than a single error dump.",
    features: [
      "Menu board generated from a structured price list",
      "Sticky in-page navigation with active section state",
      "Scroll-triggered section reveals",
      "Gallery grid with lightbox preview",
      "Enquiry form with inline validation feedback",
    ],
    tech: ["HTML5", "CSS3", "Bootstrap", "JavaScript"],
    metrics: [
      { label: "Sections", value: "07" },
      { label: "Breakpoints", value: "04" },
      { label: "Role", value: "Solo" },
    ],
  },
  {
    id: "pet-shop-site",
    index: "04",
    title: "Pet Shop Website",
    subtitle: "Storefront marketing site",
    category: "Website",
    year: "2024",
    role: "Front-end development",
    accent: "#9BE564",
    art: "petshop",
    summary:
      "The front-end companion to Shop-Pets — a marketing storefront showcasing services, breeds, grooming packages and adoption listings.",
    detail:
      "Where Shop-Pets handles transactions, this site handles the pitch. Built mobile-first with a card system that reflows from four columns to one, animated counters for the stats strip, and a services comparison table that collapses into stacked cards under 768px.",
    features: [
      "Mobile-first responsive card system",
      "Service package comparison that collapses on small screens",
      "Adoption listing cards with status badges",
      "Animated statistics strip on scroll",
      "Accessible navigation with skip link",
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    metrics: [
      { label: "Pages", value: "05" },
      { label: "Cards", value: "24" },
      { label: "Role", value: "Solo" },
    ],
  },
  {
    id: "cambodia-province",
    index: "05",
    title: "Cambodia Province Website",
    subtitle: "Interactive provincial guide",
    category: "Website",
    year: "2024",
    role: "Front-end development & content structure",
    accent: "#3D7BFF",
    art: "province",
    summary:
      "An interactive guide to the provinces of Cambodia — select a province to load its profile, landmarks, culture and travel notes.",
    detail:
      "A structured content project. Each province is a record with landmarks, population, region and description; selecting one from the map panel or the index list swaps the detail view without navigation. Built to practise keeping a single source of truth for content and letting the DOM follow it.",
    features: [
      "Province selector driving a single detail view",
      "Region grouping with filter by north, central and coastal",
      "Landmark cards per province with imagery slots",
      "Search across province names and landmarks",
      "Print-friendly profile layout",
    ],
    tech: ["JavaScript", "HTML5", "CSS3", "DOM Manipulation"],
    metrics: [
      { label: "Records", value: "25" },
      { label: "Regions", value: "03" },
      { label: "Role", value: "Solo" },
    ],
  },
  {
    id: "employee-management",
    index: "06",
    title: "Employee Management System",
    subtitle: "Desktop records application",
    category: "System",
    year: "2025",
    role: "Application logic & database design",
    accent: "#FFB020",
    art: "employee",
    summary:
      "A CRUD application for staff records: departments, positions, salary bands and searchable employee profiles backed by SQL.",
    detail:
      "My first proper relational design. Normalised across employees, departments and positions with foreign keys enforcing integrity, then wrapped in an application layer that handles create, read, update and delete with confirmation on destructive actions and paginated search across name, department and position.",
    features: [
      "Normalised schema with enforced foreign keys",
      "Full CRUD with confirmation on delete",
      "Search and pagination across employee records",
      "Department and position management screens",
      "Input validation and duplicate detection",
    ],
    tech: ["Java", "SQL", "JDBC", "OOP"],
    metrics: [
      { label: "Entities", value: "03" },
      { label: "Screens", value: "06" },
      { label: "Role", value: "Solo" },
    ],
  },
  {
    id: "library-management",
    index: "07",
    title: "Library Management System",
    subtitle: "Catalogue, loans & returns",
    category: "System",
    year: "2025",
    role: "Application logic & database design",
    accent: "#C77DFF",
    art: "library",
    summary:
      "Catalogue and circulation system tracking books, members, loans and due dates, with overdue detection and availability counts.",
    detail:
      "Built around the loan lifecycle. A copy can be available, on loan or overdue, and the system moves it between those states on issue and return while writing a history row. Queries drive the dashboard: most-borrowed titles, active loans and members with outstanding returns.",
    features: [
      "Book, member and loan record management",
      "Issue and return flow with availability tracking",
      "Automatic overdue detection from due dates",
      "Dashboard queries — active loans, top titles",
      "Search by title, author, ISBN or member",
    ],
    tech: ["C#", "SQL", ".NET", "CRUD"],
    metrics: [
      { label: "Entities", value: "04" },
      { label: "Reports", value: "03" },
      { label: "Role", value: "Solo" },
    ],
  },
];

export const PROJECT_FILTERS = ["All", "Web App", "Website", "System"] as const;

/* ------------------------------------------------------------- EDUCATION */

export const EDUCATION = [
  {
    id: "rupp",
    index: "01",
    period: "2024 — Present",
    start: "2024",
    end: "NOW",
    school: "Royal University of Phnom Penh",
    short: "RUPP",
    award: "Bachelor of Information Technology",
    faculty: "Faculty of Science",
    status: "In progress",
    active: true,
    location: "Phnom Penh, Cambodia",
    note: "First-year undergraduate study covering programming fundamentals, discrete mathematics, database systems and computer networking, alongside self-directed web development work outside the syllabus.",
    courses: [
      "Programming Fundamentals",
      "Database Systems",
      "Computer Networking",
      "Web Technologies",
      "Discrete Mathematics",
      "Data Structures",
    ],
  },
  {
    id: "angtasom",
    index: "02",
    period: "2022 — 2024",
    start: "2022",
    end: "2024",
    school: "Angtasom High School",
    short: "AHS",
    award: "High School Diploma",
    faculty: "General Education — Science track",
    status: "Completed",
    active: false,
    location: "Takeo, Cambodia",
    note: "Completed the national upper-secondary programme and the Bac II examination, with the science track that pushed me toward Information Technology at university.",
    courses: ["Mathematics", "Physics", "Chemistry", "English", "Computer Basics"],
  },
];

/* --------------------------------------------------------------- CONTACT */

export const CONTACT_ROWS = [
  { label: "GitHub", value: "somnangyom84-ctrl", href: "https://github.com/somnangyom84-ctrl" },
  { label: "Location", value: "Phnom Penh, Cambodia" },
  { label: "Languages", value: "Khmer (native) · English (professional)" },
  { label: "Status", value: "Open to internship & junior roles", tone: "arc" },
  { label: "Response", value: "Usually within 24 hours" },
];

export const LANGUAGE_LEVELS = [
  { name: "Khmer", level: 100, note: "Native" },
  { name: "English", level: 74, note: "Professional working" },
];