/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size = string.length) {
  let charCounter = 1;
  let prevChar = string.slice(0, 1);
  return [...string].filter(char => {
    charCounter = (prevChar === char ? charCounter : 1);
    prevChar = char;
    return charCounter++ <= size;
  }).join('');
}
