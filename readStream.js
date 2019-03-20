export default function readStream(req) {
  return new Promise((resolve, reject) => {
    try {
      const data = [];
      req.on("data", chunk => {
        data.push(chunk)
      })
      req.on("end", function () {
        resolve(Buffer.concat(data))
      })
    } catch (err) {
      reject(err);
    }
  });
}