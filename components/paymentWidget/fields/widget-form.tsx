import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { useWidgetContext } from "../widget-provider";
import { Label } from "@/components/ui/label";
import DisplayError from "@/components/forms/dispalyError";
import { Button } from "@/components/ui/button";
import ValidateFormFields from "@/lib/validateFormFields";


export default function WidgetFieldsPage () {

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


      const {setEmail, setFields, invoice, product, setStep, price, setPrice} = useWidgetContext()

      const showPrice = (): boolean => {
        if (product?.data) {
            if (product?.data.priceType === 'range') {
                return true
            } else {
                setPrice(product?.data?.price)
                return false
            }
        } else {
            if (invoice?.data?.price) {
                setPrice(invoice?.data?.price)
                return false
            } else {
                return true
            }
        }
        }

        const showAdditionalFields = (): boolean => {
            if (product?.data) {
                if (product?.data?.fields?.length > 0) {
                    return true
                } else {
                    return false
                }
            } else {
                if (invoice?.data?.fields?.length > 0) {
                    return true
                } else {
                    return false
                }
            }
        }

    const onSubmit = (data: any) => {
        console.log('DATA!', data)
        setEmail(data.email)
        setPrice(data.price)
        let fields: any = {}
        product?.data?.fields?.map((field: string) => {
            fields[field] = data[field]
        })
        if (fields) {
            setFields(fields)
        }

        setStep('selectToken')
    }


    console.log('errors', errors)



    const requiredFieldsCeck = () => {
        let fields: any = {}

        fields.email = watch("email")
        fields.errors = errors

        if (showAdditionalFields()) {
            product?.data?.fields?.map((field: string) => {
                fields[field] = watch(field)
            })
        }

        if (showPrice()) {
            fields.price = watch("price")
        }
        return fields
    }



    return (
        <>
            <form id="fields" onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4 px-4 h-full justify-between pb-6">
                <div className="flex flex-col">
                
                <Label error={errors.email} id="email" className="mt-4 text-neutral-500">
                    <p className="font-bold text-sm required">Email</p>
                        <Input 
                        autoFocus 
                        id="email"
                        type="email" 
                        placeholder="user@example.com" 
                        className="mt-2 focus-visible:ring-green-400 text-neutral-300 text-base" 
                        {...register("email", { required: {value: true, message: 'Email is required!'} })}
                        error={errors.email}
                        />
                        {errors.email ? <DisplayError error={errors.email} /> :  <p className="text-neutral-500 text-xs mt-2">Email needed for receipt and refund.</p>}
                   
                </Label>
                {showPrice() && <Label error={errors.price} id="price" className="mt-4 pb-2 text-neutral-500">
                    <p className="font-bold text-sm required">Amount to pay</p>
                    <Input 
                    id="price"
                    type="number" 
                    placeholder="0.00 USD" 
                    step="0.01"
                    className="mt-2 focus-visible:ring-green-400 text-neutral-300 text-base" 
                    {...register("price", { 
                        required: {value: true, message: 'Please enter amount'}, 
                        valueAsNumber: true, 
                        min: {value: product?.data?.priceType === 'range' ? product.data.minPrice : 1, message: 'Minimum amount is ' + (product?.data?.priceType === 'range' ? product.data.minPrice : 1) + " USD"}, 
                        max: {value: product?.data?.priceType === 'range' ? product.data.maxPrice : 10000, message: 'Maximum amount is ' + (product?.data?.priceType === 'range' ? product.data.maxPrice : 10000) + " USD"} 
                        })
                    }
                    error={errors.price}
                    />
                    {errors.price ? <DisplayError error={errors.price} /> : <p className="text-neutral-500 text-xs mt-2">Enter amount in USD</p>}
                </Label>}
                {showAdditionalFields() && 
                    <div className="flex flex-col">
                        {product?.data?.fields.map((field: string) => {
                            return <Label key={field} error={errors[field]} id={field} className="mt-4 text-neutral-500">
                            <p className="font-bold text-sm required">{field}</p>
                                <Input 
                                id={field}
                                type="text" 
                                className="mt-2 focus-visible:ring-green-400 text-neutral-300 text-base" 
                                {...register(field, { required: {value: true, message: `${field} is required!`}})}
                                error={errors[field]}
                                />
                                {errors[field] && <DisplayError error={errors[field]} />}
                           
                        </Label>
                        })}
                    </div>
                }
                </div>
                <Button
            disabled={ValidateFormFields(requiredFieldsCeck())}
            className="mt-8 text-base disabled:bg-zinc-800 disabled:text-neutral-500 text-black font-bold hover:bg-green-300 bg-green-400"
          >
            Next step
          </Button>
            </form>
        </>
    )
}