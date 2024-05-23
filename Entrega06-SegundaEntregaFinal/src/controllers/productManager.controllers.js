import FileManager from "./fileManager.controllers.js";

export default class ProductManager extends FileManager {
  constructor(path) {
    super(path);
    this.path = path; //ruta del archivo
  }
  getNextId = async () => {
    const products = await this.get(); //Traemos la lista en donde se encuentran los productos
    /*
        Evaluamos si existen productos en el arreglo, en caso de que existan buscamos el ultimo leemos su ID y lo incrementamos en uno,si no hay
        productos, entonces devolvemos como ID 1, que es el primer ID
        */
    return products.length > 0 ? products[products.length - 1].id + 1 : 1;
  };
  //Valida que no se agrege un objeto con campos vacios
  validarProducto = (
    title,
    descripcion,
    code,
    price,
    stock,
    status,
    category,
    thumbail
  ) => {
    if (
      title === null ||
      title === "" ||
      descripcion === null ||
      descripcion === "" ||
      code === null ||
      code === "" ||
      price === null ||
      price === "" ||
      stock === null ||
      stock === "" ||
      status == "" ||
      category === null ||
      category === "" ||
      thumbail === null ||
      thumbail === ""
    ) {
      return false;
    }
    return true;
  };
  //Agrega un producto
  addProduct = async (
    title,
    descripcion,
    code,
    price,
    status,
    stock,
    category,
    thumbail
  ) => {
    try {
      const products = await this.get(); //Leemos los productos existentes
      /*
            Verificamos que no existe un producto con el code que estamos intentando ingresar, en caso de que exista le decimos al usuario que ya
            existe un producto con ese code y no lo dejamos agregar, si no existe entonces validamos que el producto no tenga campos vacios y 
            agregamos
            */
      if (products.some((element) => element.code === code))
        throw "No se pueden crear elementos con code repetido";
      if (
        this.validarProducto(
          title,
          descripcion,
          code,
          price,
          status,
          stock,
          category,
          thumbail
        )
      ) {
        const statusProduct = status === 0 ? true : false;
        const product = {
          id: await this.getNextId(),
          title,
          descripcion,
          code,
          price,
          status: statusProduct,
          stock,
          category,
          thumbail,
        };
        products.push(product); //Agregamos el nuevo producto al arreglo
        return await this.set(products); //Reescribimos el archivo
      }
      throw "No se pueden crear productos con campos incompletos";
    } catch (e) {
      throw e;
    }
  };
  getProducts = async () => {
    try {
      return await this.get();
    } catch (e) {
      throw [];
    }
  };
  //Retorna un producto concreto
  getProductById = async (id) => {
    try {
      const products = await this.get(); //Buscamos todos los productos
      const productByID = products.find((element) => element.id == id);
      if (productByID) return productByID; //Retornamos el producto pedido
      throw "Not found"; //En caso de no existir, entonces no retornamos nada e informamos
    } catch (e) {
      throw e;
    }
  };
  //Elimina un producto
  deleteProduct = async (id) => {
    try {
      let products = await this.get(); //Leemos los productos
      const productDelet = products.find((element) => element.id == id);
      if (productDelet)
        return this.set(
          products.filter((element) => element.id != productDelet.id)
        );
      throw "No existe el producto,no se puede eliminar";
    } catch (e) {
      throw e;
    }
  };
  updateProduct = async (
    id,
    title,
    descripcion,
    code,
    price,
    status,
    stock,
    category,
    thumbail
  ) => {
    try {
      const products = await this.get(); //Leemos todos los productos
      if (!products.find((element) => element.id == id))
        throw "No existe el producto,no se puede modificar"; //verificamos que exista
      const product = {
        id,
        title,
        descripcion,
        code,
        price,
        status,
        stock,
        category,
        thumbail,
      };
      if (this.validarProducto(product)) {
        products[products.findIndex((element) => element.id == id)] = product; //agregamos el nuevo producto en el indice del que modificamos
        return await this.set(products); //reescribimos el archivo;
      }
    } catch (e) {
      throw e;
    }
  };
}
