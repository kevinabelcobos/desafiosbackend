/*
Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos.
Aspectos a incluir
✓Se deberá utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos.
✓Desarrollar un servidor express que, en su archivo app.js importe al archivo de ProductManager que actualmente tenemos.
Aspectos a incluir
✓El servidor debe contar con los siguientes endpoints:
    ○ ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. Agregar el soporte para recibir por query 
    param el valor ?limit= el cual recibirá un límite de resultados. 
✓Si no se recibe query de límite, se devolverán todos los productos
✓Si se recibe un límite, sólo devolver el número de productos solicitados
    ○ ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos 
    los productos.

Sugerencias
● Tu clase lee archivos con promesas. recuerda usar async/await en tus endpoints
● Utiliza un archivo que ya tenga productos, pues el desafío sólo es para gets.

Formato del entregable: 
✓ Link al repositorio de Github con el proyecto completo, el cual debe incluir:
- carpeta src con app.js dentro y tu ProductManager dentro.
- package.json con la info del proyecto.
-NO INCLUIR LOS node_modules generados.
*/

const productManager = require('./ProductManager.js')

const express = require('express')

const app = express()

const manager = new productManager.ProductManager('productos.json')

app.get('/products',async(req,res)=>{

    const limit = req.query.limit

    const products = await manager.getProducts() 

    if(!limit) return res.json(products)

    const productRequire = []

    for(let i = 0;i<limit;i++){
        productRequire[i] = products[i]
    }

    return res.json(productRequire)

})

app.get('/products/:id',async(req,res)=>{

    const products = await manager.getProducts() 

    const id = parseInt(req.params.id)

    const product = products.find(element=>element.id === id)

    if(!products.some(element=>element.id===id)) return res.send({id:id,message:'No encontrado'})

    console.log(product)

    return res.send(product)

})


app.listen(8080,()=>'Server listening in port 8080')