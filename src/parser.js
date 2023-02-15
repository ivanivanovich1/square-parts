// ? the code below just parses the CSV file and converts it to JSON

"use strict";

const csvjson = require("csvjson");
const fs = require("fs");
const path = require("path");

const data = fs.readFileSync(path.join(__dirname, "../data/LE.txt"), {
  encoding: "utf8",
});

const options = {
  delimiter: "\t",
  quote: '"',
};

const json = csvjson.toObject(data, options);

console.log(json.filter((value) => (value = "B")));
