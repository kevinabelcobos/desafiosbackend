import ChatModel from "./models/messages.model.js";

class ChatManager {
  saveMessage = async (message) => {
    try {
      const newMessage = await ChatModel.create(message);
      return "Message save";
    } catch (err) {
      return err;
    }
  };

  getMessages = async () => {
    try {
      const messages = await ChatModel.find().lean().exec();
      return messages;
    } catch (err) {
      console.log("No messages");

      return [];
    }
  };
}

export default ChatManager;
