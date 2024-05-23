import productModel from "../models/product.model.js";

class ProductManager {
    async addProduct(product) {
        try{
            const {
                title,
                description,
                price,
                thumbnail,
                category,
                code,
                stock,
                status = true,
            } = product;
            if (
                !title ||
                !description ||
                !price ||
                !thumbnail ||
                !category ||
                !code ||
                !stock ||
                !status
            ) throw new Error("Completa todos los campos requeridos");

        let result = await productModel.create(product)
        return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getProductById(id) {
        try {
            let result = await productModel.findOne({_id:id});
            if (!result) throw new Error("Producto no encontrado");
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getProducts() {
        try {
            let products = await productModel.find()
            return products;
        } catch (error) {
            throw new Error(error.message);
        }
    }


    async updateProduct(id, product) {
        try{     
        const {
        title,
        description,
        price,
        thumbnail,
        category,
        code,
        stock,
        status = true,
        } = product;

        let result = await productModel.updateOne({ _id: id }, product);
        return result;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try{
        let result = await productModel.deleteOne({ _id: id });
        if (!result) throw new Error("Producto no encontrado");
        return "Producto eliminado con exito";
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default ProductManager;