import { DataStatus, SocketEvent } from '@/common/enums/enums';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useSocket,
} from '@/common/hooks/hooks';
import { type ChatMessageGetResponseDto } from '@/common/types/types';
import { messageChatActions, userChatsActions } from '@/store/actions';

import { CreateMessageInput, RoomMessagesList } from './components/components';
import { RoomHeader } from './components/header/header';
import styles from './styles.module.css';

type Properties = {
  roomId: string;
};

type NewRoomMessage = {
  message: ChatMessageGetResponseDto;
};

const Room: React.FC<Properties> = ({ roomId }) => {
  const dispatch = useAppDispatch();
  const { chat, dataStatus } = useAppSelector((state) => state.userChats);
  const socket = useSocket();
  const { messages } = useAppSelector((state) => state.chatMessages);
  const { id } = useAppSelector((state) => state.user.user);
  const isLoaded = dataStatus === DataStatus.FULFILLED;
  useEffect(() => {
    void dispatch(userChatsActions.getChatById({ roomId }));
    void dispatch(messageChatActions.loadMessages({ roomId }));
    socket.on(SocketEvent.NEW_ROOM_MESSAGE, ({ message }: NewRoomMessage) => {
      void dispatch(messageChatActions.addNewMessage(message));
    });
  }, [dispatch, roomId, socket]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeaderContainer}>
        {isLoaded ? (
          <RoomHeader
            defaultColor={chat.defaultBackgroundColor}
            chatAvatarUrl={chat.chatAvatarUrl}
            name={chat.name}
          />
        ) : (
          <h1>Loading</h1>
        )}
      </div>
      <RoomMessagesList messages={messages} userId={id} />
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
