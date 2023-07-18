import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
    const salt = await bcrypt.hash(password, salt);
    return hashPassword;
}

export const comparePassword = async (password, hashPassword) => {
    const isMatch = await bcrypt.compare(password, hashPassword);
    return isMatch
}