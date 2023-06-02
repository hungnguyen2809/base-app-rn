import { useMemo } from 'react';

/**
 *
 * @param total total item
 * @param pageSize page size, default 10
 * @returns max page size item
 */
function useMaxPage(total: number, pageSize = 10) {
  return useMemo(() => Math.ceil(total / pageSize), [total, pageSize]);
}

export default useMaxPage;
