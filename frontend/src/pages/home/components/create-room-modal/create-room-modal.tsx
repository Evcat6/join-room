import { joiResolver } from '@hookform/resolvers/joi';

import { ButtonType } from '@/common/enums/button-type.enum';
import { InputType } from '@/common/enums/input-type.enum';
import { useForm } from '@/common/hooks/hooks';
import { type UserChatCreateRequestDto } from '@/common/types/types';
import { CreateChatValidationSchema } from '@/common/validation-schemas/validation-schemas';
import { BaseModal, FormButton, FormInput } from '@/components/components';

import styles from './styles.module.css';

type Properties = {
  onSubmit: (payload: UserChatCreateRequestDto) => void;
  open: boolean;
  onClose: () => void;
};

const CreateRoomModal: React.FC<Properties> = ({ onSubmit, open, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserChatCreateRequestDto>({
    mode: 'onBlur',
    resolver: joiResolver(CreateChatValidationSchema),
  });
  return (
    <BaseModal onClose={onClose} open={open}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <FormInput
          error={errors.name?.message}
          placeholder="Enter Chat Name"
          type={InputType.TEXT}
          label="name"
          name="name"
          register={register}
        />
        <FormInput
          name="description"
          error={errors.description?.message}
          register={register}
          label="description"
          placeholder="Enter Chat Description"
          type={InputType.TEXT}
        />
        <div className={styles.buttonContainer}>
          <div className={styles.button}>
            <FormButton type={ButtonType.SUBMIT}>Create Chat</FormButton>
          </div>
        </div>
      </form>
    </BaseModal>
  );
};

export { CreateRoomModal };
