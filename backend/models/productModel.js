import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
    {
        user: {
        //which user reviewed a product
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User", //refrence to user collection where we store all our users
        },
        name: {
        type: String,
        required: true,
        },
        rating: {
        type: Number,
        required: true,
        },
        comment: {
        type: String,
        required: true,
        },
    },
    { timestamps: true }
);

const productSchema = new Schema(
    {
        //each product need to be connected with a user, i.e. who created it.
        user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User", //refrence to user collection where we store all our users
        },

        name: {
        type: String,
        required: true,
        },
        image: {
        type: String,
        required: true,
        },
        brand: {
        type: String,
        required: true,
        },
        category: {
        type: String,
        required: true,
        },
        description: {
        type: String,
        required: true,
        },
        reviews: {
        type: [reviewSchema],
        },
        rating: {
        type: Number,
        required: true,
        default: 0,
        },
        numReviews: {
        type: Number,
        required: true,
        default: 0,
        },
        price: {
        type: Number,
        required: true,
        default: 0,
        },
        countInStock: {
        type: Number,
        required: true,
        default: 0,
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
// "products" collection will be created based on Product model.

export default Product;
