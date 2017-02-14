const express = require('express');
const _ = require('lodash');
const path = require('path');

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/lookup/kantoor', (req, res) => {
  let kantoor = {
    code: "123"
  };
  res.json(kantoor);
});

app.listen(3000, () => console.log("listening on port 3000"));
