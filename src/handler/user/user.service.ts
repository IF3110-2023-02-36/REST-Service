import { User } from "../../interfaces/User";
import {db} from "../../utils/db.server"

type queryResult = User | null;

export async function checkUsername(username : string) {
    const result : queryResult = await db.user.findFirst({
        where: {
            username : username
        }
    });
    const responseString = !result ? "available" : "exist";
    return responseString;
}

export async function checkEmail(email : string) {
    const result : queryResult = await db.user.findFirst({
        where: {
            email : email
        }
    });
    const responseString = !result ? "available" : "exist";
    return responseString;
}

export async function register(user : User) {
    let responseString = "success";
    try {
        const result : User = await db.user.create({
            data : {
                username : user.username,
                name : user.name,
                email : user.email,
                password : user.password,
            }
        })
    }catch (err) {
        const usernameAvailable = await checkUsername(user.username);
        const emailAvailable = await checkEmail(user.email);
        if(usernameAvailable === "exist") {
            responseString = "username already exist";
        }else if(emailAvailable === "exist") {
            responseString = "email already exist";
        }else {
            responseString = "failed";
        }
    }
    return responseString;
}

export async function validateLogin(username : string, password : string) {
    const result : queryResult = await db.user.findFirst({
        where: {
            username : username
        }
    });
    const responseString = (password === result?.password) ? "success" : "failed";
    return responseString;
}