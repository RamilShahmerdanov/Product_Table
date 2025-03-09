import axios from "axios";

const Api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const Getproducts = async () => {
  try {
    const responce = await Api.get("/products");
    console.log("responce", responce.data.products);
    return responce.data.products
  } catch (error) {
    console.log("error", error);
    return []
  }
};
