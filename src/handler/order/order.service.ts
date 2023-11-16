import { ambilPesanan, getPesananByIdPesanan, getPesananByKurir, getPesananNoKurir } from "../soap-caller/PesananSoapCaller";
import OrderInterface from "../../interfaces/OrderInterface";
import { getDetailPesanan } from "../soap-caller/DetailPesananSoapCaller";
import OrderDetail from "../../interfaces/OrderDetail";
import { ConvertArray, ConvertSingle } from "../../utils/JSONConverter";
import { getUserId } from "../../utils/getUserId";

export async function getAvailableOrder() {
    const response = await getPesananNoKurir();
    const availableOrder = ConvertArray<OrderInterface>(response);
    return availableOrder;
}

export async function getOrderById(orderId : number) {
    const response = await getPesananByIdPesanan(orderId);
    const order = ConvertSingle(response);
    return order;
}

export async function getOrderDetails(orderId : number) {
    const response = await getDetailPesanan(orderId);
    const orderDetails = ConvertArray<OrderDetail>(response);
    return orderDetails;
}

export async function getOrderByCourier(courierId : number) {
    const response = await getPesananByKurir(courierId);
    const orderDetails = ConvertArray<OrderDetail>(response);
    return orderDetails;
}

export async function pickOrder(orderId : number, username : string) {
    const courierId = await getUserId(username);
    const response = await ambilPesanan(orderId, courierId, username);
    return response;
}
