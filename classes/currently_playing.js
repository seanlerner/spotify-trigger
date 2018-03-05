module.exports = class {

  constructor(resolve, reject, format) {
    this.resolve  = resolve
    this.reject   = reject
    this.format   = format
    this.method   = 'GET'
    this.endpoint = 'currently-playing'

    new CT.triggers.sp.PlayerRequest(this)
  }

  success(body, that) {
    if (body && body.is_playing)
      return that.currently_playing(body, that)
    else
      return 'Nothing currently playing'
  }

  currently_playing(body, that) {
    if (that.format == 'object')
      return body.item
    else
      return that.song_details(body.item)
  }

  song_details(item) {
    return {
      title:    item.artists[0].name,
      subtitle: item.album.name,
      body:     item.name
    }
  }

}
