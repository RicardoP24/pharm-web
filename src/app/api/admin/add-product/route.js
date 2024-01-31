import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import Joi from "joi";
import { NextResponse } from "next/server";


const addNewProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  size: Joi.string().required(),
  deliveryInfo: Joi.string().required(),
  onSale: Joi.string().required(),
  imageUrl: Joi.string().required(),
  priceDrop: Joi.number().required(),
  modoDeUso: Joi.string().required(),
  conservacao: Joi.string().required(),
  stock: Joi.number().integer().min(1).required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();

    const isAuthUser = await AuthUser(req)
    console.log(isAuthUser , 'osmar');

    if (isAuthUser?.role === "admin") {
      const extractData = await req.json();

      const {
        name,
        price,
        description,
        category,
        size,
        deliveryInfo,
        onSale,
        imageUrl,
        priceDrop,
        modoDeUso,
        conservacao,
        stock,
      } = extractData;

      const { error } = addNewProductSchema.validate({
        name,
        price,
        description,
        category,
        size,
        deliveryInfo,
        onSale,
        imageUrl,
        priceDrop,
        modoDeUso,
        conservacao,
        stock
    });
      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newCreatedProduct = await Product.create(extractData);

      if (newCreatedProduct) {
        return NextResponse.json({
          success: true,
          message: " produto adicionado com sucesso",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: " Erro ao inserir o produto",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Não esta autorizado",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Algo está errado, tente novamente mais tarde",
    });
  }
}
