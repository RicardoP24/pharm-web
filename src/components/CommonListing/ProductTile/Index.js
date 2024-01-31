"use client";

import { useRouter } from "next/navigation";

export default function ProductTile({ item, isAdminView }) {
  const stock = item.stock || 0;
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/product/${item._id}`)}
      className="relative overflow-hidden transition-transform transform hover:scale-105 cursor-pointer border border-gray-300 rounded-md shadow-md"
    >
      <div className="aspect-w-1 aspect-h-1 h-52">
        <img
          src={item.imageUrl}
          alt="Product image"
          className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125 rounded-t-md"
        />
        {item.onSale === "sim" && (
          <div className="absolute top-2 left-2 bg-red-500 text-white p-1 rounded-full">
            <p className="text-xs font-bold uppercase tracking-wide">Promoção</p>
          </div>
        )}
      </div>
      <div className="p-4 bg-white rounded-b-md">
        <div className="flex items-center justify-between">
          <div>
            <p
              className={`text-lg font-semibold ${
                item.onSale === "sim" ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {`${item.price}€`}
            </p>
            {item.onSale === "sim" && (
              <p className="text-sm font-semibold text-red-700">{` ${(
                item.price - item.price * (item.priceDrop / 100)
              ).toFixed(2)}€`}</p>
            )}
          </div>
          {item.onSale === "sim" && (
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
              <p className="text-xs font-semibold">{`-${item.priceDrop}% off`}</p>
            </div>
          )}
        </div>
        <h3 className="text-gray-700 text-sm mt-2">{item.name}</h3>
        {isAdminView && (
          <div className={`absolute bottom-0 right-0 p-2 bg-white font-bold`}>
            Stock: {stock}
          </div>
        )}
      </div>
    </div>
  );
}
