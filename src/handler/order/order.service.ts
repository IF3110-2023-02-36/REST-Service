import { ambilPesanan, getPesananByIdPesanan, getPesananByKurir, getPesananNoKurir, updatePesanan } from "../soap-caller/PesananSoapCaller";
import OrderInterface from "../../interfaces/OrderInterface";
import { getDetailPesanan } from "../soap-caller/DetailPesananSoapCaller";
import OrderDetail from "../../interfaces/OrderDetail";
import { ConvertArray, ConvertSingle } from "../../utils/JSONConverter";
import { getUserId } from "../../utils/getUserId";
import { db } from "../../utils/db.server";
import { HistoryDetail } from "../../interfaces/HistoryDetail";
import OrderInterfaceString from "../../interfaces/OrderInterfaceString";
import { History } from "../../interfaces/History";
import OrderDetailString from "../../interfaces/OrderDetailString";

export async function getAvailableOrder() {
    const response = await getPesananNoKurir();
    const availableOrder = ConvertArray<OrderInterfaceString>(response);
    return availableOrder;
}

export async function getOrderById(orderId : number) {
    const response = await getPesananByIdPesanan(orderId);
    const order = ConvertSingle<OrderInterfaceString>(response);
    return order;
}

export async function getOrderDetails(orderId : number) {
    const response = await getDetailPesanan(orderId);
    const orderDetails = ConvertArray<OrderDetailString>(response);
    return orderDetails;
}

export async function getOrderByCourier(courierId : number) {
    const response = await getPesananByKurir(courierId);
    const orderDetails = ConvertArray<OrderDetailString>(response);
    return orderDetails;
}

export async function pickOrder(orderId : number, username : string) {
    const courierId = await getUserId(username);
    const response = await ambilPesanan(orderId, courierId, username);
    return response;
}

export async function updateOrder(orderId : number, username : string, status : string, description : string) {
    const courierId = await getUserId(username);
    const response = await updatePesanan(orderId, courierId, status, description);
    return response;
}

export async function finishOrder(orderId : number, username : string) {
    const courierId = await getUserId(username);
    const order = await getOrderById(orderId);
    const orderDetail = await getOrderDetails(orderId);
    const response = await updatePesanan(orderId, courierId, "delivered", "");

    const historyData : History = {
        user_id : courierId,
        alamat_tujuan : order.alamat,
        id_penerima : parseInt(order.id_pemesan),
        nama_penerima : order.nama_penerima,
        biaya_pengiriman : parseInt(order.biaya_pengiriman),
        rating : 0,
    };

    const historyResult = await db.history.create({
        data : historyData
    })

    let historyDetailData : HistoryDetail[] = []
    orderDetail.map((detail) => {
        historyDetailData.push({
            history_id : historyResult.id,
            product_name : detail.nama_product,
            quantity : parseInt(detail.quantity),
            price : parseInt(detail.harga),
        })
    })

    const historyDetailResult = await db.historyDetail.createMany({
        data : historyDetailData
    })

    return response;
}

