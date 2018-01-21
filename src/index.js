const bot = require('./bot.js');
const fn = require('./fn.js');


bot.onText(/^\/player (psn\s|pc\s|xbl\s)(\w+)/, msg => {
  let platform = msg.text.split(' ')[1];
  let username = msg.text.split(' ')[2];
  console.log('/player', platform, username);

});
