import ProductModel from "./models/product.model.js";
import CartModel from "./models/cart.model.js";

class CartManager {
  createCart = async () => {
    try {
      const Cart = { products: [] };
      await CartModel.create(Cart);
      return { message: "Create cart Succes", cart: Cart, status: 201 };
    } catch (e) {
      throw e;
    }
  };
  getCartById = async (cid) => {
    try {
      const cart = await CartModel.findOne({ _id: cid }).populate(
        "products.pid"
      );
      if (cart) {
        return { message: "Succes", cart: cart, status: 200 };
      } else {
        return { message: "No se encontro el carrito", status: 404 };
      }
    } catch (err) {
      throw e;
    }
  };
  addProductCartById = async (cid, pid, quantity) => {
    try {
      let cart = await CartModel.findById(cid);
      let productos = await ProductModel.findById(pid);
      if (!cart) {
        cart = new CartModel({ products: { pid, quantity } });
        cart.save();
        return {message:"succes",status:200}
      }
      if (productos) {
        const productValidate = cart.products.find(
          (element) => element.pid.toString() === pid.toString()
        );
        if (productValidate) {
          productValidate.quantity += quantity;
          await cart.save();
        } else {
          cart.products.push({ pid, quantity });
          await cart.save();
        }
        return {
          message: "Producto añadido al carrito",
          cart: cart,
          status: 200,
        };
      } else {
        return { message: "no existe el producto", status: 404 };
      }
    } catch (e) {
      return { error: "Error al guardar el producto en el carrito" };
    }
  };
  deleteProductCartById = async (cid, pid) => {
    try {
      let cart = await CartModel.findById(cid);
      if (cart) {
        const productValidate = cart.products.find(
          (element) => element.pid.toString() === pid.toString()
        );
        if (productValidate) {
          await CartModel.updateOne(
            { _id: cid },
            { $pull: { products: { pid: pid } } }
          );
          await cart.save();
          return { message: "Producto eliminado del carrito", status: 200 };
        } else {
          return {
            message: "El producto indicado no pertenece al carrito.",
            status: 404,
          };
        }
      } else {
        return {
          message: "No pudimos encontrar el carrito en nuestra base de datos.",
          status: 404,
        };
      }
    } catch (e) {
      res
        .status(404)
        .send({ error: "Ha ocurrido un error", message: e.message });
    }
  };
  deleteProductsCart = async (cid) => {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) {
        return { message: "No pudimos encontrar el carrito", status: 404 };
      } else {
        await CartModel.updateOne({ _id: cid }, { $set: { products: [] } });
        await cart.save();
        return { message: "Products deleted", status: 200 };
      }
    } catch (error) {
      return error;
    }
  };
  actualizarProductoCarritoById = async (cid, pid, quantity) => {
    try {
      let cart = await CartModel.findById(cid);
      const product = cart.products.find(
        (item) => item.pid.toString() === pid.toString()
      );
      if (!product) {
        return {
          message: "El producto que intenta actualizar no existe",
          status: 404,
        };
      } else {
        product.quantity = quantity;
        await cart.save();
        return {
          message: "Producto actualizado correctamente",
          cart,
          status: 200,
        };
      }
    } catch (e) {
      return { error: "Ha ocurrido un error", message: e.message };
    }
  };
  actualizarCarritoById = async (cid) => {
    try {
      let cart = await CartModel.findById(cid);
      if (cart) {
        await CartModel.updateOne({ _id: cid }, { $set: { products: [] } });
        return { message: "Cart update succes", status: 200 };
      } else {
        return { message: "No existe el carrito", status: 404 };
      }
    } catch (e) {
      throw e;
    }
  };
}

export default CartManager;
