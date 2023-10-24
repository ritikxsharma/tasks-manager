const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors')
const connectDB = require('./config/database_connection')
const authValidator = require('./middlewares/validators/auth_validator')
const errorHandler = require('./middlewares/errorHandling/errorHandler');
const PORT = process.env.PORT || 5001
const app = express()

connectDB()
app.use(cors())
app.use(express.json())
app.use('/api/auth', require('./router/auth_router'))
app.use('/api', require('./router/tasks_router'))

app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server listening on http://localhost:${PORT}`);
})
