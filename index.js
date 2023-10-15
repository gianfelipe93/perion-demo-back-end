const express = require("express")
const app = express()
const port = 8080
var cors = require('cors');
const router = express.Router()
const createRouter = require('./routes/router')

app.use(cors());

app.use('/api', createRouter(router))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})