import { ErrorMessage } from "@hookform/error-message";
import {
  UseFormRegister,
  RegisterOptions,
  Path,
  DeepMap,
  FieldError,
} from "react-hook-form";

interface InputProps<FormFields>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: Path<FormFields>;
  name: Path<FormFields>;
  errors?: Partial<DeepMap<FormFields, FieldError>>;
  register?: UseFormRegister<FormFields>;
  rules?: RegisterOptions;
  labelHelperText?: string;
  showLabel?: boolean;
}

const Input = <FormFields extends Record<keyof FormFields, unknown>>({
  label,
  name,
  labelHelperText,
  type,
  errors,
  register,
  rules,
  disabled,
  defaultValue,
  showLabel = true,
}: InputProps<FormFields>) => {
  return (
    <div className="form-control mb-3">
      {showLabel && (
        <label className="label font-medium">
          <span className="label-text capitalize">{label}</span>
        </label>
      )}

      {labelHelperText && (
        <span className="text-sm text-gray-500 ml-1 mb-2 -mt-1">
          {labelHelperText}
        </span>
      )}

      <input
        type={type}
        defaultValue={defaultValue}
        className="input w-full"
        {...register?.(label, rules)}
        disabled={disabled}
      />

      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => (
          <label className="label">
            <span className="label-text-alt text-error">{message}</span>
          </label>
        )}
      />

      {/* {errors && errors[label] && (
        <label className="label">
          <span className="label-text-alt text-error">
            {errors[label].message}
          </span>
        </label>
      )} */}
    </div>
  );
};

export default Input;
