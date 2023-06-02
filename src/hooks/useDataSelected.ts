import { cloneDeep, concat, filter, map } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';

function useDataSelected<T = any>(listData: T[], rowKey: string) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const [dataChecked, setDataChecked] = useState<{ row: T; value: boolean }>();

  useEffect(() => {
    if (dataChecked && dataChecked.row) {
      if (dataChecked.value) {
        //@ts-ignore
        const newLstKey = concat(selectedKeys, [dataChecked.row[rowKey]]);
        const newLstRow = concat(selectedRows, [dataChecked.row]);
        setSelectedKeys(newLstKey);
        setSelectedRows(newLstRow);
      } else {
        //@ts-ignore
        const newLstKey = filter(selectedKeys, (key) => key !== dataChecked.row[rowKey]);
        setSelectedKeys(newLstKey);
        //@ts-ignore
        const newLstRow = filter(selectedRows, (item) => item[rowKey] !== dataChecked.row[rowKey]);
        setSelectedRows(newLstRow);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataChecked]);

  useEffect(() => {
    if (listData.length > 0) {
      setCheckedAll(selectedKeys.length === listData.length);
    } else {
      setCheckedAll(false);
    }
  }, [selectedKeys, listData]);

  const onChangeCheckedAll = useCallback(
    (value: boolean) => {
      if (value) {
        //@ts-ignore
        const keyChecked = map(listData, (item) => item[rowKey]);
        setSelectedKeys(keyChecked);
        setSelectedRows(cloneDeep(listData));
      } else {
        setSelectedKeys([]);
        setSelectedRows([]);
      }
    },
    [listData, rowKey],
  );

  const onResetSelected = useCallback(
    (listKey?: React.Key[]) => {
      if (listKey) {
        const newLstKey = filter(selectedKeys, (key) => listKey.includes(key));
        setSelectedKeys(newLstKey);
        //@ts-ignore
        const newLstRow = filter(selectedRows, (item) => listKey.includes(item[rowKey]));
        setSelectedRows(newLstRow);
      } else {
        setSelectedKeys([]);
        setSelectedRows([]);
      }
    },
    [rowKey, selectedKeys, selectedRows],
  );

  return { checkedAll, selectedKeys, selectedRows, onChangeCheckedAll, setDataChecked, onResetSelected } as const;
}

export default useDataSelected;
