import express from 'express'
import http from 'http';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { Server } from 'socket.io';
import authRoute from './routes/auth.route.js'
import accountRoute from './routes/account.route.js'
import testRoute from './routes/test.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()
const app = express()
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      credentials: true
    }
  });
io.on('connection', (socket) => {
    console.log('a user connected');
      socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
const URL = process.env.CONNECTION_URL
app.use(express.json())
app.use(cookieParser())
app.use(cors());
mongoose.connect(URL)
.then(()=>{
    console.log('connected')
})
.catch((e)=>{
    console.log(e.message)
})
server.listen(3001, () => {
  console.log(`Server running on port 3001`);
});

app.use('/api/account', accountRoute)
app.use('/api/auth', authRoute)
app.use('/',testRoute)
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error"
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})

export { io }