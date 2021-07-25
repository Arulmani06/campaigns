import { Response } from 'express';

class ResponseStructure {
    private success?: boolean;
    constructor(private statusCode?: number, private data?: any, private message?: string) {}

    setSuccess(statusCode: number, data: any) {
        this.statusCode = statusCode;
        this.data = data;
        this.success = true;
        return this;
    }

    setError(statusCode: number, message: string, data: any = {}) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = false;
        return this;
    }

    send(res : Response) {
        if (this.success) {
            return res.status(this.statusCode!).json(this.data);
        }
        return res.status(this.statusCode!).json({
            error:this.message,
            data:this.data
        })
    }
}

export default new ResponseStructure();