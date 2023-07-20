import {StatusCodes} from "http-status-codes";
import User from "../models/UserModel.js"
import Stock from "../models/StockModel.js"
import cloudinary from "cloudinary";
import {formatImage} from "../middleware/multerMiddleware.js"



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
    // console.log(req.file)
    const newUser = { ...req.body };
    delete newUser.password;

    if (req.file) {
        const file = formatImage(req.file);
        const response = await cloudinary.v2.uploader.upload(file);
        newUser.avatar = response.secure_url;
        newUser.avatarPublicId = response.public_id;
    }
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

    if (req.file && updatedUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    }


    res.status(StatusCodes.OK).json({msg: "Updated user"})
}