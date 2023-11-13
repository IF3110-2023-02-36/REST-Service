import { History } from "../../interfaces/History";
import { HistoryDetail } from "../../interfaces/HistoryDetail";
import {db} from "../../utils/db.server"

export async function getHistory () : Promise<History[]> {
    const user_id = 2; //ini buat temp aja karena auth belom dibuat
    return db.history.findMany({
        where:{
            user_id : user_id,
        },
        select: {
            id: true,
            user_id: true,
            alamat_tujuan: true,
            nama_penerima: true,
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
            quantity: true
        }
    })
}