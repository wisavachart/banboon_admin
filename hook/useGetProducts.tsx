import ProductService from "@/services/ProductService";
import React, { useEffect, useState } from "react";

const useGetProducts = () => {
  const [product, setproduct] = React.useState([]);
  const [proDuctLenght, setProductLenght] = useState<number | null>(null);

  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setloading(true);
      try {
        const res = await ProductService.getAllproduct();
        setproduct(res);
        setloading(false);
      } catch (err) {
        setloading(false);
        console.error(err);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    setProductLenght(product.length);
  }, [product]);

  return { product, loading, proDuctLenght };
};

export default useGetProducts;
