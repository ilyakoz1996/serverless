import { useEffect } from "react";
import QRCode from "react-qr-code";
import { useWidgetContext } from "../widget-provider";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ExternalLink, VerifiedIcon } from "lucide-react";
import getConfirmations from "@/lib/getConfirmations";


export default function WidgetProcessingPage() {

  const {invoice, setStep, setInvoice, token, setToken, setTransaction, transaction} = useWidgetContext()

  console.log('INVOICE PROCESSING STEP', invoice)

  const updateTransaction = async (network: string, txId: string) => {
    console.log('UPDATE TRANSACTION', transaction)
    const confirmations = await getConfirmations(network, txId)
    setTransaction(confirmations)
  }

  const getConfirmationsCount = (network: string): number => {
    if (network === "ethereum") {
      return 3
    }
    if (network === "bsc") {
      return 17
    }
    if (network === "tron") {
      return 21
    }
    if (network === "bitcoin") {
      return 3
    }
    if (network === "litecoin") {
      return 7
    }
    return 21
  }

  const isComplete = (transaction: any) => {

    if (invoice?.status === 'success') {
      return true
    }

    let complete = false 

    if (transaction) {
  
      if (transaction >= getConfirmationsCount(token?.network!)) {
        return complete = true
      }
      return complete

    } else {
      return complete
    }
  }

  useEffect(() => {
    setInterval(() => {
      updateTransaction(token.network, invoice.transactionId)
    }, 3000)
  }, [])

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col justify-center items-center">
      <div className="flex items-center space-x-2 h-10 mt-2">
        {invoice?.status === 'success' ? <VerifiedIcon className="h-6 w-6 text-green-400" /> : <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-green-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>}
        <p className="font-bold text-xl">{isComplete(transaction) ? "Invoice succsessfuly paid" : "Payment is processing" }</p>
      </div>
        <p className="text-sm text-neutral-500">
        {invoice?.status === 'succsess' ? "The payment is completed." : "Your payment is processing. Please wait for a while"}
        </p>
      </div>
      <div className="flex flex-col mt-4 mx-4">
        <div className="flex items-center justify-between mt-4">
          <div className="flex mt-4">
            <div className="relative flex flex-col mt-4 h-32">
              <div className="w-[1px] bg-zinc-700 h-32"></div>
              <div className="absolute top-0 w-2 h-2 rounded-full bg-green-400 -translate-x-1/2"></div>
              <div className={`absolute top-1/2 w-2 h-2 rounded-full ${isComplete(transaction) ? "bg-green-400" : "bg-orange-400"}  -translate-x-1/2 -translate-y-1/2`}></div>
              <div className={`absolute bottom-0 w-2 h-2 rounded-full ${isComplete(transaction) ? "bg-green-400" : "bg-zinc-700"} -translate-x-1/2`}></div>
            </div>
            <div className="flex flex-col ml-6">
            <div className="flex flex-col">
              <p className="text-sm">Payment success</p>
              <p className="text-neutral-500 text-xs"> 23:23, 23.03.2023</p>
            </div>
            <div className="flex flex-col mt-6">
              <p className="text-sm">{isComplete(transaction) ? "Processing finished" : "Transfer in progress"}</p>
              {invoice?.status === 'succsess' ? <p className="text-neutral-500 text-xs">Completed</p> : <p className="text-neutral-500 text-xs">{transaction !== undefined ? Number(transaction) : 0} / {getConfirmationsCount(token?.network!) || 0}</p>}
            </div>
            <div className="flex flex-col mt-6">
              <p className="text-sm">Payment complete</p>
              <p className="text-neutral-500 text-xs">{isComplete(transaction) ? "Completed" : "Awaiting"}</p>
            </div>
          </div>
          </div>
          <div className="flex flex-col h-36 items-center justify-center my-4">
            <div className="relative flex items-center justify-center bg-zinc-900 rounded-xl p-4">
            {invoice === null ? <Skeleton className="w-32 h-32" /> : <QRCode
                size={256}
                value={invoice?.invoiceId!}
                fgColor="rgb(74 222 128)"
                bgColor="rgb(24 24 27)"
                viewBox={`0 0 256 256`}
                className="w-32 h-32"
            />}
            </div>
            <p className="text-xs text-neutral-500 font-bold mt-1">{invoice?.invoiceId?.split('-')[0]}</p>
        </div>
        </div>
        <div className="flex flex-col mt-8">
          <p className="font-bold text-neutral-500">Transaction details:</p>
          <div className="flex flex-col space-y-2 w-full bg-zinc-900 rounded p-4 mt-2">
            <div className="flex justify-between items-center w-full">
              <p className="text-neutral-500 text-xs">Network:</p>
              <p className="text-neutral-300 text-xs capitalize">{token?.network}</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-neutral-500 text-xs">Token:</p>
              <div className="flex space-x-2 items-center">
                <p className="text-neutral-300 text-xs font-bold">{token?.symbol} {`(${token?.type})`}</p>
                <img className="w-4 h-4 rounded-full object-contein" src={token?.img} alt={token?.symbol} />
              </div>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-neutral-500 text-xs">Amount:</p>
              <p className="text-neutral-300 text-xs font-bold">{invoice.tokenAmount} {token?.symbol}</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-neutral-500 text-xs">Transaction ID:</p>
              <button className="flex space-x-4 items-center group">
                <p className="text-neutral-300 text-xs w-32 group-hover:underline truncate h-full">{invoice?.transactionId}</p>
                <div className="flex items-center text-xs space-x-2 text-green-400 rounded">
                  <p>Copy</p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
</svg>

                </div>
              </button>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-neutral-500 text-xs">Transaction Explorer</p>
                <Link target="_blank" href={`${token?.network === 'bsc' ? 'http://bscscan.com' : 'http://etherscan.io'}/tx/${invoice?.transactionId}`} passHref>
              <button className="flex space-x-2 items-center group">
                <div className="flex space-x-2 items-center">
                  <img src={
                    token?.network === 'bsc' ? 'https://www.btcbaike.com/static/img/0eda505fd22cb79951a7c3dbf0c98162.jpg' : 'http://cryptocurrencyjobs.co/startups/assets/logos/etherscan.c48d9f18a6596427c2e8ccff4a231191e29ca5edaef4a8748c0b9057aa218299.jpg'
                  } className="w-4 h-4 rounded-full object-cover" />
                  <p className="text-xs text-green-500 group-hover:underline">{token?.network === 'bsc' ? 'bscsan.com' : 'etherscan.io'}</p>
                </div>
                <ExternalLink className="w-3 h-3 text-green-400 group-hover:underline" strokeWidth={1.5} />
              </button>
                </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-full pt-4">
        {isComplete(transaction) ? <VerifiedIcon className="h-8 w-8 text-green-400" /> :
          <svg className="animate-spin h-8 w-8 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>}
      <p className="text-xs text-green-400 mt-2">{isComplete(transaction) ? "Complete" : "Processing"}</p>
        </div>
    </div>
  );
}
