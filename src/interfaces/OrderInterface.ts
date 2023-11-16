import OrderStatus from "./OrderStatus"

export default interface OrderInterface {
    alamat : string
    biaya_pengiriman : number
    harga : number
    id : number
    id_kurir : number
    id_pemesan : number
    keterangan : string
    nama_kurir : string
    nama_penerima : string
    status : OrderStatus
}