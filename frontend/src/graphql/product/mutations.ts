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
