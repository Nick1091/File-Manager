import { createInterface } from 'readline';
import { homedir } from 'os';
import { up, cd, ls } from './commands/index.js';

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
    const [command, ...data] = line.split(' ').map((arg) => arg.trim());
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
        [currentDir, isFail] = await cd(currentDir, data, isFail);
        break;
      case 'ls': 
        isFail = await ls(currentDir, isFail);
        break;
      default: 
        console.log('\x1b[31mInvalid input\x1b[0m')
    }
    !isFail && console.log(`You are currently in \x1b[33m${currentDir}\x1b[0m`);
  })
  .on('close', () => console.log(`\x1b[35mThank you for using File Manager, ${name}!\x1b[0m`))
}
startFileManager(arg);