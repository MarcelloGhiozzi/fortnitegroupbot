module.exports.InvalidPlatform = class InvalidPlatform extends Error {
  constructor (extra) {
    super()
    Error.captureStackTrace( this, this.constructor )
    this.name = 'InvalidPlatform'
    this.message = 'The specified platform must be "psn", "xbl" or "pc"'
    if ( extra ) this.extra = extra
  }
}

module.exports.TrnApiKeyMissing = class TrnApiKeyMissing extends Error {
  constructor (extra) {
    super()
    Error.captureStackTrace( this, this.constructor )
    this.name = 'TrnApiKeyMissing'
    this.message = 'TRN Api Key is missing, export the environment variable TRNAPIKEY with your Fortnite Tracker api key. You can request one here: https://fortnitetracker.com/site-api'
    if ( extra ) this.extra = extra
  }
}

module.exports.TgTokenMissing = class TgTokenMissing extends Error {
    constructor (extra) {
      super()
      Error.captureStackTrace( this, this.constructor )
      this.name = 'TgTokenMissing'
      this.message = 'Telegram Bot token is missing, export the environment variable TOKEN with your Telegram Bot token'
      if ( extra ) this.extra = extra
    }
}

module.exports.UserMissing = class UserMissing extends Error {
    constructor (extra) {
      super()
      Error.captureStackTrace( this, this.constructor )
      this.name = 'UserMissing'
      this.message = 'You don\'t have a Fortnite player linked to your Telegram Account'
      if (extra) this.extra = extra
    }
}

module.exports.PlayerMissing = class PlayerMissing extends Error {
    constructor (extra) {
      super()
      Error.captureStackTrace( this, this.constructor )
      this.name = 'PlayerMissing'
      this.message = 'The player is not in cache'
      if ( extra ) this.extra = extra
    }
}

module.exports.PlayerNotFound = class PlayerNotFound extends Error {
    constructor (extra) {
      super()
      Error.captureStackTrace( this, this.constructor )
      this.name = 'PlayerNotFound'
      this.message = 'No Fortnite players with the specified username and platform'
      if ( extra ) this.extra = extra
    }
}


//settings
require('util').inherits(module.exports.TrnApiKeyMissing, Error);
require('util').inherits(module.exports.TgTokenMissing, Error);

//caching
require('util').inherits(module.exports.UserMissing, Error);
require('util').inherits(module.exports.PlayerMissing, Error);

//api
require('util').inherits(module.exports.PlayerNotFound, Error);
require('util').inherits(module.exports.InvalidPlatform, Error);
