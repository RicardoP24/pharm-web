import { getAllAdminProducts } from "@/app/services/product";
import CommonListing from "@/components/CommonListing";

export default async function allProducts() {
  const getAllProducts = await getAllAdminProducts();

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
