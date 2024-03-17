import { ArrowLeftCircleIcon, ClipboardIcon } from "lucide-react";
import QRCode from "react-qr-code";
import { useWidgetContext } from "../widget-provider";
import { useGetPaymentLinkById } from "@/core/hooks/paymentLinks";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetToken } from "@/core/hooks/tokens";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { IPaymentLink, IToken } from "@/core/types";
import { useSearchParams } from "next/navigation";
import API from "@/core/api";
import { toast } from "sonner";
import Db3 from 'decentralized-database'

export default function WidgetPaymentPage() {

  const {paymentLink, setStep, setPaymentLink, token, setToken, invoice, setInvoice} = useWidgetContext()

  const db3 = new Db3()
  const api = new API()

  const getInvoice = async (invoiceId: string) => {
    const invoice = await db3.getInvoiceById(invoiceId)
    const token = await api.tokens.getToken(Number(invoice.tokenId))
    setInvoice(invoice)
    setToken(token)
  }

  useEffect(() => {
    if (paymentLink.data?.invoiceId) {
      getInvoice(paymentLink.data?.invoiceId)
    }
  }, [paymentLink.data?.invoiceId])

  const handleIssued = (data: any) => {
    console.log('EVENT DATA!', data)
    if (data.invoiceId === paymentLink.data.invoiceId) {
      setPaymentLink((prev: any) => {
        return {...prev, data: {...prev.data, invoiceId: data.invoiceId}}
      })
      setInvoice(data)
    }
  }
  const handleProcessing = (data: any) => {
    console.log('EVENT DATA!', data)
    if (data.invoiceId === paymentLink.data.invoiceId) {
      setPaymentLink((prev: any) => {
        return {...prev, data: {...prev.data, invoiceId: data.invoiceId}}
      })
      setInvoice(data)
      setStep("processing")
    }
  }

  useEffect(() => {
    db3.on('InvoiceIssued', handleIssued)
    db3.on('InvoiceProcessing', handleProcessing)
  }, [])

  console.log('invoice invoice invoice', invoice)

  const isMediumDevice = useMediaQuery("only screen and (min-width : 769px)");
  
  return (
    <div className="flex flex-col w-full px-4 py-3 h-full">
      <div className="relative flex flex-col justify-between h-full pt-2 pb-2 lg:pt-4 lg:pb-4">
        <div className="w-full h-full lg:h-64 flex items-center justify-center my-2 lg:my-4">
            <div className="relative flex items-center justify-center bg-black rounded-xl p-4">

              {invoice === null ? <Skeleton className="w-44 h-44 lg:w-56 lg:h-56" /> :
              <div className="relative">
             {invoice !== null && invoice.to && <QRCode
                size={256}
                value={invoice.to}
                fgColor="rgb(0 0 0)"
                bgColor="RGBA(255, 255, 255)"
                viewBox={`0 0 256 256`}
                className="h-32 w-32 lg:w-56 lg:h-56"
                />}
                {/* TOKEN IMG */}
                <img src={token?.img} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 lg:w-14 lg:h-14 object-cover bg-zinc-900 p-2 rounded" />
                </div>}
                
            </div>
        </div>
        <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1">
            <p className="font-bold text-neutral-300 text-sm">Address to pay:</p>
            <button onClick={() => {
              if ('clipboard' in navigator) {
                navigator.clipboard.writeText(invoice?.to!)
                toast(
                  <div className="flex space-x-3 items-center">
                    <ClipboardIcon className="w-4 h-4" />
                    <p>Address copied!</p>
                  </div>
                )
              } 
            }} className="hover:bg-zinc-900 flex justify-between items-center rounded-lg border border-zinc-700/50 w-full px-4 py-2">
                <p className={`h-6 text-sm items-center flex line-clamp-1 ${!isMediumDevice ? "text-sm w-[280px]" : "text-sm"}`}>{invoice?.to ? invoice?.to : 'Loading...'}</p>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-green-400"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                />
                </svg>
            </button>
            <p className="text-xs text-neutral-500">Send only <span className="font-bold">{token?.symbol}</span> token in <span className="capitalize font-bold underline">{token?.network}</span> network on this address!</p>
            </div>
            <div className="flex flex-col space-y-1">
            <p className="font-bold text-neutral-300 text-sm">Amount to pay:</p>
            <button onClick={() => {
                           if ('clipboard' in navigator) {
                            navigator.clipboard.writeText(invoice !== null && invoice?.tokenAmount && Number(invoice.tokenAmount).toFixed(token?.stable ? 2 : 8))
                            toast(
                              <div className="flex space-x-3 items-center">
                                <ClipboardIcon className="w-4 h-4" />
                                <p>Amount copied!</p>
                              </div>
                            )
            }}} className="hover:bg-zinc-900 flex justify-between items-center rounded-lg border border-zinc-700/50 w-full px-4 py-2">
                <div className="flex space-x-2">
                <p className="font-bold">{invoice !== null && invoice.tokenAmount ? Number(invoice.tokenAmount).toFixed(token?.stable ? 2 : 8) : "Loading..."}</p>
                <p>{token?.symbol}</p>
                </div>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-green-400"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                />
                </svg>
            </button>
            <p className="text-xs text-neutral-500">Make sure you're sending exact amount!</p>
            </div>
        </div>
      </div>
    </div>
  );
}
