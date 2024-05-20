import productModel from "../models/product.model.js";

class ProductManager {
    async addProduct(title, description, category, price, thumbnail, code, stock) {
        try{
        let result = await productModel.create({ title, description, category, price, thumbnail, code, stock})
        return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(findPid) {
        try {
            let result = await productModel.findOne(findPid);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getProducts() {
        try {
            let products = await productModel.find()
            return products;
        } catch (error) {
            console.log(error)
        }
    }

    async updateProducts(id, productUpdate) {
        try{
        let result = await productModel.updateOne({ _id: id }, productUpdate);
        return result;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try{
        let result = await productModel.deleteOne({ _id: id });
        return result;
        } catch (error) {
            console.log(error);
        }
    }
}

export default ProductManager;