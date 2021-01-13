const exif = require("jpeg-exif");
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.TELEGRAM_APIKEY, { polling: true });

bot.on("message", async msg => {
  if (msg.from.is_bot) {
    bot.sendMessage(msg.chat.id, "Sorry, service is not available to bots.");
    return;
  }
  if (msg.document) {
    const buffer = [];
    const fileStream = bot.getFileStream(msg.document.file_id);
    fileStream.on("data", data => buffer.push(data));
    fileStream.on("end", async () => {
      try {
        const obj = exif.fromBuffer(buffer[0]);
        const result = JSON.stringify(obj)
          .replace(/{/g, "")
          .replace(/}/g, "")
          .replace(/"/g, "")
          .replace(/(,)(?![^[]*\])/g, "\n");
        if (result && result.length > 0) {
          await bot.sendMessage(msg.chat.id, result, {
            reply_to_message_id: msg.message_id,
            parse_mode: "HTML",
          });
          if (
            obj.GPSInfo &&
            obj.GPSInfo.GPSLatitude &&
            obj.GPSInfo.GPSLongitude
          ) {
            const lat = ConvertDMSToDD(
              ...obj.GPSInfo.GPSLatitude,
              obj.GPSInfo.GPSLatitudeRef
            );
            const long = ConvertDMSToDD(
              ...obj.GPSInfo.GPSLongitude,
              obj.GPSInfo.GPSLongitudeRef
            );
            bot.sendLocation(msg.chat.id, lat, long);
          }
        } else {
          bot.sendMessage(msg.chat.id, "No EXIF data found", {
            reply_to_message_id: msg.message_id,
            parse_mode: "HTML",
          });
        }
      } catch (err) {
        bot.sendMessage(msg.chat.id, "Cannot extract EXIF data");
      }
    });
  } else {
    bot.sendMessage(msg.chat.id, "Please send the a `jpg` photo as a file");
  }
});

function ConvertDMSToDD(degrees, minutes, seconds, direction) {
  var dd = degrees + minutes / 60 + seconds / (60 * 60);

  if (direction === "S" || direction === "W") {
    dd = dd * -1;
  } // Don't do anything for N or E
  return dd;
}
