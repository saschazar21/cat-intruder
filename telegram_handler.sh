#!/usr/bin/env bash

# Telegram Bot Handler
# Author: Sascha Zarhuber
# Licensed under the MIT license
# 
# This script is used to send messages to a Telegram Bot.
# ---------------------------------------------------------
# Be sure to set TELEGRAM_BOT_TOKEN
# and TELEGRAM_CHAT_ID in your environment.
# (For systemd, set an EnvironmentFile directive)

VIDEO_WIDTH=640
VIDEO_HEIGHT=480

###########################################################
#                                                         #
#                   Script logic below,                   #
#                  edit at your own risk.                 #
#                                                         #
###########################################################

if [[ -z $TELEGRAM_BOT_TOKEN ]]; then
  echo "TELEGRAM_BOT_TOKEN env unset!"
  exit 1
fi

if [[ -z $TELEGRAM_CHAT_ID ]]; then
  echo "TELEGRAM_CHAT_ID env unset!"
  exit 1
fi

API_URL=https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN

reply_markup() {
  KEYBOARD='{ "inline_keyboard": [ [ { "text": "😼 Yes", "callback_data": "detected:yes" }, { "text": "❌ No", "callback_data": "detected:no" } ] ] }'

  if [[ -x $(which jq) ]]; then
    echo $KEYBOARD | jq -cr .
  else
    echo $KEYBOARD
  fi
}

send_video() {
  VIDEO_PATH=$1

  if [[ -z $VIDEO_PATH ]]; then
    echo "No video path given, or file missing!"
    exit 1
  fi

  URL=$API_URL/sendVideo

  curl -LX POST $URL \
    -H "Content-Type: multipart/form-data" \
    -F "chat_id=\"$TELEGRAM_CHAT_ID\"" \
    -F "video=@\"$VIDEO_PATH\"" \
    -F "caption=\"Intruder detected?\"" \
    -F "width=\"$VIDEO_WIDTH\"" \
    -F "height=\"$VIDEO_HEIGHT\"" \
    -F "reply_markup=$(reply_markup)"
}

if [[ -e $1 ]]; then
  send_video $1
else
  echo "File $1 missing! Aborting..."
  exit 1
fi
