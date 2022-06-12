import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { stat } from "fs/promises";
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

export const compress = async (currentDir , [currentFile, targetFile, ...rest], isFail) => {
  try{
    const curDir = path.isAbsolute(currentFile) ? currentFile : path.join(currentDir, currentFile);
    const tarDir = path.isAbsolute(targetFile) ? targetFile : path.join(currentDir, targetFile);
    await stat(curDir);
    return new Promise((resolve) => {
      const rs = createReadStream(curDir);
      const ws = createWriteStream(tarDir, {flags: 'wx'});
      isFail = false
      const stream = rs.pipe(createBrotliCompress()).pipe(ws)
      stream.on('error', () => {
        console.log('\x1b[31mOperation failed\x1b[0m');
        isFail = true
      })
      stream.on('finish', () => {
        resolve(isFail)
      })
    })
  } catch {
    console.log('\x1b[31mOperation failed\x1b[0m');
    return isFail = true
  }
}

export const decompress = async (currentDir , [currentFile, targetFile], isFail) => {
  try{
    const curDir = path.isAbsolute(currentFile) ? currentFile : path.join(currentDir, currentFile);
    const tarDir = path.isAbsolute(targetFile) ? targetFile : path.join(currentDir, targetFile.trim('"'));
    await stat(curDir);
    return new Promise((resolve) => {
      const rs = createReadStream(curDir);
      const ws = createWriteStream(tarDir, {flags: 'wx'});
      isFail = false
      const stream = rs.pipe(createBrotliDecompress()).pipe(ws)
      stream.on('error', () => {
        console.log('\x1b[31mOperation failed\x1b[0m');
        isFail = true
      })
      stream.on('finish', () => {
        resolve(isFail)
      })
    })
  } catch {
    console.log('\x1b[31mOperation failed\x1b[0m');
    return isFail = true
  }
}
