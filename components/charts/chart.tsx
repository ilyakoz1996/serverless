import { IPaymentLink } from '@/core/types';
import FilterTodayInvoices from '@/lib/filters/today';
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Line } from 'recharts';


export default function Chart ({invoices, filterBy }: {invoices: any[], filterBy: string}) {

  const [filteredChartInvoices, setFilteredChartInvoices] = useState<any []>([])

  useEffect(() => {
    if (invoices && filterBy === 'today') {
        setFilteredChartInvoices(FilterTodayInvoices(invoices))
    }
    if (invoices && filterBy === 'week') {
        setFilteredChartInvoices(FilterTodayInvoices(invoices).slice(0, 7))
    }
  }, [invoices, filterBy])

    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={filteredChartInvoices}
          margin={{
            top: 70,
            right: 0,
            left: -34,
            bottom: 0,
          }}
        >
           <defs>
          <linearGradient id="invoices" x1="1" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0072F4" stopOpacity={0.5} />
            <stop offset="85%" stopColor="#0072F4" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="sales" x1="1" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#49DE80" stopOpacity={0.5} />
            <stop offset="85%" stopColor="#49DE80" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="rejected" x1="1" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FB923C" stopOpacity={0.5} />
            <stop offset="85%" stopColor="#FB923C" stopOpacity={0} />
          </linearGradient>
        </defs>
          <CartesianGrid opacity={0.1} strokeDasharray="4" vertical={false}  />
          <XAxis dataKey="name" style={{fontSize: '12px'}} />
          <YAxis style={{fontSize: '12px'}} />
          <Tooltip 
          active={true}
          position={{ x: 0, y: 20 }}
          cursor={{ stroke: '#49DE80', strokeWidth: 0.2 }}
          itemStyle={{display: "none"}} 
          label={{display: 'none'}}
          content={({ active, payload, label }) => {
            console.log('payload', payload)
            const invoices = payload?.length ? payload[0].value : 0.00
            const sales = payload?.length ? payload[1].value : 0.00
            const rejected = payload?.length ? payload[2].value : 0.00
            return (
              <div className='flex justify-between items-center w-[660px]'>

              <div className='flex text-neutral-500 space-x-4 items-center'>
                <div className='bg-zinc-900  flex space-x-2 items-center px-2 py-1 rounded-full border border-zinc-700 text-xs'>
                  <div className='w-2 h-2 rounded-full bg-blue-400'></div>
                  <p>Invoices: <span className='text-neutral-300'>{invoices}</span></p>
                </div>
                <div className='bg-zinc-900 flex space-x-2 items-center px-2 py-1 rounded-full border border-zinc-700 text-xs'>
                  <div className='w-2 h-2 rounded-full bg-green-400'></div>
                  <p>Sales: <span className='text-neutral-300'>{sales}</span></p>
                </div>
                <div className='bg-zinc-900 flex space-x-2 items-center px-2 py-1 rounded-full border border-zinc-700 text-xs'>
                  <div className='w-2 h-2 rounded-full bg-orange-400'></div>
                  <p>Rejected: <span className='text-neutral-300'>{rejected}</span></p>
                </div>
              </div>
              <div className='flex'>
                <p className='font-bold mr-2'>{label}</p>
                <p className='text-neutral-500 text-sm font-normal self-end'>- {new Date().toDateString()}</p>
              </div>
              </div>
            )
        }}
          wrapperStyle={{background: "transparent"}}
          contentStyle={{background: "rgba(255, 255, 255, 0.1)", border: "solid #26262A", borderRadius: "8px", backdropFilter: "blur(10px)"}}
          />

          <Area type="basis" dataKey="invoices" stroke="#0072F4" fill="url(#invoices)" />
          <Area type="basis" dataKey="sales" stroke="#49DE80" fill="url(#sales)" />
          <Area type="basis" dataKey="rejected" stroke="#FB923C" fill="url(#rejected)" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }