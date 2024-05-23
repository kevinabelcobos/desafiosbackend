import messageControllers from "../dao/messages.controllers.js";
import { Router } from "express";

const messagecontrollers = new messageControllers();

const router = Router();

router.get("/", async (req, res) => {
  const messages = await messagecontrollers.getMessages();
  const messagesReverse = messages.reverse();
  res.render("chat", { messages: messagesReverse });
});

router.post("/", async (req, res) => {
  const message = req.body;
  await messagecontrollers.saveMessage(message);
  res.render("chat", { messages: messagesReverse });
});

export default router;
