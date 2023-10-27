import { useAppDispatch, useCallback } from '@/common/hooks/hooks';
import { type UserSignUpRequestDto } from '@/common/types/types';
import { userActions } from '@/store/actions';

import { SignUpForm } from './components/components';

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    async (payload: UserSignUpRequestDto): Promise<void> => {
      await dispatch(userActions.signUp(payload));
    },
    [dispatch]
  );

  return (
    <main>
      <SignUpForm onSubmit={onSubmit} />
    </main>
  );
};

export { SignUp };
