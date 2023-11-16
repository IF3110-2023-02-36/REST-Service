import {db} from "./db.server"

export async function getUserId(username : string) {
    const result = await db.user.findFirst({
        where: {
            username : username
        }, 
        select: {
            id : true
        }
    });
    const userId = result ? result.id : 0;

    return userId;
}