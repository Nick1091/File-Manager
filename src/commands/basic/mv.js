import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream"
import { rm } from './index.js'

export const mv = async (currentDir , [currentFile, targetDirectory, ...rest], isFail) => {
  return new Promise((resolve) => {
    if(rest.length !== 0) {
      console.log('\x1b[31mOperation failed\x1b[0m');
      resolve(isFail = true);
    } else {
      const curDir = (path.isAbsolute(currentFile) ? currentFile : path.join(currentDir, currentFile));
      const curFileName = path.basename(curDir);
      const tarDir = (path.isAbsolute(targetDirectory) ? targetDirectory : path.join(currentDir, targetDirectory));
      const rs = createReadStream(curDir);
      const ws = createWriteStream(path.join(tarDir, curFileName), { flags: "wx" });
      isFail = false;
      pipeline(
        rs,
        ws,
        (err) => {
          if(err) console.log('\x1b[31mOperation failed\x1b[0m');
          if(err) isFail = true;
        }
      )
      rs.on('end', async () => {
        ws.close();
        isFail = await rm(currentDir, [currentFile], isFail)
        resolve(isFail);
      });
    }
  })
}