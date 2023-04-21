import { type toast } from 'react-toastify';

class Notification {
  private notification: typeof toast;

  public constructor(notification: typeof toast) {
    this.notification = notification;
  }

  public success(message: string): void {
    this.notification.success(message);
  }

  public warn(message: string): void {
    this.notification.warn(message);
  }

  public error(message: string): void {
    this.notification.error(message);
  }

  public warning(message: string): void {
    this.notification.warning(message);
  }

  public info(message: string): void {
    this.notification.info(message);
  }
}

export { Notification };
