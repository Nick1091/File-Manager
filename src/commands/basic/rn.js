import path from "path";
import { rename, readdir } from "fs/promises";

export const rn = async (currentDir , [currentFile, targetName, ...rest], isFail) => {
  try{
    const curDir = (path.isAbsolute(currentFile) ? currentFile : path.join(currentDir, currentFile));
    const arrayFiles = await readdir(path.dirname(curDir))
    const curFile = arrayFiles.find((file) => file === path.basename(currentFile))
    const targetFile = arrayFiles.find((file) => file === targetName)
    if(!!curFile && targetFile === undefined && rest.length === 0){
      await rename(curDir, path.join(path.dirname(curDir), targetName));
      return isFail = false
    } else {
      console.log('\x1b[31mOperation failed\x1b[0m');
      return isFail = true
    }
  } catch{
    console.log('\x1b[31mOperation failed\x1b[0m');
    return isFail = true
  }
}