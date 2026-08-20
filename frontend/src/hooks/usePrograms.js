import { useState, useEffect } from 'react';
import { getAcademyPrograms, getProgramCourses } from '../services/programsService';

export function usePrograms() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function loadPrograms() {
      try {
        setLoading(true);
        const data = await getAcademyPrograms();
        if (mounted && data.length > 0) {
          setPrograms(data);
        }
      } catch (err) {
        console.warn('Could not fetch remote programs, using local tracks fallbacks:', err);
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadPrograms();
    return () => { mounted = false; };
  }, []);

  return { programs, loading, error };
}

export function useProgramCourses(programId) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!programId) {
      setCourses([]);
      return;
    }
    let mounted = true;
    async function fetchCourses() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProgramCourses(programId);
        if (mounted) setCourses(data);
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchCourses();
    return () => { mounted = false; };
  }, [programId]);

  return { courses, loading, error };
}
