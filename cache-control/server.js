const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../index.html'));
});
app.get('/*.css', function (req, res, next) {
  const cssPath = path.join(__dirname, '..' + req.originalUrl);
  console.log(cssPath);
  // cache control
  fs.readFile(cssPath, function (error, content) {
    res.setHeader('Cache-Control', 'public, max-age=600');
    res.end(content);
  });
});
app.get('/*.js', function (req, res, next) {
  const jsPath = path.join(__dirname, '..' + req.originalUrl);
  console.log(jsPath);
  // cache-control
  fs.readFile(jsPath, function (error, content) {
    res.setHeader('Cache-Control', 'public, max-age=600');
    res.end(content);
  });
});
const server = app.listen(3389, function () {
  const port = server.address().port;
  console.log("应用实例，访问地址为 http://localhost:%s", port)
});
