import { joiResolver } from '@hookform/resolvers/joi';

import { ButtonType, InputType } from '@/common/enums/enums';
import { useForm } from '@/common/hooks/hooks';
import { type UserSignUpRequestDto } from '@/common/types/types';
import { SignUpValidationSchema } from '@/common/validation-schemas/validation-schemas';

import { FormButton, FormInput } from '../components';
import styles from './styles.module.css';

type FormData = {
  email: string;
  password: string;
  repeatPassword: string;
};

type Properties = {
  onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: joiResolver(SignUpValidationSchema),
  });

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        placeholder="Enter Email"
        type={InputType.EMAIL}
        error={errors.email?.message}
        label="email"
        name="email"
        register={register}
      />
      <FormInput
        type={InputType.PASSWORD}
        error={errors.password?.message}
        placeholder="Enter password"
        label="password"
        name="password"
        register={register}
      />
      <FormInput
        type={InputType.PASSWORD}
        error={errors.repeatPassword?.message}
        placeholder="Repeat password"
        label="Repeat Password"
        name="repeatPassword"
        register={register}
      />
      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <FormButton type={ButtonType.SUBMIT}>Sign Up</FormButton>
        </div>
      </div>
    </form>
  );
};

export { SignUpForm };
