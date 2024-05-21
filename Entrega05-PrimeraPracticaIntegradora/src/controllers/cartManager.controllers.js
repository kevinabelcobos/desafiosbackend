import FileManager from "./fileManager.controllers.js";

export default class CartManager extends FileManager {
  constructor(path) {
    super(path);
    this.path = path;
  }
  getNextId = async () => {
    const carts = await this.get(); //Traemos la lista en donde se encuentran los productos
    /*
        Evaluamos si existen productos en el arreglo, en caso de que existan buscamos el ultimo leemos su ID y lo incrementamos en uno,si no hay
        productos, entonces devolvemos como ID 1, que es el primer ID
        */
    return carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
  };
  getCartsByID = async (id) => {
    try {
      const carts = await this.get();
      const cartByID = carts.find((cart) => cart.id === id);
      if (cartByID) return cartByID;
      throw "No se encontró el carrito";
    } catch (e) {
      throw e;
    }
  };
  addCart = async () => {
    try {
      const carts = await this.get();
      const cart = {
        id: await this.getNextId(),
        productos: [],
      };
      carts.push(cart);
      return await this.set(carts);
    } catch (e) {
      throw e;
    }
  };
  addProducCart = async (cid, pid) => {
    try {
      let carts = await this.get();
      const cartIDX = carts.findIndex((cart) => cart.id === cid);
      let { id, productos } = await this.getCartsByID(cid);
      const p = productos.find((element) => element.id === pid);
      if (p) {
        const pIDX = productos.findIndex((producto) => producto.id === pid);
        productos[pIDX].quantity += 1;
        carts[cartIDX] = { id: cid, productos: productos };
        return this.set(carts);
      }
      productos.push({ id: pid, quantity: 1 });
      carts[cartIDX] = { id: cid, productos: productos };
      return this.set(carts);
    } catch (e) {
      throw "No se encontró el carrito";
    }
  };
}
