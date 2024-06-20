import Category from "@/lib/models/Category";
import Product from "@/lib/models/Product";
import { connectionToDb } from "@/lib/mongoDb";
import { NextRequest, NextResponse } from "next/server";

//GET
export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectionToDb();
    const product = await Product.findById(params.productId).populate({
      path: "category",
      model: Category,
    });
    if (!product) {
      return new NextResponse(
        JSON.stringify({
          message: "Cannot find Product",
        }),
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    return new NextResponse("Internam Error", { status: 500 });
  }
};

//DELETE
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    //เชค User ID
    // const { userId } = auth();
    await connectionToDb();
    const proDuctTodelete = await Product.findById(params.productId);
    if (!proDuctTodelete) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    await Product.findByIdAndDelete(proDuctTodelete._id);

    //ไปลบที่ Category ด้วย

    await Category.findByIdAndUpdate(proDuctTodelete.category, {
      $pull: { products: proDuctTodelete._id },
    });

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return new NextResponse("Internam Error", { status: 500 });
  }
};

//UPDATE
export const POST = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    // const { userId } = auth();

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    await connectionToDb();
    const product = await Product.findById(params.productId);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    const {
      title,
      description,
      media,
      category,
      price,
      statusPublish,
      isNewArrival,
    } = await req.json();

    if (!title || !description || !media || !category || !price) {
      return new NextResponse("Not enough data to create a new product", {
        status: 400,
      });
    }
    //์ new Cate FormUpdate
    const newCategory = category;
    //์ curent Cate
    const productCategory = product.category;
    if (productCategory != newCategory) {
      //ลบของเก่า
      await Category.findByIdAndUpdate(product.category, {
        $pull: { products: product._id },
      });

      const categoryDB = await Category.findById(newCategory);
      categoryDB.products.push(product._id);
      await categoryDB.save();
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      {
        title,
        description,
        media,
        category,
        price,
        statusPublish,
        isNewArrival,
      },
      { new: true }
    ).populate({ path: "category", model: Category });
    await updatedProduct.save();

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (err) {
    console.log("[productId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};
