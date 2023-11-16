import { DETAIL_PESANAN_URL, SoapApiCall } from "./SoapCaller";

export async function getDetailPesanan(id_pesanan : number) {
    const args = {
        arg0 : id_pesanan,
    };
  
    return await SoapApiCall(DETAIL_PESANAN_URL, "getDetailPesanan", args);
}
