import { NextResponse } from "next/server";
import { db } from "@/db";
import { contacts } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const all = await db.select().from(contacts).orderBy(desc(contacts.createdAt));
    return NextResponse.json(all);
  } catch (error) {
    console.error("Admin contacts error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
