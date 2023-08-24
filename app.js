require('dotenv').config()

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const router = require('./routes')
const handleError = require('./middlewares/handleError')
const { limiterSetting } = require('./utils/constants')
const { requestLogger, errorLogger } = require('./middlewares/logger')

const { PORT = 3000, DB_ADDRESS =  'mongodb://127.0.0.1:27017/bitfilmsdb' } =  process.env;

const app = express()

const limiter = rateLimit(limiterSetting)
app.use(limiter)

app.use(cors())



app.use(helmet())
app.use(express.json())
app.use(cookieParser())


app.use(requestLogger)
app.use(router)
app.use(errorLogger)
app.use(handleError)

mongoose
  .connect(DB_ADDRESS, {})
  .then(() => console.log('БД подключена'))
  .catch(() => console.log('Не удалось подключиться к БД'));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
