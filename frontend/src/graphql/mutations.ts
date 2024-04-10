import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
    mutation Register(
        $firstName: String!
        $lastName: String!
        $email: String!
        $phone: String!
        $address: String!
        $password: String!
    ) {
        createUser(
            firstName: $firstName
            lastName: $lastName
            email: $email
            phone: $phone
            address: $address
            password: $password
        ) {
            id
        }
    }
`;
