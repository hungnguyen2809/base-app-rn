import { useCallback, useState, useTransition } from 'react';

/**
 * @returns textValue, filterValue, onChangeText, isPending
 */
function useTextFilter() {
  const [isPending, startTransition] = useTransition();
  const [textValue, setTextValue] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');

  const onChangeText = useCallback((text: string) => {
    setTextValue(text);
    startTransition(() => {
      setFilterValue(text);
    });
  }, []);

  return [textValue, filterValue, onChangeText, isPending] as const;
}

export default useTextFilter;
