module.exports = class {

  constructor() {
    this.trigger            = 'sp'
    this.dir                = CT.config.triggers_dir + 'spotify/classes/'
    this.AddToStarred       = require(this.dir + 'add_to_starred'      )
    this.StarredPlaylist    = require(this.dir + 'starred_playlist'    )
    this.Device             = require(this.dir + 'device'              )
    this.ChangeVolume       = require(this.dir + 'change_volume'       )
    this.CurrentlyPlaying   = require(this.dir + 'currently_playing'   )
    this.OnStarred          = require(this.dir + 'on_starred'          )
    this.Next               = require(this.dir + 'next'                )
    this.Pause              = require(this.dir + 'pause'               )
    this.Play               = require(this.dir + 'play'                )
    this.PlayerRequest      = require(this.dir + 'player_request'      )
    this.Playing            = require(this.dir + 'playing'             )
    this.PlayOrPause        = require(this.dir + 'play_or_pause'       )
    this.PlayRandomPlaylist = require(this.dir + 'play_random_playlist')
    this.RandomPlaylist     = require(this.dir + 'random_playlist'     )
    this.RefreshAccessToken = require(this.dir + 'refresh_access_token')
    this.Setup              = require(this.dir + 'setup'               )
    this.ShuffleState       = require(this.dir + 'shuffle_state'       )
    this.ToggleShuffle      = require(this.dir + 'toggle_shuffle'      )
    this.TransferDevice     = require(this.dir + 'transfer_device'     )
    this.TryRefreshTry      = require(this.dir + 'try_refresh_try'     )
    this.TurnOffShuffle     = require(this.dir + 'turn_off_shuffle'    )
    this.TurnOnShuffle      = require(this.dir + 'turn_on_shuffle'     )
    this.Volume             = require(this.dir + 'volume'              )
    this.VolumeDown         = require(this.dir + 'volume_down'         )
    this.VolumeUp           = require(this.dir + 'volume_up'           )
  }

  run(resolve, reject) {
    const spotify_command = CT.clipboard.content.split(' ')[0]

    switch (spotify_command) {
      case 'setup'  : new this.Setup(                                 resolve, reject); break
      case 'refresh': new this.RefreshAccessToken(                    resolve, reject); break
      case '*'      : new this.TryRefreshTry(this.AddToStarred,       resolve, reject); break
      case '?'      : new this.TryRefreshTry(this.CurrentlyPlaying,   resolve, reject); break
      case 'dev'    : new this.TryRefreshTry(this.Device,             resolve, reject); break
      case '-'      : new this.TryRefreshTry(this.VolumeDown,         resolve, reject); break
      case 'p'      : new this.TryRefreshTry(this.PlayOrPause,        resolve, reject); break
      case 'pl'     : new this.TryRefreshTry(this.Playing,            resolve, reject); break
      case 'r'      : new this.TryRefreshTry(this.PlayRandomPlaylist, resolve, reject); break
      case 'sh'     : new this.TryRefreshTry(this.ToggleShuffle,      resolve, reject); break
      case 'sh?'    : new this.TryRefreshTry(this.ShuffleState,       resolve, reject); break
      case 'shoff'  : new this.TryRefreshTry(this.TurnOffShuffle,     resolve, reject); break
      case 'shon'   : new this.TryRefreshTry(this.TurnOnShuffle,      resolve, reject); break
      case 'sk'     : new this.TryRefreshTry(this.Next,               resolve, reject); break
      case 'st'     : new this.TryRefreshTry(this.StarredPlaylist,    resolve, reject); break
      case '='      : new this.TryRefreshTry(this.VolumeUp,           resolve, reject); break
      case '+'      : new this.TryRefreshTry(this.VolumeUp,           resolve, reject); break
      case 'vol'    : new this.TryRefreshTry(this.Volume,             resolve, reject); break
      default       : reject(`Unrecognized spotify command: ${spotify_command}`)
    }
  }

}
