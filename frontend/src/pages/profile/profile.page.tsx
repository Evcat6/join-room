import { useAppDispatch, useCallback } from '@/common/hooks/hooks';
import { type UserUpdateRequestDto } from '@/common/types/types';
import { userActions } from '@/store/actions';

import { UpdateUserForm } from './components/update-user-form/update-user-form';
import styles from './styles.module.css';

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();

  const updateUser = useCallback(
    async (values: UserUpdateRequestDto): Promise<void> => {
      await dispatch(userActions.update(values));
    },
    [dispatch]
  );

  return (
    <main className={styles.container}>
      <UpdateUserForm onSubmit={updateUser} />
    </main>
  );
};

export { UserProfile };
