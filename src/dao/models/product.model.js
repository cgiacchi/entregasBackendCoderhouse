import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "Productos"

    const productSchema = new mongoose.Schema({  
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    thumbnail: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        require: true,
        unique: true,
    },
    stock: {
        type: Number,
        require: true,
    },
    status: {
        type: Boolean,
        require: true,
    },
    });
    
productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productCollection, productSchema)

export default productModel