import bcrypt from 'bcryptjs';

export const decodePassword = (password: string, hashedPassword: string) => {
    //check and return value for null/undefined
    if (!password || !hashedPassword) {
        return false;
    }
    return bcrypt.compareSync(password, hashedPassword);
}


