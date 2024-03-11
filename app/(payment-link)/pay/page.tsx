'use client'
import Image from "next/image";
import {
  ShieldCheckIcon,
} from "lucide-react";
import Widget from "@/components/paymentWidget/widget";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentLinkPage() {

  const params = useSearchParams()

  const id = params.get('id')

  return (
    <div className="relative flex flex-col w-full min-hd-screen items-center justify-end">
      <header className=" absolute top-0 flex justify-between items-center px-4 lg:px-80 w-full py-4">
        <div className="flex space-x-4 items-center">
          <img
            className=" z-10 w-12 h-12 border border-zinc-700 rounded-xl object-cover"
            alt="processing logo"
            width={48}
            height={48}
            src="https://www.roundpointmortgage.com/dist/assets/img/icons/Pay_Icon.png"
          />
          <h1 className="font-bold text-2xl">Pay</h1>
        </div>
        <div className="flex space-x-4 items-center">
          <p className="font-bold text-green-400 text-xs">256-bit secure payments</p>
            <ShieldCheckIcon className="h-4 w-4 lg:w-6 lg:h-6 text-green-400" />
        </div>
      </header>
      <Suspense fallback={<p>Loading...</p>}>
        {id ? <Widget id={id} /> : <p>Invalid invoice id</p>}
      </Suspense>
    </div>
  );
}
