import mongoose from 'mongoose';

const messageCollection = "Mensaje";
const messageSchema = new mongoose.Schema({
    usuario: {type: String, required: true, max:100},
    message: {type: String, required: true},
})

const messageModel = mongoose.model(messageCollection, messageSchema);

export default messageModel;