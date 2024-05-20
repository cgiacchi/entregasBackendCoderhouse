import cartModel from "../models/cart.model.js";

class CartManager {
    async addCart() {
        try {
            const cart = {products: []};
            let result = await cartModel.create(cart)
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(findId) {
        try {
            let result = await cartModel.findOne(findId);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getCarts() {
        try {
            let carts = await cartModel.find()
            return carts;
        } catch (error) {
            console.log(error)
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
        } catch (error) {
            console.log(error)
        }
    }

    async deleteCart(id) {
        try {
            let result = await cartModel.deleteOne({ _id: id })
            return result;
        } catch (error) {
            console.log(error)
        }
    }
}

export default CartManager;