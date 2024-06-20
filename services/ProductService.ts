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
}

export default new ProductService();
