import { createReadStream } from "fs";
import path from 'path';

export const cat = async (currentDir , [pathToDirectory], isFail) => {
  return new Promise((resolve) => {
    const dir = path.isAbsolute(pathToDirectory) ? pathToDirectory : path.join(currentDir, pathToDirectory);

    const rs = createReadStream(dir, { encoding: "utf-8"});

    rs.on("data", async (chunk) => {
      console.log(chunk);
    })
    rs.on("error", () => {
      console.log('\x1b[31mOperation failed\x1b[0m');
      isFail = false;
    });
    rs.on("close", () => {
      isFail && console.log(`You are currently in \x1b[33m${currentDir}\x1b[0m`);
      resolve(isFail = true)
    });
  });
}
