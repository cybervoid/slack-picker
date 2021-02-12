const http = require('http');
const hostname = 'localhost';
const querystring = require('querystring')

const port = 3000;
const server = http.createServer((req, res) => {
    console.log(req.headers);
    res.statusCode = 200;

    let rawData = ''
    req.on('data', chunk => {
        rawData += chunk
    })

    req.on('end', () => {
        let parsedData = querystring.decode(rawData)
        res.end(`Hello, ${parsedData.user_name}`);
    });


})
server.listen(port, hostname);
