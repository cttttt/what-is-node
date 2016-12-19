var deriveName = require('./derive-name'),
    http = require('http'),
    util = require('util'),
    url = require('url');

var lastNameFromHttp;

var server = http.createServer(function (req, res) {
    var reqUrl = url.parse(req.url, true);
    
    switch(reqUrl.pathname) {
        case '/api/name':
            switch (req.method) {
                case 'GET': 
                    deriveName.deriveName(function (err, name) {
                        if (err) {
                            res.writeHead(500, { 'content-type': 'text/plain' });
                            res.end('Internal Error');
                            return;
                        }

                        res.writeHead(200, { 'content-type': 'text/plain' });
                        res.end(util.format("%s\n", name));
                    });
                    return;
                case 'POST':
                    if (reqUrl.query && reqUrl.query.name) {
                        lastNameFromHttp = reqUrl.query.name;
                        res.writeHead(201, { 'content-type': 'text/plain' });
                        res.end('Accepted\n');
                    } else {
                        res.writeHead(400, { 'content-type': 'text/plain' });
                        res.end('Bad Request: Missing Query Parameter: name\n');
                        return;
                    }

                    break;
                case 'DELETE':
                    lastNameFromHttp = null;
                    res.writeHead(201, { 'content-type': 'text/plain' });
                    res.end('Accepted\n');
                    break;
                default:
                    res.writeHead(400, { 'content-type': 'text/plain' });
                    res.end('Bad Request\n');
                    return;
            }
        case '/':
            switch (req.method) {
                case 'GET':
                    deriveName.deriveName(function (err, name) {
                        if (err) {
                            res.writeHead(500, { 'content-type': 'text/plain' });
                            res.end('Internal Error');
                            return;
                        }

                        var message = util.format(
                            'Hello, %s\n',
                            lastNameFromHttp || name
                        );

                        res.writeHead(200, { 'content-type': 'text/plain' });
                        res.end(message);
                    });
                    return;
                default:
                    res.writeHead(400, { 'content-type': 'text/plain' });
                    res.end('Bad Request\n');
                    return;
            }
            break;
        default:
            switch (req.method) {
                case 'GET':
                    res.writeHead(404, { 'content-type': 'text/plain' });
                    res.end('Not found\n');
                    return;
                default:
                    res.writeHead(400, { 'content-type': 'text/plain' });
                    res.end('Bad Request\n');
                    return;
            }
    }
});

server.listen(process.env.PORT || 30303);
