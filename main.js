const fs = require("fs");

function convertToJSON(data) {
  return data.split("\n").reduce((result, line) => {
    let [path, value] = line.trim().split(" = ");
    value = isNaN(value) ? value : Number(value);

    path.split(".").reduce((acc, key, i, keys) => {
      if (i === keys.length - 1) {
        if (
          key in acc &&
          typeof acc[key] === "object" &&
          !Array.isArray(acc[key])
        ) {
          acc[key] = {
            ...acc[key],
            [Object.keys(acc[key]).length.toString()]: value,
          };
        } else if (acc[key] !== undefined) {
          acc[key] = Array.isArray(acc[key])
            ? [...acc[key], value]
            : { 0: acc[key], 1: value };
        } else {
          acc[key] = value;
        }
      } else {
        acc[key] = acc[key] || {};
      }
      return acc[key];
    }, result);

    return result;
  }, {});
}

const data = fs.readFileSync("./data.txt", "utf-8");
console.log(JSON.stringify(convertToJSON(data), null, 2));
