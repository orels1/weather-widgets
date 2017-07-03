const express = require('express');
const path = require('path');
const pug = require('pug');

const app = express();

app.use(require('body-parser').json());

app.use('/static', express.static(path.join(__dirname, 'static')));

// Routes
app.use('/api/weather', require('./api/weather').router);
app.use('/embed', require('./api/embed').router);

app.get('/', (req, res) => {
  res.status(200).send(pug.renderFile(path.join(__dirname, 'app/views', 'index.pug')));
});

app.listen(process.env.WEATHER_PORT || 3000, () => {
  console.info('Running on port 3000');
});

app.use((req, res, next) => {
  res.redirect('/');
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
