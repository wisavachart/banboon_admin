import Category from "./models/Category";
import Product from "./models/Product";
import { connectionToDb } from "./mongoDb";
export const getTotalCategory = async () => {
  await connectionToDb;
  const category = await Category.find();
  const totalCategory = category.length;
  return { totalCategory };
};
export const getTotalProducts = async () => {
  await connectionToDb;
  const product = await Product.find();
  const totalProducts = product.length;
  return { totalProducts };
};
