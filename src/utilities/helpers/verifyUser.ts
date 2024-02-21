import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const isLoggedIn = (token: string) => {
    let data: any;
    let loggedIn: boolean;
    const timeNow = Math.floor(Date.now() / 1000);

    //check token is not empty or undefined
    if (!token) {
        loggedIn = false;
    }
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        data = decoded;
        if (data.exp > timeNow) {
            loggedIn = true;
        } else {
            loggedIn = false;
        }
    } catch (err) {
        console.log("Logged out")
    }

    return loggedIn;
}


export const decodePassword = (password: string, hashedPassword: string) => {
    //check and return value for null/undefined
    if (!password || !hashedPassword) {
        return false;
    }
    return bcrypt.compareSync(password, hashedPassword);
}


