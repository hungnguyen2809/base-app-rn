import { Colors, Fonts } from '@/constants';
import { DeviceUtils, fontScale, scale } from '@/utils';
import React, { forwardRef, memo, useId } from 'react';
import {
  Button,
  InputAccessoryView,
  Keyboard,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Block from '../Block';
import TextBase from '../TextBase';
import TextError from '../TextError';

interface TextInputBaseProps extends TextInputProps {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  errorText?: string;
  showSearch?: boolean;
  showScan?: boolean;
  useInputAccessoryView?: boolean;
  contentInputAccessoryView?: React.ReactNode;
  buttonInputAccessoryView?: { title?: string; onPress: () => void };
  normalize?: (value: any) => any;
  onPressScan?: () => void;
}

const TextInputBase: React.ForwardRefRenderFunction<TextInput, TextInputBaseProps> = (
  {
    style,
    iconLeft,
    iconRight,
    errorText,
    inputStyle,
    containerStyle,
    useInputAccessoryView,
    contentInputAccessoryView,
    buttonInputAccessoryView,
    normalize,
    onPressScan,
    onChangeText,
    ...restProps
  },
  ref,
) => {
  const inputAccessoryViewId = useId();

  const handleChangeText = (text: string) => {
    onChangeText?.(normalize ? normalize(text) : text);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.inputContainer, containerStyle, errorText ? styles.errorField : {}]}>
        <View style={styles.inputSubContainer}>
          {iconLeft ? (
            iconLeft
          ) : restProps.showSearch ? (
            <IonIcons
              size={scale(22)}
              name="search-outline"
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: scale(10) }}
            />
          ) : null}
          <TextInput
            ref={ref}
            onChangeText={handleChangeText}
            selectionColor={Colors.DEFAULT_GREY}
            placeholderTextColor={Colors.DEFAULT_GREY2}
            inputAccessoryViewID={inputAccessoryViewId}
            style={[styles.inputText, restProps.multiline ? styles.inputMultiline : {}, inputStyle]}
            {...restProps}
          />
          {iconRight ? (
            iconRight
          ) : restProps.showScan ? (
            <TouchableOpacity activeOpacity={0.5} onPress={onPressScan}>
              <MCIcons size={scale(20)} name="qrcode-scan" color={Colors.PRIMARY} style={{ marginLeft: scale(10) }} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {errorText && (
        <View style={styles.wrapTextError}>
          <TextError message={errorText} />
        </View>
      )}

      {DeviceUtils.isIOS && useInputAccessoryView ? (
        <InputAccessoryView nativeID={inputAccessoryViewId}>
          {contentInputAccessoryView ? (
            contentInputAccessoryView
          ) : (
            <Block
              borderTopWidth={0.5}
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              borderTopColor={Colors.DEFAULT_GREY}
              backgroundColor={Colors.DEFAULT_WHITE}>
              <Block width={50} />
              <TextBase numberOfLines={1} style={styles.textPlaceholder}>
                {restProps.placeholder}
              </TextBase>
              <Button
                title={buttonInputAccessoryView?.title || 'Xong'}
                onPress={buttonInputAccessoryView?.onPress ? buttonInputAccessoryView?.onPress : Keyboard.dismiss}
              />
            </Block>
          )}
        </InputAccessoryView>
      ) : null}
    </View>
  );
};

export default memo(forwardRef(TextInputBase));

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    borderRadius: 8,
    borderWidth: 0.5,
    justifyContent: 'center',
    borderColor: Colors.LIGHT_GREY2,
    backgroundColor: Colors.LIGHT_GREY,
    paddingVertical: scale(8),
    paddingHorizontal: scale(15),
  },
  inputSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    flex: 1,
    margin: 0,
    padding: 0,
    textAlignVertical: 'center',
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.REGULAR,
    height: scale(25),
    fontSize: fontScale(14),
  },
  textPlaceholder: {
    flex: 1,
    fontSize: fontScale(12),
    textAlign: 'center',
  },
  inputMultiline: {
    minHeight: scale(35),
    maxHeight: scale(50),
    textAlignVertical: 'top',
  },
  errorField: {
    borderColor: Colors.DEFAULT_RED,
  },
  wrapTextError: {
    marginTop: scale(3),
    marginHorizontal: scale(5),
  },
});
