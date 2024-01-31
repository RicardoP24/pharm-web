"use client";

import { GlobalContext } from "@/context";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../Loader/componentlevel";
import { addToCart } from "@/app/services/cart";
import Notification from "../Notifications";

export default  function CommonDetails({ item }) {

  const {
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    setShowCartModal,
  } = useContext(GlobalContext);

  const [activeContent, setActiveContent] = useState("description");

  async function handleAddToCart(getItem) {
    setComponentLevelLoader({ loading: true, id: "" });

    const res = await addToCart({ productID: getItem._id, userID: user._id });

    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    }
  }

  return (
    <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto px-4">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-24 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <img
                    src={item.imageUrl}
                    className="h-full w-full max-w-full object-cover"
                    alt="Product Details"
                  />
                </div>
              </div>
              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 text-center"
                  >
                    <img
                      src={item.imageUrl}
                      className="h-full w-full object-cover"
                      alt="Product Details"
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 text-center"
                  >
                    <img
                      src={item.imageUrl}
                      className="h-full w-full object-cover"
                      alt="Product Details"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {item && item.name}
            </h1>
            <div className="mt-10 flex flex-col items-center justify-between space-y-4 botder-t border-b py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-end">
                <h1
                  className={`text-3xl font-bold mr-2 ${
                    item.onSale === "sim" ? "line-through" : ""
                  }`}
                >
                  {item && item.price}€
                </h1>
                {item.onSale === "sim" ? (
                  <h1 className="text-3xl font-bold text-red-700">{`${(
                    item.price -
                    item.price * (item.priceDrop / 100)
                  ).toFixed(2)}€`}</h1>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => handleAddToCart(item)}
                className="mt-1.5 inline-block bg-green-500 px-5 py-3 text-xs font-medium tracking-wide uppercase text-white rounded-lg"
              >
                {componentLevelLoader && componentLevelLoader.loading ? (
                  <ComponentLevelLoader
                    text={"A adicionar ao carrinho"}
                    color={"#ffffff"}
                    loading={
                      componentLevelLoader && componentLevelLoader.loading
                    }
                  />
                ) : (
                  "Adicionar ao carrinho"
                )}
              </button>
            </div>
            <ul className="mt-8 space-y-2">
              <li className="flex items-center text-left text-base font-medium text-gray-600">
                {item && item.deliveryInfo}
              </li>
              <li className="mt-8 flex flex-col items-center space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                {item.stock > 0 ? (
                  <p className="text-green-500">Em Stock</p>
                ) : (
                  <p className="text-red-500">Sem Stock</p>
                )}
              </li>
            </ul>
            <div className="lg:col-span-3">
              <div className="border-b border-gray-400">
                <nav className="flex gap-4">
                  <a
                    href="#"
                    className={`border-b-2 ${
                      activeContent === "description"
                        ? "border-green-500"
                        : "border-transparent"
                    } py-4 text-sm font-medium text-gray-900 hover:border-green-500 focus:outline-none focus:border-green-500 transition-all duration-300`}
                    onClick={() => setActiveContent("description")}
                  >
                    Descrição
                  </a>
                  <a
                    href="#"
                    className={`border-b-2 ${
                      activeContent === "modoDeUso"
                        ? "border-green-500"
                        : "border-transparent"
                    } py-4 text-sm font-medium text-gray-900 hover:border-green-500 focus:outline-none focus:border-green-500 transition-all duration-300`}
                    onClick={() => setActiveContent("modoDeUso")}
                  >
                    Modo de utilização e Precauções
                  </a>
                  <a
                    href="#"
                    className={`border-b-2 ${
                      activeContent === "conservacao"
                        ? "border-green-500"
                        : "border-transparent"
                    } py-4 text-sm font-medium text-gray-900 hover:border-green-500 focus:outline-none focus:border-green-500 transition-all duration-300`}
                    onClick={() => setActiveContent("conservacao")}
                  >
                    Conservação
                  </a>
                </nav>
              </div>
              <div className="mt-8 flow-root sm:mt-12">
                {activeContent === "description"
                  ? item && item.description
                  : activeContent === "modoDeUso"
                  ? item && item.modoDeUso
                  : item && item.conservacao}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
