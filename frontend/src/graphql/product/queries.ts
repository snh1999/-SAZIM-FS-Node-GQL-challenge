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

export const TRANSACTION_HISTORY_QUERY = gql`
    query getTransactionHistory($id: String!) {
        getTransactionHistory(id: $id) {
            id
            rentStartDate
            rentEndDate
            transactionType
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

export const CURRENT_USER_TRANSACTIONS_QUERY = gql`
    query getMyTransactions {
        getMyTransactions {
            id
            transactionType
            originalOwnerId
            newHolderId
            rentStartDate
            rentEndDate
            transactionDate
            product {
                id
                title
                createdAt
                category
                description
                createdAt
                price
                rentPrice
                rentDuration
                view
                ownerId
            }
        }
    }
`;
