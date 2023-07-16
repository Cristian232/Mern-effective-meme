import {Router} from "express";
const router = Router();

import {getAllStocks, getStock, createStock, updateStock, deleteStock} from "../controllers/stockController.js"

// router.get("/", getAllStocks)

router.route("/").get(getAllStocks).post(createStock)
router.route("/:id").get(getStock).patch(updateStock).delete(deleteStock)

export default router;