import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    // Track page view
    const pageView = {
      path: location.pathname,
      title: document.title,
      timestamp: new Date().toISOString()
    };

    // Store in local analytics
    const analytics = JSON.parse(localStorage.getItem('pageViews') || '[]');
    analytics.push(pageView);
    localStorage.setItem('pageViews', JSON.stringify(analytics.slice(-100))); // Keep last 100 views

    // You can also send to your analytics service here
  }, [location]);
}

export default usePageTracking;