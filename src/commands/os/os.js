import { EOL, cpus, homedir, userInfo, arch } from 'os' 
export const os = async ([data], isFail) => {
  switch(data){
    case '--EOL': 
      console.log(`\x1b[32m${JSON.stringify(EOL)}\x1b[0m`);;
      isFail = false;
      break;
    case '--cpus': 
      const cpusArr = cpus().map((cpu)=> {
        const { model, speed } = cpu;
        return speed < 1000 ? { model, speed: speed / 10 + ' GHz' } : { model, speed: speed / 1000 + ' GHz' }
      })
      console.log(cpusArr)
      isFail = false;
      break;
    case '--homedir': 
      console.log(`\x1b[32m${homedir()}\x1b[0m`)
      isFail = false;
      break;
    case '--username': 
      console.log(`\x1b[32m${userInfo().username}\x1b[0m`)
      isFail = false;
      break;
    case '--architecture': 
      console.log(`\x1b[32m${arch()}\x1b[0m`)
      isFail = false;
      break;
    default: 
      isFail = true
      console.log('\x1b[31mOperation failed\x1b[0m')
  }
  return isFail
}
