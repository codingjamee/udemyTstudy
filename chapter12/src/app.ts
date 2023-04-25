import { Product } from "./product.model";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import "reflect-metadata";

const product = [
  { title: "A Carpet", price: 29.99 },
  { title: "A Book", price: 12.88 },
];

const newProd = new Product("", -5.22);
validate(newProd).then((errors) => {
  if (errors.length > 0) {
    console.log("VALIDATION ERRORS!");
    console.log(errors);
  } else {
    console.log(newProd.getInformation());
  }
});

// const loadedProducts = product.map((prod) => {
//   return new Product(prod.title, prod.price);
// });

//자바스크립트 object를 class로 변환시켜주는 작업
const loadedProducts = plainToClass(Product, product);

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}
