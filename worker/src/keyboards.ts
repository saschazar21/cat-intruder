import { CAT_PREFIX, DIRECTION_PREFIX } from './types';
import { capitalizeFirstLetter } from './utils';

export const identifyCat = (
  cats: Cat[],
  message_id: number | string
): InlineKeyboardMarkup => {
  const inline_keyboard = [
    cats
      .map(({ emoji, name }) => [
        {
          text: `${emoji} ${capitalizeFirstLetter(name)}`,
          callback_data: `${CAT_PREFIX}${message_id}:${name.toLowerCase()}`,
        },
      ])
      .flat(),
  ];

  return {
    inline_keyboard,
  };
};

export const identifyDirection = (
  message_id: number | string
): InlineKeyboardMarkup => {
  const inline_keyboard = [
    [
      {
        text: '🏠 Inside',
        callback_data: `${DIRECTION_PREFIX}${message_id}:inside`,
      },
      {
        text: '🌳 Outside',
        callback_data: `${DIRECTION_PREFIX}${message_id}:outside`,
      },
    ],
  ];

  return {
    inline_keyboard,
  };
};
