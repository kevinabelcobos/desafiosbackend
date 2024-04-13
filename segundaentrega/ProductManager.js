const fs = require('fs') //Importamos el modulo File System para el manejo de archivos, este es nativo de nodeJS por lo que no debemos instalar nada.

class ProductManager {

    constructor(path) {

        this.path = path //ruta del archivo
        
        this.format = 'utf-8' //formato para leer el archivo
    
    }

    getNextId = async () => {

        const products = await this.getProducts() //Traemos la lista en donde se encuentran los productos

        /*
        Evaluamos si existen productos en el arreglo, en caso de que existan buscamos el ultimo leemos su ID y lo incrementamos en uno,si no hay
        productos, entonces devolvemos como ID 1, que es el primer ID
        */

        return products.length > 0 ? products[products.length -1].id + 1 : 1 

    }

    //Valida que no se agrege un objeto con campos vacios

    validarProducto = (product)=>{

        for (let campo in product) {
    
            if (!product[campo]) {
    
                return false;
    
            }
    
        }
    
        return true;
    
    } 

    actualizarArchivo = async(product) => await fs.promises.writeFile(this.path,JSON.stringify(product,null,'\t'),this.format)//Reescribimos el archivo
    
    //Agrega un producto

    addProduct = async (title, descripcion, price, thumbnail, code, stock) => {

        try{

            const products = await this.getProducts() //Leemos los productos existentes 
            
            /*
            Verificamos que no existe un producto con el code que estamos intentando ingresar, en caso de que exista le decimos al usuario que ya
            existe un producto con ese code y no lo dejamos agregar, si no existe entonces validamos que el producto no tenga campos vacios y 
            agregamos
            */

            if(products.some(element=>element.code === code)) return console.log('No se pueden crear productos con code repetido')

            const product = {id: await this.getNextId(),title,descripcion,price,thumbnail,code,stock}

            if(this.validarProducto(product)){
                
                products.push(product) //Agregamos el nuevo producto al arreglo
                
                return this.actualizarArchivo(products) //Reescribimos el archivo

            }
            
            return console.log('No pueden crearse productos con campos incompletos')

        }catch(e){

            console.log(e)

        }

    }

    //retorna los productos
    
    getProducts = async () => {
    
        try{

            return JSON.parse(await fs.promises.readFile(this.path,this.format) ) 
    
        }catch(e){
     
            return []
     
        }
    }

    //Retorna un producto concreto
    
    getProductById = async (id) => {
    
        try{
    
            const products = await this.getProducts() //Buscamos todos los productos
    
            if(products.find(element=>element.id==id)) return products.find(element=>element.id==id) //Retornamos el producto pedido
              
            return 'Not found' //En caso de no existir, entonces no retornamos nada e informamos
            
        }catch(e){

            console.log(e)
        
        }
    }

    //Elimina un producto
    
    deleteProduct = async (id) => {
       
        try{

            let products = await this.getProducts() //Leemos los productos

            if(products.find(element=>element.id == id)) return this.actualizarArchivo(products.filter(element=>element.id != products.find(element=>element.id == id).id )) 
                
            return console.log('No existe el producto, no se puede borrar')

        }catch(e){

            console.log(e)

        }
    
    }

    updateProduct = async (id,title, descripcion, price, thumbnail, code, stock) => {

        try{
        
            const products = await this.getProducts() //Leemos todos los productos

            if(!products.find(element=>element.id == id)) return console.log('No existe el producto,no se puede modificar') //verificamos que exista 
            
            const product = {id,title,descripcion,price,thumbnail,code,stock}

            if(this.validarProducto(product)){

                products[products.findIndex(element=>element.id == id)] = product //agregamos el nuevo producto en el indice del que modificamos
                
                return await this.actualizarArchivo(products) //reescribimos el archivo
            
            }

        }catch(e){

            console.log(e)
        
        }
    }

}

async function run(){
    const manager = new ProductManager('productos.json')
    console.log('----------Arreglo Vacio----------')
    console.log(await manager.getProducts()) //Arreglo vacio
    console.log()
    //Creamos productos y los agregamos al archivo
    await manager.addProduct('Notebook','Notebook Gamer Acer Nitro 5 15.6',465.999,'https://acortar.link/SLS5hS',14320,1)
    await manager.addProduct('Memoria Ram','Memoria GeiL DDR4 16GB 3000MHz Super Luce RGB Black',39550,'https://acortar.link/HgeG0G',9542,1)
    await manager.addProduct('Producto de prueba','Este es un producto de prueba',200,'Sin imagen','abc123',25)
    await manager.addProduct('Gabinete','Gabinete Kolink Inspire K3 RGB  M-ATX Vidrio Templado',25700,'https://acortar.link/BmqxdQ',10429,1)
    await manager.addProduct('Gabinete','Gabinete Kolink Inspire K3 RGB  M-ATX Vidrio Templado',25700,'https://acortar.link/BmqxdQ',10429,1) //repetido
    await manager.addProduct('Gabinete','',25700,'https://acortar.link/BmqxdQ',10420,1)    //Incompleto
    console.log('-----Productos agregados-----')
    console.log(await manager.getProducts())
    console.log()
    //Buscamos un objeto
    console.log('Objeto con el ID 4')
    console.log(await manager.getProductById(4)) //Elemento existente
    console.log()
    console.log('Objeto inexistente')
    console.log(await manager.getProductById(143200)) //Elemento inexistente
    console.log()
    console.log('Eliminamos el objeto con ID 3 y mostramos el arreglo')
    await manager.deleteProduct(3)
    await manager.deleteProduct(5) //Eliminamos uno que no exista
    console.log(await manager.getProducts())
    console.log()
    console.log('Modificamos los productos y mostramos el arreglo')
    await manager.updateProduct(1,'Memoria Ram','Memoria GeiL DDR4 16GB 3000MHz Super Luce RGB Black',39550,'https://acortar.link/HgeG0G',9542,1)
    await manager.updateProduct(2,'Notebook','Notebook Gamer Acer Nitro 5 15.6',465.999,'https://acortar.link/SLS5hS',14320,1)
    console.log(await manager.getProducts())
    console.log()
}

run()