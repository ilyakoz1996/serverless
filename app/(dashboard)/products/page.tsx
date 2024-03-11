"use client";

import React, { useState } from "react";
import { useDeleteProduct, useGetProductsByProjectId } from "@/core/hooks/products";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight, Delete, Edit } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/productCard";
import EditProduct from "@/components/forms/editProduct";
import nProgress from "@/lib/nprogress";
import nprogress from "@/lib/nprogress";
import { DataTable } from "@/components/tables/products/data-table";
import { columns } from "@/components/tables/products/columns";
import { Skeleton } from "@/components/ui/skeleton";
import {motion} from 'framer-motion'
import LStorage from "@/core/localStorage";

export default function ProductsPage() {

  const router = useRouter();
  const storage = new LStorage();

  const project = storage.projects.getProject();

  const products = useGetProductsByProjectId(
    project?.id!
  );

  console.log('products', products)

  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const edit = searchParams.get("edit");

  const product = products.data?.find((product: any) => product?.id === productId);

  const {mutateAsync} = useDeleteProduct()

  const [deleting, setDeleting] = useState<boolean>(false)

  return (
    <motion.div 
    key="products"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col mt-4">
      <div className="flex space-x-2 items-center">
        {!productId ? (
          <h1 className="font-bold text-2xl">Products</h1>
        ) : (
          <>
            <Link href="/products" onClick={() => nProgress.start()}>
              <h1 className="font-bold text-2xl text-neutral-500 hover:text-neutral-300 transition-all">
                Products
              </h1>
            </Link>
            <ChevronRight className="h-4 w-4 text-neutral-500" />
            <h1 className="font-bold text-2xl pr-4">{product?.title}</h1>
            {!edit ? (
              <Button
                className="h-8"
                variant="outline"
                onClick={() =>
                  {   nProgress.start()
                    router.push(`/products?id=${productId}&edit=true`)}
                }
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            ) : (
              <Button
              className="h-8"
              variant="outline"
              onClick={async () => {
                if (confirm("Are you sure want to delete the product?")) {
                  setDeleting(true)
                  nprogress.start()
                  await mutateAsync(product?.id!)
                  nprogress.done()
                  setDeleting(false)
                  nProgress.start()
                  router.push('/products')
                }
              }
              }
            >
              <Delete className="h-4 w-4 mr-2" />
              Delete
            </Button>
            )}
          </>
        )}
      </div>
      {!productId ? (
        // Products List
          <>
          {products.data && <DataTable data={products.data} columns={columns} />}

          {products.isLoading && (
            <div className="w-full flex flex-col justify-center mt-8">
              <div className="flex flex-col w-full">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <Skeleton className="w-64 h-6 rounded" />
                    <Skeleton className="w-32 h-6 rounded" />
                    <Skeleton className="w-32 h-6 rounded" />
                  </div>
                  <Skeleton className="w-24 h-8 rounded" />
                </div>
                <div className="flex flex-col mt-4 border rounded p-2">
                  <div className="flex items-center">
                  <Skeleton className="w-6 h-6 min-w-[24px] min-h-[24px] rounded mr-12 ml-4" />
                  <Skeleton className="w-44 h-6 rounded mr-96" />
                  <Skeleton className="w-24 h-6 rounded mr-12" />
                  <Skeleton className="w-24 h-6 rounded mr-12" />
                  </div>
                </div>
                <div className="flex flex-col border rounded px-2">
                  <div className="flex items-center border-b py-4">
                  <Skeleton className="w-6 h-6 min-w-[24px] min-h-[24px] rounded mr-12 ml-4" />
                    <Skeleton className="w-8 h-8 min-w-[32px] min-h-[32px] rounded mr-4" />
                    <div className="flex flex-col w-full space-y-2 mr-12">
                      <Skeleton className="w-44 h-4 rounded" />
                      <Skeleton className="w-80 h-4 rounded" />
                    </div>
                    <div className="flex w-full">
                      <Skeleton className="w-24 h-6 rounded ml-12" />
                      <Skeleton className="w-24 h-6 rounded ml-12" />
                      <Skeleton className="w-8 h-6 rounded ml-16" />
                    </div>
                  </div>
                  <div className="flex items-center border-b py-4">
                  <Skeleton className="w-6 h-6 min-w-[24px] min-h-[24px] rounded mr-12 ml-4" />
                    <Skeleton className="w-8 h-8 min-w-[32px] min-h-[32px] rounded mr-4" />
                    <div className="flex flex-col w-full space-y-2 mr-12">
                      <Skeleton className="w-44 h-4 rounded" />
                      <Skeleton className="w-80 h-4 rounded" />
                    </div>
                    <div className="flex w-full">
                      <Skeleton className="w-24 h-6 rounded ml-12" />
                      <Skeleton className="w-24 h-6 rounded ml-12" />
                      <Skeleton className="w-8 h-6 rounded ml-16" />
                    </div>
                  </div>
                  <div className="flex items-center border-b py-4">
                  <Skeleton className="w-6 h-6 min-w-[24px] min-h-[24px] rounded mr-12 ml-4" />
                    <Skeleton className="w-8 h-8 min-w-[32px] min-h-[32px] rounded mr-4" />
                    <div className="flex flex-col w-full space-y-2 mr-12">
                      <Skeleton className="w-44 h-4 rounded" />
                      <Skeleton className="w-80 h-4 rounded" />
                    </div>
                    <div className="flex w-full">
                      <Skeleton className="w-24 h-6 rounded ml-12" />
                      <Skeleton className="w-24 h-6 rounded ml-12" />
                      <Skeleton className="w-8 h-6 rounded ml-16" />
                    </div>
                  </div>
                  <div className="flex items-center border-b py-4">
                  <Skeleton className="w-6 h-6 min-w-[24px] min-h-[24px] rounded mr-12 ml-4" />
                    <Skeleton className="w-8 h-8 min-w-[32px] min-h-[32px] rounded mr-4" />
                    <div className="flex flex-col w-full space-y-2 mr-12">
                      <Skeleton className="w-44 h-4 rounded" />
                      <Skeleton className="w-80 h-4 rounded" />
                    </div>
                    <div className="flex w-full">
                      <Skeleton className="w-24 h-6 rounded ml-12" />
                      <Skeleton className="w-24 h-6 rounded ml-12" />
                      <Skeleton className="w-8 h-6 rounded ml-16" />
                    </div>
                  </div>
                  <div className="flex items-center border-b py-4">
                  <Skeleton className="w-6 h-6 min-w-[24px] min-h-[24px] rounded mr-12 ml-4" />
                    <Skeleton className="w-8 h-8 min-w-[32px] min-h-[32px] rounded mr-4" />
                    <div className="flex flex-col w-full space-y-2 mr-12">
                      <Skeleton className="w-44 h-4 rounded" />
                      <Skeleton className="w-80 h-4 rounded" />
                    </div>
                    <div className="flex w-full">
                      <Skeleton className="w-24 h-6 rounded ml-12" />
                      <Skeleton className="w-24 h-6 rounded ml-12" />
                      <Skeleton className="w-8 h-6 rounded ml-16" />
                    </div>
                  </div>
                  <div className="flex items-center border-b py-4">
                  <Skeleton className="w-6 h-6 min-w-[24px] min-h-[24px] rounded mr-12 ml-4" />
                    <Skeleton className="w-8 h-8 min-w-[32px] min-h-[32px] rounded mr-4" />
                    <div className="flex flex-col w-full space-y-2 mr-12">
                      <Skeleton className="w-44 h-4 rounded" />
                      <Skeleton className="w-80 h-4 rounded" />
                    </div>
                    <div className="flex w-full">
                      <Skeleton className="w-24 h-6 rounded ml-12" />
                      <Skeleton className="w-24 h-6 rounded ml-12" />
                      <Skeleton className="w-8 h-6 rounded ml-16" />
                    </div>
                  </div>
                  <div className="flex items-center border-b py-4">
                  <Skeleton className="w-6 h-6 min-w-[24px] min-h-[24px] rounded mr-12 ml-4" />
                    <Skeleton className="w-8 h-8 min-w-[32px] min-h-[32px] rounded mr-4" />
                    <div className="flex flex-col w-full space-y-2 mr-12">
                      <Skeleton className="w-44 h-4 rounded" />
                      <Skeleton className="w-80 h-4 rounded" />
                    </div>
                    <div className="flex w-full">
                      <Skeleton className="w-24 h-6 rounded ml-12" />
                      <Skeleton className="w-24 h-6 rounded ml-12" />
                      <Skeleton className="w-8 h-6 rounded ml-16" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <Skeleton className="w-44 h-6 rounded" />
                <div className="flex items-center">
                  <Skeleton className="w-64 h-6 rounded" />
                  <Skeleton className="w-24 h-6 rounded ml-8" />
                  <Skeleton className="w-44 h-6 rounded ml-8" />
                </div>
              </div>
            </div>
          )}
          </>
      ) : (
        // Product Card
        <div className="flex flex-col w-full mt-8">
          {!product ? (
            <p>Loading...</p>
          ) : !edit ? (
            // Product Card
            <ProductCard product={product} />
          ) : (
            // Edit Product Card
            <EditProduct product={product} deleting={deleting} />
          )}
        </div>
      )}
    </motion.div>
  );
}
