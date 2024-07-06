type CategoryType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
};

type ProductsType = {
  _id: string;
  title: string;
  description: string;
  imageCover: string;
  media: string[];
  category: CategoryType;
  price: number;
  statusPublish: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  createAt: Date;
  updateAt: Date;
};
