  import path from "path";
  import fs from "fs";
  import { NextRequest, NextResponse } from "next/server";

  export async function POST(req: NextRequest) {
    const { data } = await req.json();
    console.log("datadatadatadata", data);

    const filePath = path.join(process.cwd(), "public", "grapesJsData.json");
    console.log("filePath", filePath);
    try {
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
