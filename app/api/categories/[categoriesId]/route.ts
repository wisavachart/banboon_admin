// import { auth } from "@clerk/nextjs/server";
import Category from "@/lib/models/Category";
import { connectionToDb } from "@/lib/mongoDb";
import { NextRequest, NextResponse } from "next/server";
//GET
export const GET = async (
  req: NextRequest,
  { params }: { params: { categoriesId: string } }
) => {
  try {
    await connectionToDb();
    const category = await Category.findById(params.categoriesId);
    if (!category) {
      return new NextResponse(
        JSON.stringify({
          message: "Cannot find Category",
        }),
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(category, { status: 200 });
  } catch (err) {
    return new NextResponse("Internam Error", { status: 500 });
  }
};
//Delete
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { categoriesId: string } }
) => {
  try {
    //เชค User ID
    // const { userId } = auth();

    await connectionToDb();
    await Category.findByIdAndDelete(params.categoriesId);
    return NextResponse.json(
      { message: "Collection deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return new NextResponse("Internam Error", { status: 500 });
  }
};

//Update
export const POST = async (
  req: NextRequest,
  { params }: { params: { categoriesId: string } }
) => {
  try {
    await connectionToDb();
    let category = await Category.findById(params.categoriesId);
    if (!category) {
      return new NextResponse("internal Error", { status: 404 });
    }
    const { title, description, image } = await req.json();

    category = await Category.findByIdAndUpdate(
      params.categoriesId,
      { title, description, image },
      { new: true }
    );
    await category.save();
    return NextResponse.json(category, { status: 200 });
  } catch (err) {
    return new NextResponse("Internam Error", { status: 500 });
  }
};
