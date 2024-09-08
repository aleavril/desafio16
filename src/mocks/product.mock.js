import { fakerES as faker } from "@faker-js/faker";
import { productModel } from "../persistences/mongo/models/product.model.js";

export const generateProductsMocks = (amount) => {
  const products = [];

  for (let i = 0; i < amount; i++) {
    const product = {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      thumbnail: faker.internet.url(),
      code: faker.string.alphanumeric(10),
      stock: faker.number.int({ min: 0, max: 100 }),
      status: faker.datatype.boolean(),
      category: faker.commerce.department()
    };

    products.push(product);
  }

  productModel.insertMany(products);

  return products;
};