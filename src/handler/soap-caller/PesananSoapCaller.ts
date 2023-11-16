import { PESANAN_URL, SoapApiCall } from "./SoapCaller"


export async function getPesananByKurir(id_kurir : number) {
    const args = {
        arg0 : id_kurir,
    };
  
    return await SoapApiCall(PESANAN_URL, "getPesananByKurir", args);
}

export async function getPesananByIdPesanan(id_pesanan : number) {
    const args = {
        arg0 : id_pesanan,
    };
  
    return await SoapApiCall(PESANAN_URL, "getPesananByIdPesanan", args);
}


export async function getPesananNoKurir() {
    return await SoapApiCall(PESANAN_URL, "getPesananNoKurir");
}

export async function addPesanan(idPemesan : number,
                                alamat : string,
                                nama_penerima : string,
                                keterangan : string,
                                harga : string,
                                biaya_pengiriman : number,
                                nama_product : string,
                                quantity : string) {
    const args = {
        arg0 : idPemesan,
        arg1 : alamat,
        arg2 : nama_penerima,
        arg3 : keterangan,
        arg4 : harga,
        arg5 : biaya_pengiriman,
        arg6 : nama_product,
        arg7 : quantity,
    };
  
    return await SoapApiCall(PESANAN_URL, "addPesanan", args);
}

export async function ambilPesanan(id_pesanan : number, id_kurir : number, nama_kurir : string) {
    const args = {
        arg0 : id_pesanan,
        arg1 : id_kurir,
        arg2 : nama_kurir,
    };
  
    return await SoapApiCall(PESANAN_URL, "ambilPesanan", args);
}

export async function updatePesanan(id_pesanan : number, id_kurir : number, status : string, keterangan : string) {
    const args = {
        arg0 : id_pesanan,
        arg1 : id_kurir,
        arg2 : status,
        arg3 : keterangan,
    };
  
    return await SoapApiCall(PESANAN_URL, "updatePesanan", args);
}

export async function getPesananByIdUser(userId : number) {
    const args = {
        arg0 : userId,
    };
  
    return await SoapApiCall(PESANAN_URL, "getPesananByIdUser", args);
}
