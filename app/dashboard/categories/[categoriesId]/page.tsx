"use client";
import CollectionForm from "@/components/categories/CollectionForm";
import CategoryService from "@/services/CategoryService";
import { useEffect, useState } from "react";

const CategoryDetail = ({ params }: { params: { categoriesId: string } }) => {
  const [loading, setloading] = useState(true);
  const [categoryDetail, setCategoryDetail] = useState<CategoryType | null>(
    null
  );

  useEffect(() => {
    getCategoryById();
  }, []);
  const getCategoryById = async () => {
    try {
      const data = await CategoryService.getCategoryById(params.categoriesId);
      setCategoryDetail(data);
      setloading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return loading ? (
    <p>Now loading</p>
  ) : (
    <CollectionForm initData={categoryDetail} />
  );
};

export default CategoryDetail;
