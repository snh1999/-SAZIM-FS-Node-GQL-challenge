import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { AppError } from "./errorHandler";

/**
 *
 * Validate the payload will be sending or receiving, make sure the data is suitable
 *
 * @param dto The DTO object to validate
 * @param obj The object recieved from response body
 *
 * ```
 */
export async function dtoValidator<T extends ClassConstructor<any>>(dto: T, obj: Object) {
    const objInstance = plainToClass(dto, obj);
    const errors = await validate(objInstance);
    if (errors.length > 0) {
        return new AppError(`Invalid input: ${errors.map(({ property }) => property)}`);
    }
}

export async function inputValidationCallback<T extends ClassConstructor<any>>(
    dto: T,
    obj: Object,
    callback: Function
) {
    const error = await dtoValidator(dto, obj);
    if (error !== undefined) return error;

    return callback();
}
