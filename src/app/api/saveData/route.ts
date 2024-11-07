import path from "path";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const filePath = path.join(process.cwd(), "data", "grapesJsData.json");

  try {
    const data = await req.json();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json(
      { status: "Data Saved Successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error Saving Data:", err);

    return NextResponse.json(
      { status: "Failed to save data" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const filePath = path.join(process.cwd(), "data", "grapesJsData.json");

  try {
    const data = await req.json();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json(
      { status: "Data Updated Successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error Updating Data:", err);

    return NextResponse.json(
      { status: "Failed to update data" },
      { status: 500 }
    );
  }
}
