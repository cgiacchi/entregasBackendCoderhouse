import { Router } from "express";

const router = Router();



router.get("/api/messages", async (req, res) => {
  try {
    const messages = await messageManager.getMessages();
    res.render("chat", { messages: messages });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/api/messages", async (req, res) => {
  try {
    const { user, message } = req.body;
    const newMessage = await messageManager.addMessage(user, message);
    socketServer.emit("message", newMessage);
    return res.json(newMessage);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});








// router.get('/', (req,res) => {
//   res.render('message', {
//   })
// })

export default router;