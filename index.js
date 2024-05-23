const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json({limit: '200mb'}));
app.use(express.json());

const options = {
  origin: (origin, callback) => {
      callback(null, true);
  }
}

app.use(cors(options)); 

app.get('/', (req, res) => {
  res.send('');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('prueba');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {

}); 
