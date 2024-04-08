import { IsEmail, IsOptional, IsString, IsNotEmpty, IsPhoneNumber, IsAlpha, IsMobilePhone } from "class-validator";

export class UserDto {
    @IsAlpha()
    @IsNotEmpty()
    firstName: string;

    @IsAlpha()
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

export class PartialUserDto {
    @IsAlpha()
    @IsOptional()
    firstName?: string;

    @IsAlpha()
    @IsOptional()
    lastName?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsPhoneNumber()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    password?: string;
}
