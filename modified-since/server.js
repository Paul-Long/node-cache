const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// app.use(express.static(path.join(__dirname, './')));
app.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../index.html'));
});
app.get('/*.css', function (req, res, next) {
  const cssPath = path.join(__dirname, '..' + req.originalUrl);
  console.log(cssPath);
  // modified since
  fs.stat(cssPath, function (error, stat) {
    if (req.headers['if-modified-since'] === stat.mtime.toUTCString()) {
      res.writeHead(304, 'Not Modified');
      res.end();
    } else {
      fs.readFile(cssPath, function (error, content) {
        var lastModified = stat.mtime.toUTCString();
        res.setHeader('Last-Modified', lastModified);
        res.writeHead(200, 'OK');
        res.end(content);
      });
    }
  });
});
app.get('/*.js', function (req, res, next) {
  const jsPath = path.join(__dirname, '..' + req.originalUrl);
  console.log(jsPath);
  // modified since
  fs.stat(jsPath, function (error, stat) {
    if (req.headers['if-modified-since'] === stat.mtime.toUTCString()) {
      res.writeHead(304, 'Not Modified');
      res.end();
    } else {
      fs.readFile(jsPath, function (error, content) {
        var lastModified = stat.mtime.toUTCString();
        res.setHeader('Last-Modified', lastModified);
        res.writeHead(200, 'OK');
        res.end(content);
      });
    }
  });
});
const server = app.listen(4002, function () {
  const port = server.address().port;
  console.log("应用实例，访问地址为 http://localhost:%s", port)
});
