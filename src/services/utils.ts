
export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export function isNull(object: any): object is null {
    return object === undefined || object === null
}