const Messages = require('./messages.js')
const bot = require('./bot.js');
const user = require('./user.js');

bot.on('inline_query', q => {
  console.log(q);
	user.player(q.from.id)
	.then(player => {
		bot.answerInlineQuery(q.id, Messages.inlineDetail(player));
	})
  .catch(err => {
    console.log(err);
    bot.answerInlineQuery(q.id, Messages.inlineError(err));
  })
})
