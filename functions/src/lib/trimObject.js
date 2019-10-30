/**
 * Remove object keys with undefined values
 * @param {Object} obj Object to trim
 */
const trimObject = (obj) => {
  const objToTrim = Object.assign({}, obj);

  Object.keys(objToTrim).forEach(key => {
    if (undefined === objToTrim[key]) {
      delete objToTrim[key];
    }
  });

  return objToTrim;
};

export default trimObject;
