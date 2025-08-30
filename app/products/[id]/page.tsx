import { ProductDetail } from "@/components/ProductDetail";

type Params = {
    params: Promise<{id: string}>
}


export default async function ProductPage({params}: Params) {
   
    const { id } = await params;

    return (
        <div>
            <h1>Product Page {id }</h1>
            <ProductDetail id={ id } />
        </div>
  )
}

