import { gql } from "@apollo/client";

export const CREATE_PRODUCT_MUTATION = gql`
    mutation createProduct(
        $title: String!
        $category: [String]
        $description: String!
        $price: Int!
        $rentPrice: Int!
        $rentDuration: String!
    ) {
        createProduct(
            title: $title
            category: $category
            description: $description
            price: $price
            rentPrice: $rentPrice
            rentDuration: $rentDuration
        ) {
            id
            title
            category
            description
            price
            rentPrice
            createdAt
            rentDuration
        }
    }
`;

export const UPDATE_PRODUCT_MUTATION = gql`
    mutation updateProduct(
        $id: String!
        $title: String!
        $category: [String]!
        $description: String!
        $price: Int!
        $rentPrice: Int!
        $rentDuration: String!
    ) {
        updateProduct(
            id: $id
            title: $title
            category: $category
            description: $description
            price: $price
            rentPrice: $rentPrice
            rentDuration: $rentDuration
        ) {
            id
            title
            category
            price
            rentPrice
            rentDuration
        }
    }
`;

export const DELETE_PRODUCT_MUTATION = gql`
    mutation deleteProduct($id: String!) {
        deleteProduct(id: $id) {
            id
        }
    }
`;

export const BUY_PRODUCT_MUTATION = gql`
    mutation buyProduct($id: String!) {
        buyProduct(id: $id) {
            id
            title
            ownerId
        }
    }
`;

export const RENT_PRODUCT_MUTATION = gql`
    mutation rentProduct($id: String!, $startDate: String!, $endDate: String!) {
        rentProduct(id: $id, startDate: $startDate, endDate: $endDate) {
            id
        }
    }
`;
