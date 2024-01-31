import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    console.log('passo 0  ')
    await connectToDB();
    console.log('passo 1  ')


    const isAuthUser = await AuthUser(req);
    console.log('passo 2  ')
    if (isAuthUser) {
      console.log('passo 3  ')
      const { searchParams } = new URL(req.url);
      console.log('passo 4  ')
      const id = searchParams.get("id");
      console.log('passo 5  ')
      if (!id)
        return NextResponse.json({
          success: false,
          message: "Por favor, faça o login!",
        });
        console.log('passo 6  ')

          const extractAllCartItems = await Cart.find({ userID: id }).populate(
            "productID"
          );
      
      console.log('passo 7  ')
      if (extractAllCartItems) {
        console.log('passo 8  ')
        return NextResponse.json({ success: true, data: extractAllCartItems });
      } else {
        console.log('passo 9 ')
        return NextResponse.json({
          success: false,
          message: "Não foram encontrados itens no carrinho!",
          status: 204,
        });
      }
    } else {
      console.log('passo 10  ')

      return NextResponse.json({
        success: false,
        message: "Não está autenticado",
      });
    }

  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Algo correu mal! Por favor, tente novamente",
    });
  }
}
