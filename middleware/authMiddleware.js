import {
    BadRequestError,
    UnauthenticatedError,
    UnauthorizedError
} from "../errors/customErrors.js";
import {verifyJWT} from "../utils/tokensUtils.js";

export const authenticateUser = (req,res,next)=>{
    const {token} = req.cookies
    if (!token) throw new UnauthenticatedError('Invalid authentication')
    try {
        const {userId, role} = verifyJWT(token)
        const testUser = userId === "64b88fc6a1fc0b5be9986628"
        req.user = {userId, role, testUser}
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

export const checkForTestUser = (req, res, next) => {
    if (req.user.testUser) throw new BadRequestError("Demo user only")
    next()
}