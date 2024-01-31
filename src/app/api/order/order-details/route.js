import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id)
        return NextResponse.json({
          success: false,
          message: "O ID do produto é obrigatório",
        });

      const extractOrderDetails = await Order.findById(id).populate(
        "orderItems.product"
      );

      if (extractOrderDetails) {
        return NextResponse.json({
          success: true,
          data: extractOrderDetails,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Falha ao obter os detalhes do pedido! Por favor, tente novamente",
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
