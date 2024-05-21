import CartModel from "./models/cart.model";

class CartManager {
  createCart = async () => {
    try {
      const cart = {
        products: [],
      };

      await CartModel.create(cart);
      return "Carrito creado satisfactoriamente";
    } catch (err) {
      throw err;
    }
  };

  getCartById = async (id) => {
    try {
      const cart = await CartModel.findById(id).lean().exec();
      if (cart === null) {
        console.error(`El carrito buscando con el id: ${id} no existe`);
        throw new Error(`El carrito buscando con el id: ${id} no existe`);
      }
      return cart;
    } catch (err) {
      throw err;
    }
  };

  updateCart = async (id, arrayProducts) => {
    try {
      const validate = await CartModel.findByIdAndUpdate(id, {
        products: arrayProducts,
      });

      if (validate === null) {
        console.log(`El carrito buscando con el id: ${id} no existe`);
        throw new Error(`El carrito buscando con el id: ${id} no existe`);
      }
      return "Carrito de compras actualizado";
    } catch (err) {
      throw err;
    }
  };
}

export default CartManager;
