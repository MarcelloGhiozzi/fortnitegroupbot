var Promise = require("bluebird");
var redis = require("redis")
var flat = require('flat');
var unflat = require('flat').unflatten;
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);
var client = redis.createClient(6379, '127.0.0.1');

module.exports = {
  set : function(id, payload){
    let promise = client.hmsetAsync(id, flat(payload));
    client.expire(id,3600);
    return promise
  },

  get : function(id){
    return client.hgetallAsync(id)
      .then(obj => {
        return unflat(obj);
      })
      .catch(err => {
        throw err;
      })
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
