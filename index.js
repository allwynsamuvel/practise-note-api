const express =  require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

dotenv.config({ quiet: true }); /* quiet is used to silence runtime logging message */

console.log(`\n=== Environment: ${process.env.NODE_ENV} ===`);

const app = express();

app.use(helmet());
app.use(morgan(':method :url :date :remote-addr :status :response-time'));
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
}))

// parses incoming requests
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// handle invalid routes
app.use('/', (_req, res) => {
  return res.status(404).send('Route not found');
});

// global error handling
app.use((err, _req, res) => {
  return res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`API server started at http://localhost:${PORT}\n`));
