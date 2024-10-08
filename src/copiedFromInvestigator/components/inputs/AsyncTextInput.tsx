import { useAsyncUpdate } from "../../hooks/useAsyncUpdate";
import { TextInput } from "./TextInput";

export type AsyncTextInputProps = {
  value: undefined | string;
  onChange: (newValue: string, index?: number) => void;
  index?: number;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
};

export const AsyncTextInput = ({
  value = "",
  onChange: onChangeOrig,
  className,
  disabled,
  placeholder,
  index,
}: AsyncTextInputProps) => {
  const { onChange, onFocus, onBlur, display } = useAsyncUpdate(
    value,
    onChangeOrig,
  );

  return (
    <TextInput
      className={className}
      value={display}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
};
