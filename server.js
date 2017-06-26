const express = require('express');
const path = require('path');

const app = express();

app.use(require('body-parser').json());

app.use('/static', express.static(path.join(__dirname, 'static')));

// Routes
app.use('/api/weather', require('./api/weather').router);

app.get('/', (req, res) => {
  res.status(200).send({
  status: 'OK',
  results: 'api is alive',
});

});

app.listen(3000, () => {
  console.info('Running on port 3000');
});

app.use((err, req, res, next) => {
  switch (err.message) {
    case 'NotFound':
      return res.status(404).send({
        status: 'ERROR',
        error: err.message,
      });
    default:
      return res.status(500).send({
        status: 'ERROR',
        error: err.message,
      });
}
});
