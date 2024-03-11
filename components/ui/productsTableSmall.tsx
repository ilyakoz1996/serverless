import { Skeleton } from "@/components/ui/skeleton"
import { IPaymentLink } from "@/core/types"
import { PackageSearch } from "lucide-react"
import { useEffect, useState } from "react"

export default function ProductsTableSmall ({invoices} : {invoices: IPaymentLink[]}) {

    const [sales, setSales] = useState<any[] | null>(null)


    useEffect(() => {
        if (invoices.length > 0) {
            setSales([])
        }
    }, [invoices])

    const isLoading = sales === null

    return (
        <div className="relative flex flex-col w-full h-[22dvh] overflow-y-auto mt-4 border rounded-xl">
        <table className="table-auto rounded-xl" style={{borderCollapse: "separate"}}>
            <thead className="sticky top-0">
                <tr className="bg-zinc-900">
                <th className="border-b border-zinc-700/50 text-neutral-500 text-sm py-1 text-start px-4 rounded-tl-lg">Date</th>
                <th className="border-b border-zinc-700/50 text-neutral-500 text-sm py-1 text-start px-4">Product</th>
                <th className="border-b border-zinc-700/50 text-neutral-500 text-sm py-1 text-start px-4 rounded-tr-lg">Price</th>
                <th className="border-b border-zinc-700/50 text-neutral-500 text-sm py-1 text-start px-4">Token</th>
                <th className="border-b border-zinc-700/50 text-neutral-500 text-sm py-1 text-start px-4">Amount</th>
                </tr>
            </thead>
            
            {isLoading && <tbody className="text-xs text-neutral-500">
                {[1,2,3].map((sceleton) => {
                    return (
                        <tr key={sceleton}>
                                <td className="text-xs">
                                <Skeleton className="h-[16px] w-[48px] rounded" />
                                </td>
                                <td className="flex items-center border-b px-2 min-w-[220px]">
                                    <Skeleton className="h-[42px] w-[42px] rounded" />
                                    <div className="pl-4 flex flex-col space-y-2 py-2 w-min">
                                        <Skeleton className="h-[20px] w-[120px] rounded" />
                                        <Skeleton className="h-[16px] w-[220px] rounded" />
                                    </div>
                                </td>
                                <td className="border-b px-2">
                                    <Skeleton className="h-[24px] w-[64px] rounded" />
                                </td>
                                <td className="border-b px-2">
                                    <Skeleton className="h-[24px] w-[40px] rounded" />
                                </td>
                            </tr>
                    )
                })}
            </tbody>}
        </table>
        {!isLoading && invoices.length === 0 && <div className="flex flex-col space-y-4 w-full h-full items-center justify-center">
            <PackageSearch className="w-12 h-12 text-neutral-500" strokeWidth={0.5} />
            <p className="text-neutral-500 text-sm pb-4">No sales yet</p>
        </div>}
        </div>
    )
}