import { useRoute } from '@react-navigation/native';
import { useMemo } from 'react';

function useParamsRoute<T = any>() {
  const route = useRoute();

  return useMemo(() => route.params || {}, [route]) as Readonly<T>;
}

export default useParamsRoute;
