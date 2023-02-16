
# BudgetBuddy
> BudgetBuddy is a web application built using Nest.js, a powerful Node.js framework for building scalable and efficient server-side applications. The app provides a REST API that allows users to manage a list of products and track their budgets.

## Features
- Set budgets for users based on the prices of selected products
- Handle common HTTP errors using exception filters
- Validate incoming data using DTOs (Data Transfer Objects)
- Unit test services and controllers using Jest and Nest.js testing utilities
- End-to-end test the entire app using Supertest and Jest

## Technologies
BudgetBuddy was built using the following technologies:

- Nest.js - A progressive Node.js framework for building efficient, scalable, and robust server-side applications
- TypeScript - A typed superset of JavaScript that compiles to plain JavaScript
- Jest - A popular testing framework for JavaScript projects, with built-in support for mocking, assertions, and code coverage analysis
- Supertest - A high-level HTTP testing library for Node.js applications

## Installing
1. Clone the repository and navigate to the project directory.

2. Install NPM packages
    ```bash
    npm install
    ```

3. Next, create a .env file in the root of the project and add the following:
    ```env
    API_URL=https://example.com/api
    ```
    Replace https://example.com/api with the URL of the external API.

4. Run the development server
    ```bash
    npm run start:dev
    ```
    - Use the API at http://localhost:3000
    - Use a tool like [Postman](https://www.postman.com/) to test the API endpoints.

## API Documentation
The following endpoints are available:

### GET /users

Returns a list of all users.


**Response**
```json
[
    {
        "id": 1,
        "name": "Alice",
        "tax": 10
    },
    {
        "id": 2,
        "name": "Bob",
        "tax": 15
    },
    ...
]
```

### GET /users/:id

Returns a specific user by ID.

**Response**
```json
{
  "id": 1,
  "name": "Alice",
  "tax": 10
}
```

### POST /users/:id/budget
Sets a budget for a specific user based on a list of product IDs.
**Request**
Expects a JSON body with an array of product IDs:
```json
{
  "products_ids": [1, 2, 3]
}
```

**Response**
```json
{
  "total_price": 220.5
}
```

### GET /products
Returns a list of all products.

**Response**
```json
[
    {
        "id": 1,
        "name": "Product 1",
        "price": 100
    },
    {
        "id": 2,
        "name": "Product 2",
        "price": 50
    },
    ...
]
```

### GET /products/:id
Returns a specific product by ID.

**Response**
```json
{
  "id": 1,
  "name": "Product 1",
  "price": 100
}
```

## Running Tests
You can run the unit tests with:
```bash
npm run test
```

You can run the e2e tests with:
```bash
npm run test:e2e
```
