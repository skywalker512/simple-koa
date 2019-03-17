import mkdirp from 'mkdirp'
import fs from 'fs'
import path from 'path'
function pathStr() {
  const date = new Date()
  const str = path.join(__dirname, 'upload', String(date.getFullYear()), String(date.getMonth()+1), String(date.getDate()))
  return str
}

export default async function fileUploader(body) {
  try {
    const { filedata, filename } = body
    const base64Data = filedata.replace(/^data:image\/\w+;base64,/, "");
    const dataBuffer = new Buffer.from(base64Data, 'base64');
    const _path = pathStr()
    await mkdirp(_path)
    await fs.writeFileSync(path.join(_path, `${Math.random().toString(36).substr(2,6)}_${filename}`), dataBuffer)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}