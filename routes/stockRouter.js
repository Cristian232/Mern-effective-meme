import {Router} from "express";
const router = Router();

import {getAllStocks, getStock, createStock, updateStock, deleteStock} from "../controllers/stockController.js"
import {
    validateIdParam,
    validateStockInput
} from "../middleware/validationMiddleware.js";
import {checkForTestUser} from "../middleware/authMiddleware.js";

// router.get("/", getAllStocks)

router.route("/").get(getAllStocks).post(checkForTestUser, validateStockInput, createStock)
router.route("/:id").get(validateIdParam,getStock).patch(checkForTestUser, validateStockInput,validateIdParam,updateStock).delete(checkForTestUser, validateIdParam,deleteStock)

export default router;