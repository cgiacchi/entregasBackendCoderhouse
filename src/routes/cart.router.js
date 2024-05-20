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
    const result = await cartManager.getCartById({_id : cid});
    if (!cart) {
        res.status(400).json({ message: "Producto no encontrado" });
    } else{
        res.send({ result: "success", payload: result })
}
})

router.post('/', async (req, res) => {
    const result = await cartManager.addCart();    
    res.send({ result: "success", payload: result });
})

router.put('/:cid', async (req, res) => {
    let { cid } = req.params;
    let cartToReplace = req.body
    const result = await cartManager.updateCart(cid, cartToReplace);
    res.send({ result: "success", payload: result });
})

router.delete('/:cid', async (req, res) => {
    let { cid } = req.params
    const result = await cartManager.deleteCart(cid);
    res.send({ result: "success", payload: result });
})

export default router;