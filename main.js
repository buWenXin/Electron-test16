const { app, BrowserWindow } = require('electron')
const {join} = require("path");
require("./print/printTemplate")
const createWindow = () => {
   const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
         preload: join(__dirname, 'preload.js')
      }
   })
   win.loadFile('index.html')
}

app.whenReady().then(() => {
   createWindow()
})


app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') app.quit()
})
