import { History } from "../../interfaces/History";
import { HistoryDetail } from "../../interfaces/HistoryDetail";
import {db} from "../../utils/db.server"
import { getUserId } from "../../utils/getUserId";

export async function getHistory (username : string) : Promise<History[]> {
    const userId = await getUserId(username);
    return db.history.findMany({
        where:{
            user_id : userId,
        },
        select: {
            id: true,
            user_id: true,
            alamat_tujuan: true,
            id_penerima: true,
            nama_penerima: true,
            biaya_pengiriman: true,
            rating: true
        }
    })
}

export async function getHistoryDetail (historyId: number) : Promise<HistoryDetail[]> {
    return db.historyDetail.findMany({
        where:{
            history_id: historyId
        },
        select:{
            id: true,
            history_id: true,
            product_name: true,
            quantity: true,
            price: true
        }
    })
}

export async function getHistoryById (historyId: number) : Promise<History> {
    const history = await db.history.findFirst({
        where:{
            id: historyId
        },
        select:{
            id: true,
            user_id: true,
            alamat_tujuan: true,
            id_penerima: true,
            nama_penerima: true,
            biaya_pengiriman: true,
            rating: true
        }
    })

    if(history === null) {
        throw "error";
    }

    return history;
}

export async function getHistoryByIdPenerima(idPenerima:number) : Promise<History[]>{
    const history = await db.history.findMany({
        where:{
            id_penerima : idPenerima
        },
        select:{
            id: true,
            user_id: true,
            alamat_tujuan: true,
            id_penerima: true,
            nama_penerima: true,
            biaya_pengiriman: true,
            rating: true
        }
    })
    console.log(history)
    return history;
}