import path from 'path'
import { createHash } from 'crypto';
import { createReadStream, rmSync } from "fs";

export const calculateHash = async (currentDir , [pathToFile], isFail) => {
  try{
    const curDir = (path.isAbsolute(pathToFile) ? pathToFile : path.join(currentDir, pathToFile));
    return new Promise((resolve) => {
      const rs = createReadStream(curDir)
      const hash = createHash('sha256');
      isFail = false
      rs.on("data", async (chunk) => hash.update(chunk))
      rs.on("error", () => {
        console.log('\x1b[31mOperation failed\x1b[0m');
        resolve(isFail = true)
      });
      rs.on('end', () => {
        console.log(hash.digest('hex'))
        resolve(isFail)
      })
    })
  } catch {
    console.log('\x1b[31mOperation failed\x1b[0m');
    return isFail
  }
}