const Tgfancy = require('tgfancy');
const Exceptions = require('./exceptions');
const TOKEN = process.env.TOKEN;
if(!TOKEN)
  throw new Exceptions.TgTokenMissing();
const bot = new Tgfancy(TOKEN, {
	polling: true,
    tgfancy: {
        orderedSending: "true",
        emojification: "true",
        ratelimiting: "true",
        chatIdResolution: "true"
    }
});

module.exports = bot;
