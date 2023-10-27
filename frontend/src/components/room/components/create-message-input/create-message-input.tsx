import { type ChangeEvent, type FormEvent } from 'react';

import { useAppDispatch, useCallback, useState } from '@/common/hooks/hooks';
import { messageChatActions } from '@/store/actions';

import styles from './styles.module.css';

type Properties = {
  disabled?: boolean;
  placeholder: string;
  roomId: string;
};

const CreateMessageInput: React.FC<Properties> = ({
  disabled = false,
  placeholder,
  roomId,
}) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState<string>('');

  const updateInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setText(event.target.value);
    },
    []
  );

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      await dispatch(
        messageChatActions.createMessage({ chatId: roomId, text })
      );
      setText('');
    },
    [dispatch, roomId, text]
  );

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <input
        type="text"
        className={styles.input}
        onChange={updateInput}
        value={text}
        disabled={disabled}
        placeholder={placeholder}
      />
      <button type="submit" disabled={disabled} className={styles.button}>
        Send
      </button>
    </form>
  );
};

export { CreateMessageInput };
