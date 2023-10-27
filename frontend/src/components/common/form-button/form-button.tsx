import { ButtonType } from '@/common/enums/button-type.enum';

import styles from './styles.module.css';

type Properties = {
  children: React.ReactNode;
  type?: ButtonType;
  disabled?: boolean;
};

const FormButton: React.FC<Properties> = ({
  children,
  type = ButtonType.BUTTON,
  disabled = false,
}) => {
  return (
    <button disabled={disabled} className={styles.button} type={type}>
      {children}
    </button>
  );
};

export { FormButton };
