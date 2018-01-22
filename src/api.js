var r = require('request-promise');
var _ = require('lodash');
const Exceptions = require('./exceptions');
const ENDPOINT = 'https://api.fortnitetracker.com/v1/profile/{platform}/{username}'
const TRNAPIKEY = process.env.TRNAPIKEY;
if (!TRNAPIKEY)
  throw new Exceptions.TrnApiKeyMissing();

module.exports = {
    getPlayer : function(platform, username){
    if (platform != 'pc' && platform != 'xbl' && platform != 'psn')
      throw new Exceptions.InvalidPlatform();
    var req  = {
      url: ENDPOINT.replace('{platform}', platform).replace('{username}', username),
      headers: {
        'TRN-Api-Key': TRNAPIKEY
      }
    };
    return r.get(req)
      .then(response => {
        let player = JSON.parse(response);
        //player.stats = player.stats.p10 || player.stats.p9 || player.stats.p2 || null
        if (player.stats){
          player.solo = player.stats.p2 || null
          player.duo = player.stats.p10 || null
          player.squad = player.stats.p9 || null
          player.stats = null;
        }
        player.recentMatches = player.recentMatches? player.recentMatches[0]:null
        player.lifeTimeStats = _.keyBy(player.lifeTimeStats, 'key')
        if (player.error == 'Player Not Found')
          throw new Exceptions.PlayerNotFound();
        return player
      })
      .catch(err => {
        throw err;
      })
  }
}
