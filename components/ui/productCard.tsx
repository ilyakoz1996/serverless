import { Button } from "@/components/ui/button";
import { CLIENT_URL, ROOT_DOMAIN } from "@/core/constants";
import { IProduct } from "@/core/types";
import QRCode from "react-qr-code";

export default function ProductCard ({product}: {product: IProduct}) {
    return (
        <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <h2 className="font-bold text-xl">Product info:</h2>
          <div className="flex space-x-2 items-center mt-2">
            <p className="text-neutral-500 text-sm">Id:</p>
            <h2 className="text-xs">{product.id}</h2>
          </div>
          <div className="flex space-x-2 items-center mt-2">
            <p className="text-neutral-500 text-sm">Categories:</p>
            <div className="flex space-x-4 items-center">
              <span className="bg-zinc-800 rounded-full px-2 py-1 text-xs">
                {""}
              </span>
            </div>
          </div>
          <div className="flex space-x-4 mt-4">
            <img
              src={product.img}
              className="w-24 h-24 rounded-lg object-cover border"
            />
            <div className="flex flex-col space-y-2 w-64">
              <div className="flex flex-col space-y-1">
                <p className="text-neutral-500 text-sm">Title:</p>
                <h2 className="font-bold text-neutral-300">
                  {product.title}
                </h2>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-neutral-500 text-sm">About:</p>
                <p className="text-xs text-neutral-300 truncate">
                  {product.about}
                </p>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-neutral-500 text-sm">Price:</p>
                <h2 className="font-bold">{product.price}$</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-80">
          <p className="font-bold text-lg">Payment link</p>
          <div className="w-full h-64 flex items-center justify-center my-4">
            <div className="relative flex items-center justify-center bg-zinc-900 rounded-xl p-4">
              <QRCode
                size={256}
                value={`${CLIENT_URL}/pay?id=${product.id}`}
                fgColor="rgb(74 222 128)"
                bgColor="rgb(24 24 27)"
                viewBox={`0 0 256 256`}
                className="w-56 h-56"
              />
              <img
                src={product.img}
                className="border ring-zinc-900 ring-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 object-cover rounded"
              />
            </div>
          </div>
          <div className="flex space-x-4 items-center w-full">
            <div className="w-full h-[1px] border-t border-zinc-700/50"></div>
            <p className="font-bold text-neutral-500 text-sm">Or</p>
            <div className="w-full h-[1px] border-t border-zinc-700/50"></div>
          </div>
          <p className="font-bold mt-2">Share link below</p>
          <div className="flex items-center justify-between border rounded border-zinc-700/50 w-full group cursor-pointer mt-2">
            <div className="flex items-center w-full">
              <div className="bg-zinc-900 px-2 py-1 rounded flex space-x-2 items-center border-r border-zinc-700/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3 h-3 text-green-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clipRule="evenodd"
                  />
                </svg>

                <p className="text-neutral-500 text-sm">https://</p>
              </div>
              <p className="text-sm font-bold text-neutral-500 pl-1">
                {CLIENT_URL}/pay/product/id?
              </p>
              <p className="font-bold text-sm pl-1 w-22 truncate">
                {product.id}
              </p>
            </div>
          </div>
          <Button className="flex space-x-2 items-center pr-4 mt-4 hover:bg-zinc-800 bg-zinc-900 border-l border-zinc-700/50 px-2 py-1">
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