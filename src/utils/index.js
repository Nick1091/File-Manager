export const addMessage = async (isFail, currentDir) => {
  !isFail && console.log(`You are currently in \x1b[33m${currentDir}\x1b[0m`);
}
