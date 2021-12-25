import { graphQLRequest } from '../graphql';
import { createDetection, getCats } from '../graphql/queries';
import { identifyCat } from '../keyboards';
import { DETECTION } from '../types';
import { deleteInlineKeyboard, getEndpoint } from '../utils';

export const handleIdentifyDetection = async (
  callbackQuery: WebHookCallbackQuery
): Promise<Response> => {
  const {
    id,
    data,
    message: {
      chat: { id: chat_id },
      date,
      message_id,
    },
  } = callbackQuery;

  const [_, value] = data.split(':');

  await fetch(getEndpoint('/answerCallbackQuery'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      callback_query_id: id,
      ...(value === DETECTION.NO ? { text: '😌 Phew! Close call...' } : {}),
    }),
  });

  if (value === DETECTION.YES) {
    await graphQLRequest(
      createDetection({
        id: message_id.toString(),
        date: new Date(date * 1000).toISOString(),
        complete: false,
      })
    );

    const res = await graphQLRequest(getCats());
    const {
      data: { cats },
    } = await res.json();

    await deleteInlineKeyboard({ chat_id, message_id });

    return fetch(getEndpoint('/sendMessage'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id,
        text: '🙀 Detection confirmed! Which of the following intruders could you detect? 🤔',
        disable_notification: true,
        reply_markup: identifyCat(cats, message_id),
      }),
    });
  }

  return fetch(getEndpoint('/deleteMessage'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id,
      message_id,
    }),
  });
};
