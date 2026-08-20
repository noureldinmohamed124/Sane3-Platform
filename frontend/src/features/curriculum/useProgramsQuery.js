import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '../../api/axiosClient';
import { ENDPOINTS } from '../../api/endpoints';

export function useAcademyProgramsQuery() {
  return useQuery({
    queryKey: ['academyPrograms'],
    queryFn: async () => {
      const res = await axiosClient.get(ENDPOINTS.ACADEMY_PROGRAMS);
      return res.data?.academyPrograms || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

export function useProgramCoursesQuery(programId) {
  return useQuery({
    queryKey: ['programCourses', programId],
    queryFn: async () => {
      if (!programId) return [];
      const res = await axiosClient.get(ENDPOINTS.PROGRAM_COURSES(programId));
      return res.data?.courses || [];
    },
    enabled: Boolean(programId),
  });
}
