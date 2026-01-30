const express =  require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize'); /* Sanitization */

dotenv.config({ quiet: true }); /* Quiet is used to silence runtime logging message */

console.log(`\n=== Environment: ${process.env.NODE_ENV} ===`);

const app = express();

app.use(morgan(':method :url :date :remote-addr :status :response-time ms'));

// Security Middleware
app.use(helmet()); /* Secure Headers */
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
}));

// Parses incoming requests
app.use(express.json({ limit: '100kb' })); /* Limit body size to prevent DoS */
app.use(express.urlencoded({ extended: true, limit: '10kb' })); /* Parse URL-encoded data (from HTML forms) */

// Prevents NoSQL Injection (removes $ and . from user input)
app.use(mongoSanitize());

// Handle invalid routes
app.use('/', (_req, res) => {
  return res.status(404).send('Route not found');
});

// Global error handling
app.use((err, _req, res) => {
  return res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`API server started at http://localhost:${PORT}\n`));
