import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, salt);
    return hashedPassword;
}

export const comparePassword = async (password, hashPassword) => {
    const isMatch = await bcrypt.compare(password, hashPassword);
    return isMatch
}