import { GraphQLError } from "graphql";

export function errorHandler(error: Error | GraphQLError | AppError) {
    if (error.message.length > 100) {
        console.log(error);
        return new AppError("Internal Server Error");
    }
    return error;
}

export class AppError extends GraphQLError {
    code: number;
    isAppError: boolean;
    constructor(message: string, code: number = 500) {
        super(message);
        this.code = code;
        this.isAppError = true;
    }
}
