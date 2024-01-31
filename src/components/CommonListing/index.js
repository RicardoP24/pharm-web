"use client";

import { usePathname, useRouter } from "next/navigation";
import ProductButton from "./ProductButtons";
import { useEffect } from "react";
import Notification from "../Notifications";
import ProductTile from "./ProductTile/Index";

export default function CommonListing({ data }) {
  const router = useRouter();

  const pathName = usePathname();

  useEffect(() => {
    router.refresh();
  }, []);

  const isAdminView = pathName.includes("admin-view");

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-24">
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
          {data && data.length
            ? data.map((item) => (
                <article
                  className="relative flex flex-col overflow-hidden cursor-pointer"
                  key={item._id}
                >
                  <ProductTile item={item} isAdminView={isAdminView}/>
                  <ProductButton item={item} />
                </article>
              ))
            : null}
        </div>
      </div>
      <Notification />
    </section>
  );
}
