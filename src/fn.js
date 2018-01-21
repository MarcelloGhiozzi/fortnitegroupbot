const Exceptions = require('./exceptions');
const redis = require('./redis.js');
const api = require('./api.js');

module.exports = {
  setUserPlayer : function(uid, platform, username){
    return redis.set(uid, {platform: platform, username: username})
  },

  getUserPlayer : function(uid){
    return redis.get(uid)
      .then(player => {
        if(player)
      })
      .catch(err => {
        console.log(err);
        throw err;
      })
  }
}
