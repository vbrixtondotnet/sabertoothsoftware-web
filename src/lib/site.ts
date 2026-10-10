export const site = {
  name: "Sabertooth Software Labs",
  url: "https://sabertoothsoftwarelabs.net",
  tagline: "Custom software development for US companies",
  description:
    "Sabertooth Software Labs designs and builds production-grade web applications, APIs, and cloud systems for US startups and enterprises.",
  email: "sales@sabertoothsoftwarelabs.com",
  careersEmail: "careers@sabertoothsoftwarelabs.net",
  location: "Remote · US time-zone overlap",
} as const;

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;
