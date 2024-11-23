export interface ImpactMetric {
  icon: string;
  title: string;
  value: string;
  subtitle: string;
}

export interface ImpactEvent {
  date: string;
  title: string;
  impact: string;
}

export class ImpactService {
  async getMetrics(): Promise<ImpactMetric[]> {
    return [
      {
        icon: 'Globe',
        title: "Global Reach",
        value: "28",
        subtitle: "Countries Impacted"
      },
      {
        icon: 'Users',
        title: "Lives Touched",
        value: "1,234",
        subtitle: "People Reached"
      },
      {
        icon: 'Leaf',
        title: "Carbon Offset",
        value: "45.2",
        subtitle: "Tons CO2 Saved"
      },
      {
        icon: 'TreePine',
        title: "Trees Planted",
        value: "156",
        subtitle: "Through Projects"
      }
    ];
  }

  async getImpactEvents(): Promise<ImpactEvent[]> {
    return [
      {
        date: "March 2024",
        title: "Community Garden Project",
        impact: "12 tons CO2 offset"
      },
      {
        date: "February 2024",
        title: "Consciousness Workshop",
        impact: "250 people reached"
      },
      {
        date: "January 2024",
        title: "Tree Planting Initiative",
        impact: "100 trees planted"
      }
    ];
  }
}

export const impactService = new ImpactService();