const { gql } = require("apollo-server");

exports.typeDefs = gql`
    type Query {
        product(id: ID!): Product
        products(filter: ProductsFilterInput): [Product!]!
        category(id: ID!): Category
        categories: [Category!]!
    }

    type Mutation {
        addCategory(input: AddCategoryInput!): Category!
        addProduct(input: AddProductInput!): Product!
        addReview(input: AddReviewInput!): Review!
        deleteCategory(categoryId: ID!): Boolean!
        deleteProduct(productId: ID!): Boolean!
        deleteReview(reviewId: ID!): Boolean!
        updateCategory(categoryId: ID!, input: UpdateCategoryInput!): Category
        updateProduct(productId: ID!, input: UpdateProductInput!): Product
        updateReview(reviewId: ID!, input: UpdateReviewInput!): Review
    }

    type Product {
        id: ID!
        name: String!
        description: String!
        image: String!
        quantity: Int!
        price: Float!
        onSale: Boolean!
        category: Category
        reviews: [Review!]!
    }

    type Category {
        id: ID!
        name: String!
        products(filter: ProductsFilterInput): [Product!]!
    }

    type Review {
        id: ID!
        date: String!
        title: String!
        comment: String!
        rating: Int!
        productId: ID!
    }

    input ProductsFilterInput {
        onSale: Boolean
        avgRating: Int
    }

    input AddCategoryInput {
        name: String!
    }

    input UpdateCategoryInput {
        name: String!
    }

    input AddProductInput {
        name: String!
        description: String!
        quantity: Int!
        image: String!
        price: Float!
        onSale: Boolean!
        categoryId: ID
    }

    input UpdateProductInput {
        name: String!
        description: String!
        quantity: Int!
        image: String!
        price: Float!
        onSale: Boolean!
        categoryId: ID
    }

    input AddReviewInput {
        date: String!
        title: String!
        comment: String!
        rating: Int!
        productId: ID!
    }

    input UpdateReviewInput {
        date: String!
        title: String!
        comment: String!
        rating: Int!
        productId: ID!
    }
`;