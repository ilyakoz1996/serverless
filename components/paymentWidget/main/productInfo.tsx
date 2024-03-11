import { Skeleton } from "@/components/ui/skeleton";
import { BoxIcon, ListIcon, Settings2Icon } from "lucide-react";
import { useWidgetContext } from "../widget-provider";

export default function ProductInfo() {

  const {product} = useWidgetContext()

  const renderImage = () => (
    <img
      src={product.data?.img}
      className="w-16 min-w-[64px] min-h-[64px] h-16 rounded-md"
      alt={product.data?.title}
    />
  );

  const renderContent = () => (
    <div className="flex flex-col items-start w-full">
      <div className="flex items-center justify-between w-full">
        <p className="text-neutral-300 font-bold text-xl line-clamp-1 max-w-[220px]">
          {product.data?.title!}
        </p>
        {product.data?.priceType === "fixed" ? (
          <p className="text-neutral-300 font-bold text-xl">
            {product.data?.price + " $"}
          </p>
        ) : (
          <div className="flex space-x-2 items-center text-neutral-500 text-xs">
            <Settings2Icon className="w-4 h-4" /> <p>Optional price</p>
          </div>
        )}
      </div>
      <p className="text-neutral-500 text-sm mt-1 line-clamp-2 max-w-[220px]">
        {product.data?.about!}
      </p>
    </div>
  );

  return (
    <div className="flex flex-col w-full h-full border-b border-zinc-700/50">
      <div className="flex space-x-2 items-center">
        <BoxIcon className="w-4 h-4" />
        <p className="font-bold text-xl text-neutral-300">Product info</p>
      </div>
      <div className="flex space-x-4 items-start px-4 mt-4 bg-zinc-900 py-4 rounded">
        {product.isLoading || !product.data ? (
          <Skeleton className="w-16 min-w-[64px] min-h-[64px] h-16 rounded-md" />
        ) : (
          renderImage()
        )}
        {product.isLoading || !product.data ? (
          <div className="flex flex-col w-full">
            <div className="flex w-full justify-between pb-2">
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-12 h-4" />
            </div>
            <Skeleton className="w-[220px] h-4 mt-2" />
            <Skeleton className="w-[220px] h-4 mt-2" />
            <Skeleton className="w-[220px] h-4 mt-2" />
          </div>
        ) : (
          renderContent()
        )}
      </div>
      {product.data?.fields && product.data?.fields.length > 0 && 
          <div className="flex flex-col mt-4">
            <div className="flex space-x-2 items-center">
              <ListIcon className="w-4 h-4" />
              <p className="font-bold text-neutral-300">Required fields</p>
            </div>
            <div className="flex flex-col pl-2 mt-1">
              {product.data.fields.map((field: string) => {
                return (
                  <p key={field} className="text-sm text-neutral-500">
                    - {field}
                  </p>
                )
              })}
            </div>
          </div>
          }
    </div>
  );
}
