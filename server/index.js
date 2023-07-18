const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000;

const routerDb = require('./routesDb.js');

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use('/admin/:uuid', express.static(path.join(__dirname, '../client/dist')));
app.use('/invited/:uuid', express.static(path.join(__dirname, '../client/dist')));

app.use('/invitations', routerDb);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});