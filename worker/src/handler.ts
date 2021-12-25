import { handleIdentifyCat } from './handlers/identifyCat';
import { handleIdentifyDetection } from './handlers/identifyDetection';
import { handleIdentifyDirection } from './handlers/identifyDirection';
import { CAT_PREFIX, DETECTION_PREFIX, DIRECTION_PREFIX } from './types';
import { getEndpoint } from './utils';

const CHAT_ID = import.meta.env.TELEGRAM_CHAT_ID;

const handleCallbackQuery = (
  callbackQuery: WebHookCallbackQuery
): Promise<Response> => {
  const { message, data } = callbackQuery;

  if (!message) {
    throw new Error('No message data found in callback query!');
  }

  const [prefix] = data.split(':');

  switch (prefix + ':') {
    case CAT_PREFIX:
      return handleIdentifyCat(callbackQuery);
    case DETECTION_PREFIX:
      return handleIdentifyDetection(callbackQuery);
    case DIRECTION_PREFIX:
      return handleIdentifyDirection(callbackQuery);
    default:
      throw new Error(`Unknown callback query prefix: ${prefix}`);
  }
};

export const handleWebhook = (body: Update): Promise<Response> => {
  const { callback_query, message } = body;
  const { id: chat_id } = callback_query?.message?.chat || message?.chat || {};

  if (chat_id?.toString() !== CHAT_ID) {
    throw new Error(`Received webhook from invalid chat ${chat_id}!`);
  }

  if (callback_query && callback_query?.data) {
    return handleCallbackQuery(callback_query);
  }

  if (message && message?.text) {
    // TODO: Handle message - reserved for later use
    // return handleMessage(message);
  }

  const message_id = callback_query?.message?.message_id || message?.message_id;

  return fetch(getEndpoint('/sendMessage'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id,
      text: 'Meow Meow! 😺',
      disable_notification: true,
      reply_to_message_id: message_id,
      allow_sending_without_reply: true,
    }),
  });
};
