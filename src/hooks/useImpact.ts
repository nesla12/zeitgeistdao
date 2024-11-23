import { useState, useEffect } from 'react';
import { impactService } from '../services/ImpactService';

export function useImpact() {
  const [metrics, setMetrics] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [metricsData, eventsData] = await Promise.all([
          impactService.getMetrics(),
          impactService.getImpactEvents()
        ]);
        setMetrics(metricsData);
        setEvents(eventsData);
      } catch (error) {
        console.error('Failed to fetch impact data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { metrics, events, loading };
}