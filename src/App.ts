import { IRawApp } from './interfaces'

export default class App {
  public name: string
  public contributors: string[]
  public version: number
  public apdex: number

  constructor (data?: IRawApp) {
    const { name, contributors, version, apdex } = data
    this.name = name
    this.contributors = contributors
    this.version = version
    this.apdex = apdex
  }
}
