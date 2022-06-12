import { createInterface } from 'readline';
import { homedir } from 'os';
import { up, cd, ls, cat, add, rn, cp, mv, rm, os, calculateHash} from './commands/index.js';
import {addMessage} from './utils/index.js'

const arg = process.argv[2];
export let currentDir = homedir();
function startFileManager (arg) {
  if(!arg || arg.split('=')[0] !== '--username' || !arg.split('=')[1]){
    console.log('\x1b[35mPlease enter your username in the format "--username=your_name"\x1b[0m')
    return
  }
  const name = arg.split('=')[1]
  console.log(`\x1b[35mWelcome to the File Manager, ${name}!\x1b[0m`)
  console.log(`You are currently in \x1b[33m${currentDir}\x1b[0m`)

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let isFail = true;
  rl.on("line", async (line) => {
    const [command, ...data] = line.trim().split(' ').map((arg) => arg.trim());
    switch (command) {
      case '.exit': 
      case 'exit': 
        rl.close();
        break;
      case 'up': 
        currentDir = await up(currentDir);
        isFail = false;
        break;
      case 'cd': 
        isFail = true;
        [currentDir, isFail] = await cd(currentDir, data, isFail);
        break;
      case 'ls':
        isFail = true; 
        isFail = await ls(currentDir, isFail);
        break;
      case 'cat': 
        isFail = true
        isFail = await cat(currentDir, data, isFail);
        break;
      case 'add': 
        isFail = true
        isFail = await add(currentDir, data, isFail);
        break;
      case 'rn': 
        isFail = true
        isFail = await rn(currentDir, data, isFail);
        break;
      case 'cp': 
        isFail = true
        isFail = await cp(currentDir, data, isFail);
        break;
      case 'rm': 
        isFail = true
        isFail = await rm(currentDir, data, isFail);
        break;
      case 'mv': 
        isFail = true
        isFail = await mv(currentDir, data, isFail);
        break;
      case 'os': 
        isFail = true
        isFail = await os(data, isFail)
        break;
      case 'hash': 
        isFail = true
        isFail = await calculateHash(currentDir, data, isFail);
        break;
      default: 
        isFail = true
        console.log('\x1b[31mInvalid input\x1b[0m')
    }
    await addMessage(isFail, currentDir);
  })
  .on('close', () => console.log(`\x1b[35mThank you for using File Manager, ${name}!\x1b[0m`))
}
startFileManager(arg);