import mongoose from "mongoose";

const cartsCollection = "cart";

const productSchema = new mongoose.Schema({
  _id: String,
  quantity: Number,
});
const cartSchema = new mongoose.Schema({
  products: [productSchema],
});

const CartModel = mongoose.model(cartsCollection, cartSchema);

export default CartModel;
