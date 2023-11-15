import { User } from "../../interfaces/User";
import {db} from "../../utils/db.server"

type queryResult = User | null;

export async function checkUsername(username : string) {
    // TODO : SQL is using case insensitive comparison
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
    let responseString = "";
    const usernameAvailable = await checkUsername(user.username);
    const emailAvailable = await checkEmail(user.email);
    
    if(usernameAvailable === "exist") {
        responseString = "username already exist";
    }else if(emailAvailable === "exist") {
        responseString = "email already exist";
    }
    
    if(responseString !== "") {
        return responseString;   
    }

    try {
        const result : User = await db.user.create({
            data : {
                username : user.username,
                name : user.name,
                email : user.email,
                password : user.password,
            }
        })
        responseString = "success";
    }catch (err) {
        responseString = "failed";
    }
    return responseString;
}

export async function login(username : string, password : string) {
    const result : queryResult = await db.user.findFirst({
        where: {
            username : username
        }
    });
    const responseString = (password === result?.password) ? "success" : "failed";
    return responseString;
}

export async function getBalance(username : string) {
    console.log(username);
    const balance = await db.user.findFirst({
        where : {
            username : username
        }, 
        select : {
            saldo : true
        }
    });
    console.log("balance", balance);
    return balance?.saldo;
}

export async function topup(username : string, topupBalance : number) {
    let responseString = "";
    try{
        const result : queryResult = await db.user.update({
            where: {
                username : username
            },
            data: {
                saldo : {
                    increment : topupBalance
                }
            }
        });
        responseString = "success";
    }catch (err) {
        responseString = "failed";
    }
    return responseString;
}
