import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

/**
 *
 * Validate the payload will be sending or receiving, make sure the data is suitable
 *
 * @param dto The DTO object to validate
 * @param obj The object recieved from response body
 *
 * @example
 * ```ts
 *  await validatorDto(EmployeeDTO, response.data.employee);
 *
 * ```
 */
export async function dtoValidator<T extends ClassConstructor<any>>(dto: T, obj: Object) {
    console.log(typeof obj);
    // tranform the literal object to class object
    const objInstance = plainToClass(dto, obj);
    // validating and check the errors, throw the errors if exist
    const errors = await validate(objInstance);
    // errors is an array of validation errors
    if (errors.length > 0) {
        throw new Error(`Input Validation Failed for : ${errors.map(({ property }) => property)}`);
    }
}
