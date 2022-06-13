import path from "path";
const up = async (currentDir) => {
  return currentDir === path.parse(currentDir).root ? currentDir : path.join(currentDir, '../');
}
export { up };
