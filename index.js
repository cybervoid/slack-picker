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
        const command = parsedData.command
        const commandData = parsedData.text
        const response = parseCommandData(commandData)
        res.end(`${response}`);
    });


})
server.listen(port, hostname);

function parseCommandData(data) {
    //check if the list is comma separated
    let res = `Can't parse the provided list. Please provide a valid list 😕`

    if (data.indexOf(",") !== -1) {
        res = generateList(data, ",")
    } else {
        //comma list not detected, try space separated list
        if (data.indexOf(" ") !== -1) {
            res = generateList(data, " ")
        }
    }
    return res
}

function generateList(data, listSeparator) {
    const list = data.split(listSeparator);
    const random = Math.floor(Math.random() * list.length)
    return `${list[random]} was chosen 🙌`
}
