
import { productByCategory } from "@/app/services/product";
import CommonListing from "@/components/CommonListing";

export default async function WomenAllProduct() {
  const getAllProducts = await productByCategory("mulher");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
