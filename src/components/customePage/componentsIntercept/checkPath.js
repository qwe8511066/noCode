/**
 * 校验组件路径是否正确
 * @param {} value 路径 
 * @returns 
 */
export function checkcomponentsPath(value) {
  let path =
    value && value.substr(0, 2) === "@/"
      ? value.substr(2)
      : value;
  path = path[path.length - 1] === "/" ? path : path + "/";
  return path
}