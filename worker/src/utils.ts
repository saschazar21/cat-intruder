export const API_URL = 'https://api.telegram.org';

export const API_BOT_PATH = '/bot' + import.meta.env.TELEGRAM_BOT_TOKEN;

export const getEndpoint = (endpoint: string): string =>
  new URL(API_BOT_PATH + endpoint, API_URL).toString();

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const deleteInlineKeyboard = async ({
  chat_id,
  message_id,
}: {
  chat_id: number;
  message_id: number;
}): Promise<Response> =>
  fetch(getEndpoint('/editMessageReplyMarkup'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id,
      message_id,
      reply_markup: {
        inline_keyboard: [],
      },
    }),
  });
