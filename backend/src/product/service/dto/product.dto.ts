import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

import { Category, RentDuration } from "@prisma/client";

export class ProductDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsArray()
    category: Category[];

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    ownerId: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    rentPrice: number;

    @IsNotEmpty()
    rentDuration: RentDuration;
}

export class PartialProductDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsArray()
    @IsOptional()
    category?: Category[];

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    ownerId?: string;

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsNumber()
    @IsOptional()
    rentPrice?: number;

    @IsOptional()
    rentDuration?: RentDuration;
}
