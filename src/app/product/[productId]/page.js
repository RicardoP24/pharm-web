import CommonDetails from "@/components/CommonDetails";
import { productById } from "@/app/services/product";

export default async function ProductDetails({ params }) {
   
  const productDetailsData = await productById(params.productId);
  // const router = useRouter();
  // const { productId } = router.query;

  


  return <CommonDetails item={productDetailsData && productDetailsData.data} />;
}