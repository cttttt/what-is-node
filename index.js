var deriveName = require('./derive-name'),
    http = require('http'),
    util = require('util');

var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'content-type': 'text/plain' });
    var message = util.format('Hello, %s\n', deriveName());
    res.end(message);
});

server.listen(process.env.PORT || 30303);
