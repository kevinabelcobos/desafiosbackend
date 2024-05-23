import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const categoryCollection = "categorys";

const categorySchema = new mongoose.Schema({
  _id: String,
  name: {
    type: String,
    required: true,
  },
});

categorySchema.plugin(mongoosePaginate);

const categoryModel = mongoose.model(categoryCollection, categorySchema);

export default categoryModel;
