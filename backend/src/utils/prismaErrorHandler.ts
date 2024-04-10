import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AppError } from "./errorHandler";

export function prismaErrorHandler(callback: Function) {
    return Promise.resolve(callback())
        .then((data) => data)
        .catch((error) => {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    return new AppError(`${error.meta?.target} already exists`, 409);
                }
                return;
            }
            return error;
        });
}
