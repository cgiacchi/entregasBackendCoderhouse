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

        let result = await productModel.create(product);
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

    // async getProducts(queryParams) {
    //     try {
    //         const { limit, page, status, category, sort } = queryParams;
    //         const filter = {};
    //         if (status !== null) {
    //             filter.status = status;
    //         }
    //         if (category) {
    //             filter.category = category;
    //         }
    //         return await productModel.paginate(filter, { limit, page, sort, lean: true });
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    
    async getProducts(query) {
        try {
            let { limit, page, sort } = query;
            if (!limit) {
                limit = 10;
            }
            if (!page) {
                page = 1;
            }
            let sortOptions = {};
            if (sort) {
                let order = parseInt(sort);
                sortOptions = { price: order };
            }
            let filterOptions = {};
            if (query.category) {
                filterOptions = {category: query.category};
            }
            if (query.available) {
                filterOptions = {available: query.available};
            }
            let products = await productModel.paginate(filterOptions, { limit: limit, page: page, sort: sortOptions });
            return products;
        } catch (error) {
            console.log(error)
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