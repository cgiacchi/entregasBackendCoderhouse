import { Router } from "express";

const router = Router();


router.get("/products", async (req, res) => {

  let page = parseInt(req.query.page);
  if(!page) page=1;
  let result = await productModel.paginate({},{page, limit:10,lean:true});
  result.prevLink = result.hasPrevPage?`http://localhost:8080/products?page=${result.prevPage}`:'';
  result.nextLink = result.hasNextPage?`http://localhost:8080/products?page=${result.nextPage}`:'';
  result.isValid= !(page<=0||page>result.totalPages)
  res.render('products', result)
})


router.get('/carts/:cid', async(req, res) => {
  let { cid } = req.params;
  let result = await cartModel.findOne({ _id:cid}).populate("products.product").lean();
  result = result.products;
  res.render('carts', {products: result});
})


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

export default router;