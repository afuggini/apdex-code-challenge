export default class HTTPRequest {
  private XMLHTTPRequest

  constructor (XMLHTTPRequest = XMLHttpRequest) {
    this.XMLHTTPRequest = new XMLHTTPRequest()
  }

  private onRequestLoad = (resolve, reject) => () => {
    const { status, statusText, response } = this.XMLHTTPRequest
    if (status >= 200 && status < 400) {
      resolve(response)
    } else {
      reject(statusText)
    }
  }

  public async request (method, url: string) {
    const { XMLHTTPRequest } = this
    return new Promise((resolve, reject) => {
      XMLHTTPRequest.open(method, url, true)
      XMLHTTPRequest.onload = this.onRequestLoad(resolve, reject)
      XMLHTTPRequest.send()
    })
  }

  public async get (url: string) {
    return this.request('GET', url)
  }

  public async post (url: string) {
    return this.request('POST', url)
  }
}
