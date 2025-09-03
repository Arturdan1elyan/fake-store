import {EditProduct} from "@/components/EditProduct";


type Params = {
  params: Promise<{id: string}>
}

export default async function page({ params }: Params) {
  
  const { id } = await params;

  return (
    <div>
      <h1>Edit Page</h1>
      <EditProduct id={id } />
    </div>
  )
}
