const path = require("path");
const fs = require("fs");
const {dialog} = require("electron");
const crypto = require("crypto");

/**
 * 生成 html 文件
 * @param options
 * @return {Promise<string>}
 */
async function makeHtml(options = {}) {

   const uuid = crypto.randomUUID()

   if (!options.family) {
      options.family = ""
   } else {
      options.family += ","
   }

   let htmlString = `
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>打印</title>
       <style>
           @page {
               size: ${options.width}mm ${options.height}mm;
               margin: 0;
           }
           * {
               margin: 0;
               padding: 0;
           }
           body{
              font-family: ${options.family} 黑体,微软雅黑,serif;
           }
       </style>
   </head>
   <body>
   ${options.htmlStr}
   </body>
   </html>`

   let directoryPath = createDirectoryPath();

   if (directoryPath == null) {
      return Promise.reject("创建目录失败");
   }


   let paths = path.join(directoryPath, `${uuid}-print.html`)
   try {
      fs.writeFileSync(paths, htmlString)
   } catch (e) {
      dialog.showMessageBoxSync({
         title: '错误',
         message: "html创建错误"
      })
      return Promise.reject("html创建错误");
   }

   return paths.toString();
}


/**
 * 创建文件夹
 * @return {string|null} 文件夹路径
 */
function createDirectoryPath() {
   let leaPath = ""
   try {
      const directoryPath = path.join(process.cwd(), "PDF");
      if (!fs.existsSync(directoryPath)) {
         fs.mkdirSync(directoryPath);
      }
      leaPath = directoryPath;
   } catch (e) {
      dialog.showMessageBoxSync({
         title: '错误',
         message: "文件夹创建错误"
      })
      return null;
   }
   return leaPath;
}


module.exports = {
   makeHtml
}
