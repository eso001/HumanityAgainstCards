//Main starting point
var common = require('./common');

const express = common.express;
const http = require('http');
const bodyParser = require('body-parser');
// const morgan = require('morgan');
const app = common.app
const auth = require('./auth');
const mongoose = require('mongoose');
//DB Setup
const cors = require('cors');
const lobby = require('./controllers/lobbyServer')
const user = require('./controllers/user')
mongoose.connect('mongodb://humanityagainstcards:humanityagainstcards@ds013024.mlab.com:13024/humanityagainstcards')

// mongoose.connect('mongodb://')
//App Setup

//morgan and bodyparser are considered "middleware";
//morgan is a "logging framework", 
//morgan is used for debugging basically

//bodyparser will parse requests, any request that comes in
//will be parsed like its json

// app.use(morgan('combined'));
app.use(cors())
app.use(bodyParser.json({type: '*/*'}));
auth(app);
app.use('/lobby', lobby)
app.use('/user', user)
//Server Setup

const port = process.env.PORT || 3090;
const server = common.server;
server.listen(port);
console.log('server listening on:', port);