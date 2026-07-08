export function status(status) {
    this.statusCode = status;
    return this;
}

export const send = (data) => {
    try {
        this.end(JSON.stringify(data));
    } catch {
        this.end(data);
    }
}