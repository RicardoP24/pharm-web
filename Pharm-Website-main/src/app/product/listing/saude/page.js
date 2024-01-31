import { productByCategory } from "@/app/services/product";
import CommonListing from "@/components/CommonListing";

export default async function HealthAllProduct() {
    const getAllProducts = await productByCategory('saude');

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}