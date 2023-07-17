import {Router} from "express";
const router = Router();

import {getAllStocks, getStock, createStock, updateStock, deleteStock} from "../controllers/stockController.js"
import {
    validateIdParam,
    validateStockInput
} from "../middleware/validationMiddleware.js";

// router.get("/", getAllStocks)

router.route("/").get(getAllStocks).post(validateStockInput,createStock)
router.route("/:id").get(validateIdParam,getStock).patch(validateStockInput,validateIdParam,updateStock).delete(validateIdParam,deleteStock)

export default router;