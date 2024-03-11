"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { IPaymentLink, IToken } from "@/core/types";
import Link from "next/link";
import ProductItem from "./productItem";
import { List, PlusCircleIcon, SearchCodeIcon, TimerIcon, Verified } from "lucide-react";
import tokens from "@/lib/tokens";

export const columns: ColumnDef<IPaymentLink>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // Invoice Date
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {

      const date = new Date(row.getValue("updatedAt"))
      return (
        <Link href={`/payments?id=${row.original.id}`}>
        <div className="flex w-[0px] items-center">
          <span>{date.toLocaleDateString()}</span>
        </div>
        </Link>
      );
    },
  },
  // Invoice Amount (USD)
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader className="justify-end w-fit" column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const price = () => {
        let price = row.getValue("price")
        if (price) {
          return <p className="font-bold">+{Number(price).toFixed(2)} $</p>
        } else {
          return <p className="text-neutral-500">Awaiting</p>
        }
      } 
      return (
        <Link href={`/payments?id=${row.original.id}`}>
        <div className="flex w-[80px] items-center justify-end text-end">
          {price()}
        </div>
        </Link>
      );
    },
  },

    // Invoice Product
    {
      accessorKey: "productId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Product" />
      ),
      cell: ({ row }) => {

        const productId: string = row.getValue("productId")

        return (
          <div className="flex w-[220px] items-center">
            {productId ? (<ProductItem productId={productId} />) : (<p className="text-neutral-500">No product</p>)}
          </div>
        )
      }
    },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
