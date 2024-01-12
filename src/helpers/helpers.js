function exportKeys(keys = []) {
  var result = keys.reduce(
    (acc, key, index) => {
      acc.columns += `${key},`;
      acc.colNumbers += `$${index + 1},`;
      return acc;
    },
    { columns: "", colNumbers: "" }
  );

  // remove last (,)
  result.columns = result.columns.slice(0, -1);
  result.colNumbers = result.colNumbers.slice(0, -1);

  return result;
}
function exportKeysForUpdate(keys = []) {
  var result = keys.reduce(
    (acc, key, index) => (acc += `${key} = $${index + 2},`),
    []
  );

  // remove last (,)
  result = result.slice(0, -1);
  return result;
}

export { exportKeys, exportKeysForUpdate };
