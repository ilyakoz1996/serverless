'use client'

import Chart from "@/components/charts/chart"
import ProductsTableSmall from "@/components/ui/productsTableSmall";
import LStorage from "@/core/localStorage";
import { Radar } from "lucide-react";
import Link from "next/link";
import {motion} from 'framer-motion'
import StatsCarusel from "@/components/ui/statsCarusel";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/core/api";
import { IPaymentLink } from "@/core/types";
import * as _ from 'lodash';
import { Button } from "@/components/ui/button";
import Db3 from 'decentralized-database'
import { Skeleton } from "@/components/ui/skeleton";
import ProductItem from "@/components/tables/paymentLinks/productItem";
import tokens from "@/lib/tokens";

export default function Dashboard() {

    const db = new Db3()

    const storage = new LStorage()
    const router = useRouter()

    const project = storage.projects.getProject()

    useEffect(() => {
        if (!project) {
            router.push('/create-project')
        }
    }, [project])

  const [invoices, setInvoices] = useState<any[]>([])

  const [sales, setSales] = useState<any | 'loading'>('loading')
  const [live, setLive] = useState<any | 'loading'>('loading')

  const getSales = async (projectId: string) => {
    const invoices = await db.getInvoicesByProject(projectId)
    const sales = invoices.sort((a: any, b: any) => {
        const adate = new Date(a.updatedAt!)
        const bdate = new Date(b.updatedAt!)
        return Number(bdate) - Number(adate)
      }).filter((invoice) => invoice.status === 'success')
    const live = invoices.sort((a: any, b: any) => {
        const adate = new Date(a.updatedAt!)
        const bdate = new Date(b.updatedAt!)
        return Number(bdate) - Number(adate)
      }).filter((invoice) => invoice.status === 'init' || invoice.status === "processing")
    console.log('SALES:' , sales)
    console.log('LIVE:' , live)
    setInvoices(invoices)
    setSales(sales)
    setLive(live)
  }

  useEffect(() => {
    if (project?.id) {
      getSales(project.id)
    }
  }, [project?.id])

  const [filterBy, setFilterBy] = useState('today')


    return (
            <motion.div 
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col mt-8 items-center w-full">
                <StatsCarusel invoices={invoices} />
                <div className="flex space-x-8 w-full mt-6">
                    <div className="flex flex-col w-full h-full">
                        <div className="flex justify-between">
                    <p className="text-neutral-300 font-bold text-xl">Charts</p>
                    <div className="flex space-x-3 items-center">
                        <Button className={`${filterBy === 'today' && "bg-zinc-800"} h-8 text-xs`} onClick={() => setFilterBy('today')} variant='outline'>Today</Button>
                        <Button className={`${filterBy === 'week' && "bg-zinc-800"} h-8 text-xs`} onClick={() => setFilterBy('week')} variant='outline'>Week</Button>
                    </div>
                        </div>
                            
                    <div className=" h-[30dvh] w-full">
                        <Chart invoices={invoices} filterBy={filterBy} />
                    </div>
                    <div className="flex space-x-2 items-end w-full justify-between pr-4 mt-2">
                            <p className="text-neutral-300 font-bold text-xl">Latest sales</p>
                            <Link href="/products">
                                <p className="text-green-500 hover:underline font-bold text-xs">All products ↗</p>
                            </Link>
                        </div>
                    <ProductsTableSmall sales={sales} />
                    </div>
                    <div className="flex flex-col w-1/2">
                        <div className="flex space-x-2 items-end w-full justify-between pr-4">
                            <p className="text-neutral-300 font-bold text-xl">Live Invoices</p>
                            <div className="flex space-x-2 items-center justify-end">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <p className="text-neutral-500 font-bold text-xs">Connected</p>
                        </div>
                        </div>
                        <div className="mt-4 w-full rounded-xl border divide-y divide-zinc-700/50 border-zinc-700/50 h-[50dvh] px-3 py-2 flex flex-col space-y-2 overflow-y-auto">
                            {live === 'loading' && 
                                    [1,2,3,4,5,6].map((sceleton) => {
                                        return (
                                            <div key={sceleton} className="">
                                                    <div className="flex items-center px-2 min-w-[220px]">
                                                        <Skeleton className="h-[42px] w-[42px] rounded" />
                                                        <div className="pl-4 flex flex-col space-y-2 py-2 w-min">
                                                            <Skeleton className="h-[20px] w-[120px] rounded" />
                                                            <Skeleton className="h-[16px] w-[220px] rounded" />
                                                        </div>
                                                    </div>
                                                </div>
                                        )
                                    })
                            }
                            {live !== 'loading' && live.length > 0 && 
                                    live.map((invoice) => {
                                        const token = tokens.find((token) => invoice.tokenId === token.id)
                                        return (
                                            <div key={invoice.id} className="flex flex-col">
                                                <div className="w-full flex justify-between">
                                                    <p className="text-xs text-neutral-500 pt-2">{new Date(invoice.updatedAt * 1000 || invoice.createdAt * 1000).toLocaleString()}</p>
                                                </div>
                                            <div className="flex space-x-4">
                                                    <div className="pt-2 flex items-center px-2 min-w-max">
                                                        <ProductItem productId={invoice.productId} />
                                                    </div>
                                                    <div className="flex flex-col text-xs justify-between w-full">
                                                    {invoice.status === 'init' && <p className="text-xs px-2 py-2 text-blue-400 text-end">Awaiting</p>}
                                                    {invoice.status === 'processing' && <p className="text-xs px-2 py-2 text-orange-400 text-end">Processing</p>}
                                                        <div className="flex space-x-2">
                                                            <img src={token.img} className="size-4 rounded-full object-cover" />
                                                            <p>{invoice.tokenAmount}</p>
                                                            <p>{token.symbol}</p> 
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                        )
                                    })
                            }
                            {live !== 'loading' && live.length === 0 && <div className="flex flex-col space-y-4 relative w-full h-full items-center justify-center">
                                <Radar strokeWidth={0.5} className="w-12 h-12 text-neutral-500" />
                                <p className="text-neutral-500 pb-4 text-sm">Waiting for new invoices</p>
                            </div>}
                        </div>
                            <div className="flex space-x-2 items-center justify-end pr-4 mt-2">
                            <Link href="/payments">
                                <p className="text-green-500 hover:underline font-bold text-xs self-end">All invoices ↗</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
    )
}