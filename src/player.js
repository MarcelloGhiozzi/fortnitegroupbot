const Exceptions = require('./exceptions');
const redis = require('./redis.js');
const api = require('./api.js');


getAndCachePlayer = function(user){
  return api.getPlayer(user.platform, user.username)
    .then(player => {
      return redis.set(user.username, player)
        .then(() => {
          return player;
        })
    })
    .catch(err => {
      throw err;
    })
},

getRedisPlayer = function(user){
  return redis.get(user.username)
    .then(player => {
      if (!player)
        throw new Exceptions.PlayerMissing()
      return player
    })
    .catch(err => {
      throw err;
    })
}

module.exports = {
  get : function(user){
    return getRedisPlayer(user)
      .then(player => {
        return player;
      })
      .catch(Exceptions.PlayerMissing, err => {
        return getAndCachePlayer(user)
      })
  }
}
