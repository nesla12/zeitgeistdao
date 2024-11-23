import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollRestoration() {
  const location = useLocation();

  useEffect(() => {
    // Save scroll position before unmounting
    const saveScrollPosition = () => {
      const positions = JSON.parse(sessionStorage.getItem('scrollPositions') || '{}');
      positions[location.pathname] = window.scrollY;
      sessionStorage.setItem('scrollPositions', JSON.stringify(positions));
    };

    // Restore scroll position on mount
    const restoreScrollPosition = () => {
      const positions = JSON.parse(sessionStorage.getItem('scrollPositions') || '{}');
      const savedPosition = positions[location.pathname];
      
      if (savedPosition) {
        window.scrollTo(0, savedPosition);
      } else {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('beforeunload', saveScrollPosition);
    restoreScrollPosition();

    return () => {
      saveScrollPosition();
      window.removeEventListener('beforeunload', saveScrollPosition);
    };
  }, [location]);
}

export default useScrollRestoration;