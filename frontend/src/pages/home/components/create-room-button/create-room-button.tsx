import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconNames } from '@/common/enums/enums';

import styles from './styles.module.css';

type Properties = {
  onClick: () => void;
};

const CreateRoomButton: React.FC<Properties> = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <FontAwesomeIcon color="white" icon={IconNames.PLUS} />
    </button>
  );
};

export { CreateRoomButton };
