import CategoryService from "@/services/CategoryService";
import React, { useEffect, useState } from "react";

const useGetCategories = () => {
  const [categories, setCategories] = React.useState([]);
  const [categoriesLenght, setcategoriesLenght] = useState<number | null>(null);

  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setloading(true);
      try {
        const res = await CategoryService.getAllCategory();
        setCategories(res);
        setloading(false);
      } catch (err) {
        setloading(false);
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setcategoriesLenght(categories.length);
  }, [categories]);

  return { categories, loading, categoriesLenght };
};

export default useGetCategories;
