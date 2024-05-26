import { Router } from "express";
import ProductManager from "../dao/mongoDB/productManager.js";

const productManager = new ProductManager();
const router = Router();

// router.get('/', async (req, res) => {
//     const result = await productManager.getProducts();
//     res.send({ result: "success", payload: result })
// })
router.get("/", async (req, res) => {
    try {
      const { limit = 10, page = 1, sort, query } = req.query;
      const products = await productManager.getProducts(
        limit,
        page,
        query,
        sort
      );
      return res.json(products);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error en intentar recibir los productos");
    }
  });


router.get('/:pid', async (req, res) => {
    let { pid } = req.params;
    const result = await productManager.getProductById(pid);
    res.send({ result: "success", payload: result })
})

router.post("/", async (req, res) => {
    try {
    const productAdded = await productManager.addProduct(req.body);
      res.json(productAdded);
    } catch (error) {
      console.log(error);
      res.status(500).send(`Error en intentar agregar el producto`);
    }
  });

// router.post('/', async (req, res) => {
//     let { title, description, price, thumbnail, category, code, stock, status} = product
//     if (!title || !description || !price || ! thumbnail || !category || !code || !stock || !status) {
//     res.send({ status: "error", error: "Faltan parametros" })
//     }
//     const result = await productManager.create(product);
//     res.send({ result: "success", payload: result });
// })

router.put('/:pid', async (req, res) => {
    let { pid } = req.params
    let pUpdate = req.body
    if (!pUpdate.title || !pUpdate.description || !pUpdate.price || !pUpdate.thumbnail || !pUpdate.category || !pUpdate.code || !pUpdate.stock || !pUpdate.status) {
        res.send({ status: "error", error: "Parametros no definidos" })
    }
    const result = await productManager.updateProduct(pid,pUpdate);
    res.send({ result: "success", payload: result });
})

router.delete('/:pid', async (req, res) => {
    let { pid } = req.params
    const result = await productManager.deleteProduct(pid);
    res.send({ result: "success", payload: result });
})


export default router;