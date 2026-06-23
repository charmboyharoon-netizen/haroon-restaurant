import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { reservations } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, date, time, guests, specialRequests } = body;

    if (!name || !phone || !date || !time || !guests) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const [reservation] = await db
      .insert(reservations)
      .values({
        name,
        phone,
        email: email || null,
        date,
        time,
        guests: parseInt(guests),
        specialRequests: specialRequests || null,
        status: "pending",
      })
      .returning();

    return NextResponse.json({ success: true, id: reservation.id }, { status: 201 });
  } catch (error) {
    console.error("Reservation error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const all = await db.select().from(reservations);
    return NextResponse.json(all);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
