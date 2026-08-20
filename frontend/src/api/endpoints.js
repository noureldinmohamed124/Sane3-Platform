export const ENDPOINTS = {
  ACADEMY_PROGRAMS: '/academyprograms',
  PROGRAM_COURSES: (programId) => `/academyprograms/${programId}/courses`,
  ENROLLMENT_APPLICATIONS: '/enrollmentapplications',
};
