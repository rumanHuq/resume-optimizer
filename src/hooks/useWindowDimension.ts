import { useEffect, useState } from 'react';

export function useWindowDimensions() {
  // Initialize with a sensible default for the server
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // This code ONLY runs in the browser
    function handleResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }

    // Set initial size immediately on mount
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
}
