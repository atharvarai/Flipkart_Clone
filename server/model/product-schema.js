import mongoose from "mongoose";


// validating data before inserting into the database
const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    url: String,
    detailUrl: String,
    title: Object,
    price: Object,
    quantity: Number,
    description: String,
    discount: String,
    tagline: String
});

const Product = mongoose.model('product',productSchema);


export default Product;