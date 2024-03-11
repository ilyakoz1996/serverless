"use client";

import React, { useState } from "react";
import { useDeleteProduct } from "@/core/hooks/products";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import nProgress from "@/lib/nprogress";
import { columns } from "@/components/tables/paymentLinks/columns";
import { Skeleton } from "@/components/ui/skeleton";
import {motion} from 'framer-motion'
import LStorage from "@/core/localStorage";
import { useGetPaymentLinksByProjectId } from "@/core/hooks/paymentLinks";
import { InvoicesDataTable } from "@/components/tables/paymentLinks/data-table";
import PaymentLinkCard from "@/components/ui/paymentLinkCard";
import { IPaymentLink } from "@/core/types";

export default function PaymentsPage() {

  const router = useRouter();
  const storage = new LStorage();

  const project = storage.projects.getProject();

  const paymentLinks = useGetPaymentLinksByProjectId(
    project?.id!
  );

  console.log("paymentLinks", paymentLinks.data)

  const searchParams = useSearchParams();
  const paymentLinkId = searchParams.get("id");

  const paymentLink = paymentLinks.data?.sort((a: any, b: any) => {
    const adate = new Date(a.updatedAt!)
    const bdate = new Date(b.updatedAt!)
    return Number(bdate) - Number(adate)
  }).find((paymentLink: IPaymentLink) => paymentLink.id === paymentLinkId);

  const {mutateAsync} = useDeleteProduct()

  const [deleting, setDeleting] = useState<boolean>(false)

  return (
    <motion.div 
    key="payments"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col mt-4">
      <div className="flex space-x-2 items-center">
        {!paymentLinkId ? (
          <h1 className="font-bold text-2xl">Payment Links</h1>
        ) : (
          <>
            <Link href="/payments" onClick={() => nProgress.start()}>
              <h1 className="font-bold text-2xl text-neutral-500 hover:text-neutral-300 transition-all">
                Payment Links
              </h1>
            </Link>
            <ChevronRight className="h-4 w-4 text-neutral-500" />
            <h1 className="font-bold text-sm text-neutral-300 pt-1 pr-4">{paymentLink?.id}</h1>
          </>
        )}
      </div>
      {!paymentLinkId ? (
        // Invoices List
          <>
          {paymentLinks.data && <InvoicesDataTable data={paymentLinks.data} columns={columns} />}

          {paymentLinks.isLoading && (
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
          {!paymentLink ? 
            <p>Loading...</p>
          : 
            // paymentLink Card
            <PaymentLinkCard paymentLink={paymentLink!} />
          }
        </div>
      )}
    </motion.div>
  );
}
