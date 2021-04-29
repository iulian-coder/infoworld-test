function filterData({ data, filterPropertyName, filterValues }) {
  let result = [];
  filterValues.map((value) => {
    let tempResult = data.filter((row) => row[filterPropertyName] === value);
    result.push(...tempResult);
  });
  return result;
}

module.exports = { filterData };
