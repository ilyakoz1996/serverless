'use client'

import API from "@/core/api";
import { useCreateProject } from "@/core/hooks/projects";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DisplayError from "@/components/forms/dispalyError";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ValidateFormFields from "@/lib/validateFormFields";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import LStorage from "@/core/localStorage";
import nprogress from "@/lib/nprogress";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CLIENT_URL } from "@/core/constants";


const websiteUrlValidator = z.string().nullable().refine((value) => {

  if (value === null || value.length <= 0) {
    return true
  }

  const isHttp = value.startsWith("http://");
  const isHttps = value.startsWith("https://");

  if (!(isHttp || isHttps)) {
    return false;
  }

  const domainZone = ".com";
  return value.endsWith(domainZone);
}, {
  message: "Invalid website URL",
})

const schema = z.object({
  slug: z.string().min(3, "Subdomain should have at least 3 symbols length").max(12, "Subdomain should be maximum 12 symbols length"),
  title: z.string().min(3, "Title should have at least 3 symbols length").max(12, "Title should be maximum 12 symbols length"),
  img: z.string().default("https://static.vecteezy.com/system/resources/previews/000/554/511/original/shopping-cart-vector-icon.jpg"),
  about: z.string().max(256, "Description must contain at most 256 character(s)").optional(),
  websiteUrl: websiteUrlValidator,
  mnemonic: z.string().optional()
});

export default function CreateStore({setShowNewTeamDialog}:{setShowNewTeamDialog?: any}) {
  
  const api = new API();
  const storage = new LStorage()

  const router = useRouter()

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useCreateProject();

  const [imageUploading, setImageUploading] = useState<boolean>(false);

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImageData = async (event: any) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setImageUploading(true);

    const url = await api.uploads.uploadImage(base64);
    if (url) {
      setValue("img", url);
      setImageUploading(false);
    }
  };

  const onSubmit = async (data: any) => {
    nprogress.start()
    toast('Creating new Store...')
    const projectUpdated = await mutateAsync({...data, userId: storage.users.getUser()?.id});
    nprogress.done()
    storage.projects.updateProject(projectUpdated)
    toast('New Store created!')
    router.push('/dashboard')
    reset();
    if (setShowNewTeamDialog) {
      setShowNewTeamDialog(false)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center w-full h-full">
        {/* PROJECT TITLE */}
        <div className="flex flex-col items-start">
          <Label 
          htmlFor="title" 
          error={errors.title} 
          className="text-right mb-3 required">
            Title
          </Label>
          <div className="flex space-x-4 items-center w-full">
            <Input
              id="title"
              placeholder="Title for your Store"
              {...register("title", {
                required: "This field is required!",
                minLength: { value: 3, message: "Minimum 3 symbols!" },
              })}
              className="w-full"
              error={errors.title}
            />
          </div>
          <DisplayError error={errors.title} />
        </div>
        {/* PATH */}
        <div className="flex flex-col items-start mt-6">
          <Label 
          htmlFor="slug" 
          error={errors.slug} 
          className="text-right mb-3 required">
            Path
          </Label>
          <div className="flex items-center justify-between border rounded border-zinc-700/50 w-full group cursor-pointer">
            <div className="flex items-center w-full">
              <div className="bg-zinc-900 px-2 rounded h-10 flex space-x-2 items-center border-r border-zinc-700/50">
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
              <Input
                id="slug"
                {...register("slug", {
                  required: "This field is required!",
                  minLength: { value: 3, message: "Minimum 3 symbols!" },
                })}
                placeholder="Enter subdomain path"
                className={`w-full text-center border-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none focus-visible:border-b-2 ${
                  errors.slug?.message ? "border-b-2 border-red-500" : "border-green-400"
                }`}
              />
              <p className="font-bold text-sm pl-1 pr-4">.{CLIENT_URL}</p>
            </div>
          </div>
          <DisplayError error={errors.slug} />
        </div>
        {/* IMAGE */}
        <div className="relative flex space-x-4 items-center mt-6">
          <img
            src={watch('img') || "https://static.vecteezy.com/system/resources/previews/000/554/511/original/shopping-cart-vector-icon.jpg"}
            className="w-16 min-w-[64px] h-16 min-h-[64px] rounded ring-1 ring-border"
          />
          {imageUploading && <div className="absolute -left-4 bg-black/50 rounded flex items-center justify-center backdrop-blur-md w-16 h-16">
            <svg
              className="animate-spin h-8 w-8 text-white"
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
          </div>}
          <div className="flex flex-col items-start pl-4">
            <Label 
            htmlFor="img"
            error={errors.img} 
            className="text-right mb-3 optional">
              Logo
            </Label>
            <Input
              id="img"
              type="file"
              accept="image/png, image/jpeg"
              onChange={uploadImageData}
              className="col-span-3 hover:bg-zinc-900 cursor-pointer"
            />
            <p className="text-xs text-neutral-500 pl-5 mt-1">
              PNG, JPG, JPEG {"("}2MB max{")"}
            </p>
          </div>
        </div>
        <DisplayError error={errors.img} />
        {/* PROJECT DESCRIPTION */}
        <div className="flex flex-col items-start mt-6">
          <Label 
          error={errors.about} 
          htmlFor="about" 
          className="text-right mb-3 optional">
            About the store
          </Label>
          <div className="relative w-full">
            <Textarea
                id="about"
                {...register("about")}
                placeholder="Tell your customers a few words about your store"
                error={errors.about}
                />
            <p className={`absolute -bottom-5 right-0 text-xs ${watch('about')?.length! > 256 ? "text-red-500" : "text-neutral-500"}`}>{watch('about')?.length ? watch('about').length : 0}/256</p>
          </div>
          <DisplayError error={errors.about} />
        </div>
        {/* WEBSITE URL */}
        <div className="flex flex-col items-start mt-6">
          <Label 
          htmlFor="websiteUrl" 
          error={errors.websiteUrl} 
          className="text-right mb-3 optional">
            Website
          </Label>
          <div className="flex space-x-4 items-center w-full">
            <Input
              id="websiteUrl"
              placeholder="https://example.com"
              {...register("websiteUrl")}
              className="w-full"
              error={errors.websiteUrl}
            />
          </div>
          <DisplayError error={errors.websiteUrl} />
        </div>
        {/* WALLET MNEMONIC */}
        <div className="flex flex-col items-start mt-6">
          <Label 
          htmlFor="mnemonic" 
          error={errors.mnemonic} 
          className="text-right mb-3 optional">
            Import Wallet
          </Label>
          <div className="flex space-x-4 items-center w-full">
            <Textarea
              id="mnemonic"
              placeholder="12 or 24 HD wallet mnemonic phrase. If you dont have one, we will create new wallet for you."
              {...register("mnemonic")}
              className="w-full"
              error={errors.mnemonic}
            />
          </div>
          <DisplayError error={errors.mnemonic} />
        </div>
        {/* CONFIRM BUTTON */}
        <Button disabled={ValidateFormFields({
            fields: {
                title: watch('title'), 
                slug: watch('slug')
            },
            errors: errors,
            loading: {
                imageLoading: imageUploading,
                creatingProject: isPending
            }
        })} className="mt-8 text-base disabled:bg-zinc-800 disabled:text-neutral-500 text-black font-bold hover:bg-green-300 bg-green-400">
          {isPending && <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p>Creating...</p></>}
          {!isPending && 'Confirm'}
        </Button>
    </form>
  );
}