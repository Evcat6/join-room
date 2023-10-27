import { type ChatMessageGetResponseDto } from '@/common/types/types';

import { RoomMessage } from '../components';
import styles from './styles.module.css';

type Properties = {
  messages: ChatMessageGetResponseDto[];
  userId: string;
};

const RoomMessagesList: React.FC<Properties> = ({ messages, userId }) => {
  return (
    <div className={styles.container}>
      {messages.map((message) => (
        <RoomMessage
          isUser={message.userId === userId}
          key={message.id}
          text={message.text as string}
        />
      ))}
    </div>
  );
};

export { RoomMessagesList };
