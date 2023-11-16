import axios from "axios";
import { parseXML } from "../../utils/XMLConverter";

export const PESANAN_URL = "http://localhost:6001/ws/pesanan?wsdl";
export const DETAIL_PESANAN_URL = "http://host.docker.internal:6001/ws/detailPesanan?wsdl";
const REST_API_KEY = "mZHA8N63GOH88EnQW3hJ6zcJQhzY79WnuM+UnVG/e1k=";

type Header = {
    [key: string]: string | undefined
}

export async function SoapApiCall(url : string, method : string, params? : Object) {
    const headers: Header = {
        'Content-Type': 'text/xml;charset=UTF-8',
        SOAPAction: '#POST',
        'api-key': REST_API_KEY
    };

    const XMLRequest = buildXMLRequest(method, params);
    console.log("url", url);
    console.log("XMLRequest", XMLRequest);
    console.log("headers", headers);

    const response = await axios.post(url, XMLRequest, {headers});
    console.log("response", response);
    
    return parseXML(response.data, method);
}

function buildXMLRequest(method : string, params? : Object) {
    const XMLParams = buildXMLParams(params);

    const XMLRequest = `
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
        <${method} xmlns="http://ws/">
            ${XMLParams}
        </${method}>
        </Body>
    </Envelope>`;

    return XMLRequest;
}

function buildXMLParams(params?: Object) {
    if (!params) {
        return '';
    }

    const XMLParamsBuilder = Object.keys(params).map((key) => {
        return `<${key} xmlns="">${params[key as keyof typeof params]}</${key}>`;
    })

    const XMLParams = XMLParamsBuilder.join('');

    return XMLParams;
}