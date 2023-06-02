import { DependencyList, useEffect, useRef } from 'react';

export default function (callback: () => void, dep: DependencyList) {
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
