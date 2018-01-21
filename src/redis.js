var Promise = require("bluebird");
var redis = require("redis")
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);
var client = redis.createClient(6379, 'eav-redis');

module.exports = {
  set : function(id, payload){
    let promise = client.hmsetAsync(id, payload);
    client.expire(id,3600);
    return promise
  },

  get : function(id){
    return client.hgetallAsync(id);
  },

  update: function(id, lambda){
    return client.hgetallAsync(id)
      .then(obj => {
        let promise = client.hmsetAsync(id, lambda(obj));
        client.expire(id,3600);
        return promise
      })
      .catch(err => {
        throw err;
      });
  }
}
