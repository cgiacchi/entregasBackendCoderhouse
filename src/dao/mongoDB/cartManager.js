import cartModel from "../models/cart.model.js";

class CartManager {
    async addCart() {
        try {
            const cart = {products: []};
            let result = await cartModel.create(cart)
            return result;
        }  catch (err) {
            console.error("Error al crear el carrito:", err.message);
            return err;
        }
    }

    async getCartById(findId) {
        try {
            let result = await cartModel.findOne(findId);
            return result;
        } catch (err) {
            console.error("Error al obtener el carrito:", err.message);
            return err;
        }
    }

    async getCarts() {
        try {
            let result = await cartModel.find()
            return result;
        } catch (err) {
            console.error("Error al obtener el carrito:", err.message);
            return err;
        }
    }

    async updateCart(cid, pid) {
        try {
            let cartToUpdate = await cartModel.findOne({ _id: cid });
            let products = cartToUpdate.products;
            let productToUpdate = products.filter(p => p.id == pid);
            if (productToUpdate.length > 0) {
                ++productToUpdate[0].quantity;
            } else {
                cartToUpdate.products.push({
                    "id": pid,
                    "quantity": 1
                })
            }
            let result = await cartModel.updateOne({ _id: cid }, cartToUpdate)
            return result;
        }  catch (err) {
            console.error("Error al actualizar el carrito:", err.message);
            return err;
        }
    }

    async deleteCart(id) {  
        try {
            let result = await cartModel.deleteOne({ _id: id })
            return result;
        }  catch (err) {
            console.error("Error al eliminar el carrito:", err.message);
            return err;
        }
    }
}

export default CartManager;