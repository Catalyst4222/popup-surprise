/**
 * The preload script runs before `index.html` is loaded
 * in the renderer. It has access to web APIs as well as
 * Electron's renderer process modules and some polyfilled
 * Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})



/* Gives */

const { contextBridge, ipcRenderer, remote } = require('electron');

contextBridge.exposeInMainWorld(
  'electronBridge',
  {
    getScreenSize: () => ipcRenderer.invoke("getScreenSize"),
    resize: (width, height) => ipcRenderer.invoke("resize", width, height),
    quit: () => ipcRenderer.invoke("quit"),
    getConfig: () => ipcRenderer.invoke("getConfig").then(JSON.parse)
  }
)
