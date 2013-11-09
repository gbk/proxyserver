var config = require('./config');

exports.split = function(req, res, next) {
  var local = req.location;
  var remote = config.protocol + '://' + req.headers.host;
  req.locations = [];
  if (req.url.indexOf('??') === -1) { // single resource
    req.locations.push({
      local: local + req.url,
      remote: remote + req.url
    });
    next();
  } else { // combo resource
    var tmp = req.url.split('??');
    var prefix = tmp[0];
    tmp[1].split(',').forEach(function(path) {
      path = prefix + path;
      req.locations.push({
        local: local + path,
        remote: remote + path
      });
    });
    next();
  }
};
