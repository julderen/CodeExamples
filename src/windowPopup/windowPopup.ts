import { checkWindowClosed, getWindowOpenParams } from './utils';
import { DEFAULT_POPUP_SIZE } from './constants';
import { HandlerWindowMessageEvent, Params } from './types';

export const openWindowPopup = (params: Params) =>
  new Promise<string>((resolve, reject) => {
    const popupWindow = window.open(
      params.url,
      params.name,
      getWindowOpenParams(params.size || DEFAULT_POPUP_SIZE)
    );

    if (!popupWindow) {
      reject();
      return;
    }

    const { origin: domainRef } = new URL(params.url);

    const [checkingCloseWindow, stopCheckingCloseWindow] = checkWindowClosed(
      popupWindow
    );

    const cleanUp = (windowHandlerMessageEvent?: HandlerWindowMessageEvent) => {
      stopCheckingCloseWindow();

      if (windowHandlerMessageEvent) {
        window.removeEventListener('message', windowHandlerMessageEvent);
      }
    };

    const handlerMessageEvent: HandlerWindowMessageEvent = (event) => {
      if (event.origin === domainRef && event.data.state === params.id) {
        cleanUp(handlerMessageEvent);

        if (event.data.error) {
          reject(Error(event.data.error));
        }

        resolve(event.data.result);
      }
    };

    window.addEventListener('message', handlerMessageEvent);

    checkingCloseWindow.then(() => {
      reject(Error('Закрыто окно с авторизацией'));
      cleanUp(handlerMessageEvent);
    });
  });
