const express = require("express");
const app = express();
const port = 80;

app.use(express.static("./docs/.vuepress/dist"));

module.exports = app.listen(port, (err) => {
  if (err) throw err;
  console.log(`listen ${port}`);
});
