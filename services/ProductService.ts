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
