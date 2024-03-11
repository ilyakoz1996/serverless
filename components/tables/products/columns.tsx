"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { IProduct } from "@/core/types"
import Link from "next/link"
import { Settings2Icon } from "lucide-react"

export const columns: ColumnDef<IProduct>[] = [
  // SELECT INPUT
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
  // PRODUCT TITLE
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => {
      return (
        <Link href={`/products?id=${row.original.id}`}>
        <div className="flex space-x-4 items-center">
          <img src={row.original.img} className="w-8 h-8 rounded object-cover" />
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="max-w-[260px] truncate font-medium">
                {row.getValue("title")}
              </span>
            </div>
            <span className="max-w-[400px] text-xs line-clamp-1 mt-1 text-neutral-500">
              {row.original.about}
            </span>
          </div>
        </div>
        </Link>
      )
    }
  },
  // CATEGORIES
  {
    accessorKey: "categories",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categories" />
    ),
    cell: ({ row }) => {
      const categories = row.original.categories && row.original.categories.length > 0 && row.original.categories
      return (
        <div className="flex w-[110px] items-center flex-wrap space-y-2">
              {categories && categories.map((cat) => {
                return (
                  <Badge key={cat} variant="outline" className="w-fit text-xs first-of-type:mt-2">
                    <p className="w-max text-neutral-500">{cat}</p>
                  </Badge>
                )
              })}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      if (row.original.categories && row.original.categories.length > 0) {
        return row.original.categories.some((cat) => value.includes(cat))
      } else return false
  },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} className="justify-end w-fit" title="Price" />
    ),
    cell: ({ row }) => {
      const isFixed = row.original.priceType === 'fixed'
      return (
        <div className="flex w-[80px] items-center justify-end">
          {isFixed ? <p>{row.getValue("price")} $</p> : <>
          <Settings2Icon className="w-4 h-4 text-neutral-500 mr-2" />
          <p className="text-sm text-neutral-500">Optional</p>
          </>
          }
        </div>
      )
    },
    filterFn: (row, id, value) => {

        const onlyFixed = value.length === 1 && value.includes("fixed")
        const onlyOptional = value.length === 1 && value.includes("optional")

        if (onlyFixed) {
          return Number(row.getValue(id)) > 0
        }
        if (onlyOptional) {
          return Number(row.getValue(id)) <= 0
        }
        return true

    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]