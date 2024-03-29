import { useAppDispatch, useCallback } from '@/common/hooks/hooks';
import { type UserSignInRequestDto } from '@/common/types/types';
import { userActions } from '@/store/actions';

import { SignInForm } from './components/components';

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    async (payload: UserSignInRequestDto): Promise<void> => {
      await dispatch(userActions.signIn(payload));
    },
    [dispatch]
  );

  return <SignInForm onSubmit={onSubmit} />;
};

export { SignIn };
