import { User } from "../../interfaces/User";
import { UserDetail } from "../../interfaces/UserDetail";
import {db} from "../../utils/db.server"

import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

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
        const payLoad = {
            id: result.id,
            name: result.name,
            username: result.username,
        }
    
        const Secret = process.env.JWT_SECRET!;
    
        const expiresIn = 60*60*24; 
        const token = jwt.sign(payLoad, Secret, {expiresIn: expiresIn})
        return token;
    }catch (err) {
        responseString = "failed";
        return responseString;
    }
    
}

export async function login(username : string, password : string) {
    const result : queryResult = await db.user.findFirst({
        where: {
            username : username
        }
    })

    if(result === null){
        const responseString = "username tidak ditemukan";
        return responseString;
    }
    if(result.password != password){
        const responseString = "password salah";
        return responseString;
    }

    const payLoad = {
        id: result.id,
        name: result.name,
        username: result.username,
    }

    const Secret = process.env.JWT_SECRET!;

    const expiresIn = 60*60*24; 
    const token = jwt.sign(payLoad, Secret, {expiresIn: expiresIn})
    return token;
    
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

export async function getUserByUsername(username : string) {
    const userDetail : UserDetail | null = await db.user.findFirst({
        where:{
            username : username,
        },
        select: {
            id : true,
            username : true,
            name : true,
            email : true,
            saldo : true
        }
    })

    if(userDetail === null) {
        throw "error";
    }

    return userDetail;
}

export async function editUserByUsername(username : string, newUserDetail : UserDetail) {
    let responseString = "";
    const oldUserData = await getUserByUsername(username);
    const emailAvailable = await checkEmail(newUserDetail.email);

    if((emailAvailable === "exist") && !(oldUserData.email === newUserDetail.email)) {
        responseString = "email already exist";
    }
    
    if(responseString !== "") {
        return responseString;   
    }

    try {
        const result : User = await db.user.update({
            where: {
                username : username
            },
            data: {
                name : newUserDetail.name,
                email : newUserDetail.email,
            }
        })
        responseString = "success";
    }catch (err) {
        responseString = "failed";
    }
    console.log(responseString);
    return responseString;
}

export async function getUserById(userId: number) {
    console.log("Test1")
    const userDetail : UserDetail | null = await db.user.findFirst({
        where:{
            id : userId,
        },
        select: {
            username : true,
            name : true,
            email : true,
            saldo : true
        }
    })

    console.log("Test1")

    return userDetail;
}