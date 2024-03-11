"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Copy, Edit, ExternalLink, PlusCircleIcon, Trash2Icon } from "lucide-react"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>
          <ExternalLink className="w-4 h-4 mr-4" />
          View in store
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy className="w-4 h-4  mr-4" />
          Copy link
        </DropdownMenuItem>
        <DropdownMenuItem>
          <PlusCircleIcon className="w-4 h-4  mr-4" />
          Create invoice
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Edit className="w-4 h-4 mr-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="">
          <Trash2Icon className="w-4 h-4 mr-4 text-red-500" />
          <p className="text-red-500">Delete</p>
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}