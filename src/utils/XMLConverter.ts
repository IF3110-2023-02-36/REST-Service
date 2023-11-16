import converter from 'xml-js'


export function parseXML(xml: string, method: string) {
    const json = JSON.parse(converter.xml2json(xml, { compact: true, spaces: 4 }))
    const returnVal = json['S:Envelope']['S:Body']['ns2:' + method + 'Response']['return']

    if (!returnVal) {
        return null
    }

    return buildResponseJSON(returnVal)
}

function buildResponseJSON(json: JSON) {
    if (Array.isArray(json)) {
        return json.map((item) => flatten(item))
    }

    return flatten(json)
}

function flatten(json: JSON): JSON {
    const response: any = {}

    Object.keys(json).forEach((key) => {
        const value = json[key as keyof typeof json]
        response[key] = value['_text' as keyof typeof value]
    })

    return response
}
