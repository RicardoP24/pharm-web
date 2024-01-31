import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();
      const { user } = data;

      const saveNewOrder = await Order.create(data);

      if (saveNewOrder) {
        await Cart.deleteMany({ userID: user });

        return NextResponse.json({
          success: true,
          message: "Os produtos estão a caminho!",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Falha ao criar o pedido! Por favor, tente novamente",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Você não está autenticado",
      });
    }
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Algo deu errado! Por favor, tente novamente mais tarde",
    });
  }
}
