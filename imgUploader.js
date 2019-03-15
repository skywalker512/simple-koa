import fs from 'fs'
import querystring from 'querystring'
import path from 'path'
import readStream from './readStream'
// https://itbilu.com/nodejs/core/VkK5RCoXW.html#node
export default async function fileUploader(ctx, body) {
  var fileName = '';  // 文件名
  // 边界字符串
  var boundary = ctx.req.headers['content-type'].split('; ')[1].replace('boundary=', '');
  var file = querystring.parse(body, '\r\n', ':')
  // 只处理图片文件
  if (file['Content-Type'].indexOf("image") !== -1) {
    //获取文件名
    var fileInfo = file['Content-Disposition'].split('; ');
    for (const value in fileInfo) {
      if (fileInfo[value].indexOf("filename=") != -1) {
        fileName = fileInfo[value].substring(10, fileInfo[value].length - 1);

        if (fileName.indexOf('\\') != -1) {
          fileName = fileName.substring(fileName.lastIndexOf('\\') + 1);
        }
        console.log("文件名: " + fileName);
      }
    }

    // 获取图片类型(如：image/gif 或 image/png))
    var entireData = body.toString();
    var contentTypeRegex = /Content-Type: image\/.*/;

    const contentType = file['Content-Type'].substring(1);

    //获取文件二进制数据开始位置，即contentType的结尾
    var upperBoundary = entireData.indexOf(contentType) + contentType.length;
    var shorterData = entireData.substring(upperBoundary);

    // 替换开始位置的空格
    var binaryDataAlmost = shorterData.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

    // 去除数据末尾的额外数据，即: "--"+ boundary + "--"
    var binaryData = binaryDataAlmost.substring(0, binaryDataAlmost.indexOf('--' + boundary + '--'));

    // 保存文件
    fs.writeFile(fileName, binaryData, 'binary', function (err) {
      ctx.res.end('图片上传完成');
    });
  } else {
    ctx.res.end('只能上传图片文件');
  }
}