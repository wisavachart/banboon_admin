type CreateCategory = {
  title: string;
  description: string;
  image: string;
};

class CategoryService {
  //CREATE CATEGORY
  async createCategory(value: CreateCategory) {
    console.log("เริ่ม Create");
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify(value),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  }
  //GET ALL CATEGORY
  async getAllCategory() {
    try {
      const res = await fetch("/api/categories", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  }
  //GET CATEGORY BY ID
  async getCategoryById(id: string) {
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "GET",
      });

      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  //UPDATE CATEGORY BY ID
  async upDateCategory(value: CreateCategory, id: string) {
    console.log("up date");
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "POST",
        body: JSON.stringify(value),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  }
  // DELETE CATAGORY
  async deleteCategory(id: string) {
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}

export default new CategoryService();
