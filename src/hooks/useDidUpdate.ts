import { useEffect, useRef, DependencyList } from 'react';

function useDidUpdate(callback: () => void, dep: DependencyList) {
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (isMounted.current) {
      callback();
    } else {
      isMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dep);
}

export default useDidUpdate;
