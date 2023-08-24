const {contextBridge, ipcRenderer} = require('electron')

// 向window中注入数据
contextBridge.exposeInMainWorld('mainApi', {
   test: (msg) => ipcRenderer.invoke("test",msg),
   myPrint: (htmlStr,width,height) => ipcRenderer.invoke("myPrint", htmlStr,width,height),
   myPrintPDF: (htmlStr,width,height) => ipcRenderer.invoke("myPrintPDF", htmlStr,width,height),
})
