
type JSONType = JSON | JSON[] | null;

export function ConvertArray<T>(data : JSONType) {
    if (data === null) {
        return [];
    }

    const arrayData = Array.isArray(data) ? data : [data];

    const parsedData = arrayData.map((item) => {
        return JSON.parse(JSON.stringify(item)) as T;
    });

    return parsedData;
}

export function ConvertSingle<T>(data : JSONType) {
    if (Array.isArray(data)) {
        data = data.length > 0 ? data[0] : null;
    }

    const order = JSON.parse(JSON.stringify(data)) as T;

    return order;
}