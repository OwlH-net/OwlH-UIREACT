const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const apiRoutes = require('./routes')
const localRoutes = require('./localRoutes')
const cors = require('cors')

const app = express()
app.use(function(req, res, next) {
  req.headers['if-none-match'] = 'no-match-for-this';
  next();    
});

app.use(cors({
  origin: '*'
}));

app.use(express.static('dist'));
app.set('etag', false);

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// A este path pasan por la autenticación básica
// app.use('/bauth/api', routes)

// A este path no se necesita autenticación
// app.use('/api', routes)


app.get('/', (req, res, next) => {
  res.sendFile('index.html');
})

app.use('/login', apiRoutes)

app.use('/config', localRoutes)


app.use((req, res, next) => {
  res.status(404).json({error: 'Meh!'})
})

const server = http.createServer(app);
const host = "0.0.0.0"
const port = "8085"
server.listen(port, host, () => {
  console.log('Listening ...')
})