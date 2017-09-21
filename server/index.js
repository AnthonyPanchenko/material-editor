const path = require('path');
const http = require('http');
const fallback = require('express-history-api-fallback');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const open = require('open');
const config = require('../config');

const API = config.apiUrl;
const PORT = process.env.PORT || config.serverPort;

const usersList = [
  { id: '23sgfa', edge: 23, name: 'Tim', surname: 'Tom' },
  { id: '34s4fa', edge: 34, name: 'Dony', surname: 'Darko' },
  { id: '12s3fa', edge: 12, name: 'Alex', surname: 'Warko' },
  { id: '31swfa', edge: 31, name: 'Den', surname: 'Don' },
  { id: '45ssfa', edge: 45, name: 'Denis', surname: 'Stark' },
  { id: '234sdf', edge: 31, name: 'Ron', surname: 'Bak' },
];

// https://github.com/expressjs/cors
const corsOptions = {
  origin: `http://${config.clientHost}:${config.clientPort}`,
  credentials: true,
  optionsSuccessStatus: 200,
};

const app = express();
app.set('port', PORT);

const server = http.createServer(app);
server.listen(PORT);

// static files
app.use(cors(corsOptions)); // CORS middleware on express side
app.use(express.static(path.resolve(__dirname, config.static)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fallback(`${__dirname}/index.html`));

app.get(`${API}/users`, (req, res) => {
  res.json(usersList);
});

if (process.argv.indexOf('--open') !== -1) {
  console.log(`Listening at ${config.serverHost}:${PORT}/`);
  open(`http://${config.serverHost}:${PORT}/`);
}
