const Exceptions = require('./exceptions');
const redis = require('./redis.js');
const player = require('./player.js');

setUser = function(uid, platform, username){
  return redis.set(uid, {platform: platform, username: username})
}

getUserPlayer = function(uid){
  return redis.get(uid)
    .then(user => {
      if (!user) throw new Exceptions.UserMissing();
      return player.get(user)
    })
    .catch(err => {
      throw err;
    })
}

getAndCacheUser = function(uid, platform, username){
  return setUser(uid, platform, username)
  .then(() => {
    return getUserPlayer(uid)
      .then(player => {
        return player
      })
      .catch(err => {
        throw err;
      })
  });
}


module.exports = {

  player : function(uid, platform, username){
    if (platform && username){
      return getAndCacheUser(uid, platform, username);
    }
    return getUserPlayer(uid)
      .then(player => {
        return player
      })
      .catch(Exceptions.UserMissing, err => {
        if (!platform || !username)
          throw err;
        return getAndCacheUser(uid, platform, username);
      })
      .catch(err => {
        throw err;
      })
  },
}
