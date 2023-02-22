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

// todo: pagination (30 parts per one page)
app.get("/parts", (req, res) => {
  res.json(parts);
});

app.get("/parts/:serial", (req, res) => {
  res.json(parts.find((e) => e["serial"] === req.params.serial));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
