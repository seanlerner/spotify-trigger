module.exports = class {

  constructor(resolve, reject) {
    log('Refreshing access token')
    this.resolve = resolve
    this.reject  = reject

    const options = {
      method: 'POST',
      uri:    CT.config.clip_trigger_server + 'api/spotify/refresh_access_token',
      body:   clip_trigger_credentials(),
      json:   true
    }

    CT.vendor.request(options, this.process_response.bind(this))
  }

  process_response(err, res, body) {
    if (body && body.success)
      this.success(body)
    else if (body && body.fail)
      this.reject(`${body.fail}. Try running 'sp setup'.`)
    else
      new CT.Reject(this.reject, err, res, body, __filename)
  }

  success(body) {
    CT.vendor.settings.set('spotify_access_token', body.success)
    this.resolve('Access token refreshed')
  }

}
