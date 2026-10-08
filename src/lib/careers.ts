export type JobListing = {
  slug: string;
  title: string;
  stack: string[];
  description: string[];
  qualifications: string[];
};

export const jobListings: JobListing[] = [
  {
    slug: "full-stack-nextjs-csharp",
    title: "Full Stack Developer (Next.js, TypeScript, C# and .NET Core)",
    stack: ["Next.js", "TypeScript", "C#", ".NET Core"],
    description: [
      "You will design and ship features across modern React/Next.js front ends and .NET Core APIs for US clients building construction management and ERP products.",
      "Day to day, you will implement responsive UIs, integrate REST or GraphQL services, write server-side logic in C#, and collaborate with a US-aligned project manager on two-week sprints.",
      "You will participate in code review, write automated tests where they add value, and help keep deployments predictable through CI/CD and clear documentation.",
      "This role suits someone who enjoys owning a feature from database to browser and who communicates clearly in English with remote teammates and client stakeholders.",
    ],
    qualifications: [
      "3+ years professional experience with TypeScript and React or Next.js (App Router experience is a plus).",
      "2+ years building or consuming APIs with C# and .NET Core (ASP.NET Core Web API).",
      "Comfort with SQL Server or PostgreSQL, Git, and agile ceremonies (standups, demos, retros).",
      "Strong written and spoken English for async updates and occasional US time-zone meetings.",
      "Bonus: experience with construction, field ops, job costing, or ERP domains.",
    ],
  },
  {
    slug: "full-stack-react-csharp",
    title: "Full Stack Developer (React, C# and .NET Core)",
    stack: ["React", "C#", ".NET Core"],
    description: [
      "Join a senior-led squad delivering custom web applications for US mid-market companies—often dashboards, workflows, and integrations tied to operations and finance.",
      "You will build React SPAs or hybrid apps, implement state management and accessibility-minded UI, and develop backend endpoints in .NET Core with clean layering and validation.",
      "You will work closely with QA-minded peers to harden releases, troubleshoot production issues, and refine estimates with your tech lead.",
      "We value engineers who ask clarifying questions early, document decisions, and take pride in maintainable code over clever shortcuts.",
    ],
    qualifications: [
      "3+ years with React (hooks, component patterns, performance basics).",
      "2+ years with C# / .NET Core for web APIs or background services.",
      "Experience with EF Core or similar ORM, and relational database design.",
      "Familiarity with Azure, AWS, or on-prem IIS/Kestrel hosting for .NET apps.",
      "Ability to overlap several hours with US business hours for collaboration.",
    ],
  },
  {
    slug: "full-stack-angular-csharp",
    title: "Full Stack Developer (Angular, C# and .NET Core)",
    stack: ["Angular", "C#", ".NET Core"],
    description: [
      "You will extend and modernize enterprise-style applications where Angular powers rich internal tools and customer portals backed by .NET Core services.",
      "Responsibilities include implementing Angular modules and reactive forms, securing routes, integrating with identity providers, and pairing with backend developers on contract-first APIs.",
      "You will help migrate legacy screens incrementally, improve build pipelines for Angular, and uphold coding standards through reviews and shared lint rules.",
      "Ideal candidates enjoy structured front-end architecture (modules, services, RxJS) and steady delivery in regulated or process-heavy industries.",
    ],
    qualifications: [
      "3+ years with Angular (v15+ preferred) including routing, RxJS, and NgRx or similar state patterns.",
      "2+ years with ASP.NET Core Web API and C#.",
      "TypeScript proficiency and experience with unit testing (Jasmine/Karma or Jest).",
      "Understanding of OAuth2/OIDC or JWT-based auth in SPA contexts.",
      "Clear English communication and experience working with US or Western clients is strongly preferred.",
    ],
  },
  {
    slug: "backend-node-typescript",
    title: "Backend Developer (Node.js and TypeScript)",
    stack: ["Node.js", "TypeScript"],
    description: [
      "Focus on server-side TypeScript: APIs, integrations, event-driven workflows, and data layers that support web and mobile clients for US product teams.",
      "You will design REST or GraphQL endpoints, implement validation and error handling, connect to SQL/NoSQL stores, and instrument services for logging and observability.",
      "You will collaborate with full-stack and .NET specialists when systems need to interoperate across stacks, and contribute to shared API standards and OpenAPI specs.",
      "This role is a strong fit if you like integration-heavy work—webhooks, third-party SaaS, queues—and care about reliability under real traffic.",
    ],
    qualifications: [
      "3+ years building production services with Node.js and TypeScript (Express, Fastify, or NestJS).",
      "Solid SQL skills; experience with Redis, message queues, or serverless is a plus.",
      "Comfort writing integration and unit tests, and operating services in Docker or cloud environments.",
      "Security-minded habits: secrets management, input validation, rate limiting, least-privilege IAM.",
      "Professional English for tickets, PR descriptions, and client-facing release notes.",
    ],
  },
  {
    slug: "backend-dotnet-ef",
    title: "Backend Developer (C#, .NET 10 and Entity Framework)",
    stack: ["C#", ".NET 10", "Entity Framework"],
    description: [
      "Deep backend role on .NET 10: domain modeling, EF Core data access, migrations, and high-quality APIs for construction and ERP platforms serving US users.",
      "You will implement business rules, optimize queries, design transactional boundaries, and work with architects on multi-tenant or multi-company data patterns where required.",
      "You will maintain migration scripts, support staging and production releases, and partner with front-end developers on DTOs and versioning strategy.",
      "We look for engineers who treat the database as a first-class concern—indexes, concurrency, and audit trails—not an afterthought.",
    ],
    qualifications: [
      "4+ years C# with strong .NET Core / .NET 5+ experience; .NET 8/10 preview or early adoption exposure is welcome.",
      "3+ years Entity Framework Core including migrations, relationships, and performance tuning.",
      "MS SQL Server experience required; familiarity with reporting, SSIS, or read replicas is a plus.",
      "Experience with clean architecture, CQRS, or vertical slices in medium-to-large codebases.",
      "English fluency for technical design docs and US client workshops.",
    ],
  },
];
