import fs from 'fs'
import path from 'path'
function pathStr(key) {
  const date = new Date()
  const str = key
    ? path.join(__dirname, 'upload', 'temp', `${key}`)
    : path.join(__dirname, 'upload', String(date.getFullYear()), String(date.getMonth() + 1), String(date.getDate()))
  return str
}

export async function fileInfoUploader(body) {
  try {
    const { key } = body
    // if (filedata)
    // const base64Data = filedata.replace(/^data:\/\w+;base64,/, "");
    // const dataBuffer = new Buffer.from(base64Data, 'base64');
    const _path = pathStr(key)
    await fs.mkdirSync(_path, { recursive: true })
    // await fs.writeFileSync(path.join(_path, `${Math.random().toString(36).substr(2,6)}_${filename}`), dataBuffer)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function fileEndUploader(body) {
  try {
    const { key, totalStep, filename } = body
    const tempPath = pathStr(key)
    const chunkPaths = []
    for (let i = 1; i <= totalStep; i++) {
      chunkPaths.push(path.join( tempPath, String(i) ))
    }
    // 采用Stream方式合并
    const filePath = pathStr()
    await fs.mkdirSync(filePath, { recursive: true })
    const targetStream = fs.createWriteStream(path.join(filePath, `${key}_${filename}`))
    const readStreamSingle = path => new Promise((reslove, reject) => {
      const originStream = fs.createReadStream(path)
      originStream.pipe(targetStream, { end: false })
      originStream.on("end", async ()=> {
        console.log(path)
        await fs.unlinkSync(path);
        reslove()
      })
    })
    await Promise.all(chunkPaths.map(async e=>{
      await readStreamSingle(e)
    }))
    targetStream.end()
    await fs.rmdirSync(tempPath);
    return true
  } catch (error) {
    console.log(error)
    return false
  }

}

export async function fileDataUploader(body, key, step) {
  try {
    // if (filedata)
    const base64Data = body.replace(/data:application\/octet-stream;base64,/, '')
    const dataBuffer = new Buffer.from(base64Data, 'base64')
    const _path = pathStr(key)
    await fs.writeFileSync(path.join(_path, step), dataBuffer)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

