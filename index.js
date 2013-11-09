var mapping = {};
var connect = require('connect');
var config = require('./config');
var concat = require('./concat');
var client = require('./client');

var app = connect()
  .use(connect.static('public'))
  .use(connect.urlencoded())
  .use(config.prepare)
  .use(concat.split)
  .use(client.combine)
  .listen(80);
