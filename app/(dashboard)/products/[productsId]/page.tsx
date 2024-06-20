"use client";
import ProductFrom from "@/components/products/ProductFrom";
import { useEffect, useState } from "react";

const ProductDetail = ({ params }: { params: { productsId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [prodeucDetail, setProducDetail] = useState<ProductsType | null>(null);

  const getProductDetail = async () => {
    try {
      const res = await fetch(`/api/products/${params.productsId}`, {
        method: "GET",
      });
      const data = await res.json();
      setProducDetail(data);
      setLoading(false);
    } catch (er) {
      console.log(er);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return loading ? <p>Loading...</p> : <ProductFrom initData={prodeucDetail} />;
};

export default ProductDetail;
