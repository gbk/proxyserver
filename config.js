var mapping = {};

exports.port = 80;
exports.protocol = 'http';

exports.prepare = function(req, res, next) {
  var ip = req.connection.remoteAddress;
  var url = req._url = req.url;
  if (url.charAt(0) !== '/') {
    req._url = url = url.substring(url.indexOf('/', 8));
  }
  if (url === '/pz') { // do config
    if (req.method === 'POST') { // setter
      mapping[ip] = req.body.location;
      res.end('<script>parent.saved()</script>');
    } else { // getter
      res.end('<script>parent.init("' + (mapping[ip] || '') + '")</script>');
    }
  } else { // do prepare
    req.location = mapping[ip];
    if (req.location) {
      next();
    } else { // must config first
      res.statusCode = 302;
      res.setHeader('Location', '/');
      res.end();
    }
  }
}
