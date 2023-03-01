"use strict";

const csvjson = require("csvjson");
const express = require("express");

const fs = require("fs");
const path = require("path");

const data = fs.readFileSync(path.join(__dirname, "../data/LE.txt"), {
  encoding: "utf8",
});

const options = {
  delimiter: "\t",
  quote: '"',
};

const parts = csvjson.toObject(data, options);

const app = express();
const port = 3000;

app.set("json spaces", 40);

app.get("/", (req, res) => {
  res.send("/parts");
});

// ? endpoint returns a paginated list of parts
app.get("/parts", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 30;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  results.results = parts.slice(startIndex, endIndex);
  res.json(results);
});

// ? endpoint returns a single part by serial number
app.get("/parts/:serial", (req, res) => {
  res.json(parts.find((e) => e["serial"] === req.params.serial));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
