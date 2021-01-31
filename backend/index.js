const express = require('express');

const app = express();

const port = 8000;

app.get('/', (req, res) => {
  res.send('<h3>Hello notebook</h3>');
});

app.listen(port, () => {
  console.log(`We are living on ${port} port`)
})