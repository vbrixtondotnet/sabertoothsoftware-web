export const CAREERS_APPLY_LIMITS = {
  position: 200,
  firstName: 100,
  lastName: 100,
  email: 320,
  country: 100,
  coverLetter: 8000,
  maxResumeBytes: 4 * 1024 * 1024,
  maxMultipartBytes: 5 * 1024 * 1024,
} as const;
