import { Navigate } from 'react-router-dom';

import { useParams } from '@/common/hooks/hooks';

const RoomInvite: React.FC = () => {
  const { roomId } = useParams();

  return <Navigate to={`/home/room/${roomId}`} />;
};

export { RoomInvite };
