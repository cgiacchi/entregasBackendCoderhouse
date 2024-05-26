import { Router } from "express";
import CartManager from "../dao/mongoDB/cartManager.js";

const cartManager = new CartManager();
const router = Router();

router.get('/', async (req, res) => {
    const result = await cartManager.getCarts();
    res.send({ result: "success", payload: result })
})

router.get('/:cid', async (req, res) => {
    let { cid } = req.params;
    const result = await cartManager.getCartById(cid);
    res.send({ result: "success", payload: result })
})

router.post('/', async (req, res) => {
    const result = await cartManager.createCart();
    res.send({ result: "success", payload: result });
})

router.put('/:cid/products/:pid', async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let prodQuantity = req.body.quantity;
    const result = await cartManager.updateQuantityProduct(cid, pid, prodQuantity);
    res.send({ result: "success", payload: result });
})



router.delete('/:cid', async (req, res) => {
    let { cid } = req.params
    const result = await cartManager.deleteCart(cid);
    res.send({ result: "success", payload: result });
})

router.delete('/:cid/products/:pid', async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    const result = await cartManager.deleteProductCart(cid, pid);
    res.send({ result: "success", payload: result });
})

router.post("/:cid/product/:pid", async (req, res) => {

        let cid = req.params.cid;
        let pid = req.params.pid;
        const result = await cartManager.updateCart(cid,pid);
        res.send({ result: "success", payload: result });
    
})

export default router;