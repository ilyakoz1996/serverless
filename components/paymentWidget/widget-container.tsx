import WidgetFooter from "./footer/widget-footer";
import WidgetHeader from "./header/widget-header";
import { useWidgetContext } from "./widget-provider";
import { useGetProject } from "@/core/hooks/projects";
import { useGetProduct } from "@/core/hooks/products";
import { useEffect } from "react";
import Loader from "../ui/loader";
import WidgetMainPage from "./main/widget-main";
import { useGetPaymentLinkById } from "@/core/hooks/paymentLinks";
import { useGetTokens } from "@/core/hooks/tokens";
import WidgetFieldsPage from "./fields/widget-form";
import TokenSelectPage from "./selectToken/widget-tokenSelect";
import ConnectWalletPage from "./connectWallet/widget-connectWallet";
import WidgetPaymentPage from "./payment/widget-payment";
import Db3 from 'decentralized-database'
import API from "@/core/api";
import WidgetProcessingPage from "./processing/widget-processing";

export default function WidgetContainer ({paymentLinkId} : {paymentLinkId: string | null | undefined}) {

    const {step, setStep, setPaymentLink, setProduct, setProject, setTokens, setInvoice, setToken} = useWidgetContext()

    const paymentLinkData = useGetPaymentLinkById(paymentLinkId!)
    const projectData = useGetProject(paymentLinkData?.data?.projectId)
    const productData = useGetProduct(paymentLinkData?.data?.productId)
    const tokensData = useGetTokens();

    const db3 = new Db3()
    const api = new API()

    const getInvoice = async (invoiceId: string) => {
        const invoice = await db3.getInvoiceById(invoiceId)
        const token = await api.tokens.getToken(Number(invoice.tokenId))
        setInvoice(invoice)
        setToken(token)
        if (invoice.status === 'init') return setStep('payment')
        if (invoice.status === 'processing' || invoice.status === 'success') return setStep('processing')
      }

    useEffect(() => {
        if (tokensData.data) {
            setTokens({
                data: tokensData.data,
                isLoading: tokensData.isLoading
            })
        }
        if (paymentLinkData.data) {
            setPaymentLink({
                data: paymentLinkData.data,
                isLoading: paymentLinkData.isLoading
            })
            console.log('paymentLinkData', paymentLinkData)
            if (paymentLinkData.data?.invoiceId) {
                getInvoice(paymentLinkData.data?.invoiceId)
            }
        }
        if (projectData.data && !projectData.isLoading) {
            setProject({
                data: projectData.data,
                isLoading: projectData.isLoading
            })
        }
        if (productData.data && !productData.isLoading) {
            setProduct({
                data: productData.data,
                isLoading: productData.isLoading
            })
        }
    }, [projectData.data, productData.data, paymentLinkData.data, tokensData.data])


    return (
        <div className="flex flex-col items-center pb-4 bg-zinc-900/50 border border-zinc-700/50 rounded-t-xl lg:rounded-xl h-full w-full max-h-[88dvh] lg:max-h-[80dvh] max-w-md">
            {step !== 'processing' && <WidgetHeader />}
            {paymentLinkData.isLoading && <Loader little title="Invoice is loading..." />}
            {!paymentLinkData.isLoading && 
                <div className="flex flex-col h-full w-full">
                    {step === "main" && <WidgetMainPage />}
                    {step === "fields" && <WidgetFieldsPage />}
                    {step === "selectToken" && <TokenSelectPage />}
                    {step === "connectWallet" && <ConnectWalletPage />}
                    {step === "payment" && <WidgetPaymentPage />}
                    {step === "processing" && <WidgetProcessingPage />}
                </div>
            }
            <WidgetFooter />
        </div>
    )
}