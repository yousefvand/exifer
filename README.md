# exifer

Telegram exif reader bot.
Extracts information attached to `jpg` images (send as file in Telegram)

## Install

```bash
git clone https://github.com/yousefvand/exifer.git
cd exifer
TELEGRAM_APIKEY=<TELEGRAM API KEY> node index.js
```

## Docker

Run your exifer using docker image.

```bash
docker run -d --name exiferbot -e TELEGRAM_APIKEY=<TELEGRAM API KEY> --restart always remisa/exifer
```