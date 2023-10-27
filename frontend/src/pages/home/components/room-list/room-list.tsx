import { type UserChatGetResponseDto } from 'shared/build';

import { RoomItem } from '../components';
import styles from './styles.module.css';

type Properties = {
  chatsArray: UserChatGetResponseDto[];
};

const RoomList: React.FC<Properties> = ({ chatsArray }) => {
  return (
    <ul className={styles.container}>
      {chatsArray.length > 0
        ? chatsArray.map((chat) => (
            <RoomItem
              id={chat.id}
              key={chat.id}
              name={chat.name}
              chatAvatarUrl={chat.chatAvatarUrl}
              defaultBackgroundColor={chat.defaultBackgroundColor}
            />
          ))
        : 'no chats yet'}
    </ul>
  );
};

export { RoomList };
