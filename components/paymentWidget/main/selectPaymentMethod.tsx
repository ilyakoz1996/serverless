import { CheckCircle, Settings2Icon, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { useWidgetContext } from "../widget-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { IPaymentLink, IProduct } from "@/core/types";

export default function PaymentMethods () {

    const [selected, setSelected] = useState<"crypto" | "binancePay">("crypto")
    const {paymentLink, product} = useWidgetContext()

    const [productData, setProductData] = useState<{img?: string | null | undefined, price: number | string} | null>(null)

    const getProduct = (invoice: IPaymentLink, product: IProduct) => {
      let productPrice: number | string = 'Optional price'
      let productImg = null
      if (invoice.price) {
        productPrice = invoice?.price
      } else if (product) {
        if (product.priceType === 'fixed' && product.price) {
          productPrice = product.price
        } else {
          productPrice = invoice?.price || 'Optional price'
        }
      }
      if (product) {
        productImg = product.img
      }
      setProductData({
        img: productImg,
        price: productPrice
      })
    }

    useEffect(() => {
      if (paymentLink.data) {
        getProduct(paymentLink.data, product.data)
      }
    }, [paymentLink.data, product.data])

    return (
        <div className="flex flex-col w-full mt-6 pb-6">
        {/* <p className="font-bold text-xl text-neutral-300">
          Payment Method
        </p> */}
        <div className="flex space-x-2 items-center">
        <Wallet className="w-4 h-4" />
        <p className="font-bold text-xl text-neutral-300">Payment method</p>
      </div>
        <div className="flex flex-col space-y-2 rounded-lg mt-4">
          <button
            onClick={() => setSelected("crypto")}
            className={`flex ${
              selected === "crypto"
                ? "bg-zinc-900 border-zinc-700/50"
                : "border-transparent"
            } space-x-4 items-center w-full border hover:border-zinc-700/50 rounded-xl px-2 py-2`}
          >
            <div className="flex w-full mr-4 items-center justify-between">
              <div className="flex space-x-4 items-center">
                <img
                  className=" z-10 w-12 h-12 rounded-lg object-cover"
                  alt="processing logo"
                  width={48}
                  height={48}
                  src="https://urbancrypto.com/wp-content/uploads/2016/09/BTC-logo-1080x1080.jpg"
                />
                <div className="flex flex-col text-start">
                  <p className="font-bold">Crypto</p>
                  {paymentLink.isLoading ? <Skeleton className="w-24 h-4 mt-1" /> : product.data?.price ? product.data?.priceType === 'fixed' && product.data?.price ? 
                    <p className="text-neutral-300 text-sm">{Number(product.data.price) + (Number(product.data.price) * 0.01)} USD <span className="pl-2 text-xs text-neutral-500">{ "+ $" + (Number(product.data?.price) * 0.01) + " fee"}</span></p> 
                    : 
                    <div className="flex space-x-2 items-center text-neutral-500 text-xs">
                      <Settings2Icon className="w-3 h-3" /> <p>Optional price</p>
                    </div> 
                    : <div className="flex space-x-2 items-center text-neutral-500 text-xs">
                      {paymentLink.data?.price ? <p className="text-neutral-300 text-sm">{Number(productData?.price) + (Number(productData?.price) * 0.01)} USD</p> : <Settings2Icon className="w-3 h-3" /> } <p>Optional price</p>
                  </div> }
                </div>
              </div>
              {selected === "crypto" && (
                <CheckCircle className="w-4 h-4 text-green-400" />
              )}
            </div>
          </button>
          <button
            onClick={() => alert("Coming soon")}
            className={`flex ${
              selected === "binancePay"
                ? "bg-zinc-900 border-zinc-700/50"
                : "border-transparent"
            } space-x-4 items-center w-full hover:border-zinc-700/50 border  rounded-xl px-2 py-2`}
          >
            <div className="flex w-full mr-4 items-center justify-between">
              <div className="flex space-x-4 items-center">
                <img
                  className=" z-10 w-12 h-12 rounded-lg object-cover"
                  src="http://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fis2-ssl.mzstatic.com%2Fimage%2Fthumb%2FPurple118%2Fv4%2Fe6%2Fb3%2F4f%2Fe6b34f39-a3c6-55f6-9068-23a4e03cbf96%2Fsource%2F512x512bb.jpg&f=1&nofb=1&ipt=c0c1b3712a41195eddb770c7a685c1532f6583a20c2135d83a77d6f2641043b6&ipo=images"
                />
                <div className="flex flex-col text-start">
                  <p className="font-bold">BinancePay</p>
                  {product.isLoading ? <Skeleton className="w-24 h-4 mt-1" /> : product.data?.priceType === 'fixed' && product.data?.price ? 
                    <p className="text-neutral-300 text-sm">{Number(product.data.price) + (Number(product.data.price) * 0.01) + 1} USD <span className="pl-2 text-xs text-neutral-500">{ "+ $" + Number((Number(product.data.price) * 0.01) + 1) + " fee"}</span></p> 
                    : 
                    <div className="flex space-x-2 items-center text-neutral-500 text-xs">
                      <Settings2Icon className="w-3 h-3" /> <p>Optional price</p>
                    </div> }
                </div>
              </div>
              {selected === "binancePay" && (
                <CheckCircle className="w-4 h-4 text-green-400" />
              )}
            </div>
          </button>
        </div>
      </div>
    )
}