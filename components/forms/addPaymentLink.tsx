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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import QRCode from "react-qr-code";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IPaymentLink, IProduct } from "@/core/types";
import {
  FileCheck,
  LinkIcon,
  Receipt,
} from "lucide-react";
import { toast } from "sonner";
import API from "@/core/api";
import Loader from "@/components/ui/loader";
import {
  useGetProductsByProjectId,
} from "@/core/hooks/products";
import LStorage from "@/core/localStorage";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@uidotdev/usehooks";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useGetProject } from "@/core/hooks/projects";
import { CLIENT_URL, ROOT_DOMAIN } from "@/core/constants";

function PaymentLink({
  view,
  selectedProduct,
  setSelectedProduct,
  selectedDomain,
  setSelectedDomain,
  setView,
  setSelectedPrice,
  setValidPrice,
  validPrice,
  selectedPrice,
}: any) {
  const api = new API();
  const storage = new LStorage();

  const router = useRouter();

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPaymentLink>();

  const currentProject = storage.projects.getProject();

  const { data: project, isLoading } = useGetProject(currentProject?.id!);

  console.log('project', project)

  const products = useGetProductsByProjectId(project?.id!);

  const [paymentLink, setPaymentLink] = useState<IPaymentLink | null>(null);
  const [loding, setLoading] = useState<boolean>(false);

  const InvoiceToast = ({ paymentLink }: { paymentLink: IPaymentLink }) => {
    const icon = () => {
      if (paymentLink.productId) {
        return (
          <img
            src={selectedProduct?.img}
            className="w-8 h-8 rounded object-cover"
          />
        );
      } else {
        return (
          <FileCheck strokeWidth={0.5} className="w-8 h-8 text-green-500" />
        );
      }
    };

    const type = () => {
      if (paymentLink.productId) {
        return "Product's paymentLink";
      } else return "Quick paymentLink";
    };

    const price = () => {
      if (paymentLink.price) {
        return "Price: " + paymentLink.price + " $";
      } else if (paymentLink.productId) {
        return "Price: " + selectedProduct?.price + " $";
      } else return "Optional price";
    };

    return (
      <div className="flex space-x-3 mt-2">
        {icon()}
        <div className="flex flex-col">
          <p className="font-bold">{type()}</p>
          <p className="text-xs text-neutral-500">{price()}</p>
        </div>
      </div>
    );
  };

  const invoiceDomain = `https://${ROOT_DOMAIN}/pay`

  const createPaymentLink = async (data: IPaymentLink) => {
    setLoading(true);
    toast("Creating paymentLink...");
    let paymentLinkData = data
    if (selectedDomain !== null) {
      paymentLinkData = {...data, url: selectedDomain}
    }
    const paymentLink = await api.paymentLinks.createPaymentLink(paymentLinkData);
    if (paymentLink) {
      setPaymentLink(paymentLink);
      toast(`paymentLink created!`, {
        description: <InvoiceToast paymentLink={paymentLink} />,
        action: {
          label: "Open paymentLink",
          onClick: () => router.push(`/paymentLinks?id=${paymentLink.id}`),
        },
      });
      setLoading(false);
      if (data.productId) {
        return setView("product");
      }
      if (data.price) {
        return setView("price");
      }
      return setView("quick");
    } else {
      toast("Something went wrong creating paymentLink!");
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      let paymentLinkData: IPaymentLink = {}

      paymentLinkData.projectId = project?.id!
      paymentLinkData.productId = selectedProduct.id!

      if (selectedProduct.priceType === 'fixed') {
        paymentLinkData.price = Number(selectedProduct.price)
      }
      createPaymentLink(paymentLinkData);
    }
  }, [selectedProduct]);

  return (
    <>
      {!project ||
        (loding && (
          <div className="h-64">
            <Loader little title="Creating payment link..." />
          </div>
        ))}
      {project && !loding && view === "type" && (
        <div className="grid gap-4 py-4">
          <div className="my-4 flex w-full justify-center">
            <Receipt className="w-12 h-12 text-neutral-500" strokeWidth={0.5} />
          </div>
          <Button
            onClick={() => {
              createPaymentLink({ projectId: project?.id! });
            }}
            variant="default"
            className="w-full flex space-x-2 items-center bg-zinc-900 hover:bg-zinc-800 text-green-400 border border-zinc-700/50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>

            <p>Quick paymentLink</p>
          </Button>
          <div className="flex space-x-4 items-center justify-center">
            <Button
              onClick={() => setView("product")}
              variant="outline"
              className="w-full flex space-x-2 items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                />
              </svg>

              <p>Choose Product</p>
            </Button>
            <Button
              onClick={() => setView("price")}
              variant="outline"
              className="w-full flex space-x-2 items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>With Price</p>
            </Button>
          </div>
        </div>
      )}
      {project && !loding && view === "price" && (
        <div className="grid gap-4 pb-4">
          <div className="grid gap-4 pb-4">
            {!validPrice && (
              <>
                <Input
                  placeholder="0.00 $"
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(() => {
                    if (typeof Number(e.target.value) === 'number' && Number(e.target.value) > 0) {
                      return e.target.value
                    } else {
                      alert("Price should be greater than 1.00 USD")
                      return ""
                    }
                  })}
                />
                <Button
                  disabled={selectedPrice.length <= 0}
                  onClick={() => {
                    createPaymentLink({
                      projectId: project?.id!,
                      price: Number(selectedPrice),
                    });
                    setValidPrice(true);
                  }}
                  className="mt-4 w-full flex space-x-2 items-center disabled:bg-zinc-900 disabled:text-neutral-500 text-white bg-zinc-900 hover:bg-zinc-800"
                >
                  Generate payment link
                </Button>
              </>
            )}
            {validPrice && (
              <>
                <div className="w-full h-64 flex items-center justify-center my-4">
                  <div className="relative flex items-center justify-center bg-zinc-900 rounded-xl p-4">
                    <QRCode
                      size={256}
                      value={
                        `${invoiceDomain}?id=${paymentLink?.id}`
                      }
                      fgColor="rgb(74 222 128)"
                      bgColor="rgb(24 24 27)"
                      viewBox={`0 0 256 256`}
                      className="w-56 h-56"
                    />
                  </div>
                </div>
                <div className="flex space-x-4 items-center w-full">
                  <div className="w-full h-[1px] border-t border-zinc-700/50"></div>
                  <p className="font-bold text-neutral-500 text-sm">Or</p>
                  <div className="w-full h-[1px] border-t border-zinc-700/50"></div>
                </div>
                <p className="font-bold">Share link below</p>
                <div className="flex items-center justify-between border rounded border-zinc-700/50 w-full group cursor-pointer">
                  <div className="flex items-center w-full truncate">
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

                      <p className="text-neutral-500 text-sm">http://</p>
                    </div>
                    <p className="text-sm text-neutral-500 pl-1">
                      {invoiceDomain.replace(/^\/\/|^.*?:(\/\/)?/, '')}
                    </p>
                    <p className="font-bold text-sm pl-1 truncate max-w-[160px]">
                    ?paymentLink={paymentLink?.id}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    if ('clipboard' in navigator) {
                      navigator.clipboard.writeText(`${invoiceDomain}?id=${paymentLink?.id}`)
                      toast(
                        <div className="flex space-x-3 items-center">
                          <LinkIcon className="w-4 h-4" />
                          <p>Link copied!</p>
                        </div>
                      )
                    } else {
                      return document.execCommand('copy', true, `${invoiceDomain}?id=${paymentLink?.id}`);
                    }
        
                  }
                  }
                  className="flex space-x-2 items-center pr-4 mt-2 hover:bg-zinc-800 bg-zinc-900 border-l border-zinc-700/50 px-2 py-1"
                >
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
                    Copy paymentLink link
                  </p>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
      {project && view === "product" && (
        <div className="grid gap-4 pb-4">
          {
            <Select
              disabled={loding}
              onValueChange={(val) =>
                setSelectedProduct(() => {
                  const prod = products.data?.find(
                    (prod: IProduct) => prod.id === val
                  );
                  if (prod) {
                    return prod;
                  } else return null;
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose your product" />
              </SelectTrigger>
              <SelectContent>
                {products.data &&
                  products.data.length > 0 &&
                  products.data?.map((product: IProduct) => {
                    console.log("product", product);
                    return (
                      <SelectItem key={product.id} value={product.id!}>
                        <div
                          onClick={() => {}}
                          className="flex space-x-2 items-center"
                        >
                          <img
                            src={product.img}
                            className="w-4 h-4 rounded object-cover"
                          />
                          <p>
                            {product.title} - <b>{product.price} USD</b>
                          </p>
                        </div>
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
          }
          {!loding && selectedProduct && paymentLink && (
            <>
              <p className="font-bold text-lg">Show QR to your client</p>
              <div className="w-full h-64 flex items-center justify-center my-4">
                <div className="relative flex items-center justify-center bg-zinc-900 rounded-xl p-4">
                  <QRCode
                    size={256}
                    value={
                      `${invoiceDomain}?id=${paymentLink?.id}`
                    }
                    fgColor="rgb(74 222 128)"
                    bgColor="rgb(24 24 27)"
                    viewBox={`0 0 256 256`}
                    className="w-56 h-56"
                  />
                  <img
                    src={selectedProduct.img}
                    className="border ring-zinc-900 ring-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 object-cover rounded"
                  />
                </div>
              </div>
              <div className="flex space-x-4 items-center w-full">
                <div className="w-full h-[1px] border-t border-zinc-700/50"></div>
                <p className="font-bold text-neutral-500 text-sm">Or</p>
                <div className="w-full h-[1px] border-t border-zinc-700/50"></div>
              </div>
              <p className="font-bold">Share link below</p>
              <div className="flex items-center justify-between border rounded border-zinc-700/50 w-full group cursor-pointer">
                <div className="flex items-center w-full truncate">
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

                    <p className="text-neutral-500 text-sm">http://</p>
                  </div>
                  <p className="text-sm text-neutral-500 pl-1">
                    {invoiceDomain.replace(/^\/\/|^.*?:(\/\/)?/, '')}
                  </p>
                  <p className="font-bold text-sm pl-1 max-w-[160px]">
                  ?paymentLink={paymentLink.id}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => {
                  if ('clipboard' in navigator) {
                    navigator.clipboard.writeText(`${invoiceDomain}?id=${paymentLink?.id}`)
                    toast(
                      <div className="flex space-x-3 items-center">
                        <LinkIcon className="w-4 h-4" />
                        <p>Link copied!</p>
                      </div>
                    )
                  } else {
                    return document.execCommand('copy', true, `${invoiceDomain}?id=${paymentLink?.id}`);
                  }
                  
                }
                }
                className="flex space-x-2 items-center pr-4 mt-2 hover:bg-zinc-800 bg-zinc-900 border-l border-zinc-700/50 px-2 py-1"
              >
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
                  Copy paymentLink link
                </p>
              </Button>
            </>
          )}
        </div>
      )}
      {project && !loding && view === "quick" && paymentLink !== null && (
        <div className="grid gap-3 pb-4">
          <div className="w-full h-64 flex items-center justify-center my-4">
            <div className="flex items-center justify-center bg-zinc-900 rounded-xl p-4">
              <QRCode
                size={256}
                value={`${invoiceDomain}?id=${paymentLink.id}`}
                fgColor="rgb(74 222 128)"
                bgColor="rgb(24 24 27)"
                viewBox={`0 0 256 256`}
                className="w-56 h-56"
              />
            </div>
          </div>
          <div className="flex space-x-4 items-center w-full">
            <div className="w-full h-[1px] border-t border-zinc-700/50"></div>
            <p className="font-bold text-neutral-500 text-sm">Or</p>
            <div className="w-full h-[1px] border-t border-zinc-700/50"></div>
          </div>
          <p className="font-bold">Share link below</p>
          <div className="flex items-center justify-between border rounded border-zinc-700/50 w-full group cursor-pointer">
            <div className="flex items-center w-full truncate">
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
              <p className="text-sm text-neutral-500 pl-1">{invoiceDomain.replace(/^\/\/|^.*?:(\/\/)?/, '')}</p>
              <p className="font-bold text-sm pl-1 max-w-[160px]">
                ?paymentLink={paymentLink.id}
              </p>
            </div>
          </div>
          <Button
            onClick={() => {
              if ('clipboard' in navigator) {
                navigator.clipboard.writeText(`${invoiceDomain}?id=${paymentLink?.id}`)
                toast(
                  <div className="flex space-x-3 items-center">
                    <LinkIcon className="w-4 h-4" />
                    <p>Link copied!</p>
                  </div>
                )
              } else {
                return document.execCommand('copy', true, `${invoiceDomain}?id=${paymentLink?.id}`);
              }
            }
            }
            className="flex space-x-2 items-center pr-4 mt-2 hover:bg-zinc-800 bg-zinc-900 border-l border-zinc-700/50 px-2 py-1"
          >
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
              Copy paymentLink link
            </p>
          </Button>
        </div>
      )}
    </>
  );
}

export function AddPaymentLink() {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [validPrice, setValidPrice] = useState<boolean>(false);
  const [selectedPrice, setSelectedPrice] = useState<string>("");

  const [view, setView] = useState<"type" | "product" | "price" | "quick">(
    "type"
  );

  const isMediumDevice = useMediaQuery("only screen and (min-width : 769px)");

  if (isMediumDevice) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              setView("type");
              setSelectedProduct(null);
              setSelectedPrice("");
              setValidPrice(false);
            }}
            className="py-1 h-8 bg-green-600 text-neutral-50 hover:bg-green-300/75 hover:text-white"
          >
            {/* <ArrowBigUpDash className="mr-2 h-4 w-4" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
            New paymentLink
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {view === "type" && "Create new paymentLink"}
              {view === "quick" && "Show QR below"}
              {view === "product" && "Choose product for paymentLink"}
              {view === "price" && !validPrice && "Select price for paymentLink"}
              {view === "price" && validPrice && `Show QR to your client`}
            </DialogTitle>
            <DialogDescription>
              {}
              {view === "quick" &&
                "Your client will be redirected to payment page"}
              {view === "price" &&
                validPrice &&
                `paymentLink for ${selectedPrice} USD`}
            </DialogDescription>
          </DialogHeader>
          <PaymentLink
            view={view}
            setView={setView}
            validPrice={validPrice}
            setValidPrice={setValidPrice}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
          />
        </DialogContent>
      </Dialog>
    );
  } else
    return (
      <Drawer>
        <DrawerTrigger>
          <Button
            onClick={() => {
              setView("type");
              setSelectedProduct(null);
              setSelectedPrice("");
              setValidPrice(false);
            }}
            className="py-1 h-8 bg-green-600 text-neutral-50 hover:bg-green-300/75 hover:text-white"
          >
            {/* <ArrowBigUpDash className="mr-2 h-4 w-4" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
            New paymentLink
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              {" "}
              {view === "type" && "Create new paymentLink"}
              {view === "quick" && "Show QR below"}
              {view === "product" && "Choose product for paymentLink"}
              {view === "price" && !validPrice && "Select price for paymentLink"}
              {view === "price" && validPrice && `Show QR to your client`}
            </DrawerTitle>
            <DrawerDescription>
              {" "}
              {view === "quick" &&
                "Your client will be redirected to payment page"}
              {view === "price" &&
                validPrice &&
                `paymentLink for ${selectedPrice} USD`}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <PaymentLink
              view={view}
              setView={setView}
              validPrice={validPrice}
              setValidPrice={setValidPrice}
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
}
