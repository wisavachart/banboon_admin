class ProductService {
  //Delete Product
  async deleteCategory(id: string) {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  }
  // GET ALL PRODUCTS NO FILTER
  async getAllproduct() {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  }
  // GET PRODUCT BY CATEGORY WITH FILTER
  async getAllProductbyCategoryFilter(id: string) {
    try {
      const res = await fetch(`/api/products?category=${id}`, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Fail to fetch Product by Category");
      }
      const data = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  }
  async getProductByID(id: string) {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  }
}

export default new ProductService();
