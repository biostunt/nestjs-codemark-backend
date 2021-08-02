import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    BadRequestException,
} from "@nestjs/common";
import { Response } from "express";

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const body = JSON.parse(JSON.stringify(exception.getResponse()));
        response.status(status).json({
            success: false,
            errors:
                typeof body.message === "object"
                    ? body.message
                    : [body.message],
        });
    }
}
