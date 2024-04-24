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

module.exports.ProductManager = ProductManager