const {ipcMain, BrowserWindow, dialog} = require('electron')
const fs = require("fs");
const {makeHtml} = require("./printUtils");



ipcMain.handle("myPrint", async (event, htmlStr, width, height) => {
   /*
    * ------------------------------------------------------------<-1. 动态生成html并保存到本地->----------------------------------------------------------------------------------
    */
   let paths
   try {
      paths = await makeHtml({
         htmlStr,
         width,
         height,
      });
   } catch (e) {
      return Promise.reject(e);
   }

   /*
    * ------------------------------------------------------------<-2.设置打印窗口->----------------------------------------------------------------------------------
    */
   const win = new BrowserWindow({
      //控制页面是否显示
      show: false,
   })

   await win.loadFile(paths);

   /*
    * ------------------------------------------------------------<-静默打印->----------------------------------------------------------------------------------
    */
   await win.webContents.print({
      silent: true,
      printBackground: true,
      deviceName: "pdfFactory Pro",
      margins: {
         marginType: "none"
      },
      //attribute invalid!
      pageSize: {
         width: width * 1000,
         height: height * 1000
      },
   })

   fs.unlink(paths, (err => {
   }))
   return "";
})





