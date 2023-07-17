import {body, param, validationResult} from "express-validator";
import {BadRequestError, NotFoundError} from "../errors/customErrors.js";
import {COMPANY_TYPE, STOCK_STATUS} from "../utils/constants.js";
import mongoose from "mongoose";
import Stock from "../models/StockModel.js";

const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg)
                console.log("This me" + errorMessages)
                if (errorMessages[0].startsWith("No Stock")){
                    throw new NotFoundError(errorMessages)
                }
                throw new BadRequestError(errorMessages)
            }
            next()
        }
    ]
}

export const validateStockInput = withValidationErrors([
    body("company").notEmpty().withMessage("Company field is required"),
    body("ceo").notEmpty().withMessage("CEO field is required"),
    body('stockStatus').isIn(Object.values(STOCK_STATUS)).withMessage("Invalid Stock Status Value"),
    body('companyType').isIn(Object.values(COMPANY_TYPE)).withMessage("Invalid Company Type Value"),
    body("companyLocation").notEmpty().withMessage("Company Location field is required")
])

export const validateIdParam = withValidationErrors([
    param("id")
        .custom(async (value)=> {
            const isValidId = mongoose.Types.ObjectId.isValid(value)
            if(!isValidId) throw new BadRequestError("Invalid mongo id")
            const stock = await Stock.findById(value);
            if (!stock) throw new NotFoundError(`No Stock with id ${value} found`)
        })

])

// export const validateTest = withValidationErrors([
//     body('name')
//         .notEmpty()
//         .withMessage("Name is required")
// ])