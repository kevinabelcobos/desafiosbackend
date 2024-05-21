import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const productsCollection = "products";
const productModel = mongoose.model(
  productsCollection,
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    thumbail: {
      type: String,
      required: true,
    },
  })
);

export default productModel;
