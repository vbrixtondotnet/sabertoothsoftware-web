/** Local stock imagery (Unsplash) — paths under /public/images */
export const pageImages = {
  servicesHero: "/images/services-hero.jpg",
  projectsHero: "/images/projects-hero.jpg",
  aboutHero: "/images/team-v3.jpg",
  aboutTeam: "/images/about-team.jpg",
  homeHero: "/images/home/hero-software-dev.jpg",
  homeCapabilities: "/images/home/capabilities-team.jpg",
  homeErp: "/images/home/erp-dashboard.jpg",
} as const;

export const caseStudyImages: Record<string, string> = {
  "contractorsbook-platform": "/images/projects/field-tech.jpg",
  "midmarket-distribution-erp": "/images/home/erp-dashboard.jpg",
  "commercial-precon-suite": "/images/projects/manufacturing.jpg",
};

export const serviceImages: Record<string, string> = {
  "product-engineering": "/images/services/product-engineering.jpg",
  "backend-apis": "/images/services/backend-apis.jpg",
  "cloud-devops": "/images/services/cloud-devops.jpg",
  modernization: "/images/services/modernization.jpg",
  "dedicated-teams": "/images/services/dedicated-teams.jpg",
  "quality-security": "/images/services/quality-security.jpg",
};

export const projectImages: Record<string, string> = {
  "contractorsbook-platform": "/images/projects/field-tech.jpg",
  "commercial-precon-suite": "/images/projects/manufacturing.jpg",
  "midmarket-distribution-erp": "/images/projects/saas-analytics.jpg",
  "production-builder-portal": "/images/projects/field-tech.jpg",
  "make-to-order-manufacturing-erp": "/images/projects/manufacturing.jpg",
  "professional-services-erp": "/images/projects/saas-analytics.jpg",
};
