export const addMessage = async (isFail, currentDir) => {
  !isFail && console.log(`You are currently in \x1b[33m${currentDir}\x1b[0m`);
}

export const getTransformArray = async (line) => {
  const arrTransform = line.trim().replaceAll('"', "'").split(" ");
  const arr = arrTransform.reduce((acc, cur) => {
    const lastItem = acc[acc.length - 1];
    if (acc.length > 0 && lastItem.indexOf("'") === 0 && lastItem.lastIndexOf("'") === lastItem.indexOf("'")) {
      if (cur.indexOf("'") !== -1) {
        const hardName = lastItem.replace("'", "") + ' ' + cur.replace("'", "");
        return [...acc.slice(0, -1), hardName]
      } else {
        return [...acc.slice(0, -1), lastItem + ' ' + cur]
      }
    } else if (acc.length > 0 && lastItem.indexOf("'") === 0 && lastItem.indexOf("'") !== lastItem.lastIndexOf("'")) {
      return [...acc.slice(0, -1), lastItem.replaceAll("'", "")]
    }
    if(cur.indexOf("'") === 0 && cur.indexOf("'") !== cur.lastIndexOf("'")){
      return [...acc, cur.replaceAll("'", "")]
    }
    return [...acc, cur]
  }, []);
  return arr;
}
