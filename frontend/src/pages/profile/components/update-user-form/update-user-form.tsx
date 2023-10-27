import { joiResolver } from '@hookform/resolvers/joi';

import { ButtonType } from '@/common/enums/enums';
import { useAppSelector, useForm } from '@/common/hooks/hooks';
import { type UserUpdateRequestDto } from '@/common/types/types';
import { UserUpdateValidationSchema } from '@/common/validation-schemas/validation-schemas';

import { FormButton, FormInput } from '../components';
import styles from './styles.module.css';

type Properties = {
  onSubmit: (values: UserUpdateRequestDto) => Promise<void>;
};

const UpdateUserForm: React.FC<Properties> = ({ onSubmit }) => {
  const { user, isUserLoaded } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpdateRequestDto>({
    mode: 'onBlur',
    resolver: joiResolver(UserUpdateValidationSchema),
    defaultValues: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <FormInput
        register={register}
        label={'First Name'}
        name={'firstName'}
        error={errors.firstName?.message}
      />
      <FormInput
        register={register}
        label={'Last Name'}
        name={'lastName'}
        error={errors.lastName?.message}
      />
      <FormInput
        register={register}
        label={'Email'}
        name={'email'}
        error={errors.email?.message}
      />
      <FormInput
        register={register}
        label={'Username'}
        name={'userName'}
        error={errors.userName?.message}
      />
      <FormButton disabled={!isUserLoaded} type={ButtonType.SUBMIT}>
        Update
      </FormButton>
    </form>
  );
};

export { UpdateUserForm };
