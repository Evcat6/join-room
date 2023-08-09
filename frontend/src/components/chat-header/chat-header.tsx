import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconNames } from '@/common/enums/icons-names.enum';

import { BaseImg } from '../components';
import styles from './styles.module.css';

type Properties = {
  chatAvatarUrl: string | undefined;
  name: string;
  defaultColor: string;
};

const ChatHeader: React.FC<Properties> = ({
  chatAvatarUrl,
  name,
  defaultColor,
}) => {
  return (
    <header className={styles.container}>
      <div className={styles.chatDetailsContainer}>
        <BaseImg src={chatAvatarUrl} defaultColor={defaultColor} alt={name} />
        <span>{name}</span>
      </div>
      <div>
        <FontAwesomeIcon icon={IconNames.ELLIPSIS_VERTICAL} />
      </div>
    </header>
  );
};

export { ChatHeader };
