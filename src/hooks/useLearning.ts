import { useState, useEffect } from 'react';
import { learningService } from '../services/LearningService';
import { Course, Milestone } from '../types/learning';

export function useLearning() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLearningData() {
      try {
        const [coursesData, milestonesData] = await Promise.all([
          learningService.getCourses(),
          learningService.getMilestones()
        ]);

        setCourses(coursesData);
        setMilestones(milestonesData);
      } catch (error) {
        console.error('Failed to fetch learning data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLearningData();
  }, []);

  return { courses, milestones, loading };
}