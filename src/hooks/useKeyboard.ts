import { useAppDispatch } from '@/app/hooks';
import { actionCommonKeyboard } from '@/redux/common/actions';
import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent, KeyboardStatic } from 'react-native';

/**
 * @param global @default false
 * @returns keyboardOpen, keyboardHeight, Keyboard Instance
 */
function useKeyboard(global = false): readonly [boolean, number, KeyboardStatic] {
  const dispatch = useAppDispatch();

  const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  useEffect(() => {
    const keyboardDidShow = (event: KeyboardEvent) => {
      if (global) {
        dispatch(actionCommonKeyboard({ open: true, height: event.endCoordinates.height }));
      } else {
        setKeyboardOpen(true);
        setKeyboardHeight(event.endCoordinates.height);
      }
    };

    const keyboardDidHide = () => {
      if (global) {
        dispatch(actionCommonKeyboard({ open: false, height: 0 }));
      } else {
        setKeyboardOpen(false);
        setKeyboardHeight(0);
      }
    };

    const listenerShow = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const listenerHide = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      listenerShow.remove();
      listenerHide.remove();
    };
  }, [dispatch, global]);

  return [keyboardOpen, keyboardHeight, Keyboard] as const;
}

export default useKeyboard;
