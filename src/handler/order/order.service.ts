import { getPesananNoKurir } from "../soap-caller/PesananSoapCaller";
import OrderInterface from "../../interfaces/OrderInterface";

export async function getAvailableOrder() {
    const response = await getPesananNoKurir();
    console.log(response);
    if(response === null) {
        return [];
    }

    const JSONArray = Array.isArray(response) ? response : [response];

    const availableOrder = JSONArray.map((item: any) => {
        return JSON.parse(JSON.stringify(item)) as OrderInterface;
    });

    return availableOrder;
}