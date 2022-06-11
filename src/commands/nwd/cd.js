import path from "path";
import { stat } from 'fs/promises';

export const cd = async (currentDir , [pathToDirectory], isFail) => {
  try {
      const dir = path.isAbsolute(pathToDirectory) ? pathToDirectory : path.join(currentDir, pathToDirectory);
      const stats = await stat(dir)
      if (stats.isDirectory()) {
        return [ currentDir = dir, isFail = false ];
      } else {
        console.log('\x1b[31mOperation failed\x1b[0m');
        return [ currentDir, isFail = true ];
      }
  } catch (err) {
      console.log('\x1b[31mOperation failed\x1b[0m');
      return [ currentDir, isFail = true ];
  }
}
