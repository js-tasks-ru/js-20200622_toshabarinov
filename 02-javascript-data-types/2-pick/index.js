/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  let result = {};
  Object.entries(obj).forEach(([key, val]) => fields.includes(key) ? result[key] = val : undefined);
  return result;
};
