var format = require('string-format')
format.extend(String.prototype);

const NAVKEYBOARD = {
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

const NAVBUTTONS = {
		'reply_markup' : NAVKEYBOARD,
		'parse_mode': 'markdown'
	}

const HEADER = '\
👤 *{0.epicUserHandle} [{1} STATS]*\n\
🎮 Platform: {platformNameLong}\n\
'

const GENERAL = '\
👤 *{epicUserHandle} [GENERAL STATS]*\n\
🎮 Platform: {platformNameLong}\n\
🔸 Score : {lifeTimeStats.Score.value}\n\
#️ Matches: {lifeTimeStats.Matches Played.value}\n\
🎉 Wins: {lifeTimeStats.Wins.value} \n\
🔫 Kills: {lifeTimeStats.Kills.value} \n\
➗ Kill/Death: {lifeTimeStats.K/d.value}\n\
🏕️ Avg Survival: {lifeTimeStats.Avg Survival Time.value} \n\
'

const MODE = '\
🔸 Score : {score.displayValue} \[{score.percentile}\]%\n\
#️ Matches: {matches.displayValue} {matches.percentile}%\n\
🎉 Wins: {top1.displayValue}\n\
🔫 Kill/Minute: {kpm.displayValue} [{kpm.percentile}%]\n\
➗ Kill/Death: {kd.displayValue} [{kd.percentile}%]\n\
🏕️ Avg Survival: {avgTimePlayed.displayValue} [{avgTimePlayed.percentile}%]\n\
'

module.exports = {
  playerDetail : (player) => {
    return GENERAL.format(player);
  },
	playerSolo : (player) => {
		return HEADER.format(player, 'SOLO') + MODE.format(player.solo);
	},
	playerDuo : (player) => {
		return HEADER.format(player, 'DUO') + MODE.format(player.duo);
	},
	playerSquad : (player) => {
		return HEADER.format(player, 'SQUAD') + MODE.format(player.squad);
	},
  navButtons : () => NAVBUTTONS,
	navKeyboard : () => NAVKEYBOARD,
	inlineDetail: player => {
		return [{
			type : 'article',
			id : player.accountId,
			title: player.epicUserHandle,
			reply_markup: NAVKEYBOARD,
			description: 'Score: ' + player.lifeTimeStats.Score.value,
			input_message_content: {
				message_text: GENERAL.format(player),
				parse_mode: 'markdown'
			}
		}];
	},
	inlineError : err => {
		return [{
			type : 'article',
			id : 'no_player_linked',
			title: 'Hey!',
			reply_markup: NAVKEYBOARD,
			description: 'No fortnite player linked to this Telegram User',
			input_message_content: {
				message_text: '[Click Here to link a player](t.me/fortnitegroupbot)',
				parse_mode: 'markdown'
			}
		}];
	},
  errorDefault : () => {
    return 'Error'
  }
}
