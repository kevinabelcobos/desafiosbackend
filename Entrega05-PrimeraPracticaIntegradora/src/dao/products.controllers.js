import ProductModel from "./models/product.model.js";

class ProductManager {
  addProduct = async (product) => {
    try {
      const validate = await ProductModel.findOne({ code: product.code });
      if (validate) {
        throw new Error("No se pueden crear productos con el code repetido.");
      } else {
        await ProductModel.create(product);
        return "Product creado";
      }
    } catch (err) {
      throw err;
    }
  };
  getProducts = async () => {
    try {
      const products = ProductModel.find().lean().exec();
      return products;
    } catch (err) {
      console.log("No se encontraron productos en la base de datos.");
      return [];
    }
  };
  getProductById = async (id) => {
    try {
      const product = await ProductModel.findById(id).lean().exec();
      return product;
    } catch (err) {
      throw err;
    }
  };

  updateProduct = async (id, props) => {
    try {
      const validate = await ProductModel.findByIdAndUpdate(id, props);
      if (props.hasOwnProperty("id") || props.hasOwnProperty("code")) {
        throw new Error("El ID y el Codigo no pueden modificarse.");
      }
      if (validate === null) {
        console.log(
          `El producto con el ID ingresado no existe,no se puede modificar.`
        );
        throw new Error(`Producto inexistente`);
      }
      return "Producto actualizado correctamente";
    } catch (err) {
      throw err;
    }
  };

  deleteProduct = async (id) => {
    try {
      const productDeleted = await ProductModel.findByIdAndDelete(id);
      if (productDeleted === null) {
        console.log("No existe el producto,no se puede eliminar.");
        throw new Error("Producto inexistente,no se puede eliminar");
      }
      return "Producto eliminado correctamente";
    } catch (err) {
      throw err;
    }
  };
}

export default ProductManager;
