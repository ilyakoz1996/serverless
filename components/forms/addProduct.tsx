"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CrossCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import API from "@/core/api";
import { useCreateProduct } from "@/core/hooks/products";
import * as z from "zod";
import DisplayError from "@/components/forms/dispalyError";
import ValidateFormFields from "@/lib/validateFormFields";
import { zodResolver } from "@hookform/resolvers/zod";
import nprogress from "@/lib/nprogress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  List,
  LockIcon,
  PackagePlus,
  PlusCircleIcon,
  Settings2Icon,
} from "lucide-react";
import MultipleInput from "@/components/ui/multipleInput";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LStorage from "@/core/localStorage";

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import { IProduct } from "@/core/types";
import { useFieldArray, useForm } from "react-hook-form";

const schema = z
  .object({
    title: z
      .string()
      .min(3, "Title should have at least 3 symbols length")
      .max(12, "Title should be maximum 12 symbols length"),
    img: z
      .string()
      .default(
        "https://ilsto.websites.co.in/obaju-pink/img/product-placeholder.png"
      ),
    about: z
      .string()
      .max(256, "Description must contain at most 256 character(s)")
      .optional(),
    price: z.number().min(1, "Minimum price is 1 USD").nullable().optional(),
    priceType: z.string().default("fixed"),
    minPrice: z.number().min(1, "Minimum price is 1 USD").nullable().optional(),
    maxPrice: z
      .number()
      .min(100, "Minimum price is 100 USD")
      .nullable()
      .optional(),
    categories: z.any().optional(),
    fields: z.any().optional(),
  })
  .refine(
    (formValues) => {
      if (formValues.priceType === "range") {
        if (formValues.maxPrice && formValues.minPrice) {
          if (formValues.maxPrice <= formValues.minPrice) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    {
      path: ["maxPrice"],
      message: "Max price should be greater than Min",
    }
  );

export function AddProduct({
  showNewProductDialog,
  setShowNewProductDialog,
}: {
  showNewProductDialog: any;
  setShowNewProductDialog: any;
}) {
  const api = new API();
  const storage = new LStorage();

  const router = useRouter();

  const {
    watch,
    setValue,
    setError,
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useCreateProduct();

  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(
    "https://ilsto.websites.co.in/obaju-pink/img/product-placeholder.png"
  );

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
      setImageUrl(url);
      setImageUploading(false);
    }
  };

  const [priceType, setPriceType] = useState<"fixed" | "range">("fixed");
  const [categories, setCategories] = useState<undefined | any>();

  const addOption = () => {
    append("");
  };

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "fields",
    shouldUnregister: true,
  });

  const removeOption = (option: number) => {
    remove(option);
  };

  const onSubmit = async (data: any) => {
    nprogress.start();
    toast("Creating new product...");
    let newProduct: IProduct = data
    
    newProduct.projectId = storage.projects.getProject()?.id!
    
    if (imageUrl) {
      newProduct.img = imageUrl
    }
    if (categories && categories?.length > 0) {
      newProduct.categories = categories?.map((cat: any) => {
        return cat.value
      })
    }
    console.log("CREATED PRODUCT!", newProduct);
    const productUpdated = await mutateAsync(newProduct);
    nprogress.done();
    if (fields) {
      replace([]);
    }
    reset();
    setValue("priceType", "fixed");
    setCategories(undefined)
    toast(`${productUpdated.title} created!`, {
      description: `price: ${productUpdated.price}$`,
      action: {
        label: "View product",
        onClick: () => router.push(`/products?id=${productUpdated.id}`),
      },
    });
    if (setShowNewProductDialog) {
      setShowNewProductDialog(false);
    }
  };

  // CARUSEL

  const [caruselApi, setCaruselApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setValue("priceType", "fixed");
  }, []);

  useEffect(() => {
    if (!caruselApi) {
      return;
    }

    setCount(caruselApi.scrollSnapList().length);
    setCurrent(caruselApi.selectedScrollSnap() + 1);

    caruselApi.on("select", () => {
      console.log("current");
      setCurrent(caruselApi.selectedScrollSnap() + 1);
    });
  }, [caruselApi]);

  console.log("ERRRRRORS", errors);
  console.log('categories', categories)

  return (
    <Dialog open={showNewProductDialog} onOpenChange={setShowNewProductDialog}>
      <DialogTrigger asChild>
        <Button className="py-1 h-8" variant="secondary">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="border-b pb-4">
          <div className="flex space-x-4 items-center">
            <PackagePlus className="w-8 h-8 text-green-500" />
            <div className="flex flex-col space-y-1">
              <DialogTitle>New product</DialogTitle>
              <DialogDescription>
                Add new product for your store
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col max-w-sm"
        >
          <div className="flex space-x-4 items-center w-full">
            <p
              onClick={() => caruselApi.scrollPrev()}
              className={`w-full text-center px-2 py-1 font-bold ${
                current === 1
                  ? "text-neutral-300 bg-zinc-900 rounded-lg"
                  : "text-neutral-500"
              }`}
            >
              General information
            </p>
            <p
              onClick={() => caruselApi.scrollNext()}
              className={`w-full text-center px-2 py-1 font-bold ${
                current === 2
                  ? "text-neutral-300 bg-zinc-900 rounded-lg"
                  : "text-neutral-500"
              }`}
            >
              Additional options
            </p>
          </div>
          <Carousel setApi={setCaruselApi} className="">
            <CarouselContent className="max-w-[425px]">
              <CarouselItem>
                {/* TITLE */}
                <div className="flex flex-col items-start mt-4 px-1">
                  <Label
                    htmlFor="title"
                    error={errors.title}
                    className="text-right mb-3 required"
                  >
                    Title
                  </Label>
                  <div className="flex space-x-4 items-center w-full">
                    <Input
                      id="title"
                      placeholder="Product title"
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
                <Tabs defaultValue="fixed" className="mt-4 w-full px-1">
                  <TabsContent value="fixed">
                    <div className="flex flex-col items-start">
                      <Label
                        htmlFor="price"
                        error={errors.price}
                        className="text-right mb-3 required"
                      >
                        Price
                      </Label>
                      <div className="flex space-x-4 items-center w-full">
                        <Input
                          id="price"
                          placeholder="0.00$"
                          {...register("price", {
                            required:
                              watch("priceType") === "fixed"
                                ? "This field is required!"
                                : false,
                            valueAsNumber: true,
                          })}
                          type="number"
                          step="0.01"
                          className="w-full"
                          error={errors.price}
                        />
                      </div>

                      <DisplayError error={errors.price} />
                    </div>
                  </TabsContent>
                  <TabsContent value="range">
                    <div className="flex flex-col items-start">
                      <div className="flex space-x-4 items-center">
                        <div className="flex flex-col items-start">
                          <Label
                            htmlFor="minPrice"
                            error={errors.minPrice}
                            className="text-right mb-3 required"
                          >
                            Min price
                          </Label>
                          <div className="flex space-x-4 items-center w-full">
                            <Input
                              id="minPrice"
                              placeholder="0.00$"
                              {...register("minPrice", {
                                required:
                                  watch("priceType") === "range"
                                    ? "This field is required!"
                                    : false,
                                valueAsNumber: true,
                              })}
                              type="number"
                              step="0.01"
                              className="w-full"
                              error={errors.minPrice}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col items-start">
                          <Label
                            htmlFor="maxPrice"
                            error={errors.maxPrice}
                            className="text-right mb-3 required"
                          >
                            Max price
                          </Label>
                          <div className="flex space-x-4 items-center w-full">
                            <Input
                              id="maxPrice"
                              placeholder="10 000.00$"
                              {...register("maxPrice", {
                                required:
                                  watch("priceType") === "range"
                                    ? "This field is required!"
                                    : false,
                                valueAsNumber: true,
                              })}
                              type="number"
                              step="0.01"
                              className="w-full"
                              error={errors.maxPrice}
                            />
                          </div>
                        </div>
                      </div>

                      {watch("priceType") === "fixed" ? (
                        <DisplayError error={errors.price} />
                      ) : (
                        <div className="flex flex-col space-y-1">
                          <DisplayError error={errors.minPrice} />
                          <DisplayError error={errors.maxPrice} />
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsList className="w-full mt-4">
                    <TabsTrigger
                      onClick={() => {
                        setValue("priceType", "fixed");
                        setValue("minPrice", undefined);
                        setValue("maxPrice", undefined);
                      }}
                      value="fixed"
                      className="flex items-center w-full"
                    >
                      <LockIcon className="w-3 h-3 mr-2 -ml-2" />
                      <p className="text-sm"> Fixed price</p>
                    </TabsTrigger>
                    <TabsTrigger
                      onClick={() => {
                        setValue("priceType", "range");
                        setValue("price", undefined);
                      }}
                      value="range"
                      className="flex items-center w-full"
                    >
                      <Settings2Icon className="w-3 h-3 mr-2 -ml-2" />
                      <p className="text-sm">Client{"'"}s choise</p>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {/* CATEGORY */}
                <div className="flex flex-col items-start mt-6 px-1">
                  <Label
                    htmlFor="categories"
                    error={errors.categories}
                    className="text-right mb-3 optional"
                  >
                    Categories
                  </Label>
                  <div className="flex space-x-4 items-center w-full">
                    {/* <Input
              id="category"
              placeholder="Product's category"
              {...register("category")}
              className="w-full"
              error={errors.category}
            /> */}
                    <MultipleInput tags={categories} setTags={setCategories} />
                  </div>
                  <DisplayError error={errors.categories} />
                </div>
                {/* IMAGE */}
                <div className="relative flex space-x-4 items-center mt-6 px-1">
                  <img
                    src={
                      watch("img") ||
                      "https://static.vecteezy.com/system/resources/previews/000/554/511/original/shopping-cart-vector-icon.jpg"
                    }
                    className="w-16 min-w-[64px] h-16 min-h-[64px] rounded ring-1 ring-border"
                  />
                  {imageUploading && (
                    <div className="absolute -left-4 bg-black/50 rounded flex items-center justify-center backdrop-blur-md w-16 h-16">
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
                    </div>
                  )}
                  <div className="flex flex-col items-start pl-4">
                    <Label
                      htmlFor="img"
                      error={errors.img}
                      className="text-right mb-3 optional"
                    >
                      Image
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
                <div className="flex flex-col items-start mt-6 px-1 pb-1">
                  <Label
                    error={errors.about}
                    htmlFor="about"
                    className="text-right mb-3 optional"
                  >
                    Product's description
                  </Label>
                  <div className="relative w-full">
                    <Textarea
                      id="about"
                      {...register("about")}
                      placeholder="Tell your customers a few words about the product"
                      error={errors.about}
                    />
                    <p
                      className={`absolute -bottom-5 right-0 text-xs ${
                        watch("about")?.length! > 256
                          ? "text-red-500"
                          : "text-neutral-500"
                      }`}
                    >
                      {watch("about")?.length ? watch("about").length : 0}/256
                    </p>
                  </div>
                  <DisplayError error={errors.about} />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="flex flex-col w-full px-1 mt-4">
                  {fields &&
                    fields.length > 0 &&
                    fields.map((option: any, index: any) => {
                      return (
                        <div
                          key={option.id}
                          className="flex flex-col items-start mt-4 px-1"
                        >
                          <Label
                            htmlFor={option.id}
                            error={errors.fields}
                            className="text-right mb-3 required"
                          >
                            Option {index + 1}
                          </Label>
                          <div className="flex space-x-4 items-center w-full">
                            <Input
                              id={option.id}
                              placeholder="Option title"
                              {...register(`fields.${index}`, {
                                required: "This field is required!",
                                minLength: {
                                  value: 3,
                                  message: "Minimum 3 symbols!",
                                },
                              })}
                              className="w-full"
                              error={errors.fields}
                            />
                            <Button
                              variant="outline"
                              type="button"
                              onClick={() => removeOption(index)}
                            >
                              <CrossCircledIcon className="w-4 h-4 mr-2" />
                              Remove
                            </Button>
                          </div>
                          <DisplayError error={errors.fields} />
                        </div>
                      );
                    })}
                  {fields && fields.length === 0 && (
                    <div className="flex flex-col items-center w-full mt-4 space-y-2">
                      <List
                        className="w-8 h-8 text-neutral-500"
                        strokeWidth={0.5}
                      />
                      <p className="text-sm text-neutral-500">No options yet</p>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    type="button"
                    className="mt-8"
                    onClick={addOption}
                  >
                    <PlusCircleIcon className="w-4 h-4 mr-2" />
                    Add option
                  </Button>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>

          {/* CONFIRM BUTTON */}
          <Button
            disabled={ValidateFormFields({
              fields: {
                title: watch("title"),
                price:
                  watch("priceType") === "fixed"
                    ? watch("price")
                    : watch("minPrice"),
              },
              errors: errors,
              loading: {
                imageLoading: imageUploading,
                creatingProject: isPending,
              },
            })}
            className="mt-8 text-base disabled:bg-zinc-800 disabled:text-neutral-500 text-black font-bold hover:bg-green-300 bg-green-400"
          >
            {isPending && (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                <p>Creating...</p>
              </>
            )}
            {!isPending && "Confirm"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
