import { gql } from "@apollo/client";

export const MY_PRODUCTS_QUERY = gql`
    query getMyProducts {
        getMyProducts {
            id
            title
            createdAt
            category
            description
            price
            rentPrice
            rentDuration
            view
        }
    }
`;

export const ALL_PRODUCTS_QUERY = gql`
    query getAllProducts {
        getAllProducts {
            id
            title
            createdAt
            category
            description
            price
            rentPrice
            rentDuration
            view
            ownerId
        }
    }
`;

export const VIEW_PRODUCT_QUERY = gql`
    query getProduct($id: ID!) {
        getProduct(id: $id) {
            title
            category
            price
            description
            ownerId
        }
    }
`;

export const PREVIEW_PRODUCT_QUERY = gql`
    query previewProduct($id: ID!) {
        getProduct(id: $id) {
            title
            category
            price
            description
            rentDuration
            rentPrice
        }
    }
`;
