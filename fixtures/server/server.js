const express = require('express');
const app = express()
const port = 1337;

// routes will go here
app.post('/post', function(req, res) {
  let now = new Date()
  let scode = null
  if (req.query !== undefined) {
    if (req.query.code !== undefined) {
      scode = req.query.code
    } else {
      scode = 201
    }
  }
  console.log(now, 'BODY', scode) //, req.body)
  res.status(scode).send('{"data": 0}');
});

app.listen(port);
console.log('Server listening on port http://localhost:' + port);
