import mongoose from 'mongoose';

const Scema= mongoose.Schema;
const ProductSch= new Scema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPrice:{
        type: Number,
        required: true
    },
    countInStock:{
        type: Number,
        required: true
    },
    sku: {
    type: String,
    required: true
    },
    category:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    sizes:{
        type : Array,
        required: true
    },
    colors:{
        type : Array,
        required: true
    },
        collections: {
       type: String,
        required: true
    },
       material: {
        type: String,
        required: true
       },
    gender: {
        type: String,
        required: true
    },
    images:{
        type: Array,
        required: true
    },
    rating: {
        type: Number
    },
    numReviews:{
        type: Number,
        default: 0,
    },
})

export default mongoose.models.Products || mongoose.model("Products", ProductSch)