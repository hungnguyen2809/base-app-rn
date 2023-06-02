import { ToastSnackbar } from '@/components';
import { logger } from '@/utils';
import Clipboard from '@react-native-clipboard/clipboard';
import { useCallback } from 'react';

type CopyFn = (text?: string | null) => boolean;

function useCopyToClipboard(noti = true): [CopyFn] {
  const copy: CopyFn = useCallback(
    (text) => {
      if (!text) return false;

      try {
        Clipboard.setString(text);
        if (noti) {
          ToastSnackbar.openSuccess('Copy thành công', { duration: 800 });
        }

        return true;
      } catch (error) {
        logger.error('Copy error', error);
        return false;
      }
    },
    [noti],
  );

  return [copy];
}

export default useCopyToClipboard;
