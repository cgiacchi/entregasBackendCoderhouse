import cartModel from "../models/cart.model.js";

class CartManager {
    async createCart() {
        try {
            const newCart = await cartModel.create({ products: [] });
            return newCart;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async getCartById(id) {
        try {
            let result = await cartModel.findOne({ _id:id}).populate("products.product");
            return result;
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


    async deleteProductsCart(cid){
        try {
            let cart = await cartModel.findOne({ _id: cid });
            cart.products = [];
            let result = await cartModel.updateOne({ _id: cid }, cart)
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductCart(cid, pid) {
        try {
            let cart = await cartModel.findOne({ _id: cid });
            let products = cart.products;
            let iProductToDelete = products.indexOf(p => p.id == pid);
            cart.products.splice(iProductToDelete,1);
            let result = await cartModel.updateOne({ _id: cid }, cart)
            return result;
        } catch (error) {
            console.log(error)
        }
    }
    async updateProductQuantity(cart, product, quantity) {
        try {
            const productIndex = cart.products.findIndex(p => p.product._id.toString() === product._id.toString());
            if (productIndex === -1) {
                return null;
            }
            cart.products[productIndex].quantity = quantity;
            return await cartModel.findByIdAndUpdate(cart._id, { products: cart.products }, { new: true });
        } catch (error) {
            throw error;
        }
    }
}

export default CartManager;