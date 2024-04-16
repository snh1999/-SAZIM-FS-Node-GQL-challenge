import { AppError } from "./errorHandler";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

export function prismaErrorHandler(callback: Function) {
    return Promise.resolve(callback())
        .then((data) => data)
        .catch((error) => {
            return getPrismaAppError(error);
        });
}

/**
 * Function to handle Prisma client errors and return error with appropriate message.
 *
 * @param {any} error - the error object (to be used for prisma client errors)
 * @return {AppError} the appropriate AppError based on the error code (if found in known prisma errors), or the error is forwarded
 */

export function getPrismaAppError(error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
            return new AppError(`${error.meta?.target} already exists`, 409);
        }
        if (error.code === "P2001") {
            return new AppError(` Record does not exist`, 404);
        }
        if (error.code === "P2011") {
            return new AppError(`Make Sure all required fields are filled`, 400);
        }
        if (error.code === "P2025") {
            return new AppError(`${error.meta?.modelName} not found`, 400);
        }
        console.log(error);
        return new AppError(`Invalid Input`, 409);
    }
    if (error instanceof PrismaClientValidationError) {
        return new AppError("Please check input values and try again", 400);
    }
    return error;
}
