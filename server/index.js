const path = require('path');
const http = require('http');
const fallback = require('express-history-api-fallback');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const open = require('open');
const config = require('../app.config');

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
// const whitelist = [`http://${config.clientHost}:${config.clientPort}`, 'https://material-editor.herokuapp.com/'];

// const corsOptions = {
//   origin: false,
//   credentials: true,
//   optionsSuccessStatus: 200
// };

// const corsOptionsDelegate = (req, callback) => {
//   corsOptions.origin = whitelist.indexOf(req.header('Origin')) !== -1;
//   callback(null, corsOptions);
// };

const app = express();
// app.set('port', PORT);

// const server = http.createServer(app);
app.listen(PORT);

// static files
// app.use(cors(corsOptionsDelegate)); // CORS middleware on express side
app.use(express.static(path.resolve(__dirname, config.static)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fallback(path.resolve(__dirname, `${config.static}/index.html`)));

app.get('/*', cors(), (req, res, next) => {
  if (req.url.indexOf('/api/') === -1) {
    res.sendFile(path.resolve(__dirname, `${config.static}/index.html`));
    // res.render('index', { title: "React-starter" }); // for ejs
  } else {
    next();
  }
});

app.get(`${API}/users`, cors(), (req, res) => {
  res.json(usersList);
});

if (process.argv.indexOf('--open') !== -1) {
  console.log(`Listening at ${config.serverHost}:${PORT}/`);
  open(`http://${config.serverHost}:${PORT}/`);
}
