import path from "path";
import { unlink, access } from 'fs/promises'

export const rm = async (currentDir, [filePath, ...rest], isFail) => {
  try{
    if(rest.length === 0){
      const curDir = (path.isAbsolute(filePath) ? filePath : path.join(currentDir, filePath));
      await access(curDir);
      await unlink(curDir);
      return isFail = false
    } else {
      console.log('\x1b[31mOperation failed\x1b[0m');
      return isFail = true
    }
  } catch {
    console.log('\x1b[31mOperation failed\x1b[0m');
    return isFail = true
  }
};