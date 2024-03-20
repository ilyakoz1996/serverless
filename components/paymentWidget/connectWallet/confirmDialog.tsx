import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useWidgetContext } from "../widget-provider";
import { Separator } from "@/components/ui/separator";
import TokenStandartBage from "@/components/ui/tokenStandart";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import nprogress from "@/lib/nprogress";
import API from "@/core/api";
import Db3 from 'decentralized-database'


function ConfirmContent ({setShowConfirm, phone} : {setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>, phone?: boolean}) {

    const api = new API()
    const db3 = new Db3()

    const {product, paymentLink, setPaymentLink, setInvoice, token, price, email, wallet, setStep} = useWidgetContext()

    const [loading, setLoading] = useState(false)

    const getPrice = (): number => {
        if (price) {
            return Number(price)
        } else if (paymentLink?.data?.price) {
            return Number(paymentLink?.data?.price)
        } else {
            return Number(product?.data?.price)
        }
    }

    const onSubmit = async () => {
        nprogress.start()
        setLoading(true)
        console.log({
            projectId: paymentLink.data.projectId, 
            productId: paymentLink.data.productId ? paymentLink.data.productId : undefined, 
            tokenId: Number(token.id), 
            from: wallet,
            clientEmail: email,
            price: getPrice().toFixed(2)
        })
        const invoice = await api.processing.createInvoice({
            projectId: paymentLink.data.projectId, 
            productId: paymentLink.data.productId ? paymentLink.data.productId : undefined, 
            tokenId: Number(token.id), 
            from: wallet,
            clientEmail: email,
            price: getPrice().toFixed(2)
        })
        
        if (invoice) {
            const invoiceId = invoice.invoiceId
            const updatedPaymentLink = await api.paymentLinks.updatePaymentLink({
                id: paymentLink.data.id,
                invoiceId: invoiceId,
                price: Number(getPrice().toFixed(2))
            })
            setPaymentLink((prev: any) => {
                console.log('INVOICE UPDATED AS: ', {...prev, data: {...prev.data, invoiceId: updatedPaymentLink.invoiceId}})
                return {...prev, data: {...prev.data, invoiceId: updatedPaymentLink.invoiceId}}
            })
            setInvoice(invoice)
            setLoading(false)
            nprogress.done()
            setStep('payment')
        }
    }

    return (
        <div className="flex flex-col w-full items-start mt-4">
            {/* Product info */}
            <div className="flex itesm-start justify-between w-full">
                {product.data && 
                    <div className="flex flex-col w-full mb-2">
                        <p className="font-bold text-base text-start">Product</p>
                        <div className="flex space-x-4 mt-2">
                            <img src={product.data.img} className="w-14 h-14 rounded object-cover" />
                            <div className="flex flex-col">
                                <p className="font-bold text-xl text-white text-start">{product.data.title}</p>
                                <p className="text-start">{product.data.about ? product.data.about : "No product description"}</p>
                            </div>
                        </div>
                    </div>
                }
                {/* Price */}
                <div className="flex flex-col">
                    <p className="font-bold text-base text-end">Price</p>
                    <p className="w-max text-white font-bold text-lg">{getPrice()} USD</p>
                </div>
            </div>
            <Separator className="mt-2 mb-2" />
            {/* Token information */}
            <div className="flex flex-col w-full mb-2">
                <p className="font-bold text-base text-start">Payment method</p>
                <div className="flex flex-col space-y-1 mt-2">
                    <div className="flex justify-between items-center">
                        <p className="text-neutral-500">Network:</p>
                        <p className="text-neutral-300 capitalize font-bold">{token.network}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-neutral-500">Token:</p>
                        <div className="flex space-x-2 items-center">
                            <p className="text-neutral-300 font-bold">{token.symbol}</p>
                            <img src={token.img} className="w-4 h-4 rounded object-cover" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-neutral-500">Standart:</p>
                        {/* <p className="text-neutral-300">{token.type}</p> */}
                        <TokenStandartBage type={token.type} />
                    </div>
                </div>
                <Separator className="mt-2" />
            </div>
            {/* Client information */}
            <div className="flex flex-col w-full">
                <p className="font-bold text-base text-start">Credentials</p>
                <div className="flex flex-col space-y-1 mt-2">
                    <div className="flex justify-between items-center">
                        <p className="text-neutral-500">Email:</p>
                        <p className="text-neutral-300 font-bold">{email}</p>
                    </div>
                    {phone ? 
                    <div className="flex flex-col items-start space-y-1 w-full">
                    <p className="text-neutral-500">Address:</p>
                    <p className="text-neutral-300 text-xs font-bold">{wallet}</p>
                </div> : <div className="flex justify-between items-center">
                        <p className="text-neutral-500">Address:</p>
                        <p className="text-neutral-300 text-xs">{wallet}</p>
                    </div>}
                </div>
                {/* <Separator className="mt-2" /> */}
            </div>
            <div className="flex w-full space-x-4 mt-8">
                <Button disabled={loading} variant="outline" className="w-1/3 font-bold" onClick={() => {
                    setShowConfirm(false)
                    }}>Cancel</Button>
                <Button disabled={loading} 
                className="w-full bg-green-500 hover:bg-green-400 font-bold" 
                onClick={() => onSubmit()}>
                    {
                        loading ? <div className="flex space-x-2">
                                            <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p>Creating invoice</p>
                        </div> : <p>Confirm</p>
                    }
                </Button>
            </div>
                
        </div>
    )
}

export default function ConfirmDialog({showConfirm, setShowConfirm} : {showConfirm: boolean, setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>}) {

    const isMediumDevice = useMediaQuery("only screen and (min-width : 769px)");

    if (isMediumDevice) {
        return (
            <Dialog 
            open={showConfirm}
            onOpenChange={(value) => setShowConfirm(value)}
            >
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Confirm information</DialogTitle>
                        <DialogDescription>
                            <ConfirmContent setShowConfirm={setShowConfirm} />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        )
    } else return (
        <Drawer 
        open={showConfirm}
        onOpenChange={(value) => setShowConfirm(value)}
        >
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Confirm information</DrawerTitle>
                    <DrawerDescription>
                        <ConfirmContent setShowConfirm={setShowConfirm} phone={true} />
                    </DrawerDescription>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    )
}