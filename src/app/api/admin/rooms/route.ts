import { NextResponse } from "next/server";
import { db } from "@/db";
import { roomBookings } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const all = await db.select().from(roomBookings).orderBy(desc(roomBookings.createdAt));
    return NextResponse.json(all);
  } catch (error) {
    console.error("Admin rooms error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
