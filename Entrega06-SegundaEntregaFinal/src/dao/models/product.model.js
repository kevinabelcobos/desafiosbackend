import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

mongoose.set("strictQuery", false);

const productSchema = mongoose.Schema({
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
});

const productsCollection = "products";

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productsCollection, productSchema);

export default productModel;
