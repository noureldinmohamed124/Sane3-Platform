import { fetchJson } from './apiClient';
import { ENDPOINTS } from '../api/endpoints';

export async function getAcademyPrograms() {
  const result = await fetchJson(ENDPOINTS.ACADEMY_PROGRAMS);
  return result.data?.academyPrograms || [];
}

export async function getProgramCourses(programId) {
  const result = await fetchJson(ENDPOINTS.PROGRAM_COURSES(programId));
  return result.data?.courses || [];
}
