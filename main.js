// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, screen, remote } = require('electron')
const path = require('node:path')
const fs = require("fs")

/* Normal Electron stuff */


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,  // Allows transparent webm to work really well
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')
  mainWindow.setFullScreen(true)
  // mainWindow.webContents.openDevTools()



  /* "Bindings" to alter the window from within itself */

  ipcMain.handle("getScreenSize", () => {
    return screen.getPrimaryDisplay().size
  })

  // Resize the window
  ipcMain.handle("resize", (_, width, height) => {
    mainWindow.setSize(Math.round(width), Math.round(height))
    mainWindow.center()
  })

  // Close the window
  ipcMain.handle("quit", () => app.quit())

  // Grab config
  ipcMain.handle("getConfig", () => fs.readFileSync(path.join(__dirname, 'config.json')).toString())


  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})





