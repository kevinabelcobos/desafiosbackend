import { Router } from "express";
import ProductManager from "../dao/products.controllers.js";
import ChatManager from "../dao/messages.controllers.js";
import categoryManager from "../dao/category.controllers.js";
import cartModel from "../dao/models/cart.model.js";

const router = Router();
const productManger = new ProductManager();
const CategoryManager = new categoryManager();


router.get("/login", (req, res) => {
  if (req.session?.user) return res.redirect("/profile");
  res.render("login", {});
});
router.get("/register", (req, res) => {
  if (req.session?.user) return res.redirect("/profile");
  res.render("register", {});
});
function authentication(req, res, next) {
  if (req.session?.user) return next();
  res.redirect("/login");
}
router.get("/profile", authentication, (req, res) => {
  const user = req.session.user;
  res.render("profile", user);
});

router.get("/", (req, res) => {
  try {
    res.render("index", {});
  } catch (e) {
    throw e;
  }
});

router.get("/chat", async (req, res) => {
  try {
    const messages = await chatmanager.getMessages();
    res.render("chat", { messages });
  } catch (e) {
    throw e;
  }
});

router.get("/carts/:cid", async (req, res) => {
  const id = req.params.cid || "64cef69c04a0aed82a3489ab";

  try {
    const cart = await cartModel
      .findOne({ _id: id })
      .populate("products.pid")
      .lean()
      .exec();
    if (!cart) {
      res.send("el carrito no existe");
    } else {
      res.render("cart", { cart });
    }
  } catch (error) {
    console.log("error al obtener el carrito", error);
  }
});

router.get("/home", async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit) || 10;
    const queryParams = req.query.query || "";
    const sort = parseInt(req.query.sort) || 0;
    let query = {};
    if (queryParams) {
      const field = queryParams.split(",")[0];
      let value = queryParams.split(",")[1];
      if (!isNaN(parseInt(value))) value = parseInt(value);
      query[field] = value;
    }
    const products = await productManger.getProductsPaginate(
      page,
      limit,
      query,
      sort
    );

    const categorys = await CategoryManager.getCategoryPaginate();

    products.nextLink = products.hasNextPage
      ? `?page=${products.nextPage}&limit=${limit}`
      : "";
    products.prevLink = products.hasPrevPage
      ? `?page=${products.prevPage}&limit=${limit}`
      : "";

    res.render("home", { products, categorys });
  } catch (e) {
    throw e;
  }
});

router.get("/products", async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit) || 10;
    const queryParams = req.query.query || "";
    const sort = parseInt(req.query.sort) || 0;
    let query = {};
    if (queryParams) {
      const field = queryParams.split(",")[0];
      let value = queryParams.split(",")[1];
      if (!isNaN(parseInt(value))) value = parseInt(value);
      query[field] = value;
    }
    const products = await productManger.getProductsPaginate(
      page,
      limit,
      query,
      sort
    );

    const categorys = await CategoryManager.getCategoryPaginate();

    products.nextLink = products.hasNextPage
      ? `?page=${products.nextPage}&limit=${limit}`
      : "";
    products.prevLink = products.hasPrevPage
      ? `?page=${products.prevPage}&limit=${limit}`
      : "";

    res.render("products", { products, categorys });
  } catch (e) {
    throw e;
  }
});

router.get("/realTimeProducts", async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit) || 10;
    const queryParams = req.query.query || "";
    const sort = parseInt(req.query.sort) || 0;
    let query = {};
    if (queryParams) {
      const field = queryParams.split(",")[0];
      let value = queryParams.split(",")[1];
      if (!isNaN(parseInt(value))) value = parseInt(value);
      query[field] = value;
    }
    const products = await productManger.getProductsPaginate(
      page,
      limit,
      query,
      sort
    );

    const categorys = await CategoryManager.getCategoryPaginate();

    products.nextLink = products.hasNextPage
      ? `?page=${products.nextPage}&limit=${limit}`
      : "";
    products.prevLink = products.hasPrevPage
      ? `?page=${products.prevPage}&limit=${limit}`
      : "";
    res.render("realTimeProducts", { products, categorys });
  } catch (e) {
    console.log(e);
  }
});

router.get("/form-products", async (req, res) => {
  res.render("form", {});
});

router.post("/form-products", async (req, res) => {
  try {
    const data = req.body;
    const result = await productManger.addProduct(data);
    res.redirect("/products");
  } catch (e) {
    console.log(e);
  }
});

export default router;
