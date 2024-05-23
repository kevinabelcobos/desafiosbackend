import { Router, response } from "express";
import CartManager from "../dao/carts.controllers.js";
import { Types } from "mongoose";

const router = Router();

const cartManager = new CartManager();

router.post("/", async (req, res) => {
  try {
    const cart = { products: [] };
    const result = await cartManager.createCart(cart);
    res
      .status(result.status)
      .send({ message: result.message, cart: result.cart });
  } catch (e) {
    res.status(500).send({ message: e });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const cartId = new Types.ObjectId(cid);
    const result = await cartManager.getCartById(cartId);
    res
      .status(result.status)
      .send({ message: result.message, cart: result.cart });
  } catch (e) {
    res.status(500).send({ message: e });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cartId = new Types.ObjectId(cid);
    const productId = new Types.ObjectId(pid);
    const quantity = parseInt(req.body.quantity || 1);
    const result = await cartManager.addProductCartById(
      cartId,
      productId,
      quantity
    );
    res
      .status(result.status)
      .send({ message: result.message, cart: result.cart });
  } catch (e) {
    res.status(500).send({ message: e });
  }
});

router.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cartId = new Types.ObjectId(cid);
    const productID = new Types.ObjectId(pid);
    const result = await cartManager.deleteProductCartById(cartId, productID);
    res.status(result.status).send({ message: result.message });
  } catch (e) {
    res.status(500).send({ message: e });
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const cartId = new Types.ObjectId(cid);
    const result = await cartManager.deleteProductsCart(cartId);
    res.status(result.status).send({ message: result.message });
  } catch (e) {
    res.status(500).send({ message: e });
  }
});

router.put("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const quantity = req.body.quantity || 1;
    const result = await cartManager.actualizarProductoCarritoById(
      cid,
      pid,
      quantity
    );
    res
      .status(result.status)
      .send({ result: result.message, cart: result.cart });
  } catch (e) {
    res.status(500).send({ message: e });
  }
});

router.put("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const carritoId = new Types.ObjectId(cid);
    const result = await cartManager.actualizarCarritoById(carritoId);
    res.status(result.status).send({ message: result.message });
  } catch (e) {
    res.status(500).send({ message: e });
  }
});

export default router;
