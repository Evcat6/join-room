import { joiResolver } from '@hookform/resolvers/joi';

import { ButtonType, InputType } from '@/common/enums/enums';
import { useForm } from '@/common/hooks/hooks';
import { type UserSignInRequestDto } from '@/common/types/types';
import { SignInValidationSchema } from '@/common/validation-schemas/validation-schemas';
import { FormButton, FormInput } from '@/components/components';

import styles from './styles.module.css';

type FormData = {
  email: string;
  password: string;
};

type Properties = {
  onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: joiResolver(SignInValidationSchema),
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
      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <FormButton type={ButtonType.SUBMIT}>Sign In</FormButton>
        </div>
      </div>
    </form>
  );
};

export { SignInForm };
