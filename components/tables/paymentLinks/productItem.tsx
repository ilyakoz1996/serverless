import { useGetProduct } from "@/core/hooks/products";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductItem({ productId }: { productId?: string }) {


    const {data: product, isLoading} = useGetProduct(productId!);

    console.log('search product', productId)

    if (isLoading) {
        return (
            <div className="flex space-x-2 items-center">
            <Skeleton className="w-8 h-8 rounded" />
            <div className="flex flex-col">
              <div className="flex items-center">
                <Skeleton className="w-24 h-4 ml-2" />
              </div>
            <Skeleton className="w-[180px] h-3 mt-1 ml-2" />
            </div>
          </div>
        )
    } else if (!isLoading) {
        return (
          <>
          {product ? <Link href={`/products?id=${product.id}`}>
            <div className="flex space-x-4 items-center">
              <img src={product.img} className="w-8 h-8 rounded object-cover" />
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="max-w-[260px] text-sm truncate font-bold">
                    {product.title}
                  </span>
                </div>
                <span className="max-w-[400px] text-xs line-clamp-1 text-neutral-500">
                  {product.about}
                </span>
              </div>
            </div>
          </Link> 
          :       
          <div className="flex space-x-4 items-center">
      <p className="text-2xl w-8 h-8 text-center">⚡️</p>
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="max-w-[260px] text-sm truncate font-bold">
            Quick invoice
          </span>
        </div>
        <span className="max-w-[400px] text-xs line-clamp-1 text-neutral-500">
          No description
        </span>
      </div>
    </div>}
          </>
        );
    }
  }
