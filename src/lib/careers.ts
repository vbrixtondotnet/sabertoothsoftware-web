export type JobListing = {
  slug: string;
  title: string;
  stack: string[];
  description: string[];
  responsibilities: string[];
  qualifications: string[];
};

const remoteEngagement = [
  "Remote role with overlap to US business hours for standups, planning, and client touchpoints.",
  "Collaborate with a US-aligned project manager and senior engineers on two-week delivery cycles.",
];

const sharedQualifications = [
  "Strong written and spoken English for tickets, code review, and occasional client calls.",
  "Comfort with Git, code review, and agile ceremonies (standups, demos, retros).",
  "Experience shipping production software for business or operations teams (construction, ERP, or similar is a plus).",
];

function job(
  slug: string,
  title: string,
  stack: string[],
  summary: string,
  body: string[],
  responsibilities: string[],
  qualifications: string[],
): JobListing {
  return {
    slug,
    title,
    stack,
    description: [summary, ...body, ...remoteEngagement],
    responsibilities,
    qualifications: [...qualifications, ...sharedQualifications],
  };
}

export const jobListings: JobListing[] = [
  job(
    "full-stack-software-engineer",
    "Full-Stack Software Engineer",
    ["C#", ".NET", "SQL Server", "TypeScript", "React", "Angular", "Node.js"],
    "Build end-to-end features across .NET APIs and modern TypeScript front ends for US construction and ERP products.",
    [
      "You will implement UI flows in React or Angular, integrate REST services, and develop server-side logic in C# with SQL Server persistence.",
      "Day to day work includes debugging cross-stack issues, improving performance, and documenting APIs and deployment steps for the team.",
    ],
    [
      "Design and implement end-to-end features in React or Angular integrated with .NET REST services.",
      "Build and maintain C# business logic, data access, and SQL Server schemas for production workloads.",
      "Debug and fix defects across the UI, API, and database with clear root-cause notes for the team.",
      "Collaborate on API contracts, error handling, and release checklists with product and QA.",
      "Write automated tests and keep technical documentation current for onboarding and support.",
    ],
    [
      "3+ years across front-end (TypeScript, React or Angular) and back-end (C#, .NET, SQL Server).",
      "Experience designing and consuming REST APIs and working with relational schemas.",
      "Familiarity with Node.js for tooling, BFF layers, or lightweight services is welcome.",
    ],
  ),
  job(
    "senior-dotnet-developer",
    "Senior .NET Developer",
    [
      "C#",
      ".NET 8",
      "ASP.NET Core",
      "Entity Framework Core",
      "SQL Server",
      "REST APIs",
    ],
    "Lead backend delivery on ASP.NET Core and EF Core for dependable APIs and data layers used by US enterprise clients.",
    [
      "You will own complex domains—validation, transactions, migrations, and query tuning—while mentoring others on .NET best practices.",
      "You will partner with front-end engineers on contracts, versioning, and release hardening through CI/CD and staging verification.",
    ],
    [
      "Own ASP.NET Core Web API design, implementation, and long-term maintainability for client platforms.",
      "Model domains in Entity Framework Core, author migrations, and optimize SQL Server queries and indexes.",
      "Lead code reviews and mentor engineers on .NET security, validation, and testing practices.",
      "Define API versioning, deprecation, and staging verification steps before production releases.",
      "Respond to production escalations involving performance, data consistency, or integration failures.",
    ],
    [
      "5+ years C# / .NET with substantial ASP.NET Core Web API experience.",
      "3+ years Entity Framework Core including migrations, relationships, and performance optimization.",
      "Deep SQL Server skills: indexing, stored procedures, and troubleshooting production data issues.",
    ],
  ),
  job(
    "full-stack-dotnet-developer",
    "Full-Stack .NET Developer",
    ["C#", "ASP.NET Core", "SQL Server", "TypeScript", "React", "Angular"],
    "Deliver full-stack web capabilities on ASP.NET Core and TypeScript SPAs for operations-heavy US applications.",
    [
      "You will build and extend ASP.NET Core endpoints, wire authentication and authorization, and ship responsive UI in React or Angular.",
      "You will participate in estimates, break down epics into shippable increments, and keep codebases maintainable through reviews and tests.",
    ],
    [
      "Implement ASP.NET Core endpoints, middleware, and authorization for line-of-business applications.",
      "Deliver responsive UI flows in React or Angular wired to backend services and shared types.",
      "Maintain SQL Server objects and EF Core mappings aligned with application requirements.",
      "Estimate work, split epics into sprint-sized deliverables, and demo completed features to stakeholders.",
      "Participate in peer review, automated testing, and incremental refactors to reduce technical debt.",
    ],
    [
      "3+ years with C#, ASP.NET Core, and SQL Server.",
      "2+ years TypeScript with React or Angular in production.",
      "Understanding of secure API patterns and front-end integration (JWT, cookies, or OIDC).",
    ],
  ),
  job(
    "frontend-developer",
    "Frontend Developer",
    [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Angular",
      "HTML",
      "CSS",
    ],
    "Craft accessible, performant user interfaces in React, Next.js, or Angular for data-rich business applications.",
    [
      "You will translate designs and UX requirements into component libraries, forms, tables, and dashboards backed by REST APIs.",
      "You will improve Core Web Vitals, handle state and routing cleanly, and collaborate with backend teams on API shape and error handling.",
    ],
    [
      "Build reusable components, forms, tables, and dashboards from designs and product requirements.",
      "Integrate REST APIs with robust loading, empty, and error states and accessible interactions.",
      "Manage client-side routing, state, and performance tuning for data-heavy enterprise screens.",
      "Partner with backend engineers to refine API payloads, pagination, and authentication UX.",
      "Fix cross-browser issues and improve Core Web Vitals through profiling and targeted optimizations.",
    ],
    [
      "3+ years professional front-end development with TypeScript and React or Angular.",
      "Strong HTML, CSS, and responsive layout skills; Next.js experience is a plus.",
      "Comfort debugging network calls, auth flows, and cross-browser issues.",
    ],
  ),
  job(
    "backend-developer",
    "Backend Developer",
    [
      "C#",
      ".NET",
      "Node.js",
      "REST APIs",
      "SQL Server",
      "database design",
    ],
    "Design and implement server-side services, APIs, and database layers that power web and integration workloads.",
    [
      "You will model data, write REST endpoints in .NET or Node.js, and enforce validation, logging, and observability standards.",
      "You will support integrations, background jobs, and production incidents with clear runbooks and post-incident notes.",
    ],
    [
      "Design relational schemas and implement data access layers in SQL Server for application services.",
      "Develop and document REST APIs in .NET and/or Node.js with consistent validation and error contracts.",
      "Implement background jobs, queues, or scheduled tasks for reporting and integration workloads.",
      "Add structured logging, metrics, and alerts to support operability and faster incident response.",
      "Triage production issues, deploy fixes, and contribute post-incident summaries and runbook updates.",
    ],
    [
      "3+ years building REST APIs with C# / .NET and/or Node.js.",
      "Solid relational database design and SQL Server query skills.",
      "Security-minded habits: input validation, secrets handling, and least-privilege access.",
    ],
  ),
  job(
    "senior-software-engineer",
    "Senior Software Engineer",
    ["C#", ".NET", "SQL Server", "TypeScript", "React", "system design"],
    "Senior individual contributor owning features from design through production across .NET and modern TypeScript stacks.",
    [
      "You will drive technical design for new modules, balance trade-offs with stakeholders, and raise the bar on code quality and testing.",
      "You will unblock teammates, lead reviews, and help evolve architecture as products scale for US users.",
    ],
    [
      "Own technical design and delivery for major features from proposal through production monitoring.",
      "Implement high-quality code across .NET services and TypeScript front ends with strong test coverage.",
      "Facilitate design reviews, unblock peers, and set engineering standards for the squad.",
      "Evaluate trade-offs in scalability, security, and maintainability with product and client stakeholders.",
      "Drive resolution of complex production defects and guide performance or reliability improvements.",
    ],
    [
      "5+ years shipping software with C#, .NET, SQL Server, and TypeScript front ends (React preferred).",
      "Demonstrated system design experience: boundaries, caching, concurrency, and failure modes.",
      "Track record mentoring mid-level engineers and delivering on predictable schedules.",
    ],
  ),
  job(
    "full-stack-web-developer",
    "Full-Stack Web Developer",
    [".NET", "C#", "Node.js", "TypeScript", "React", "Next.js", "SQL Server"],
    "Ship full-stack web features combining .NET services, Node.js utilities, and React or Next.js experiences.",
    [
      "You will implement user-facing flows and the APIs they depend on, including file uploads, reporting views, and role-based access.",
      "You will improve developer experience through shared types, OpenAPI specs, and consistent error contracts across stacks.",
    ],
    [
      "Ship user-facing workflows in React or Next.js backed by .NET APIs and SQL Server persistence.",
      "Implement file uploads, reporting views, and role-based access aligned with business rules.",
      "Maintain Node.js utilities or microservices where they simplify integrations or tooling.",
      "Publish OpenAPI specs and shared TypeScript types to keep front-end and back-end teams aligned.",
      "Support CI/CD pipelines and staging verification for predictable, reversible releases.",
    ],
    [
      "3+ years across C# / .NET and TypeScript (React or Next.js).",
      "Working knowledge of Node.js for scripts, microservices, or edge APIs.",
      "SQL Server proficiency and comfort with deployment pipelines.",
    ],
  ),
  job(
    "software-development-engineer",
    "Software Development Engineer",
    ["C#", ".NET", "SQL Server", "TypeScript", "Node.js", "API development"],
    "Engineer reliable APIs and business logic in .NET and TypeScript ecosystems for custom client platforms.",
    [
      "You will implement features, fix defects, and extend platform capabilities with an emphasis on testability and clear documentation.",
      "You will work across services and databases, coordinating with QA and product on acceptance criteria before release.",
    ],
    [
      "Implement features and defect fixes in C# / .NET services with clear unit and integration tests.",
      "Extend REST APIs and platform modules according to agreed acceptance criteria and timelines.",
      "Coordinate with QA on test plans, regression scope, and release sign-off for each sprint.",
      "Document endpoints, configuration, and deployment steps for operations and fellow developers.",
      "Refactor legacy modules safely while preserving behavior for US client production environments.",
    ],
    [
      "3+ years professional development with C#, .NET, and SQL Server.",
      "Experience building and documenting REST APIs; TypeScript and Node.js exposure valued.",
      "Comfort with automated tests and incremental refactors in existing codebases.",
    ],
  ),
  job(
    "web-application-developer",
    "Web Application Developer",
    ["ASP.NET Core", "C#", "SQL Server", "Angular", "React", "TypeScript"],
    "Build and maintain web applications on ASP.NET Core with Angular or React front ends for US business users.",
    [
      "You will develop server-rendered or SPA experiences, implement business rules, and integrate reporting and workflow features.",
      "You will follow established patterns for logging, configuration, and environment-specific deployments.",
    ],
    [
      "Develop ASP.NET Core application features including controllers, services, and data access layers.",
      "Build Angular or React screens for workflows, grids, and forms used by business operators daily.",
      "Enforce business rules, validations, and audit-friendly logging across server and client tiers.",
      "Configure environment-specific settings and support deployment to staging and production.",
      "Address user-reported defects and usability issues with timely patches and regression tests.",
    ],
    [
      "3+ years with ASP.NET Core, C#, and SQL Server.",
      "2+ years TypeScript with Angular or React.",
      "Experience with forms, grids, and role-based UI common in enterprise apps.",
    ],
  ),
  job(
    "technical-lead-full-stack-lead",
    "Technical Lead / Full-Stack Lead",
    [
      ".NET",
      "C#",
      "SQL Server",
      "TypeScript",
      "React",
      "Angular",
      "software architecture",
    ],
    "Lead a full-stack squad: architecture decisions, delivery planning, and hands-on coding across .NET and TypeScript.",
    [
      "You will set technical direction, unblock developers, and represent engineering in client and internal planning sessions.",
      "You will still contribute code—reviews, prototypes, and critical paths—while keeping quality and observability standards current.",
    ],
    [
      "Set technical direction, standards, and architecture guidelines for a full-stack delivery squad.",
      "Plan sprints, allocate work, and remove blockers while keeping commitments realistic for US clients.",
      "Represent engineering in client and internal planning with clear status, risks, and options.",
      "Review designs and code for security, performance, and maintainability across .NET and TypeScript.",
      "Hands-on contribution on critical features, spikes, and production escalations when needed.",
    ],
    [
      "6+ years building web systems with .NET, SQL Server, and modern TypeScript frameworks.",
      "Proven experience leading small teams or workstreams and owning architecture outcomes.",
      "Strong communication with US clients and ability to break ambiguous goals into executable backlogs.",
    ],
  ),
  job(
    "application-developer",
    "Application Developer",
    ["C#", ".NET", "SQL Server", "ASP.NET Core", "JavaScript", "TypeScript"],
    "Implement and enhance line-of-business applications on ASP.NET Core with JavaScript or TypeScript UI layers.",
    [
      "You will deliver CRUD workflows, validations, integrations, and incremental modernizations of legacy modules.",
      "You will write clear commit messages and participate in peer review to keep shared applications stable.",
    ],
    [
      "Implement CRUD modules, validations, and business workflows in ASP.NET Core and SQL Server.",
      "Enhance JavaScript or TypeScript UI layers for usability, clarity, and alignment with designs.",
      "Integrate third-party services and internal APIs following established security patterns.",
      "Modernize legacy components incrementally without disrupting active US client operations.",
      "Participate in peer review, write descriptive commits, and document changes for support teams.",
    ],
    [
      "2+ years C#, .NET, ASP.NET Core, and SQL Server.",
      "JavaScript or TypeScript experience for client-side features.",
      "Attention to detail for data integrity and user-facing error messages.",
    ],
  ),
  job(
    "full-stack-application-engineer",
    "Full-Stack Application Engineer",
    [
      ".NET",
      "C#",
      "SQL Server",
      "React",
      "Next.js",
      "TypeScript",
      "REST APIs",
    ],
    "Own application features from database through React or Next.js UI, backed by .NET REST services.",
    [
      "You will design DTOs and API contracts, implement UI states, and ensure releases are reversible and monitored.",
      "You will collaborate on shared components and coding standards across multiple client codebases.",
    ],
    [
      "Design DTOs and REST contracts and implement corresponding React or Next.js user experiences.",
      "Own feature delivery from database changes through UI polish and production verification.",
      "Build shared components and patterns reused across multiple client applications.",
      "Implement authentication, pagination, and performant data loading for large operational datasets.",
      "Monitor releases, roll back when needed, and capture lessons learned for future deployments.",
    ],
    [
      "3+ years .NET / C# with SQL Server and REST API development.",
      "2+ years React or Next.js with TypeScript.",
      "Experience with auth, pagination, and large data sets in UI.",
    ],
  ),
  job(
    "software-architect",
    "Software Architect",
    [
      ".NET",
      "C#",
      "SQL Server",
      "API architecture",
      "React",
      "Angular",
      "system design",
    ],
    "Define scalable architecture for .NET platforms—API boundaries, data models, and front-end integration patterns.",
    [
      "You will produce architecture decision records, guide refactors, and align multiple teams on shared platforms and integration standards.",
      "You will review critical designs for security, performance, and operability before major builds land in production.",
    ],
    [
      "Define system boundaries, integration patterns, and data models for multi-team .NET platforms.",
      "Author architecture decision records and guide refactors toward modular, testable designs.",
      "Review critical designs for security, scalability, and operational readiness before build-out.",
      "Align front-end (React/Angular) and API teams on contracts, versioning, and shared platform services.",
      "Advise leadership and clients on technical strategy, risks, and phased modernization roadmaps.",
    ],
    [
      "8+ years in software development with deep .NET and SQL Server experience.",
      "Demonstrated success designing multi-service or modular monolith systems and public/internal APIs.",
      "Ability to communicate trade-offs to technical and non-technical stakeholders.",
    ],
  ),
  job(
    "api-developer-integration-engineer",
    "API Developer / Integration Engineer",
    [
      "ASP.NET Core",
      "C#",
      "Node.js",
      "REST APIs",
      "SQL Server",
      "third-party integrations",
    ],
    "Build and maintain APIs and integrations connecting .NET and Node.js services with external SaaS and client systems.",
    [
      "You will implement webhooks, batch sync jobs, retry policies, and monitoring for integration pipelines.",
      "You will document payloads, map fields across systems, and support troubleshooting during client go-lives.",
    ],
    [
      "Design and implement REST APIs and integration endpoints in ASP.NET Core and/or Node.js.",
      "Build webhook handlers, batch sync jobs, and retry logic with idempotent database operations.",
      "Map fields and transformations between external SaaS systems and internal SQL Server schemas.",
      "Monitor integration health, alert on failures, and maintain runbooks for on-call support.",
      "Support client go-lives with testing, payload validation, and live troubleshooting.",
    ],
    [
      "3+ years API development with ASP.NET Core and/or Node.js.",
      "Hands-on integration experience (OAuth, REST, webhooks, file-based feeds).",
      "SQL Server skills for staging tables, idempotency, and reconciliation queries.",
    ],
  ),
  job(
    "lead-software-engineer",
    "Lead Software Engineer",
    [
      "C#",
      ".NET",
      "SQL Server",
      "TypeScript",
      "React",
      "Angular",
      "architecture",
      "mentoring",
    ],
    "Lead by example across the stack—architecture, delivery, and mentoring—for US-facing product engineering.",
    [
      "You will guide technical approach, delegate work effectively, and ensure the team meets quality and timeline commitments.",
      "You will remain hands-on for complex features, performance work, and production support escalations.",
    ],
    [
      "Guide squad technical approach, task breakdown, and quality bars for predictable delivery.",
      "Mentor engineers through design discussions, pairing, and constructive code review.",
      "Remain hands-on for complex features, performance tuning, and high-severity production fixes.",
      "Communicate progress, risks, and trade-offs to US clients and internal product partners.",
      "Champion release discipline, observability, and sustainable engineering practices across the team.",
    ],
    [
      "6+ years with C#, .NET, SQL Server, and TypeScript UI (React or Angular).",
      "Experience mentoring engineers and leading design discussions.",
      "Comfort owning releases and client-facing technical communication.",
    ],
  ),
  job(
    "supabase-developer",
    "Supabase Developer",
    [
      "Supabase",
      "PostgreSQL",
      "TypeScript",
      "Row Level Security",
      "Edge Functions",
      "REST APIs",
    ],
    "Build and extend Supabase-backed products—auth, Postgres, storage, and realtime—for US-facing web applications.",
    [
      "You will design schemas and RLS policies, implement Supabase client integrations, and ship Edge Functions for server-side logic.",
      "You will tune queries, manage migrations, and document environment setup so the team can deploy safely across staging and production.",
    ],
    [
      "Configure Supabase Auth, database roles, and Row Level Security policies for multi-tenant apps.",
      "Design Postgres schemas, write migrations, and optimize queries for application performance.",
      "Implement Supabase client integrations and Edge Functions for server-side business rules.",
      "Manage Storage buckets, Realtime channels, and environment-specific project settings.",
      "Document setup, secrets handling, and deployment steps for staging and production Supabase projects.",
    ],
    [
      "2+ years hands-on Supabase in production (Auth, Database, Storage, or Realtime).",
      "Solid PostgreSQL fundamentals: schemas, indexes, constraints, and SQL troubleshooting.",
      "TypeScript experience integrating Supabase from React or Next.js apps.",
    ],
  ),
  job(
    "postgresql-developer",
    "PostgreSQL Developer",
    [
      "PostgreSQL",
      "SQL",
      "database design",
      "migrations",
      "performance tuning",
      "Supabase",
    ],
    "Own PostgreSQL data layers—modeling, migrations, and performance—for applications used by US enterprise teams.",
    [
      "You will write and review SQL, design normalized schemas, and implement views, functions, and triggers where they add clarity or integrity.",
      "You will partner with backend and full-stack engineers on query plans, connection pooling, backups, and production incident response.",
    ],
    [
      "Design normalized PostgreSQL schemas, constraints, and migration scripts for application teams.",
      "Write and review SQL, views, functions, and triggers that enforce business rules at the database layer.",
      "Analyze query plans, recommend indexes, and resolve performance bottlenecks in production.",
      "Partner on backup, restore, and connection-pooling strategies for hosted or Supabase Postgres.",
      "Support data-related incidents with root-cause analysis and durable corrective actions.",
    ],
    [
      "3+ years PostgreSQL development including schema design and migration workflows.",
      "Experience optimizing slow queries, indexing strategies, and explaining EXPLAIN plans.",
      "Familiarity with Supabase or similar Postgres-as-a-service platforms is a plus.",
    ],
  ),
  job(
    "full-stack-developer-supabase",
    "Full-Stack Developer (Supabase)",
    [
      "Supabase",
      "PostgreSQL",
      "TypeScript",
      "React",
      "Next.js",
      "REST APIs",
    ],
    "Deliver full-stack features on Supabase and TypeScript front ends for modern, data-driven business software.",
    [
      "You will implement authenticated user flows, CRUD and reporting screens, and server-side rules via RLS, database functions, or Edge Functions.",
      "You will keep API and UI contracts aligned, handle file storage when needed, and participate in code review across the stack.",
    ],
    [
      "Build authenticated user journeys in React or Next.js using Supabase Auth and session handling.",
      "Implement CRUD, search, and reporting screens backed by Postgres via Supabase client libraries.",
      "Define and enforce RLS policies, database functions, or Edge Functions for authorization rules.",
      "Integrate Supabase Storage for document or media uploads with secure access patterns.",
      "Review full-stack changes for consistency, test coverage, and safe schema migrations.",
    ],
    [
      "3+ years full-stack web development with TypeScript and React or Next.js.",
      "1+ years Supabase (or equivalent Postgres BaaS) including Auth and RLS.",
      "Comfort with PostgreSQL SQL and relational modeling for multi-tenant or role-based apps.",
    ],
  ),
  job(
    "backend-developer-postgresql",
    "Backend Developer (PostgreSQL)",
    [
      "PostgreSQL",
      "Supabase",
      "TypeScript",
      "Node.js",
      "REST APIs",
      "database design",
    ],
    "Implement backend services and PostgreSQL data access patterns that power secure, scalable web and integration workloads.",
    [
      "You will build API layers and background jobs that read and write Postgres reliably, with migrations, transactions, and idempotent operations.",
      "You will enforce validation, logging, and least-privilege database roles; Supabase Edge Functions or Node.js services may both be in scope.",
    ],
    [
      "Implement backend services and data access layers against PostgreSQL with transactional integrity.",
      "Author and apply database migrations, seed data, and role grants following least-privilege principles.",
      "Expose REST APIs or Edge Functions that validate input, log auditable events, and handle failures gracefully.",
      "Build background jobs or scheduled tasks for sync, reporting, and maintenance workloads.",
      "Diagnose production database and API issues and ship fixes with appropriate monitoring and alerts.",
    ],
    [
      "3+ years backend development with strong PostgreSQL (SQL, migrations, performance).",
      "Experience designing REST APIs and integrating with Supabase or self-hosted Postgres.",
      "TypeScript or Node.js for services, scripts, or Edge Functions.",
    ],
  ),
  job(
    "full-stack-software-engineer-react-supabase",
    "Full-Stack Software Engineer (React & Supabase)",
    [
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Next.js",
      "Row Level Security",
    ],
    "Engineer end-to-end product features in React and Supabase for US clients who need dependable, realtime-ready web platforms.",
    [
      "You will ship React UI with clean state management, wire Supabase Auth and data subscriptions, and collaborate on schema and policy design.",
      "You will debug cross-layer issues—from RLS denials to UI edge cases—and improve observability and release checklists for Postgres-backed apps.",
    ],
    [
      "Deliver React features with thoughtful state management, routing, and accessible UI patterns.",
      "Integrate Supabase Auth, queries, mutations, and Realtime subscriptions into product workflows.",
      "Collaborate on Postgres schema design, RLS policies, and safe migration practices.",
      "Debug cross-layer issues spanning RLS, API errors, and front-end edge cases with reproducible fixes.",
      "Improve release checklists, logging, and monitoring for Supabase-backed applications in production.",
    ],
    [
      "3+ years React and TypeScript in production; Next.js experience is a plus.",
      "2+ years Supabase or comparable Postgres + Auth + client SDK stacks.",
      "Practical PostgreSQL skills for joins, aggregates, and safe schema changes.",
    ],
  ),
];

export function getJobBySlug(slug: string): JobListing | undefined {
  return jobListings.find((job) => job.slug === slug);
}
