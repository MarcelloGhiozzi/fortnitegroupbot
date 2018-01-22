var format = require('string-format')
format.extend(String.prototype);

const NAVBUTTONS = {
		'reply_markup' : {
			'inline_keyboard' : [
        [{
          'text': 'General',
          'callback_data': 'general'
        }],
				[{
					'text': '👤 Solo',
					'callback_data': 'solo',
				},
				{
					'text': '👥 Duo',
					'callback_data': 'duo',
				},
        {
          'text': '👥👥 Squad',
          'callback_data' : 'squad'
        }],
			]
		}
	}


const GENERAL = '\
👤 Epic Username: {epicUserHandle}\n\
🎮 Platform: {platformNameLong}\n\
🔸 Score : {lifeTimeStats.Score.value}\n\
#️ Matches: {lifeTimeStats.Matches Played.value}\n\
🎉 Wins: {lifeTimeStats.Wins.value} \n\
🔫 Kills: {lifeTimeStats.Kills.value} \n\
➗ Kill/Death: {lifeTimeStats.K/d.value}\n\
🏕️ Avg Survival: {lifeTimeStats.Avg Survival Time.value} \n\
'

module.exports = {
  playerDetail : (player) => {
    return GENERAL.format(player);
  },
  navButtons : () => NAVBUTTONS,

  errorDefault : () => {
    return 'Error'
  }
}
