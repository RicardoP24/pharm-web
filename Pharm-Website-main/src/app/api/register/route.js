import connectToDB from "@/database";
import User from "@/models/user"; 
import { hash } from "bcrypt";
import Joi from "joi";
import { NextResponse } from "next/server";

// Define um esquema de validação usando a biblioteca Joi.
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  nif: Joi.number().min(9).required(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectToDB();

  const { name, email, password, role, nif } = await req.json();

  // Valida os dados de entrada com o esquema definido anteriormente.
  const { error } = schema.validate({ name, email, password, role, nif });

  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message, // Ajustei para acessar a mensagem de erro corretamente.
    });
  }

  try {
    // Verifica se o usuário já existe com base no número de identificação fiscal (NIF).
    const userExist = await User.findOne({ nif });

    if (userExist) {
      return NextResponse.json({
        success: false,
        message: "NIF já existente",
      });
    } else {
      const hashPassword = await hash(password, 12);

      // Cria um novo usuário com os dados fornecidos.
      const newUser = await User.create({
        name,
        email,
        nif,
        password: hashPassword,
        role,
      });

      if (newUser) {
        return NextResponse.json({
          success: true,
          message: "Criado com sucesso",
        });
      }
    }
  } catch (error) {
    console.log("Erro no registro");
    return NextResponse.json({
      success: false,
      message: "Algo está errado, tente novamente mais tarde",
    });
  }
}
