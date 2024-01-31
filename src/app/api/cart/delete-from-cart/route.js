import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);
    if (isAuthUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      if (!id)
        return NextResponse.json({
          success: false,
          message: "O ID do item do carrinho é obrigatório",
        });

      const deleteCartItem = await Cart.findByIdAndDelete(id);

      if (deleteCartItem) {
        return NextResponse.json({
          success: true,
          message: "Item do carrinho excluído com sucesso",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Falha ao excluir o item do carrinho! Por favor, tente novamente.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Não está autenticado",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Algo correu mal! Por favor, tente novamente",
    });
  }
}
