import {StatusCodes} from "http-status-codes";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs"
import {comparePassword, hashPassword} from "../utils/passwordUtils.js";
import {UnauthenticatedError} from "../errors/customErrors.js";

export const register = async (req,res) => {
    const isFirstAccount = (await User.countDocuments()) === 0
    req.body.role = isFirstAccount ? "admin" : "user"

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await hashPassword(req.body.password)
    req.body.password = hashedPassword


    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({msg: "User created"})
}

export const login = async (req,res) => {
    const user = await User.findOne({email:req.body.email})
    if (!user) throw new UnauthenticatedError("Credentials do not match")
    const isCorrectPassword = await comparePassword(req.body.password, user.password)
    if (!isCorrectPassword) throw new UnauthenticatedError('Invalid credentials')

    res.send("login")
}