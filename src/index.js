import { createInterface } from 'readline';
import { homedir } from 'os';

const arg = process.argv[2];
export let currentDir = homedir();
function startFileManager (arg) {
  if(!arg || arg.split('=')[0] !== '--username' || !arg.split('=')[1]){
    console.log('\x1b[35mPlease enter your username in the format "--username=your_name"\x1b[0m')
    return
  }
  console.log(`\x1b[35mWelcome to the File Manager, ${arg[1]}!\x1b[0m`)
  console.log(`\x1b[35mYou are currently in ${currentDir}\x1b[0m`)

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on("line", async (line) => {
    const [command, ...data] = line.trim().split(' ');
    switch (command) {
      case '.exit': {
          rl.close();
          break;
      }
      case 'exit': {
          rl.close();
          break;
      }
      default: {
          console.log('\x1b[31mInvalid input\x1b[0m')
      }
      console.log(`\x1b[35mYou are currently in ${currentDir}\x1b[0m`);
  }

  })
  .on('close', () => console.log(`\x1b[35mThank you for using File Manager, ${arg[1]}!\x1b[0m`))
}
startFileManager(arg);