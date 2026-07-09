import { NextResponse } from "next/server";
import { db } from "@/db";
import { menuItems } from "@/db/schema";

export async function GET() {
  try {
    const items = await db.select().from(menuItems);

    return NextResponse.json(items);
  } catch (error) {
    console.error("Menu fetch error:", error);

    return NextResponse.json(
      { error: "Failed to fetch menu" },
      { status: 500 }
    );
  }
}