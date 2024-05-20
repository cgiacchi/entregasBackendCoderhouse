import { Router } from "express";
import ProductManager from "../dao/mongoDB/productManager.js";
const productManager = new ProductManager();
const router = Router();

router.get('/', async (req, res) => {
    const result = await productManager.getProducts();
    res.send({ result: "success", payload: result })
})

router.get('/:pid', async (req, res) => {
    let { pid } = req.params;
    const result = await productManager.getProductById(pid);
    res.send({ result: "success", payload: result })
})

router.post('/', async (req, res) => {
    let { title, description, category, price, thumbnail, stock} = req.body
    if (!title || !description || !category ||  !price || ! thumbnail || !stock ) {
        res.send({ status: "error", error: "Faltan parametros" })
    }
    const result = await productManager.addProduct(title, description, category, price, thumbnail, stock);
    res.send({ result: "success", payload: result });
})

router.put('/:pid', async (req, res) => {
    let { pid } = req.params
    let productUpdate = req.body
    if (!productUpdate.title || !productUpdate.description || !productUpdate.category || !productUpdate.price || !productUpdate.thumbnail || !productUpdate.stock ) {
        res.send({ status: "error", error: "Parametros no definidos" })
    }
    const result = await productManager.updateProducts(pid, productUpdate);
    res.send({ result: "success", payload: result });
})

router.delete('/:pid', async (req, res) => {
    let { pid } = req.params
    const result = await productManager.deleteProduct(pid);
    res.send({ result: "success", payload: result });
})


export default router;