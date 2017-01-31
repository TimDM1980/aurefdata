const express = require('express');
const _ = require('lodash');
const path = require('path');

const app = express();
app.get('/kantoor', (req, res) => {
  let kantoor = {
    code: "123"
  };
  res.json(kantoor);
});

app.listen(3000, () => console.log("listening on port 3000"));
