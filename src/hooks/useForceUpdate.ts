import {useState, useCallback} from 'react';

export const useForceUpdate = () => {
  const [, setForce] = useState(false);
  const forceUpdate = useCallback(() => {
    setForce((f) => !f); 
  }, []);
  return forceUpdate;
};