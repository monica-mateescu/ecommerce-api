import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "eCommerce API",
      version: "1.0.0",
      description: "API for products, categories, users and orders",
    },
  },
  apis: ["./src/routers/*.ts"],
});