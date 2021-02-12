const querystring = require('querystring')

exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    const body = event.body.toString();
    const buf = Buffer.from(body, 'base64').toString('ascii');
    const params = querystring.parse(buf);

    return parseCommandData(params.text)
};


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
