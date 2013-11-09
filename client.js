var http = require('http');

// single file request
function request(location, success, failure) {
  http.get(location, function(res) {
    if (res.statusCode == 200) {
      var buffer = [];
      res.on('data', function(chunk) {
        buffer.push(chunk);
      }).on('end', function() {
        success(Buffer.concat(buffer));
      });
    } else {
      failure({ code: res.statusCode });
    }
  }).on('error', failure);
}

// multi file request (firstly local, secondly remote)
function multiRequest(locations, success, failure) {
  var buffer = [];
  var task = locations.length;
  locations.forEach(function(location, index) {
    function successWrap(data) {
      if (buffer) {
        buffer[index] = data;
        task--;
        !task && success(Buffer.concat(buffer));
      }
    }
    function failureWrap(e) {
      e.location = location;
      failure(e);
      buffer = null;
    }
    request(location.local, successWrap, function() {
      request(location.remote, successWrap, failureWrap);
    });
  });
}

exports.combine = function(req, res) {
  multiRequest(req.locations, function(data) {
    res.end(data);
  }, function(e) {
    res.statusCode = 404;
    res.end(e.code + ' ' + e.location);
  });
};
