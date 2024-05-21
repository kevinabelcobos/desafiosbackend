import { Router } from "express";
import CartManager from "../controllers/cartManager.controllers.js";

const cartManager = new CartManager("./src/bd/carritos.json");

const router = Router();

router.post("/", async (req, res) => {
  try {
    await cartManager.addCart();
    return res.status(201).json({ message: "sucess" });
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const cart = await cartManager.getCartsByID(cid);
    res.status(200).send(cart.productos);
  } catch (e) {
    res.status(404).json(e);
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    await cartManager.addProducCart(cid, pid);
    res.status(201).json({ message: "sucess" });
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;
