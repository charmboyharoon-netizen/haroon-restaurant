import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, customerPhone, customerEmail, items, totalAmount, paymentMethod, notes } = body;

    if (!customerName || !customerPhone || !items || !totalAmount) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const [order] = await db
      .insert(orders)
      .values({
        customerName,
        customerPhone,
        customerEmail: customerEmail || null,
        items: typeof items === "string" ? items : JSON.stringify(items),
        totalAmount: parseInt(totalAmount),
        paymentMethod: paymentMethod || "cash",
        notes: notes || null,
        status: "pending",
        paymentStatus: "pending",
      })
      .returning();

    return NextResponse.json({ success: true, id: order.id }, { status: 201 });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const all = await db.select().from(orders);
    return NextResponse.json(all);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
