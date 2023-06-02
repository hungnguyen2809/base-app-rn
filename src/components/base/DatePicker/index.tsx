import React from 'react';
import RNDatePicker, { DatePickerProps as RNDatePickerProps } from 'react-native-date-picker';

interface DatePickerProps extends Omit<RNDatePickerProps, 'onDateChange' | 'modal'> {}

const DatePicker: React.FC<DatePickerProps> = (props) => {
  return (
    <RNDatePicker
      modal
      locale="vi"
      mode="date"
      title="Chọn ngày"
      cancelText="Hủy"
      confirmText="Xác nhận"
      androidVariant="nativeAndroid"
      {...props}
    />
  );
};

export default DatePicker;
