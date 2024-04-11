export enum Category {
    ELECTRONICS = "Electronics",
    FURNITURE = "Furniture",
    HOME_APPLIANCES = "Home Appliances",
    SPORTING_GOODS = "Sporting Goods",
    OUTDOOR = "Outdoor",
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
    categories: Category[];
    description: string;
    createdAt: Date;
    ownerId: string;
    price: number;
    rentPrice: number;
    rentDuration: RentDuration;
}
