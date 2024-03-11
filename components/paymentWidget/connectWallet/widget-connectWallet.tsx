import { ClipboardPaste, ScanLine } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useWidgetContext } from "../widget-provider";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import DisplayError from "@/components/forms/dispalyError";
import ValidateFormFields from "@/lib/validateFormFields";
import TooltipInfo from "@/components/ui/tip";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import ConfirmDialog from "./confirmDialog";

export default function ConnectWalletPage () {

  const {setStep, setWallet, wallet, token, email, fields, price} = useWidgetContext()

  const isMediumDevice = useMediaQuery("only screen and (min-width : 769px)");

  const {
    watch,
    setValue,
    setError,
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log('DATA!', {
      wallet: data.wallet,
      token: token,
      email: email,
      fields: fields,
      price: price
    })
    setWallet(data.wallet)
    setShowConfrim(true)
    // setStep('payment')
  }

  const requiredFieldsCeck = () => {
    let fields: any = {}

    fields.wallet = watch("wallet")
    fields.errors = errors

    return fields
}


const [showConfirm, setShowConfrim] = useState(false)


    return (
        <div className="flex flex-col w-full px-4 h-full">
        <div className="flex flex-col mt-4">
          <p className="font-bold text-xl">Enter <span className="underline">your</span> wallet address</p>
          <p className="text-sm text-neutral-500">Please enter your wallet addres from the one you are going to make payment</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full justify-between pb-6 mt-4">
          <div className="flex flex-col">
            <Label htmlFor="wallet" error={errors.wallet} className="text-neutral-500">
            <p className="font-bold text-sm required">Address:</p>
            <div className="flex items-center justify-between w-full">
              <Input 
              id="wallet"
              autoFocus
              className="mt-2 text-base text-neutral-300" 
              placeholder="Your payment address" 
              {...register("wallet", { required: {value: true, message: 'Wallet is required!'} })}
              error={errors.wallet}
              />
              <div className="flex space-x-2 items-center mt-2 pl-3">
              <TooltipInfo title="Paste from clipboard">
                <Button variant="secondary" type="button" className="">
                  <ClipboardPaste className="h-5 w-5 text-green-400" strokeWidth={1} />
                </Button>
              </TooltipInfo>
              <TooltipInfo title="Scan from QR">
                <Button variant="secondary" type="button" className="">
                  <ScanLine className="h-5 w-5 text-green-400" strokeWidth={1} />
                </Button>
              </TooltipInfo>
              </div>
            </div>
            {errors.wallet ? <DisplayError error={errors.wallet} /> :  <p className="text-neutral-500 text-xs mt-2">Enter YOUR ERC20 address here</p>}
            </Label>
            <Button disabled={ValidateFormFields(requiredFieldsCeck())} className="mt-8 text-base disabled:bg-zinc-800 disabled:text-neutral-500 text-white font-bold hover:bg-green-400 bg-green-500">Verify Address</Button>
          </div>
          
        </form>
        <ConfirmDialog showConfirm={showConfirm} setShowConfirm={setShowConfrim} />
      </div>
    )
}