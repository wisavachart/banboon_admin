import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

type CategoryForExelSheet = {
  title: string;
};

type ProductsForExcelSheet = {
  _id: string;
  category: CategoryForExelSheet;
  title: string;
  description: string;
  price: number;
};
interface GetDataToExcel {
  dataExcel: ProductsForExcelSheet[];
}

class GetDataToExcel {
  /**
   *
   */
  constructor() {
    this.dataExcel = [];
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
      if (data) {
        this.dataExcel = data.map((item: ProductsForExcelSheet) => ({
          รหัสสินค้า: item._id,
          ประเภทสินค้า: item.category?.title,
          ชื่อสินค้า: item.title,
          คำบรรยายสินค้า: item.description,
          ราคา: item.price,
        }));
        return this.MakeExcellSheet(this.dataExcel);
      }
    } catch (err) {
      throw err;
    }
  }

  //Public Method

  MakeExcellSheet(allproduct: ProductsForExcelSheet[]) {
    const ws = XLSX.utils.json_to_sheet(allproduct);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "baanboon_report.xlsx");
  }
}

export default new GetDataToExcel();
