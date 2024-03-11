import { Button } from "@/components/ui/button";
import { IPaymentLink } from "@/core/types";
import QRCode from "react-qr-code";
import ProductItem from "@/components/tables/paymentLinks/productItem";
import { CLIENT_URL, ROOT_DOMAIN } from "@/core/constants";


export default function PaymentLinkCard ({paymentLink}: {paymentLink: IPaymentLink}) {

    const createdDate = new Date(paymentLink.createdAt!)

    return (
        <div className="flex space-x-12">
        <div className="flex flex-col w-full">
            <h2 className="font-bold text-xl">Payment info:</h2>
          <div className="flex space-x-2 items-center mt-4">
            <p className="text-neutral-500 text-sm">Invoice Id:</p>
            <h2 className="text-xs">{paymentLink.id}</h2>
          </div>
          <div className="w-full h-[1px] bg-zinc-700/50 my-2"></div>
          <div className="w-full h-[1px] bg-zinc-700/50 my-2"></div>
          {paymentLink.productId &&
          <div className="flex flex-col space-y-2 mt-4">
            <h2 className="font-bold text-xl">Product:</h2>
            <ProductItem productId={paymentLink.productId} />
          </div>}
        </div>
        <div className="flex flex-col w-full">
        <div className="flex flex-col space-y-2">
              <p>{createdDate.toLocaleString()}</p>
            </div>
          <div className="w-fit h-44 flex items-center justify-center mb-4 mt-8">
            <div className="relative flex items-center justify-center bg-zinc-900 rounded-xl p-4">
              <QRCode
                size={256}
                value={`https://${ROOT_DOMAIN}/pay?invoice=${paymentLink.id}`}
                fgColor="rgb(74 222 128)"
                bgColor="rgb(24 24 27)"
                viewBox={`0 0 256 256`}
                className="w-44 h-44"
              />
            </div>
          </div>
          <Button className="flex w-52 space-x-2 items-center pr-4 mt-4 hover:bg-zinc-800 bg-zinc-900 border-l border-zinc-700/50 px-2 py-1">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="text-green-400 w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
              />
            </svg>
            <p className="text-green-400 font-bold text-sm">
              Copy payment link
            </p>
          </Button>
        </div>
      </div>
    )
}