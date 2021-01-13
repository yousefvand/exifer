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

**CAUTION:** following docker image is not maintained. Publish and use your own image on [docker hub](https://hub.docker.com) (or use local image without publishing).

```bash
docker run -d --name exiferbot -e TELEGRAM_APIKEY=<TELEGRAM API KEY> --restart always remisa/exifer
```

## Changes

### Version 1.0.2

- Dependency update to fix security vulnerabilities.

### Version 1.0.1

- Dependency update to fix security vulnerabilities.

### Version 1.0.0

- Initial release.
