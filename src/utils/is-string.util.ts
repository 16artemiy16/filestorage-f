/**
 *
 * @param val - any value should be checked for string identity
 * @returns true if the argument string, false else
 */
const isString = (val: any): boolean => {
  return Object.prototype.toString.call(val) === "[object String]";
};

export default isString;
