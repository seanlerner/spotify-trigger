module.exports = class {

  constructor(resolve, reject) {
    this.resolve = resolve
    this.reject  = reject
    this.get_spotify_authorize_link()
  }

  get_spotify_authorize_link() {
    CT.vendor.request.post(
      CT.config.clip_trigger_server + '/api/spotify/authorize',
      { json: CT.config.login_credentials },
      this.authorize_or_fail.bind(this)
    )
  }

  authorize_or_fail(err, resp, body) {
    if (body && body.success)
      this.setup(body)
    else if (body && body.fail)
      this.reject('Clip Trigger account required')
    else
      this.reject('Error authorizing Spotify')
  }

  setup(body) {
    this.resolve('Please authorize Spotify')

    const
      url = body.success,
      win = new CT.electron.BrowserWindow({
        width:  800,
        height: 800,
        name:  'Spotify',
        webPreferences: { nodeIntegration: false }
      })

      win.loadURL(url)
  }
}
