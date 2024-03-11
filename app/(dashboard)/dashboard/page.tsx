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

export default function Dashboard() {

    const storage = new LStorage()
    const router = useRouter()

    const project = storage.projects.getProject()

    useEffect(() => {
        if (!project) {
            router.push('/create-project')
        }
    }, [project])

    const api = new API()

  const [invoices, setInvoices] = useState<IPaymentLink[]>([])

  const getInvoices = async (projectId: string) => {
    const invoices = await api.paymentLinks.getPaymentLinksByProjectId(projectId)
    return setInvoices(invoices)
  }

  useEffect(() => {

    if (project?.id) {
      getInvoices(project.id)
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
                    <ProductsTableSmall invoices={invoices} />
                    </div>
                    <div className="flex flex-col w-1/2">
                        <div className="flex space-x-2 items-end w-full justify-between pr-4">
                            <p className="text-neutral-300 font-bold text-xl">Live Invoices</p>
                            <div className="flex space-x-2 items-center justify-end">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <p className="text-neutral-500 font-bold text-xs">Connected</p>
                        </div>
                        </div>
                        <div className="mt-4 w-full rounded-xl border border-zinc-700/50 h-[50dvh] px-3 py-2 flex flex-col space-y-2 overflow-y-auto">
                            <div className="flex flex-col space-y-4 relative w-full h-full items-center justify-center">
                                <Radar strokeWidth={0.5} className="w-12 h-12 text-neutral-500" />
                                <p className="text-neutral-500 pb-4 text-sm">Waiting for new invoices</p>
                            </div>
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