const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter the message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message" />');
        res.write('<button type="submit">message</button>')
        res.write('</form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            // making file writing asynchronuos
            fs.writeFile('message.txt', message, err => {
                res.statusCode = '302';
                res.setHeader('Location', '/');
                return res.end();
            });
        });        
    }
}

module.exports = requestHandler;