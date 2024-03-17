import { ActivitySquare, CalendarCheckIcon, CopySlashIcon, DollarSign, Triangle } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";
import { IPaymentLink } from "@/core/types";
import { useEffect, useState } from "react";

export default function StatsCarusel ({invoices} : {invoices: IPaymentLink[]}) {

    const [stats, setStats] = useState({
        totalRev: "0.00",
        todayRev: "0.00",
        daylyInvoices: "0",
        succsessRate: "0.00"
    })


    const getStats = (invoices: any[]) => {
        const today: Date = new Date();
        const todayStart: Date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const todayEnd: Date = new Date(todayStart.getTime() + (24 * 60 * 60 * 1000));

        const completedInvoices = invoices.sort((a: any, b: any) => {
            const adate = new Date(Number(a.updatedAt) * 1000)
            const bdate = new Date(Number(b.updatedAt) * 1000)
            return Number(bdate) - Number(adate)
          }).filter((invoice) => invoice.status === 'success')

        let totalRev = 0.00
        let todayRev = 0.00
        let daylyInvoices = 0.00
        let succsessRate = 0.00

        if (completedInvoices.length > 0) {
            completedInvoices.map((invoice) => {
                const createdAt: Date = new Date(invoice.createdAt! * 1000);
                totalRev += (Number(invoice.tokenAmount!) * Number(invoice.tokenPrice))
                if (createdAt >= todayStart && createdAt < todayEnd) {
                    todayRev += (Number(invoice.tokenAmount!) * Number(invoice.tokenPrice))
                }
            })
        }

        const invoiceCountsPerDay: Map<string, number> = new Map();

    let startDate: Date | undefined;
    let endDate: Date | undefined;

    for (const invoice of invoices) {
        const createdAt: Date = new Date(invoice.createdAt! * 1000);
        if (!startDate || createdAt < startDate) {
            startDate = createdAt;
        }
        if (!endDate || createdAt > endDate) {
            endDate = createdAt;
        }
    }

    if (!startDate || !endDate) {
        // No invoices, return 0
        return 0;
    }

    const currentDate: Date = new Date(startDate);
    while (currentDate <= endDate) {
        const currentDateString: string = currentDate.toISOString().split('T')[0];
        invoiceCountsPerDay.set(currentDateString, 0); 
        currentDate.setDate(currentDate.getDate() + 1);
    }

    for (const invoice of invoices) {
        const createdAt: Date = new Date(invoice.createdAt! * 1000);
        const createdAtString: string = createdAt.toISOString().split('T')[0];
        invoiceCountsPerDay.set(createdAtString, (invoiceCountsPerDay.get(createdAtString) || 0) + 1);
    }

    const totalDays: number = invoiceCountsPerDay.size;
    let totalInvoiceCount: number = 0;
    invoiceCountsPerDay.forEach(count => {
        totalInvoiceCount += count;
    });

    daylyInvoices = totalInvoiceCount / totalDays;

    console.log('Инвойсов всего: ', invoices.length)
    console.log('Оплачены: ', completedInvoices.length)

    succsessRate = completedInvoices.length / invoices.length * 100

        return setStats({
            totalRev: Number(totalRev).toFixed(2),
            todayRev: Number(todayRev).toFixed(2),
            daylyInvoices: Number(daylyInvoices).toFixed(),
            succsessRate: Number(succsessRate).toFixed(2)

        })
    }

    useEffect(() => {
        if (invoices.length > 0) {
            getStats(invoices)
        }
    }, [invoices])

    return (
        <Carousel className="w-full select-none cursor-grab">
        <CarouselContent className="w-full">
          <CarouselItem className="basis-auto">
                    <div className="flex flex-col justify-center w-60 h-24 rounded-xl border border-zinc-700/50 bg-zinc-900/25 px-4 py-3">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-neutral-300">Total Revenue</p>
                            <DollarSign className="text-neutral-500 w-4 h-4" />
                        </div>
                        <div className="flex space-x-2 items-center mt-1">
                            <Triangle fill="rgb(74 222 128)" className="w-2 h-2 text-green-400" />
                            <p className="text-lg font-bold">${stats.totalRev}</p>
                        </div>
                        <p className="text-xs text-neutral-500 mt-1">+0% from last month</p>
                    </div>
          </CarouselItem>
          <CarouselItem className="basis-auto">
                    <div className="flex flex-col justify-center w-60 h-24 rounded-xl border border-zinc-700/50 bg-zinc-900/25 px-4 py-3">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-neutral-300">Today</p>
                            <CalendarCheckIcon className="text-neutral-500 w-4 h-4" />
                        </div>
                        <div className="flex space-x-2 items-center mt-1">
                            <Triangle fill="rgb(74 222 128)" className="w-2 h-2 text-green-400" />
                            <p className="text-lg font-bold">${stats.todayRev}</p>
                        </div>
                        <p className="text-xs text-neutral-500 mt-1">+0% from yesterday</p>
                    </div>
          </CarouselItem>
          <CarouselItem className="basis-auto">
                    <div className="flex flex-col justify-center w-60 h-24 rounded-xl border border-zinc-700/50 bg-zinc-900/25 px-4 py-3">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-neutral-300">Daily Invoices</p>
                            <CopySlashIcon className="text-neutral-500 w-4 h-4" />
                        </div>
                        <div className="flex space-x-2 items-center mt-1">
                            <Triangle fill="rgb(74 222 128)" className="w-2 h-2 text-green-400" />
                            <p className="text-lg font-bold">~{stats.daylyInvoices}</p>
                        </div>
                        <p className="text-xs text-neutral-500 mt-1">+0% from last month</p>
                    </div>
          </CarouselItem>
          <CarouselItem className="basis-auto">
                    <div className="flex flex-col justify-center w-60 h-24 rounded-xl border border-zinc-700/50 bg-zinc-900/25 px-4 py-3">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-neutral-300">Succsess rate</p>
                            <ActivitySquare className="text-neutral-500 w-4 h-4" />
                        </div>
                        <div className="flex space-x-2 items-center mt-1">
                            <Triangle fill="rgb(74 222 128)" className="w-2 h-2 text-green-400" />
                            <p className="text-lg font-bold">{stats.succsessRate}%</p>
                        </div>
                        <p className="text-xs text-neutral-500 mt-1">+0% from last month</p>
                    </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    )
}