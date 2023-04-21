import {
  type FieldValues,
  type Path,
  type RegisterOptions,
  type UseFormRegister,
} from 'react-hook-form';

import { InputType } from '@/common/enums/enums';

import styles from './styles.module.css';

type Properties<T extends FieldValues = FieldValues> = {
  label: string;
  name: Path<T>;
  type?: InputType;
  register: UseFormRegister<T>;
  defaultValue?: string | number | readonly string[];
  rules?: RegisterOptions<T>;
  placeholder?: string;
  error?: string;
};

function FormInput<T extends FieldValues = FieldValues>({
  label,
  name,
  type = InputType.TEXT,
  register,
  defaultValue,
  rules,
  error,
  placeholder,
}: Properties<T>): JSX.Element {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        placeholder={placeholder}
        type={type}
        {...register(name, rules)}
        defaultValue={defaultValue}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

export { FormInput };
