import path from "path";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function handler(req: NextRequest) {
  const filePath = path.join(process.cwd(), "data", "grapesJsData.json");

  if (req.method === "POST" || req.method === "PATCH") {
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
  } else {
    return NextResponse.json({ status: "method not allowed" }, { status: 503 });
  }
}
export { handler as POST, handler as PATCH };
