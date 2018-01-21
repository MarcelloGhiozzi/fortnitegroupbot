var r = require('request-promise');
const Exceptions = require('./exceptions');
const ENDPOINT = 'https://api.fortnitetracker.com/v1/profile/{platform}/{username}'
const TRNAPIKEY = process.env.TRNAPIKEY;
if (!TRNAPIKEY)
  throw new Exceptions.TrnApiKeyMissing();

module.exports = {
    getPlayerStat : function(platform, username){
    if (platform != 'pc' && platform != 'xbl' && platform != 'psn')
      throw new Exceptions.InvalidPlatform();
    var req  = {
      url: ENDPOINT.replace('{platform}', platform).replace('{username}', username),
      headers: {
        'TRN-Api-Key': TRNAPIKEY
      }
    };
    return r.get(req);
  }
}


module.exports.getPlayerStat('psn', 'Marv7')
.then(stats => {
  console.log(stats);
})
