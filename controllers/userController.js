import {StatusCodes} from "http-status-codes";
import User from "../models/UserModel.js"
import Stock from "../models/StockModel.js"


export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({_id: req.user.userId})
    const userWithNoPass = user.toJSON()
    res.status(StatusCodes.OK).json({user:userWithNoPass})
}
export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments()
    const stocks = await Stock.countDocuments()
    res.status(StatusCodes.OK).json({users, stocks})
}
export const updateUser = async (req, res) => {
    const obj = {...req.body}
    delete obj.password
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body);
    res.status(StatusCodes.OK).json({msg: "Updated user"})
}