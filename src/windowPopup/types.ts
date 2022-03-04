export type PopupSize = {
  width: number;
  height: number;
};

export type HandlerWindowMessageEvent = WindowEventHandlers['onmessage'];

export type Params = {
  url: string;
  name: string;
  id: string;
  size?: PopupSize;
};
