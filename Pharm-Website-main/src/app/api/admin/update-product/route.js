import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();

    const isAuthUser = await AuthUser(req);

    if (isAuthUser?.role === "admin") {
      const extractData = await req.json();
      const {
        _id,
        name,
        price,
        description,
        category,
        size,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
        modoDeUso,
        conservacao
      } = extractData;

      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: _id,
        },
        {
          name,
          price,
          description,
          category,
          size,
          deliveryInfo,
          onSale,
          priceDrop,
          imageUrl,
          modoDeUso,
          conservacao,
        },
        { new: true }
      );

      if (updatedProduct) {
        return NextResponse.json({
          success: true,
          message: "Produto atualizado com sucesso",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Falha ao atualizar o produto! Por favor, tente novamente mais tarde",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Não está autenticado",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Algo correu mal! Por favor, tente novamente mais tarde",
    });
  }
}
