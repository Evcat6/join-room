import { NavLink } from 'react-router-dom';

import { BaseImg } from '@/components/components';

import styles from './styles.module.css';

type Properties = {
  id: string;
  name: string;
  chatAvatarUrl: string | undefined;
  defaultBackgroundColor: string;
};

const RoomItem: React.FC<Properties> = ({
  id,
  name,
  chatAvatarUrl,
  defaultBackgroundColor,
}) => {
  return (
    <li>
      <NavLink to={`/home/room/${id}`} className={styles.container}>
        <BaseImg
          alt={name}
          defaultColor={defaultBackgroundColor}
          src={chatAvatarUrl}
        />
        <p>{name}</p>
      </NavLink>
    </li>
  );
};

export { RoomItem };
