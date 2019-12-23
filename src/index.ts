import ApdexBoard from './ApdexBoard'
import HTTPRequest from './HTTPRequest'
import { IRawApp } from './interfaces'

;(async () => {
  const contentDiv = document.getElementById('content')
  const viewSwitch = document.getElementById('view-switch')
  const response = await new HTTPRequest().get('host-app-data.json') as string
  const data = JSON.parse(response)
  const apdexBoard = new ApdexBoard(data as IRawApp[])
  let content = ''
  Object.keys(apdexBoard.appsByHost).map(host => {
    const top5apps = apdexBoard.getTopAppsByHost(host).slice(0, 5)
    content += `
      <div class="content-box">
        <h5>${host}</h5>
        <ul>${
          top5apps.reduce((str, app) => {
            str += `<li data-version="${app.version}"><span>${app.apdex}</span> ${app.name}</li>\n`
            return str
          }, '')
        }</ul>
      </div>
    `
  })
  contentDiv.innerHTML = content
  viewSwitch.addEventListener('change', event => {
    if (event.target && event.target['checked']) {
      contentDiv.className = 'list-view'
    } else {
      contentDiv.className = ''
    }
  })
  contentDiv.addEventListener('click', event => {
    const t = event.target
    if (t && t['dataset'] && t['dataset'].version) {
      alert(`Version: ${t['dataset'].version}`)
    }
  })
})().catch()
