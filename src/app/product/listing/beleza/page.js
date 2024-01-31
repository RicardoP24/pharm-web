
import { productByCategory } from "@/app/services/product";
import CommonListing from "@/components/CommonListing";

export default async function BeautyAllProduct() {
  const getAllProducts = await productByCategory('beleza');

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
