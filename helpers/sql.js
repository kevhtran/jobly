const { BadRequestError } = require("../expressError");

/** 
 * Helper for making selective update queries. 
 * @param dataToUpdate is an object, it is the updated data
 * @param jsToSql is an object, takes a javascript key and a sql value of the js key such as 
 * {
 * firstName: "first_name",
 * lastName: "last_name",
 * isAdmin: "is_admin"
 * }
 * @returns {Object} setCols will be used to SET in sql UPDATE.
 * @example { setCols: '"first_name"=$1', '"age"=$2', values: ['Aliya', 32]}
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
    `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
