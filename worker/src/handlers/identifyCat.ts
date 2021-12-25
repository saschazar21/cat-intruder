import { graphQLRequest } from '../graphql';
import { updateDetection } from '../graphql/queries';
import { identifyDirection } from '../keyboards';
import {
  capitalizeFirstLetter,
  deleteInlineKeyboard,
  getEndpoint,
} from '../utils';

export const handleIdentifyCat = async (
  callbackQuery: WebHookCallbackQuery
): Promise<Response> => {
  const {
    id,
    data,
    message: {
      chat: { id: chat_id },
      message_id: callback_message_id,
    },
  } = callbackQuery;

  const [_, message_id, value] = data.split(':');

  await fetch(getEndpoint('/answerCallbackQuery'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      callback_query_id: id,
    }),
  });

  const name = value !== 'other' && capitalizeFirstLetter(value);
  const text =
    (name ? `🐱🐾 So it was ${name}!` : '👽 An alien?') +
    ' Which direction did the intruder go?';

  await graphQLRequest(updateDetection({ id: message_id, intruders: [value] }));

  await deleteInlineKeyboard({ chat_id, message_id: callback_message_id });

  return fetch(getEndpoint('/sendMessage'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id,
      text,
      disable_notification: true,
      reply_markup: identifyDirection(message_id),
    }),
  });
};
