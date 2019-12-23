import ApdexBoard from './ApdexBoard'
import App from './App'
import { IRawApp } from './interfaces'
import * as data from '../demo/host-app-data.json'

describe('ApdexBoard', () => {
  const apdexBoard = new ApdexBoard(data as IRawApp[])
  const host = '7e6272f7-098e.dakota.biz'
  const app = new App({
    name: 'test app',
    contributors: [],
    apdex: 98,
    version: 1
  })

  it('should return top 25 apps for host by descending apdex', () => {
    const top25 = apdexBoard.getTopAppsByHost(host)
    expect(top25).toBeDefined()
    expect(top25.length).toBe(25)
    expect(top25[0].apdex).toBe(100)

    const originalApdexes = top25.map(app => app.apdex)
    const sortedApdexes = [].concat(originalApdexes).sort((a, b) => b - a)
    expect(originalApdexes).toEqual(sortedApdexes)
  })

  it('should add app to host in order', () => {
    apdexBoard.addAppToHosts(app, host)
    const top25 = apdexBoard.getTopAppsByHost(host)
    expect(top25.indexOf(app) > -1).toBe(true)

    const originalApdexes = top25.map(app => app.apdex)
    const sortedApdexes = [].concat(originalApdexes).sort((a, b) => b - a)
    expect(originalApdexes).toEqual(sortedApdexes)
  })

  it('should remove app from host', () => {
    apdexBoard.removeAppFromHosts(app, host)
    const top25 = apdexBoard.getTopAppsByHost(host)
    expect(top25.indexOf(app) === -1).toBe(true)
  })
})
