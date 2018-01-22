const Messages = require('./messages.js')
const bot = require('./bot.js');
const user = require('./user.js');

bot.on('polling_error', (error) => {
  console.log(error);  // => 'EFATAL'
});

bot.onText(/^\/player (psn\s|pc\s|xbl\s)(\w+)/, msg => {
  let platform = msg.text.split(' ')[1];
  let username = msg.text.split(' ')[2];
  console.log('/player', platform, username);
  user.player(msg.from.id, platform, username)
    .then(player => {
      bot.sendMessage(msg.chat.id,Messages.playerDetail(player),Messages.navButtons());
    })
    .catch(err => {
      bot.sendMessage(msg.chat.id, err.message);
    });
})

bot.onText(/^\/player$/, msg =>{
  user.player(msg.from.id)
    .then(player => {
      bot.sendMessage(msg.chat.id, Messages.playerDetail(player), Messages.navButtons());
    })
    .catch(err => {
      bot.sendMessage(msg.chat.id, err.message);
    });
})
