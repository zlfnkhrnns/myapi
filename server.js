var express = require('express'),
    app = express(),
    port = process.env.PORT || 3001,
    bodyParser = require('body-parser');
var cors = require('cors');

//app.use(cors());
app.use(cors({ origin: '*' }));   
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/assets/kategori', express.static('assets/kategori'));
app.use('/assets/rekaman', express.static('assets/rekaman'));
app.use('/assets/foto', express.static('assets/foto'));
var routes = require('./routes');
routes(app);

app.listen(port);
console.log('Selamat datang di API Arisan dengan port: ' + port);

