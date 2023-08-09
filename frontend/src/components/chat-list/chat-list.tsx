import { type UserChatGetResponseDto } from 'shared/build';

import { ChatItem } from '../components';
import styles from './styles.module.css';

type Properties = {
  chatsArray: UserChatGetResponseDto[];
};

const ChatList: React.FC<Properties> = ({ chatsArray }) => {
  return (
    <ul className={styles.container}>
      {chatsArray.length > 0
        ? chatsArray.map((chat) => (
            <ChatItem
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

export { ChatList };
