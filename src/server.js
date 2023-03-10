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
    const part = parts.find((e) => e["serial"] === serial);
    res.json(part);

    if (!part) {
      return res.status(404).send("Part not found.");
    }
  } else if (name) {
    const filteredParts = parts.filter((e) => e["name"].includes(name));
    if (filteredParts.length === 0) {
      return res.status(404).send("Part not found.");
    }
    results.results = filteredParts.slice(startIndex, endIndex);
    res.json(results);
  } else {
    results.results = parts.slice(startIndex, endIndex);
    res.json(results);
  }
});

app.get("/square-parts/search/:serialOrName", (req, res) => {
  const { serialOrName } = req.params;

  const matchingParts = parts.filter(
    (e) => e["serial"] === serialOrName || e["name"] === serialOrName
  );

  if (matchingParts.length === 0) {
    return res.status(404).send("Part not found.");
  }

  res.json(matchingParts);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
