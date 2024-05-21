import messageModel from "../models/message.model.js";

class MessageManager {
    async addMessage(user, message) {   
        try {
        if ((!user, !message))
            throw new Error("Completa todos los campos requeridos");
        let result = await messageModel.create({ user, message });
        return result;
        } catch (error) {
        throw new Error("Error al crear un nuevo mensaje");
        }
    };


    async getMessageById(id) {
        try {
            let result = await messageModel.findOne({_id:id});
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getMessages() {
        try {
            let message = await messageModel.find({}).lean();
            if (message.lenght === 0) throw new Error("Mensaje no encontrado");
            return message;
        } catch (error) {
            throw new Error("Error al recibir mensaje");
        }
    };


    async updateMessage(id, messageUpdate) {
        try{
            let result = await messageModel.updateOne({ _id: id }, messageUpdate);
            return result;
            } catch (error) {
                console.log(error);
            }
    }

    async deleteMessage(id) {
        try{
            let result = await messageModel.deleteOne({ _id: id });
            return result;
            } catch (error) {
                console.log(error);
            }
    }

}

export default MessageManager;