import cartModel from "../models/cart.model.js";

class CartManager {
    async createCart() {
        try {
            const newCart = await CartModel.create({ products: [] });
            return newCart;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async getCartById(id) {
        try {
            let product = await cartModel.findOne({ _id: id });
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getCarts() {
        try {
            let carts = await cartModel.find()
            return carts;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateCart(cid, pid) {
        try {
            let existingCart = await cartModel.findOne({ _id: cid });
            if (!existingCart) throw new Error("No se encontro el carrito");
            let products = existingCart.products;
            let productToUpdate = products.filter(p => p.id == pid);
            if (productToUpdate.length > 0) {
                ++productToUpdate[0].quantity;
            } else {
                cartToUpdate.products.push({
                    "id": pid,
                    "quantity": 1
                })
            }
            let result = await cartModel.updateOne({ _id: cid }, existingCart)
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