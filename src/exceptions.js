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


require('util').inherits(module.exports.InvalidPlatform, Error);
require('util').inherits(module.exports.TrnApiKeyMissing, Error);
require('util').inherits(module.exports.TgTokenMissing, Error);
