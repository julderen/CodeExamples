import { PopupSize } from './types';
import { TIME_INTERVAL_CHECKING_CLOSED } from './constants';

export const getWindowOpenParams = (size: PopupSize) => {
  // вычисление координат popup относительно экрана для центрирования в открытом окне
  const left = window.screenLeft + window.innerWidth / 2 - size.width / 2;
  const top = window.screenTop + window.innerHeight / 2 - size.height / 2;

  return `width=${size.width},height=${size.height},resizable=no,status=no,location=no,toolbar=no,menubar=no,left=${left},top=${top}`;
};

// сообщает о закрытие окна через проверку параметра с помощью интервала
export const checkWindowClosed = (
  windowToCheck: Window
): [Promise<void>, () => void] => {
  let timer: ReturnType<typeof setInterval> | null = null;

  const checkingCloseWindow = new Promise<void>((resolve) => {
    timer = setInterval(() => {
      if (windowToCheck.closed) {
        resolve();
      }
    }, TIME_INTERVAL_CHECKING_CLOSED);
  });

  const stopCheckingCloseWindow = () => {
    if (timer) {
      window.clearInterval(timer);
    }
  };

  return [checkingCloseWindow, stopCheckingCloseWindow];
};
