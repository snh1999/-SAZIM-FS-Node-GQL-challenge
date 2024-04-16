import { getEnumValueArray } from "../../utils/helper";

export enum Category {
    ELECTRONICS = "Electronics",
    FURNITURE = "Furniture",
    HOME_APPLIANCES = "Home Appliances",
    SPORTING_GOODS = "Sporting Goods",
    OUTDOOR = "Outdoor",
    TOYS = "Toys",
}

export enum RentDuration {
    DAY = "Daily",
    WEEK = "Weekly",
    BIWEEK = "Bi-weekly",
    MONTH = "Monthly",
    QUARTER = "Quarterly",
    HALFYEAR = "Half-yearly",
    YEAR = "Yearly",
}

export interface Product {
    id: string;
    title: string;
    category: Category[];
    description: string;
    createdAt: Date;
    ownerId: string;
    price: number;
    rentPrice: number;
    rentDuration: RentDuration;
    view: number;
}

/**
 * Changes the enum to the viewable values (all caps and underscore converted to normal casing)
 *
 * @param {Product} product - the product for which to retrieve the default value
 * @return {Partial<Product>} the product with updated categories and rent duration
 */
export function getProductToDefaultValue(product: Product) {
    if (product)
        return {
            ...product,
            categories: getEnumValueArray(Category, product?.category || []),
            rentDuration: RentDuration[product?.rentDuration],
        };
}
