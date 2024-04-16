### Features Tracker and other details 

#### Technology Choices

-   [x] React with and Apollo Client for Frontend (Mandatory)
    -   [x] Material UI for frontend library
    -   [x] `react-hook-form` with `yup` for form operation and validation
    -   [x] `react-router-dom` for routing
-   [x] ExpressJs with GraphQL for Backend (Mandatory)
    -   [x] Data fetching from GraphQL only
-   [x] Used Apollo Cache (InMemoryCache)
-   [x] Prisma (ORM) and Postgres as Database

#### Features List

-   [x] User Login
    -   [x] JWT token in local storage
    -   [ ] Use of secure practices
-   [x] User Registration
    -   [ ] Email validation
-   [x] Add product with multipage form
    -   [x] Edit Product Page
    -   [x] Delete Product
    -   [x] View Product
    -   [ ] Product Category Specific features
-   [x] List All product by all user
-   [x] Buy a product
-   [x] Rent a product
-   [x] History of User (bought/sold/borrowed/lent)
-   [x] Rent History has to be Non-overlapping
-   [x] Input Validation, Feedback in place
-   [x] Error Handling is done for caught prisma error.
-   [ ] Testing was done manually (Automated End to end testing will be required in future)

#

### PART 01- Login, Registration

https://github.com/snh1999/SAZIM-FS-Node-GQL-challenge/assets/46876336/b75c37e3-bc26-4269-96c2-e450c7ca87b1

#### Backend

```tree
src
├── config
├── constants
├── middleware
├── schema
├── user
│   ├── graphql
│   ├── index.ts
│   └── service (operations related to validation, database)
│       └── dto (data types with class validator)
├── utils
└──index.ts
```

-   [index.ts](./backend/src/index.ts) is the entry-point of application. (All is kept in once place as there is not much going on with it).
-   the important folder in this case is `schema` as it adds/defines GraphQL schema.
    -   the folder `user/graphql` is important as well, containing Mutations/Query/Types for user operations.
    -   [user/index.ts](./backend/src/user/index.ts) takes those from graphql folder and export them as objects- which makes the code modular and convenient for schema without getting concerned with details in them.
        -   `user/service` encapsulates input validation and all Database related operations, for graphql Query/Mutations.

#### Frontend

```
├── App.tsx
├── config
│   ├── apollo_cache.ts
│   ├── apollo_client.ts
│   ├── context (Authentication Provider)
│   ├── hooks
│   └── yup (Form validation schema)
├── constants (feedback values, types of data)
├── graphql
│   └── user (All graphql query/mutation defined here)
├── pages (pages put in the root of folder)
│   ├── components
│   │   ├── containers
│   │   └── resuable
│   ├── layout
│   │   ├── Mainlayout.tsx (Adds appbar)
│   │   └── RequireAuth.tsx (Redirect unauthenticated protected pages to login page)
│   └── router.tsx (react-router-dom setup and route definition)
└──utils
```

-   Page components are put in the root of the folder
-   the `src/pages/components/containers` folder contain resuable
-   All the network request is wrapped by [RequestStateWrapper](/frontend/src/pages/components/containers/RequestStateWrapper.tsx) to handle the loading, error/success message display in snackbar.
-   All Forms are wrapped by [FormContainer](/frontend/src/pages/components/containers/FormContainer.tsx) to contain a similar styling
-   All Individual custom Input fields are wrapped by [InputFeedBackContainer](/src/pages/components/containers/InputFeedBackContainer.tsx) to display error message feedbacks.

### PART 02- Add, delete, edit product

https://github.com/snh1999/SAZIM-FS-Node-GQL-challenge/assets/46876336/f2604262-9750-4577-b18e-9d92b7807f98

There isn't much of change in this step.

-   Backend adds `src/product` folder with the same structure as `src/user`
-   Frontend has `src/pages/components/products` and `src/pages/product` for frontend display and `src/graphql/product` for Query/mutations.
    -   The caching was configured for add/update/delete operations. They were cacheable after one fetch as the data was not being changed behind the scenes.

### PART 03- History, Rent, Buy Product

https://github.com/snh1999/SAZIM-FS-Node-GQL-challenge/assets/46876336/b536dfeb-4292-4e8d-9eea-a360e2a8afac

### Cache Strategy

One of the bigger challenges was put with caching in this step as there was could be data changes without current user involvement. So Caching is done specifically for the operation that include user. The global operations (eg- User History(Rent/Sell), All products), are refetched as this could change anytime without involvement of the user. There won't be any performance hits for now, but for a bigger application something Like Observer Pattern would come in handy.

-   `All product` page is refetched with every request
-   Product Transaction History is sent in one network call. As the performace hit was caused by the network call, not the processing of array in frontend. SO once it loads, the performance is very quick. This comes with the sacrifice of not getting updated on each transaction after the page loads. Sending Data stream would be one of the improvements (Same goes for `All Product` page), but the complexity would be much higher duplex stream/Observer pattern for our usecase

https://github.com/snh1999/SAZIM-FS-Node-GQL-challenge/assets/46876336/6777bb0f-edb3-418b-8347-c9c8a6c2f58f

## Database schema

A more detailed schema can be found in [Here](./files/erd.png) (the file looks broken in README)

-   One additional assumption was made regarding `User` `lastName` and `Address` being optional to simplify login process.
-   There is no `Category` specific features in the application, so it is just kept as enum type for now.
    it would be an interesting idea to explore as the application grows and category specific features become required.

-   Sell and Rent are put into same entity `Transaction` for now for simplicity of the operation, as there is/could be a few connected operations, and this structure helps to reduce network request (from frontend) and database calls. But as the application grows, we might have to separate into two entity as this approach could become inefficient quickly.

    ![Database_schema](./files/prisma-erd.svg)

### Assumption and simplification

-   One of the ignored cases is User can select older dates for renting, which is kept for convinience of testing (It would take two line of code in front-backend to fix)

-   Products can not be sold more than once, And the user buying the product gets the authorization to delete it from the site.

-   Two corner cases are somewhat on hold as I could not think of a good approach to solve them. What if someone buys/deletes a product when there is a scheduled rent?. We could just prevent deleting/buying until the rent is over/ cancel rents/hold until the current rent is over. This will have to be done by client requirement.

-   Rate limiting, Refresh token was not incorporated considering the scope of application

-   Pagination was features is not added for now.

### Things I would do differently if I start again

-   If possible, I would choose `nestjs` as it has far superior validation/error handling workflow as well as better structure than base `expressjs`.
    But at least, I would switch to `Apollo-server` for backend, the reason for choosing `graphql-http` was it was lighter solution and it plays nicer (to my limited experience in those 10 days) with the `FieldConfigGraphQL` type of pattern I chose, As it felt more convinient than keeping type, query, definition in different files.

But error handling was really frustrating, which looked a lot nicer reading `Apollo-server` documentation.

-   I started with mantine but decided against it soon as it felt some friction to get the start I needed. I think staying in it would have been a better idea as `react-hook-form` and MUI did not played nice exactly with each other. And MUI has some quirky stylings as well.

-   I would have started documentation writing sooner, as this gives some relief from stress and keeps productivity going. But there was a massive github merging scare as I was working with two folder and two branch at the same time (which is a first for me) and resolving each merge conflict was getting written from main to branches
