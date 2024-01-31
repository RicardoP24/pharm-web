"use client";

import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/app/services/product";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import saudei from "@/components/img/img1.jpg";
import man from "@/components/img/img2.jpg";
import woman from "@/components/img/img3.jpg";
import bela from "@/components/img/img4.jpg";
import Slider from "@/components/slider";
import "bootstrap/dist/css/bootstrap.min.css";
import ban from "@/components/img/pharmacy_banner.png";

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  async function getListOfProducts() {
    try {
      const res = await getAllAdminProducts();

      if (res.success) {
        setProducts(res.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    getListOfProducts();
  }, []);

  const ProductCard = ({ product }) => (
    <div className="p-4 border border-gray-300 rounded-lg cursor-pointer">
      {product.imageUrl && (
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="object-cover w-full h-36 rounded-full mb-4"
          onClick={() => router.push(`/product/${product._id}`)}
        />
      )}
      <p className="text-lg font-medium mb-2">{product.name}</p>
      {product.description && (
        <p className="text-gray-500">{product.description}</p>
      )}
      {product.price !== undefined && (
        <p className="text-green-500 mt-2">{`€${product.price.toFixed(2)}`}</p>
      )}
    </div>
  );
  

  const categories = [
    { name: "SAUDE", image: saudei },
    { name: "MULHER", image: woman },
    { name: "HOMEM", image: man },
    { name: "BELEZA", image: bela },
  ];

  const CategoryItem = ({ category }) => (
    <li key={category.name}>
      <div className="relative group overflow-hidden rounded-full">
        <Image
          src={category.image}
          alt={category.name}
          width={120}
          height={120}
          className="object-cover w-full h-36 rounded-full"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          <h3 className="text-lg font-medium text-white">{category.name}</h3>
          <button
            onClick={() =>
              router.push(`/product/listing/${category.name.toLowerCase()}`)
            }
            className="mt-1.5 inline-block bg-green-500 px-3 py-1.5 text-sm uppercase tracking-wide text-white hover:bg-green-600 rounded-full"
          >
            Comprar
          </button>
        </div>
      </div>
    </li>
  );

  console.log(products,"nmasklfafnmlkf")

  return (
    <main className="flex min-h-screen flex-col items-center sm:p-16 bg-gray-100 mt-20">
      <Slider />
      <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-6">Destaques</h2>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 gap-4 lg:grid-cols-4 justify-center items-center">
          {products.slice(0, 4).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </section>
      <section className="mt-12">
        <Image src={ban} className=" rounded-3xl" />
      </section>
      <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-6">Sugestões</h2>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 gap-4 lg:grid-cols-4 justify-center items-center">
          {products.slice(4, 8).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </section>
      <section className="mt-12">
        <Image src={ban} className=" rounded-3xl" />
      </section>
      <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-6">Em Tendência</h2>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 gap-4 lg:grid-cols-4 justify-center items-center">
          {products.slice(8, 12).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </section>

      <footer className="mt-16 p-8 bg-gray-800 text-white">
        <div className="flex justify-center space-x-8">
          <div>
            <p className="text-lg font-semibold mb-4">Apoio ao Cliente</p>
            <ul className="text-sm">
              <li>Contactos</li>
              <li>FAQ's: Perguntas Frequentes</li>
            </ul>
          </div>
        </div>
        <p className="text-sm mt-8">
          © 2023 Farmácia Lobo. Todos os medicamentos expostos são a título de
          catálogo. Autorizado a disponibilizar MNSRM e MSRM mediante receita
          médica, através da Internet, pelo Infarmed.
        </p>
      </footer>
    </main>
  );
}
