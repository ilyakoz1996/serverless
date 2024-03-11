import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { useWidgetContext } from "../widget-provider";
import { Skeleton } from "../../ui/skeleton";
import { LucideStickyNote, Settings2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { IPaymentLink, IProduct } from "@/core/types";

export default function WidgetFooter () {

  const {step, setStep, paymentLink, product, wallet} = useWidgetContext() 

  const disabled = () => {
    if (paymentLink.isLoading) return true
    if (step === 'fields') return true
    if (step === 'selectToken') return true
    if (step === 'connectWallet') return true
    if (step === 'payment') return true
    if (step === 'processing') return true
  }

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
        <div className="flex justify-between border-t border-zinc-700/50 pt-4 items-center w-full max-w-lg px-4">
              <div className="flex flex-col">
                <p className="text-neutral-500 text-sm">Your order</p>
                <div className="flex space-x-2 items-center mt-1">
                  {paymentLink.isLoading ? <Skeleton className="w-4 h-4 rounded mt-1" /> : productData?.img ? <img src={productData.img} className="w-4 h-4 rounded object-cover" /> : <LucideStickyNote className="w-4 h-4 rounded" />}
                  {paymentLink.isLoading ? <Skeleton className="w-24 h-3 mt-1" /> : productData?.price !== 'Optional price' ? 
                    <p className="text-neutral-500 text-sm">{productData?.price} USD</p> 
                    : 
                    <div className="flex space-x-2 items-center text-neutral-500 text-xs">
                      <Settings2Icon className="w-3 h-3" /> <p>{productData?.price}</p>
                    </div>
                  }
                </div>
                  
              </div>
              <div className="flex space-x-4 items-center">
                <button type="submit" form='fields' onClick={() => {
                  if (step === 'main') return setStep('fields')
                  if (step === 'fields') return setStep('selectToken')
                  if (step === 'payment') {
                    // handleTransaction()
                    // handleBalance()
                  }
                }} 
                disabled={disabled()}
              className="px-4 py-2 bg-green-500 hover:bg-green-400 disabled:bg-zinc-800 disabled:text-neutral-500 rounded-lg font-bold">
                  {step === 'main' && <p className="text-sm lg:text-base">{paymentLink.isLoading ? "Loading..." : "Continue"}</p>}
                  {step === 'fields' && <p className="text-sm lg:text-base">Fill the form</p>}
                  {step === 'selectToken' && <p className="text-sm lg:text-base">Select token</p>}
                  {step === 'connectWallet' && <p className="text-sm lg:text-base">Verify address</p>}
                  {step === 'payment' && !wallet && <p className="w-max text-sm lg:text-base">Waiting for payment</p>}
                  {step === 'payment' && wallet && <p className="w-max text-sm lg:text-base">Pay using your wallet</p>}
                  {step === 'processing' && <p className="w-max text-sm lg:text-base">Please wait</p>}
                </button>
                <button className="px-2 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg font-bold">
                  <DotsVerticalIcon className="lg:h-6 lg:w-6 w-4 h-4" />
                </button>
              </div>
            </div>
    )
}