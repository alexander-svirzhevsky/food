import { Await, useLoaderData } from "react-router-dom";
import { ProductI } from "../../interfaces/product.interface";
import { Suspense } from "react";

const Product = () => {
  const data = useLoaderData() as { data: ProductI };

  return (
    <Suspense fallback={<>Loading...</>}>
      <Await resolve={data.data} errorElement={<>Error</>}>
        {({ data }: { data: ProductI }) => <>Product - {data.name}</>}
      </Await>
    </Suspense>
  );
};

export default Product;
