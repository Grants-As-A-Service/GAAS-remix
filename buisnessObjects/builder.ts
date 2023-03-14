export class Builder<T> {
    body: any;

    constructor(body: any) {
        this.body = body;
    }

    build(): T {
        throw new Error("Method not implemented.");
    }
}
