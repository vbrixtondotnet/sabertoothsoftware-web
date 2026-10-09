export type JobListing = {
  slug: string;
  title: string;
  stack: string[];
  description: string[];
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
  qualifications: string[],
): JobListing {
  return {
    slug,
    title,
    stack,
    description: [summary, ...body, ...remoteEngagement],
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
      "6+ years with C#, .NET, SQL Server, and TypeScript UI (React or Angular).",
      "Experience mentoring engineers and leading design discussions.",
      "Comfort owning releases and client-facing technical communication.",
    ],
  ),
];

export function getJobBySlug(slug: string): JobListing | undefined {
  return jobListings.find((job) => job.slug === slug);
}
