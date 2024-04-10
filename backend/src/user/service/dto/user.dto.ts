import { IsEmail, IsOptional, IsString, IsNotEmpty, IsAlpha, IsMobilePhone } from "class-validator";

export class UserDto {
    @IsAlpha()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsMobilePhone()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
