import { Link } from 'react-router-dom';

import { AppRoute } from '@/common/enums/app-route.enum.js';

import { useLocation } from '../../common/hooks/hooks';
import { SignIn, SignUp } from '../pages';
import styles from './styles.module.css';

const Auth: React.FC = () => {
  const { pathname } = useLocation();

  const getScreen = (screen: string): React.ReactNode => {
    if (screen.includes(AppRoute.SIGN_IN)) {
      return <SignIn />;
    }
    if (screen.includes(AppRoute.SIGN_UP)) {
      return <SignUp />;
    }
    return null;
  };

  const title = pathname.includes(AppRoute.SIGN_IN) ? (
    <>
      No Account?{' '}
      <Link className={styles.link} to={AppRoute.SIGN_UP}>
        Sign up
      </Link>{' '}
      there
    </>
  ) : (
    <>
      Already have an account?{' '}
      <Link className={styles.link} to={AppRoute.SIGN_IN}>
        Sign in
      </Link>{' '}
      here.
    </>
  );

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>{title}</h1>
        {getScreen(pathname)}
      </div>
    </div>
  );
};

export { Auth };
