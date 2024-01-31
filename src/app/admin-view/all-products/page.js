import { getAllAdminProducts } from "@/app/services/product";
import CommonListing from "@/components/CommonListing";


export default async function AdminAllProducts(){

    const allAdminProducts = await getAllAdminProducts();

    return <CommonListing data={allAdminProducts && allAdminProducts.data}/>
}