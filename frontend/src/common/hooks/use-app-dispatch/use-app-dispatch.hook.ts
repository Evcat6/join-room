import { useDispatch } from 'react-redux';

import { type AppDispatch } from '@/store/store';

const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();

export { useAppDispatch };
