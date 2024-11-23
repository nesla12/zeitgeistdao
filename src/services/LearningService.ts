import { Course, Milestone } from '../types/learning';

export class LearningService {
  async getCourses(): Promise<Course[]> {
    return [
      {
        id: '1',
        title: "Mindfulness Basics",
        description: "Learn fundamental meditation techniques",
        progress: 75,
        image: "https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?w=300&fit=crop"
      },
      {
        id: '2',
        title: "Emotional Intelligence",
        description: "Develop deeper self-awareness",
        progress: 45,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&fit=crop"
      },
      {
        id: '3',
        title: "Sustainable Living",
        description: "Practical steps for eco-friendly life",
        progress: 20,
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&fit=crop"
      }
    ];
  }

  async getMilestones(): Promise<Milestone[]> {
    return [
      {
        title: "Foundation",
        description: "Basic principles and practices",
        status: "completed"
      },
      {
        title: "Intermediate",
        description: "Advanced concepts and applications",
        status: "in-progress"
      },
      {
        title: "Advanced",
        description: "Leadership and community building",
        status: "upcoming"
      }
    ];
  }
}

export const learningService = new LearningService();