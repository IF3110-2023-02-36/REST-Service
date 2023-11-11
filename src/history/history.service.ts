import {db} from "../utils/db.server"


type History = {
    id: number,
    user_id : number,
    alamat_tujuan: string,
    nama_penerima: string,
    rating: number,
}

type HistoryDetail = {
    id: number,
    history_id : number,
    product_name: string,
    quantity: number,
}

export const getHistory = async (): Promise<History[]> => {
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

export const getHistoryDetail = async (historyId: number): Promise<HistoryDetail[]> => {
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