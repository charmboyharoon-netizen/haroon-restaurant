import { NextResponse } from "next/server";
import { db } from "@/db";
import { menuItems } from "@/db/schema";
import { eq } from "drizzle-orm";

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
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newItem = await db
      .insert(menuItems)
      .values({
        name: body.name,
        nameEn: body.nameEn,
        description: body.description,
        price: Number(body.price),
        category: body.category,
        image: body.image,
      })
      .returning();

    return NextResponse.json(newItem[0]);
  } catch (error) {
    console.error("Create menu item error:", error);

    return NextResponse.json(
      { error: "Failed to create menu item" },
      { status: 500 }
    );
  }
}
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));

    await db
      .delete(menuItems)
      .where(eq(menuItems.id, id));

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Delete menu item error:", error);

    return NextResponse.json(
      { error: "Failed to delete menu item" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));

    const body = await req.json();

    await db
      .update(menuItems)
      .set({
        name: body.name,
        nameEn: body.nameEn,
        description: body.description,
        price: body.price,
        category: body.category,
        image: body.image,
      })
      .where(eq(menuItems.id, id));

    const updated = await db
      .select()
      .from(menuItems)
      .where(eq(menuItems.id, id));

    return NextResponse.json(updated[0]);

  } catch (error) {
    console.error("Update menu item error:", error);

    return NextResponse.json(
      { error: "Failed to update menu item" },
      { status: 500 }
    );
  }
}