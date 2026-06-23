import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { roomBookings } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { guestName, guestPhone, guestEmail, roomType, checkIn, checkOut, guests, totalAmount, specialRequests } = body;

    if (!guestName || !guestPhone || !roomType || !checkIn || !checkOut || !guests || !totalAmount) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const [booking] = await db
      .insert(roomBookings)
      .values({
        guestName,
        guestPhone,
        guestEmail: guestEmail || null,
        roomType,
        checkIn,
        checkOut,
        guests: parseInt(guests),
        totalAmount: parseInt(totalAmount),
        specialRequests: specialRequests || null,
        status: "pending",
      })
      .returning();

    return NextResponse.json({ success: true, id: booking.id }, { status: 201 });
  } catch (error) {
    console.error("Room booking error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const all = await db.select().from(roomBookings);
    return NextResponse.json(all);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
