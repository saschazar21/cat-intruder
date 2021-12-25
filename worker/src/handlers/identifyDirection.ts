import { graphQLRequest } from '../graphql';
import { updateDetection } from '../graphql/queries';
import { deleteInlineKeyboard, getEndpoint } from '../utils';

export const handleIdentifyDirection = async (
  callbackQuery: WebHookCallbackQuery
): Promise<Response> => {
  const {
    id,
    data,
    message: {
      message_id: callback_message_id,
      chat: { id: chat_id },
    },
  } = callbackQuery;

  const [_, message_id, value] = data.split(':');

  await graphQLRequest(
    updateDetection({
      id: message_id,
      direction: value as 'inside' | 'outside',
      complete: true,
    })
  );

  await deleteInlineKeyboard({ chat_id, message_id: callback_message_id });

  await fetch(getEndpoint('/answerCallbackQuery'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      callback_query_id: id,
    }),
  });

  return fetch(getEndpoint('/sendMessage'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id,
      text: `🙏 Thanks – We'll keep looking for it ${value}!`,
      disable_notification: true,
    }),
  });
};
