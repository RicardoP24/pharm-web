import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser?.role === "admin") {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id)
        return NextResponse.json({
          success: false,
          message: "É necessário o ID do produto",
        });

      const deletedProduct = await Product.findByIdAndDelete(id);

      if (deletedProduct) {
        return NextResponse.json({
          success: true,
          message: "Produto eliminado com sucesso",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Falha ao eliminar o produto! Por favor, tente novamente",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Não está autenticado",
      });
    }
  } catch (e) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Algo correu mal! Por favor, tente novamente mais tarde",
    });
  }
}
