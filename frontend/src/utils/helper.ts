export function getEnumLabel(enumObj: object, value: unknown) {
    return Object.keys(enumObj).find((label) => enumObj[label] === value);
}

export function getEnumLabels(enumObj: object, values: unknown) {
    if (values instanceof Array) return values.map((value) => getEnumLabel(enumObj, value));
}

export function getFormattedDate(date: Date) {
    return new Date(parseInt(date)).toLocaleDateString("en-UK", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export function getEnumValues(enumObj: object, keys: unknown[]) {
    return getEnumValueArray(enumObj, keys).join(", ");
}

export function getEnumValueArray(enumObj: object, keys: unknown[]) {
    return keys.map((key) => enumObj[key]);
}
