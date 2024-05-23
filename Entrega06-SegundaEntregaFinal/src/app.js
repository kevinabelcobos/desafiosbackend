/*-----Importamos las librerias-----*/
import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";

/*-----Importamos las rutas-----*/
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/cart.routes.js";
import viewsRouter from "./routes/views.router.js";
import messageRouter from "./routes/message.routes.js";

/*-----Importamos los controllers que van a interactuar directamente con MONGO-----*/
import productControllers from "./dao/products.controllers.js";
const productcontrollers = new productControllers();
import chatControllers from "./dao/messages.controllers.js";
const chatcontrollers = new chatControllers();

/*-----Configuramos el servidor-----*/
const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

/*-----Configuramos el motor de plantillas-----*/
app.engine("handlebars", handlebars.engine()); //iniciamos el motor de plantilla handlebars
app.set("views", __dirname + "/views"); //seteamos las vistas para el motor
app.set("view engine", "handlebars"); //declaramos que motor vamos a usar

/*-----Configuramos las rutas-----*/
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/message", messageRouter);
//configuracion mongo session
const URL =
  "mongodb+srv://darioangellopez38:daletomba1234D@primerapracticaintegrad.r7jscez.mongodb.net/?retryWrites=true&w=majority";
const dbName = "ecommerce";

/*Creamos una funcion que va a poner a correr el servidor,tanto http como websocekts,esta
funcion sera llamada luego de que la conexion con la base de datos sea correcta. */
const runServer = () => {
  const httpServer = app.listen(
    PORT,
    console.log(`✅Server escuchando in the port: ${PORT}`)
  );
  const io = new Server(httpServer);
  io.on("connection", (socket) => {
    console.log("Client connected succesly");
    socket.on("new-product", async (data) => {
      try {
        await productcontrollers.addProduct(data);
        const products = await productcontrollers.getProducts();
        io.emit("reload-table", products);
      } catch (e) {
        console.log(e);
      }
    });
    socket.on("delete-product", async (id) => {
      try {
        await productcontrollers.deleteProduct(id);
        const products = await productcontrollers.getProducts();
        io.emit("reload-table", products);
      } catch (e) {
        console.log(e);
      }
    });
    socket.on("message", async (data) => {
      await chatcontrollers.saveMessage(data);
      //Envia el back
      const messages = await chatcontrollers.getMessages();
      io.emit("messages", messages);
    });

    socket.on("disconnect", () => {
      console.log(`User ${socket.id} disconnected`);
    });
  });
};

/*-----Configuramos la conexion con la base de datos-----*/

mongoose
  .connect(URL, {
    dbName: dbName,
  })
  .then(() => {
    console.log("Database connected succes!!");
    runServer();
  })
  .catch((e) => console.log(e));
