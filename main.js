module.exports = class {

  constructor() {
    this.trigger   = 'sp'
    this.nice_name = 'Spotify'
    this.dir       = path.join(CT.dir.triggers, 'spotify-trigger', 'classes')

    this.AddToStarred       = require(path.join(this.dir, 'add_to_starred'      ))
    this.StarredPlaylist    = require(path.join(this.dir, 'starred_playlist'    ))
    this.Device             = require(path.join(this.dir, 'device'              ))
    this.ChangeVolume       = require(path.join(this.dir, 'change_volume'       ))
    this.CurrentlyPlaying   = require(path.join(this.dir, 'currently_playing'   ))
    this.OnStarred          = require(path.join(this.dir, 'on_starred'          ))
    this.Next               = require(path.join(this.dir, 'next'                ))
    this.Pause              = require(path.join(this.dir, 'pause'               ))
    this.Play               = require(path.join(this.dir, 'play'                ))
    this.PlayerRequest      = require(path.join(this.dir, 'player_request'      ))
    this.Playing            = require(path.join(this.dir, 'playing'             ))
    this.PlayOrPause        = require(path.join(this.dir, 'play_or_pause'       ))
    this.PlayRandomPlaylist = require(path.join(this.dir, 'play_random_playlist'))
    this.RandomPlaylist     = require(path.join(this.dir, 'random_playlist'     ))
    this.RefreshAccessToken = require(path.join(this.dir, 'refresh_access_token'))
    this.Setup              = require(path.join(this.dir, 'setup'               ))
    this.ShuffleState       = require(path.join(this.dir, 'shuffle_state'       ))
    this.ToggleShuffle      = require(path.join(this.dir, 'toggle_shuffle'      ))
    this.TransferDevice     = require(path.join(this.dir, 'transfer_device'     ))
    this.TryRefreshTry      = require(path.join(this.dir, 'try_refresh_try'     ))
    this.TurnOffShuffle     = require(path.join(this.dir, 'turn_off_shuffle'    ))
    this.TurnOnShuffle      = require(path.join(this.dir, 'turn_on_shuffle'     ))
    this.Volume             = require(path.join(this.dir, 'volume'              ))
    this.VolumeDown         = require(path.join(this.dir, 'volume_down'         ))
    this.VolumeUp           = require(path.join(this.dir, 'volume_up'           ))
  }

  run(resolve, reject) {
    const spotify_command = CT.clipboard.content.split(' ')[0]

    switch (spotify_command) {
      case 'setup'  : new this.Setup(                                 resolve, reject); break
      case 'refresh': new this.RefreshAccessToken(                    resolve, reject); break
      case '*'      : new this.TryRefreshTry(this.AddToStarred,       resolve, reject); break
      case '?'      : new this.TryRefreshTry(this.CurrentlyPlaying,   resolve, reject); break
      case 'dev'    : new this.TryRefreshTry(this.Device,             resolve, reject); break
      case 'sk'     : new this.TryRefreshTry(this.Next,               resolve, reject); break
      case 'p'      : new this.TryRefreshTry(this.PlayOrPause,        resolve, reject); break
      case 'r'      : new this.TryRefreshTry(this.PlayRandomPlaylist, resolve, reject); break
      case 'sh'     : new this.TryRefreshTry(this.ToggleShuffle,      resolve, reject); break
      case 'shoff'  : new this.TryRefreshTry(this.TurnOffShuffle,     resolve, reject); break
      case 'shon'   : new this.TryRefreshTry(this.TurnOnShuffle,      resolve, reject); break
      case '-'      : new this.TryRefreshTry(this.VolumeDown,         resolve, reject); break
      case '='      : new this.TryRefreshTry(this.VolumeUp,           resolve, reject); break
      case '+'      : new this.TryRefreshTry(this.VolumeUp,           resolve, reject); break
      default       : reject(`Unrecognized spotify command: ${spotify_command}`)
    }
  }

}
