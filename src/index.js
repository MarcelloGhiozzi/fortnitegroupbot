const Messages = require('./messages.js')
const bot = require('./bot.js');
const user = require('./user.js');
const inline = require('./inline.js')

bot.on('polling_error', (error) => {
  console.log(error);  // => 'EFATAL'
});


bot.on('callback_query', q => {
  console.log(q);
  let options = {reply_markup: Messages.navKeyboard(), parse_mode: 'markdown'}
  if (q.message) {
    options.message_id = q.message.message_id
    options.chat_id = q.message.chat.id
  }
  if (q.inline_message_id) options.inline_message_id = q.inline_message_id;
  if (q.data == 'duo'){
    user.player(q.from.id)
    .then(player => {
      bot.editMessageText(Messages.playerDuo(player), options)
    })
    .catch(err => console.log(err));
  }
  if (q.data == 'squad'){
    user.player(q.from.id)
    .then(player => {
      bot.editMessageText(Messages.playerSquad(player), options)
    })
    .catch(err => console.log(err));
  }
  if (q.data == 'solo'){
    user.player(q.from.id)
    .then(player => {
      bot.editMessageText(Messages.playerSolo(player), options)
    })
    .catch(err => console.log(err));
  }
  if(q.data == 'general'){
    user.player(q.from.id)
    .then(player => {
      bot.editMessageText(Messages.playerDetail(player), options)
    })
    .catch(err => console.log(err));
  }
})

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
