import {body, param, validationResult} from "express-validator";
import {
    BadRequestError,
    NotFoundError,
    UnauthorizedError
} from "../errors/customErrors.js";
import {COMPANY_TYPE, STOCK_STATUS} from "../utils/constants.js";
import mongoose from "mongoose";
import Stock from "../models/StockModel.js";
import User from "../models/UserModel.js"

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
                if (errorMessages[0].startsWith("Not authorised")){
                    throw new UnauthorizedError("Not authorised to access")
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
        .custom(async (value, {req})=> {
            const isValidId = mongoose.Types.ObjectId.isValid(value)
            if(!isValidId) throw new BadRequestError("Invalid mongo id")
            const stock = await Stock.findById(value);
            if (!stock) throw new NotFoundError(`No Stock with id ${value} found`)
            const isAdmin = req.user.role === 'admin'
            const isOwner = req.user.userId === stock.createdBy.toString();
            if (!isAdmin && !isOwner) throw new UnauthorizedError("Not authorised to access")
        })

])

export const validateRegisterInput = withValidationErrors([
    body("name").notEmpty().withMessage("Name is Required"),
    body("lastName").notEmpty().withMessage("Last name is Required"),
    body("email")
        .notEmpty()
        .withMessage("Email is Required")
        .isEmail()
        .withMessage("Invalid email format")
        .custom(async (email) => {
            const user = await User.findOne({email})
            if (user) throw new BadRequestError('Email already exist')
        }),
    body("password")
        .notEmpty()
        .withMessage("Password is Required")
        .isLength({min:8})
        .withMessage("Password must be at least 8 chars long"),
    body("location").notEmpty().withMessage("Location is Required")
])

export const validateLoginInput = withValidationErrors([
    body('email')
        .notEmpty()
        .withMessage("Email input is required")
        .isEmail()
        .withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password is required")
])

export const validateUpdateUserInput = withValidationErrors([
    body("name").notEmpty().withMessage("Name is Required"),
    body("lastName").notEmpty().withMessage("Last name is Required"),
    body("email")
        .notEmpty()
        .withMessage("Email is Required")
        .isEmail()
        .withMessage("Invalid email format")
        .custom(async (email, {req}) => {
            const user = await User.findOne({email})
            if (user && user._id.toString() !== req.user.userId) {
                throw new BadRequestError('Email already exist')
            }
        }),
    body("location").notEmpty().withMessage("Location is Required")
])

// export const validateTest = withValidationErrors([
//     body('name')
//         .notEmpty()
//         .withMessage("Name is required")
// ])