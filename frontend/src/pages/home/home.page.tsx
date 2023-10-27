import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useParams,
  useState,
} from '@/common/hooks/hooks';
import { type UserChatCreateRequestDto } from '@/common/types/types';
import { Room } from '@/components/components';
import { userChatsActions } from '@/store/actions';

import {
  CreateRoomButton,
  CreateRoomModal,
  RoomList,
} from './components/components';
import styles from './styles.module.css';

const Home: React.FC = () => {
  const { chats } = useAppSelector((state) => state.userChats);
  const [isModalOpen, setModalOpen] = useState(false);

  const onClose = useCallback((): void => {
    setModalOpen(false);
  }, []);

  const onOpen = useCallback((): void => {
    setModalOpen(true);
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(userChatsActions.getAllChats());
  }, [dispatch]);

  const onCreateChat = useCallback(
    async (payload: UserChatCreateRequestDto) => {
      await dispatch(userChatsActions.createChat(payload));
      onClose();
    },
    [dispatch, onClose]
  );

  const { roomId } = useParams();
  return (
    <main className={styles.pageContainer}>
      <div className={styles.container}>
        <aside className={styles.chatsContainer}>
          <RoomList chatsArray={chats} />
          <div className={styles.createChatButtonContainer}>
            <CreateRoomButton onClick={onOpen} />
          </div>
        </aside>
        {roomId && <Room roomId={roomId} />}
      </div>
      <CreateRoomModal
        onClose={onClose}
        open={isModalOpen}
        onSubmit={onCreateChat}
      />
    </main>
  );
};

export { Home };
