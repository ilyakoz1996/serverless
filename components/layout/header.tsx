"use client";

import ProjectSwitcher from "../ui/projectSwitcher";
import {
  ArchiveIcon,
  BellIcon,
  FileTextIcon,
  InfoCircledIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import { UserNav } from "@/components/ui/userNav";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AddProduct } from "@/components/forms/addProduct";
import { AddPaymentLink } from "@/components/forms/addPaymentLink";
import { LayoutDashboardIcon, WalletCardsIcon } from "lucide-react";
import { useState } from "react";
import nProgress from "@/lib/nprogress";
import {motion} from "framer-motion"

export default function Header() {

  const pathname = usePathname();

  const [showNewProductDialog, setShowNewProductDialog] = useState(false);

  return (
    <motion.div 
    initial={{y: -200}}
    animate={{y: 0}}
    exit={{y: -200}}
    transition={{ duration: 0.3, type: "tween" }}
    className="fixed top-0 flex flex-col w-full h-34 pt-4 border-b border-zinc-700/50 bg-zinc-900/50 backdrop:blur-xl">
      <header className="flex items-center justify-between h-14 w-full px-4 lg:px-32 xl:px-44 2xl:px-80 pb-4">
        <div className="flex items-center space-x-4 w-full h-14">
          <ProjectSwitcher />
          <div className="flex items-center h-full">
            <p className="text-neutral-500">
              Balance:{" "}
              <span className=" font-bold text-neutral-300 pl-4">0.00$</span>
            </p>
            <Link href="/wallet">
              <WalletCardsIcon className="ml-4 w-8 h-8 p-2 rounded bg-black border hover:bg-zinc-800/50"/>
              </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4 w-full h-14 justify-end">
          <div className="flex items-center space-x-2 text-neutral-500">
            <Button variant="ghost" className="hover:text-neutral-300">
              <InfoCircledIcon className="mr-2 h-4 w-4" /> Help
            </Button>
            <Button variant="ghost" className="hover:text-neutral-300">
              <FileTextIcon className="mr-2 h-4 w-4" /> Docs
            </Button>
          </div>
          <Button variant="outline" size="icon" className="rounded-full">
            <BellIcon className="h-4 w-4" />
          </Button>
          <UserNav />
        </div>
      </header>
      <div className="flex justify-between items-center px-4 lg:px-32 xl:px-44 2xl:px-80 bg-zinc-950/50 border-t border-zinc-700/50">
        <nav className="flex items-center text-sm">
          <ul className="flex items-center text-neutral-500 h-16">
            <Link
              href={"/dashboard"}
              onClick={() => nProgress.start()}
              className={`h-full px-4 flex space-x-2 items-center cursor-pointer transition-all ${
                pathname === "/dashboard"
                  ? "border-b border-green-400 group text-neutral-300 pointer-events-none"
                  : "border-b border-transparent text-neutral-500 hover:border-zinc-700 group"
              }`}
            >
              <LayoutDashboardIcon className="w-4 h-4 group-hover:text-neutral-300 transition-all" />
              <p className="group-hover:text-neutral-300 transition-all">
                Dashboard
              </p>
            </Link>

            <Link
              href="/products"
              onClick={() => nProgress.start()}
              className={`h-full px-4 flex space-x-2 items-center cursor-pointer transition-all ${
                pathname === "/products"
                  ? "border-b border-green-400 group text-neutral-300 pointer-events-none"
                  : "border-b border-transparent text-neutral-500 hover:border-zinc-700 group"
              }`}
            >
              <ArchiveIcon className="group-hover:text-neutral-300 transition-all" />
              <p className="group-hover:text-neutral-300 transition-all">
                Products
              </p>
            </Link>
            <Link
              href="/payments"
              onClick={() => nProgress.start()}
              className={`h-full px-4 flex space-x-2 items-center cursor-pointer transition-all ${
                pathname === "/payments"
                  ? "border-b border-green-400 group text-neutral-300 pointer-events-none"
                  : "border-b border-transparent text-neutral-500 hover:border-zinc-700 group"
              }`}
            >
              <FileTextIcon className="group-hover:text-neutral-300 transition-all" />
              <p className="group-hover:text-neutral-300 transition-all">
                Payment Links
              </p>
            </Link>
            <Link
              href="/settings"
              onClick={() => nProgress.start()}
              className={`h-full px-4 flex space-x-2 items-center cursor-pointer transition-all ${
                pathname === "/settings"
                  ? "border-b border-green-400 group text-neutral-300 pointer-events-none"
                  : "border-b border-transparent text-neutral-500 hover:border-zinc-700 group"
              }`}
            >
              <MixerHorizontalIcon className="group-hover:text-neutral-300 transition-all" />
              <p className="group-hover:text-neutral-300 transition-all">
                Settings
              </p>
            </Link>
          </ul>
        </nav>
        <div className="flex items-center space-x-4 py-4">
          <AddProduct showNewProductDialog={showNewProductDialog} setShowNewProductDialog={setShowNewProductDialog} />
          <AddPaymentLink />
        </div>
      </div>
    </motion.div>
  );
}
