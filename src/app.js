import express from 'express'
import mongoose from 'mongoose'
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

import userRouter from './routes/user.router.js'
import cartRouter from './routes/cart.router.js'
import messageRouter from './routes/message.router.js'
import productRouter from './routes/product.router.js'

import dotenv from 'dotenv'
dotenv.config()
mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log("Conectado a la base de datos") })
    .catch(error => console.error("Error en la conexion", error))

import MessageManager from "./dao/mongoDB/messageManager.js";
const messageManager = new MessageManager();

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use('/api/users', userRouter)
app.use('/api/carts', cartRouter)
app.use('/api/messages', messageRouter)
app.use('/api/products', productRouter)

const httpServer = app.listen(PORT, console.log(`Server running on port ${PORT}`));
const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
    console.log("Cliente conectado");
    messageManager.checkMessages().then(messages => {
        socketServer.emit('messages', messages)
    })

    socket.on('addMessage', (data)=> {
        messageManager.addMessage( data.user, data.message).then(() => {
            messageManager.checkMessages().then(messages => {
                socketServer.emit('messages', messages)
            })
        })
    })
})
