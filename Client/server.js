const express = require('express');
const path = require('path');
const dotenv = require('dotenv')
dotenv.config();
const app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
const publicPath = path.resolve(__dirname);

app.use(express.static(publicPath));

// We only want to run the workflow when not in production

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(port, function () {
  console.log('Server running on port ' + port);
});