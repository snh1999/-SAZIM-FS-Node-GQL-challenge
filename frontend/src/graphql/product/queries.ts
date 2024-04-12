import { gql } from "@apollo/client";

export const GET_MY_PRODUCTS_QUERY = gql`
    {
        getMyProducts {
            id
            title
            createdAt
            category
            description
            createdAt
            price
            rentPrice
            rentDuration
        }
    }
`;
