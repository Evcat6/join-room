import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useParams,
  useState,
} from '@/common/hooks/hooks';
import { type UserChatCreateRequestDto } from '@/common/types/types';
import { ChatList, CreateChatModal, Room } from '@/components/components';
import { userChatsActions } from '@/store/actions';

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
    },
    [dispatch]
  );

  const { roomId } = useParams();
  return (
    <main className={styles.pageContainer}>
      <div className={styles.container}>
        <aside className={styles.chatsContainer}>
          <ChatList chatsArray={chats} />
        </aside>
        {roomId && <Room roomId={roomId} />}
      </div>
      <CreateChatModal
        onClose={onClose}
        open={isModalOpen}
        onSubmit={onCreateChat}
      />
      <button onClick={onOpen}>create chat</button>
    </main>
  );
};

export { Home };
