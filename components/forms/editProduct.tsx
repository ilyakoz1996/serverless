'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import API from "@/core/api";
import { useUpdateProduct } from "@/core/hooks/products";
import { IProduct } from "@/core/types";
import { useRouter } from "next/navigation";
import nProgress from "@/lib/nprogress";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import nprogress from "@/lib/nprogress";

export default function EditProduct ({product, deleting}: {product: IProduct, deleting: boolean}) {

    const router = useRouter()

    /// EDIT PRODUCT

  const api = new API()

  // Form data

  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<{img: string, title: string, about: string, price: string, category: string}>();

  // Edit image

  const imageRef = useRef<any>()

  const [imageUrl, setImageUrl] = useState<string | undefined>(product?.img)

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const uploadImageData = async (event: any) => {
    const file = event.target.files[0]
    const base64 = await convertBase64(file)

    const url = await api.uploads.uploadImage(base64)
    if (url) {
      setValue('img', url)
      setImageUrl(url)
    }
  }

  const {mutateAsync} = useUpdateProduct()

  const onSubmit = async (data: any) => {
    const projectId = '5a9aca45-57ef-4b79-972e-7a2131c202ef'
    console.log("UPDATED PRODUCT!", {...data, img: imageUrl, price: Number(data.price), id: product.id});
    setUpdating(true)
    nprogress.start()
    const updatedProduct = await mutateAsync({...data, img: imageUrl, price: Number(data.price), id: product.id} as IProduct)
    nprogress.done()
    reset()
    nProgress.start()
    router.push(`/products?id=${product.id}`)
  };

  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (deleting) {
      setUpdating(true)
    }
  }, [deleting])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <h2 className="font-bold text-xl">Product info:</h2>
        <div className="flex space-x-2 items-center mt-2">
          <p className="text-neutral-500 text-sm">Id:</p>
          <h2 className="text-xs">{product.id}</h2>
        </div>
        <div className="flex space-x-2 items-center mt-2">
          <p className="text-neutral-500 text-sm">Category:</p>
          <div className="flex space-x-4 items-center">
            <Input
            disabled={updating}
                id="category"
                {...register("category", { required: false })}
                placeholder="Category"
                defaultValue={""}
                className="px-2 py-1 text-xs max-w-[80px] text-center h-min"
              />
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <img
          onClick={() => imageRef.current.click()}
            src={imageUrl}
            className="w-24 h-24 rounded-lg object-cover border hover:opacity-50 cursor-pointer"
          />
          <Input 
          disabled={updating}
          ref={imageRef}
                id="img" 
                type="file"
                accept="image/png, image/jpeg"
                onChange={uploadImageData}
                className="col-span-3 hover:bg-zinc-900 cursor-pointer hidden" />
          <div className="flex flex-col space-y-2 w-64">
            <div className="flex flex-col space-y-1">
              <p className="text-neutral-500 text-sm">Title:</p>
              <Input
                id="title"
                disabled={updating}
                {...register("title", { required: true })}
                placeholder="Title"
                defaultValue={product.title}
                className="font-bold text-neutral-300"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <p className="text-neutral-500 text-sm">About:</p>
                <Input
                id="about"
                disabled={updating}
                {...register("about", { required: false })}
                placeholder="About"
                defaultValue={product.about}
                className="text-xs text-neutral-300"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <p className="text-neutral-500 text-sm">Price:</p>
              <Input
                id="price"
                disabled={updating}
                {...register("price", { required: false })}
                placeholder="price"
                defaultValue={product.price}
                className="font-bold"
              />
            </div>
          </div>
        </div>
        <div className="flex space-x-4 items-center mt-8 w-96 justify-end">
          <Button type="button" onClick={()=> {
               nProgress.start()
            router.push(`/products?id=${product.id}`)}} variant="secondary" className="w-full font-bold">Cancel</Button>
          <Button disabled={updating} type="submit" className="w-full font-bold">{updating ? 'Updating...' : 'Confirm'}</Button>
        </div>
      </form>
    )
}