/* Crear un servidor HTTP básico por el puerto 3000 */
const http = require('http');
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');d adsasdda asd
}
);f
server.listen(3000, () => {
    console.log('Server running at port 3000');
    
}
);

