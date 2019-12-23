import App from './App'
import { IRawApp } from './interfaces'

/*
  BIG-O VARIABLES
  a = apps
  h = app hosts
*/

export default class ApdexBoard {
  public appsByHost: any
  public data: IRawApp[]

  constructor (data: IRawApp[]) {
    this.data = data.sort(this.appSorter)
    this.initializeData(this.data)
  }

  // O(a log a) - For V8, according to https://blog.shovonhasan.com/time-space-complexity-of-array-sort-in-v8/
  private appSorter (a, b) {
    return a.apdex < b.apdex ? 1 : -1
  }

  // O(a*h)
  private initializeData (data: IRawApp[]): void {
    this.appsByHost = data.reduce((appsByHost, appData: IRawApp) => {
      const app = new App(appData)
      appData.host.map(host => {
        appsByHost[host] = appsByHost[host] || []
        appsByHost[host].push(app)
      })
      return appsByHost
    }, {})
  }

  // O(1) - as shown here: https://jsbench.me/17k4iisj2s
  public getTopAppsByHost (host: string) {
    return this.appsByHost[host].slice(0, 25)
  }

  // O(a)
  public addAppToHosts (app: App, host: string): void {
    const apps = this.appsByHost[host]
    if (apps.indexOf(app) !== -1) return
    apps.push(app)
    apps.sort(this.appSorter)
  }

  // O(1) - as shown here: https://jsbench.me/17k4iisj2s
  public removeAppFromHosts (app: App, host: string): void {
    const apps = this.appsByHost[host]
    const appIndex = apps.indexOf(app)
    apps.splice(appIndex, 1)
  }
}
