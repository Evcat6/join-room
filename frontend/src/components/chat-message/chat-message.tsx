type Properties = {
  text: string;
  isUser: boolean;
};

const ChatMessage: React.FC<Properties> = ({ text }) => {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
};

export { ChatMessage };
