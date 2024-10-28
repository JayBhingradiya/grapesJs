import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "grapesJsData.json");
  try {
    const jsonData = fs.readFileSync(filePath, "utf8");
    return NextResponse.json({ data: JSON.parse(jsonData) });
  } catch (err) {
    console.error("Error Loading Data:", err);
    return NextResponse.json(
      { status: "Failed to load data" },
      { status: 500 }
    );
  }
}
