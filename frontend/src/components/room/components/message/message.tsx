import classNames from 'classnames';

import styles from './styles.module.css';

type Properties = {
  text: string;
  isUser: boolean;
};

const RoomMessage: React.FC<Properties> = ({ text, isUser }) => {
  const className = classNames(
    styles.message,
    isUser ? styles.userMessage : styles.notUserMessage
  );

  return (
    <div className={className}>
      <p>{text}</p>
    </div>
  );
};

export { RoomMessage };
