import {
  type AnyAction,
  type Dispatch,
  isRejected,
  type Middleware,
} from '@reduxjs/toolkit';

import { notificationService } from '@/services/services';

const handleError: Middleware = () => {
  return (next: Dispatch) => {
    return (action: AnyAction): AnyAction => {
      const result = next(action);

      if (isRejected(result) && !result.meta.rejectedWithValue) {
        const error =
          result.error.message ??
          'Something went wrong. Please try again later.';
        notificationService.error(error);
      }

      return result;
    };
  };
};

export { handleError };
