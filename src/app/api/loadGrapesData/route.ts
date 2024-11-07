import { connectToDatabase } from "@/utils/mongoDb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const data = await db.collection("grapesjs_data").find({}).toArray();
    if (data.length > 0) {
      return NextResponse.json(
        { message: "Data retrieved successfully", data },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to load Data", error },
      { status: 500 }
    );
  }
}
