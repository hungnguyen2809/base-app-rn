import { Dispatch, SetStateAction, useCallback, useState } from 'react';

/**
 * @param initState default: false
 */
function useToggle(initState = false): readonly [boolean, () => void, Dispatch<SetStateAction<boolean>>] {
  const [open, setOpen] = useState(initState);

  const onToggle = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return [open, onToggle, setOpen];
}

export default useToggle;
