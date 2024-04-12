import {HttpBadRequest, HttpConflict, HttpForbidden, HttpNotFound} from "@httpx/exception";

export interface errorFormatObject {
    code: number,
    message: string
}
export function utilsErr(err: any){
    let data: errorFormatObject = {
        code : 500,
        message: "Internal Server Error"
    }
    switch(true) {
        case err instanceof HttpNotFound:
            data.code = 404;
            data.message = "Not Found";
            break;
        case err instanceof HttpBadRequest:
            data.code = 400;
            data.message = "Bad Request";
            break;
        case err instanceof HttpConflict:
            data.code = 409;
            data.message = "Conflict";
            break;
        case err instanceof HttpForbidden:
            data.code = 403;
            data.message = "Forbidden";
            break;
        default:
            data.code = 500;
            data.message = "Internal Server Error";
            break;
    }

    return data
}