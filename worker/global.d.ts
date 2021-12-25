interface ImportMeta {
  env: Record<string, string>;
}

declare type Cat = {
  name: string;
  emoji: string;
};

declare type BaseKeyboardButton = {
  text: string;
};

declare type InlineKeyboardButton = BaseKeyboardButton & {
  url?: string;
  callback_data?: string;
};

declare type InlineKeyboardMarkup = {
  inline_keyboard: InlineKeyboardButton[][];
};

declare type MessageSender = {
  id: number;
  is_bot: boolean;
  first_name: string;
  username: string;
};

declare type WebHookCallbackQuery = BaseMessage & {
  chat_instance: string;
  id: string;
  message: WebHookMessage;
  data: string;
};

declare type WebHookMessage = BaseMessage & {
  chat: {
    id: number;
    title: string;
    type: string;
  };
  date: number;
  message_id: number;
  reply_to_message?: WebHookMessage;
  text: string;
};

declare type BaseMessage = {
  from: MessageSender;
};

declare type Detection = {
  id: string;
  complete?: boolean;
  intruders?: string[];
  direction?: 'inside' | 'outside';
  date?: string;
  video?: {
    id: string;
    provider: string;
  };
};

declare type Update = {
  update_id: number;
  message?: WebHookMessage;
  callback_query?: WebHookCallbackQuery;
};

declare type Query = {
  query: string;
  variables?: Record<string, any>;
};
