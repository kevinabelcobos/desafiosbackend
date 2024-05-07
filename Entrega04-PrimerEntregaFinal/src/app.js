import express from 'express'; //Importamos express
import productsRouter from './routes/product.routes.js'; //Importamos el router para los productos
import cartsRouter from './routes/cart.routes.js'; //Importamos el router para los carritos

const PORT = 8080; //Declaramos una variable para definir el puerto que vamos a usar

const app = express(); //Creamos el servidor

app.use(express.json()); //Para el manejo de datos en formato JSON

app.use('/api/products',productsRouter); //endpoint para los productos

app.use('/api/carts',cartsRouter); //endpoint para los carritos

app.listen(PORT,console.log(`✅Server escuchando in the port: ${PORT}`)); //ponemos el servidor a escucharclear
