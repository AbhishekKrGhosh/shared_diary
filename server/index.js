import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoute from './routes/auth.route.js'
import accountRoute from './routes/account.route.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()
const URL = process.env.CONNECTION_URL
app.use(express.json())
app.use(cookieParser())
mongoose.connect(URL)
.then(()=>{
    console.log('connected')
})
.catch((e)=>{
    console.log(e.message)
})
app.listen(3000, ()=>{
    console.log(`Server running on port 3000`)
})

app.use('/api/account', accountRoute)
app.use('/api/auth', authRoute)
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error"
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})