import { Router } from "express";
import ProductManager from "../dao/products.controllers.js";

const productManager = new ProductManager("./src/bd/productos.json");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const products = await productManager.getProducts();
    if (!limit) return res.status(200).json(products);
    if (!isNaN(limit) && limit) return res.json(products.slice(0, limit));
  } catch (e) {
    res.status(404).json(e);
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const product = await productManager.getProductById(pid);
    res.status(200).json(product);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});
router.post("/", async (req, res) => {
  try {
    const product = req.body;
    await productManager.addProduct(
      product.title,
      product.descripcion,
      product.code,
      product.price,
      product.status,
      product.stock,
      product.category,
      product.thumbail
    );
    return res.status(201).json({ message: "success" });
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const product = req.body;
    await productManager.updateProduct(
      pid,
      product.title,
      product.descripcion,
      product.code,
      product.price,
      product.status,
      product.stock,
      product.category,
      product.thumbail
    );
    res.status(201).json({ message: "success" });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    await productManager.deleteProduct(pid);
    return res.status(201).json({ message: "remove product" });
  } catch (e) {
    res.status(400).send({ error: e });
  }
});


export default router;
