// index.js
// where your node app starts

var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// serve static files
app.use(express.static('public'));

// serve index.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// timestamp API endpoint
app.get("/api/:date?", function (req, res) {
  let dateInput = req.params.date;

  // If no date is provided, use the current date
  let date;
  if (!dateInput) {
    date = new Date();
  } else {
    // Check if it's a Unix timestamp or a natural date string
    if (!isNaN(dateInput)) {
      dateInput = parseInt(dateInput);
    }
    date = new Date(dateInput);
  }

  // If date is invalid, return error
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return the Unix timestamp and UTC date
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
