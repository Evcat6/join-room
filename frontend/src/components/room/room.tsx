import { DataStatus } from '@/common/enums/enums';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '@/common/hooks/hooks';
import { messageChatActions, userChatsActions } from '@/store/actions';

import { ChatHeader, CreateMessageInput } from '../components';
import styles from './styles.module.css';

type Properties = {
  roomId: string;
};

const Room: React.FC<Properties> = ({ roomId }) => {
  const dispatch = useAppDispatch();
  const { chat, dataStatus } = useAppSelector((state) => state.userChats);
  const isLoaded = dataStatus === DataStatus.FULFILLED;
  useEffect(() => {
    void dispatch(userChatsActions.getChatById({ roomId }));
    void dispatch(messageChatActions.loadMessages({ roomId }));
  }, [dispatch, roomId]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeaderContainer}>
        {isLoaded ? (
          <ChatHeader
            defaultColor={chat.defaultBackgroundColor}
            chatAvatarUrl={chat.chatAvatarUrl}
            name={chat.name}
          />
        ) : (
          <h1>Loading</h1>
        )}
      </div>
      <div className={styles.input_container}>
        <CreateMessageInput
          roomId={roomId}
          placeholder="write new message"
          disabled={!isLoaded}
        />
      </div>
    </div>
  );
};

export { Room };
