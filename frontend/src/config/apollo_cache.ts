import { ApolloCache } from "@apollo/client";
import { MY_PRODUCTS_QUERY } from "../graphql/product/queries";
import { Product } from "../constants/types/Product";
export function updateOnNew(cache: ApolloCache<unknown>, product: Product) {
    const { getMyProducts } = cache.readQuery({ query: MY_PRODUCTS_QUERY });
    cache.writeQuery({
        query: MY_PRODUCTS_QUERY,
        data: { getMyProducts: getMyProducts.concat(product) },
    });
}

export function updateOnDelete(cache: ApolloCache<unknown>, id: string) {
    const { getMyProducts } = cache.readQuery({ query: MY_PRODUCTS_QUERY });
    cache.writeQuery({
        query: MY_PRODUCTS_QUERY,
        data: {
            getMyProducts: getMyProducts.filter((product) => product.id !== id),
        },
    });
}

export function updateOnUpdate(cache: ApolloCache<unknown>, editedProduct: Product) {
    const { getMyProducts } = cache.readQuery({ query: MY_PRODUCTS_QUERY });
    cache.writeQuery({
        query: MY_PRODUCTS_QUERY,
        data: {
            getMyProducts: getMyProducts.map((product) => (product.id !== product.id ? product : { ...editedProduct })),
        },
    });
}
