export type Service = {
  slug: string;
  title: string;
  summary: string;
  deliverables: string[];
};

export type Project = {
  slug: string;
  title: string;
  clientType: string;
  industry: string;
  stack: string[];
  summary: string;
  caseStudySlug?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  duration: string;
  challenge: string;
  approach: string;
  results: string[];
  stack: string[];
};

export const services: Service[] = [
  {
    slug: "product-engineering",
    title: "Product engineering",
    summary:
      "Full-stack web applications with React, Next.js, and TypeScript—built for performance, accessibility, and long-term maintainability.",
    deliverables: [
      "Technical discovery & roadmap",
      "UI implementation & design systems",
      "API integration & state architecture",
      "Production deployment & handoff docs",
    ],
  },
  {
    slug: "backend-apis",
    title: "Backend & APIs",
    summary:
      "Secure, scalable services and integrations that connect your product to payments, CRM, analytics, and internal systems.",
    deliverables: [
      "REST / GraphQL API design",
      "Authentication & authorization",
      "Third-party integrations",
      "Database modeling & migrations",
    ],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    summary:
      "Infrastructure and delivery pipelines on AWS, GCP, or Cloudflare—so releases stay predictable as your team grows.",
    deliverables: [
      "CI/CD pipelines",
      "Environment strategy (staging / prod)",
      "Observability & alerting",
      "Cost and security reviews",
    ],
  },
  {
    slug: "modernization",
    title: "Modernization & MVPs",
    summary:
      "From legacy refactors to founder-friendly MVPs with clear milestones, demos every sprint, and scope you can defend internally.",
    deliverables: [
      "Architecture assessment",
      "Incremental migration plans",
      "MVP scope & timeline",
      "Post-launch support options",
    ],
  },
  {
    slug: "dedicated-teams",
    title: "Dedicated squads",
    summary:
      "Embedded engineers aligned to US hours for standups, sprint planning, and stakeholder reviews your organization expects.",
    deliverables: [
      "Senior tech lead",
      "Full-stack engineers",
      "Weekly written status",
      "Flexible scale-up / scale-down",
    ],
  },
  {
    slug: "quality-security",
    title: "Quality & security",
    summary:
      "Testing, code review, and security-minded practices suited to enterprise procurement and compliance conversations.",
    deliverables: [
      "Automated test suites",
      "Peer review on every PR",
      "Dependency & vulnerability monitoring",
      "Documentation for audits",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "contractorsbook-platform",
    title: "ContractorsBook-style job hub",
    clientType: "Regional general contractor",
    industry: "Construction",
    stack: [".NET 10", "MS SQL Server", "Next.js", "React Native"],
    summary:
      "End-to-end project management for subs and field crews—estimates, change orders, daily logs, and job costing in one place, inspired by platforms like ContractorsBook.",
    caseStudySlug: "contractorsbook-platform",
  },
  {
    slug: "commercial-precon-suite",
    title: "Commercial preconstruction suite",
    clientType: "Commercial GC",
    industry: "Construction",
    stack: ["Next.js", "TypeScript", "Prisma", "Cloudflare"],
    summary:
      "Bid leveling, subcontractor compliance packets, and master schedule handoff from precon to active jobs—replacing shared drives and email threads.",
    caseStudySlug: "commercial-precon-suite",
  },
  {
    slug: "midmarket-distribution-erp",
    title: "Mid-market distribution ERP",
    clientType: "200-employee wholesale distributor",
    industry: "Distribution & light manufacturing",
    stack: [".NET 10", "MS SQL Server", "Next.js", "Redis"],
    summary:
      "Integrated ERP for finance, inventory, purchasing, and order-to-cash—built for a mid-sized US distributor outgrowing QuickBooks and spreadsheet warehouses.",
    caseStudySlug: "midmarket-distribution-erp",
  },
  {
    slug: "production-builder-portal",
    title: "Production homebuilder portal",
    clientType: "Production homebuilder",
    industry: "Construction",
    stack: [".NET 10", "MS SQL Server", "Next.js", "Azure"],
    summary:
      "Lot schedules, buyer selections, variance tracking, and warranty requests—giving construction and sales one timeline from permit to close.",
  },
  {
    slug: "make-to-order-manufacturing-erp",
    title: "Make-to-order manufacturing ERP",
    clientType: "150-employee metal fabricator",
    industry: "Discrete manufacturing",
    stack: [".NET 10", "MS SQL Server", "Next.js", "Redis"],
    summary:
      "Engineering-to-order workflows with BOMs, shop orders, material allocations, and costing tied to actual labor and scrap for mid-market plants.",
  },
  {
    slug: "professional-services-erp",
    title: "Professional services ERP",
    clientType: "Mid-sized engineering & design firm",
    industry: "Professional services",
    stack: [".NET 10", "MS SQL Server", "Next.js", "Power BI"],
    summary:
      "Project accounting, time and expense, WIP billing, and resource utilization in one system for a 300-person firm replacing fragmented PSA and GL tools.",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "contractorsbook-platform",
    title: "Job costing and field ops on one platform",
    client: "Regional general contractor (US Southeast)",
    industry: "Construction",
    duration: "20 weeks",
    challenge:
      "Project managers juggled spreadsheets, email change orders, and a legacy timecard app. Job margins were invisible until closeout, and supers stopped updating systems after hours.",
    approach:
      "We delivered a ContractorsBook-style hub with a .NET 10 API on MS SQL Server, a Next.js web console for PMs, and a React Native app for daily logs and photos. Cost codes, committed costs, and change orders share one ledger with role-based access for subs.",
    results: [
      "38% faster change-order approval cycle",
      "Live job margin visibility on 45+ active projects",
      "Field daily logs submitted same-day on 92% of job sites",
    ],
    stack: [".NET 10", "MS SQL Server", "Next.js", "React Native", "Azure"],
  },
  {
    slug: "midmarket-distribution-erp",
    title: "ERP rollout for a mid-sized distributor",
    client: "200-employee wholesale distributor (Midwest US)",
    industry: "Distribution & light manufacturing",
    duration: "28 weeks",
    challenge:
      "Finance closed books in QuickBooks while inventory lived in warehouse spreadsheets and purchasing re-keyed POs into email. Leadership could not trust a single source of truth for working capital.",
    approach:
      "Phased modules on .NET 10 and MS SQL Server: GL/AP/AR, inventory with lot tracking, purchasing workflows, and order-to-cash with a Next.js operations portal. We migrated master data in waves and ran parallel close for one quarter before cutover.",
    results: [
      "5-day month-end close reduced to 2 days",
      "Inventory accuracy above 98% after cycle-count program",
      "Single order-to-invoice path for 85% of SKUs",
    ],
    stack: [".NET 10", "MS SQL Server", "Next.js", "Redis", "Azure"],
  },
  {
    slug: "commercial-precon-suite",
    title: "Preconstruction without the spreadsheet maze",
    client: "Commercial GC (multi-state)",
    industry: "Construction",
    duration: "18 weeks",
    challenge:
      "Estimators maintained bid tabs in Excel, compliance docs expired in inboxes, and winning bids required manual re-entry into project management. Precon bottlenecks delayed starts on negotiated work.",
    approach:
      "Bid leveling, sub qualification, and document expiry tracking in one Next.js workspace backed by TypeScript services on Cloudflare. Handoff packages push structured job data to the active-jobs team without duplicate entry.",
    results: [
      "Bid leveling time cut by roughly one-third on typical pursuits",
      "Expired COI and W-9 gaps flagged before award on 100% of subs",
      "Award-to-kickoff package prepared in hours, not days",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "Cloudflare", "PostgreSQL"],
  },
];
