import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "grapesJsData.json");
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(data);

    return NextResponse.json({ data: jsonData });
  } catch (err) {
    console.error("Error Loading Data:", err);
    return NextResponse.json(
      { status: "Failed to load data" },
      { status: 500 }
    );
  }
}
