/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  let copy = arr.slice(0).sort((first, second) => first.localeCompare(second, undefined, {caseFirst: 'upper'}));
  return param === 'asc' ? copy : copy.reverse();
}
