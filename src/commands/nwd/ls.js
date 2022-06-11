import { readdir } from 'fs/promises';
import path from 'path';
import { stat } from 'fs/promises';

export const ls = async (currentDir, isFail) => {
  try{
      const arr = []
      const table = await readdir(currentDir);
      if(currentDir !== path.parse(currentDir).root ){
        table.forEach((item) => {
          arr.push(new Promise (async (resolve) => {
            const stats = await stat(path.join(currentDir, item));
            const dir = stats.isDirectory();
            resolve([dir ? 'Directory' : 'File', item])
          }))
        })
        const result = await Promise.allSettled(arr);
        const currArr = result.map(({value}) => {
          return value
        }) 
        console.table(currArr)
      } else console.table(table)
  } catch {
    console.log('\x1b[31mOperation failed\x1b[0m');
    return isFail = true;
  }
};

