export const ENDPOINTS = {
  ACADEMY_PROGRAMS: '/academyprograms',
  PROGRAM_SEMESTERS: (programId) => `/academyprograms/${programId}/semesters`,
  ENROLLMENT_APPLICATIONS: '/enrollmentapplications',
};
