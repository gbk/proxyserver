var config = require('./config');

exports.split = function(req, res, next) {
  var url = req._url;
  var local = req.location;
  var remote = config.protocol + '://' + req.headers.host;
  req.locations = [];
  if (url.indexOf('??') === -1) { // single resource
    req.locations.push({
      local: local + url,
      remote: remote + url
    });
    next();
  } else { // combo resource
    var tmp = url.split('??');
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
