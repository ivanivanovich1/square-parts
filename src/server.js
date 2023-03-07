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
const port = 3005;

app.set("json spaces", 40);

app.get("/", (req, res) => {
  res.send("/square-parts");
});

app.get("/square-parts", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 30;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  const { serial, name } = req.query;

  if (serial) {
    res.json(parts.find((e) => e["serial"] === serial));
  } else if (name) {
    res.json(parts.find((e) => e["name"] === name));
  } else if (serial && name) {
    res.json(parts.find((e) => e["serial"] === serial && e["name"] === name));
  } else {
    results.results = parts.slice(startIndex, endIndex);
    res.json(results);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
