import {
    UnauthenticatedError,
    UnauthorizedError
} from "../errors/customErrors.js";
import {verifyJWT} from "../utils/tokensUtils.js";

export const authenticateUser = (req,res,next)=>{
    const {token} = req.cookies
    if (!token) throw new UnauthenticatedError('Invalid authentication')
    try {
        const {userId, role} = verifyJWT(token)
        req.user = {userId, role}
    next()
    } catch (err) {
        throw new UnauthenticatedError('Invalid authentication')
    }
}

export const authorizePermissions = (...roles) => {
    return (req,res,next) => {
    if (!roles.includes(req.user.role)) {
        throw new UnauthorizedError("Unauthorized to access this route")
    }
    next();
    }
}