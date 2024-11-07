import path from "path";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

async function handleRequest(req: NextRequest) {
  const filePath = path.join(process.cwd(), "data", "grapesJsData.json");

  if (req.method === "POST" || req.method === "PATCH") {
    try {
      const data = await req.json();
      console.log("reqreqreqreqreq", data);
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
    return NextResponse.json({ status: "Method Not Allowed" }, { status: 405 });
  }
}

export async function POST(req: NextRequest) {
  return handleRequest(req);
}

export async function PATCH(req: NextRequest) {
  return handleRequest(req);
}
