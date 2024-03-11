import { ArrowLeftCircleIcon } from "lucide-react"
import { useWidgetContext } from "../widget-provider"
import StoreInfo from "./storeInfo"
import { useEffect, useState } from "react"

export default function WidgetHeader () {

    const {step, setStep, wallet} = useWidgetContext() 

      function shortenWalletAddress(walletAddress: string, length = 12) {
        if (walletAddress.length <= length) {
            return walletAddress;
        }
    
        const prefix = walletAddress.slice(0, length / 2);
        const suffix = walletAddress.slice(-length / 2);
    
        return `${prefix}...${suffix}`;
    }

    return (
        <div className="pb-4 flex justify-start w-full border-b border-zinc-700/50">
            {step === 'main' && <StoreInfo />}
            {step === 'fields' && <div className="flex space-x-4 px-4 pt-4 h-full mb-3 items-center w-full">
                <button onClick={() => setStep('main')}>
                    <ArrowLeftCircleIcon className="h-6 w-6 text-neutral-300 hover:text-green-400" />
                </button>
                <h2 className="font-bold text-2xl">Fill required fields</h2>
            </div>}
            {step === 'selectToken' && <div className="flex space-x-4 px-4 pt-4 h-full mb-3 items-center w-full">
                <button onClick={() => setStep('fields')}>
                    <ArrowLeftCircleIcon className="h-6 w-6 text-neutral-300 hover:text-green-400" />
                </button>
                <h2 className="font-bold text-2xl">Select token</h2>
            </div>}
            {step === 'connectWallet' && <div className="flex space-x-4 px-4 pt-4 h-full mb-3 items-center w-full">
                <button onClick={() => setStep('selectToken')}>
                    <ArrowLeftCircleIcon className="h-6 w-6 text-neutral-300 hover:text-green-400" />
                </button>
                <h2 className="font-bold text-2xl">Connect Wallet</h2>
            </div>}
            {step === 'payment' && <div className="flex justify-between px-4 pt-4 h-full mb-3 items-center w-full">
                {/* <button onClick={() => setStep('selectToken')}>
                    <ArrowLeftCircleIcon className="h-6 w-6 text-neutral-300 hover:text-green-400" />
                </button> */}
                <h2 className="text-lg font-bold lg:text-2xl">Awaiting payment</h2>
                {wallet && <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <p className="text-neutral-300 text-sm">{shortenWalletAddress(wallet!)}</p>
                </div>}
            </div>}
        </div>
    )
}