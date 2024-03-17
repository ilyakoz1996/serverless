"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import LStorage from "@/core/localStorage";
import { Button } from "@/components/ui/button";
import { Code2, Codesandbox, DollarSign, ExternalLinkIcon, Info } from "lucide-react";
import { useGetProject } from "@/core/hooks/projects";
import Loader from "@/components/ui/loader";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CLIENT_URL } from "@/core/constants";

export default function Settings() {
  const storage = new LStorage();

  const currentProject = storage.projects.getProject();

  const { data: project, isLoading } = useGetProject(currentProject?.id!);

  const searchParams = useSearchParams();

  const page = searchParams.get('page')

  const router = useRouter()

  return (
    <>
      <Suspense fallback={<Loader />}>
        {project && !isLoading && (
          <motion.div
            key="products"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col mt-4"
          >
            <div className="flex flex-col pb-4 border-b border-zinc-700/50 w-full">
              <h1 className="font-bold text-2xl">Settings</h1>
              <h2 className="text-neutral-500 mt-1">
                Manage your store info and balance.
              </h2>
            </div>
            <div className="flex space-x-12 mt-8">
              {/* MENU */}
              <div className="flex flex-col space-y-2">
                <Button
                  onClick={() => router.push('/settings')}
                  variant={page !== 'widget' ? 'secondary' : "link"}
                  className="flex space-x-2 justify-start rounded"
                >
                  <Info className="w-4 h-4" />
                  <p>Public Info</p>
                </Button>
                <Button
                  onClick={() => router.push('/settings?page=widget')}
                  variant={page === 'widget' ? 'secondary' : "link"}
                  className=" flex space-x-2 justify-start rounded"
                >
                  <Codesandbox className="w-4 h-4" />
                  <p>Widget Settings</p>
                </Button>
                <Button
                  variant="link"
                  className=" flex space-x-2 justify-start rounded"
                >
                  <DollarSign className="w-4 h-4" />
                  <p>Balance</p>
                </Button>
                <Button
                  variant="link"
                  className=" flex space-x-2 justify-start rounded"
                >
                  <Code2 className="w-4 h-4" />
                  <p>API Settings</p>
                </Button>
              </div>
              {/* PROJECT INFO */}
              {page === 'widget' ? 
                           <div className="flex flex-col">
                           <div className="flex flex-col space-y-2">
                             <h1 className="font-bold text-xl">Widget settings</h1>
                             <h2 className="text-neutral-500">Configure payment widget.</h2>
                           </div>
                           <div className="flex flex-col mt-8">
                            <p>1. Insert this code to your index.js file</p>
                              <div className="flex flex-col w-[500px] h-full rounded border p-4 mt-4">
                                <p className="font-mono text-xs text-neutral-500 italic">#index.html</p>
                                <p className="font-mono text-xs text-neutral-500 italic mt-4">{
                                  `
                                  <head> \n
                                  ...
                                  `
                                }</p>
                                <p className="font-mono text-xs text-neutral-300 italic mt-4">{
                                  `<script defer="defer" type="text/javascript" src="https://widget.${CLIENT_URL}/static/widget.js"></script>`
                                }</p>
                                      <p className="font-mono text-xs text-neutral-500 italic mt-4">{
                                  `
                                  ... \n
                                  </head>
                                  `
                                }</p>
                             
                              </div>
                           </div>
                         </div>
              : 
              <div className="flex flex-col">
                <div className="flex flex-col space-y-2">
                  <h1 className="font-bold text-xl">Store info</h1>
                  <h2 className="text-neutral-500">Manage your store info.</h2>
                </div>
                <div className="flex space-x-8 mt-8">

                <div className="flex flex-col">
                        <p className="font-bold text-neutral-500 text-sm">Logo:</p>
                    <img src={project.img} className="rounded w-24 h-24 mt-2" />
                    </div>

                  <div className="flex flex-col space-y-4">
                    
                    <div className="flex flex-col">
                      <p className="font-bold text-neutral-500 text-sm">
                        ID:
                      </p>
                      <h2 className="text-xs text-neutral-300 font-bold">{project.id}</h2>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold text-neutral-500 text-sm">
                        Title:
                      </p>
                      <h2 className="text-2xl font-bold">{project.title}</h2>
                    </div>
          
                    <div className="flex flex-col">
                      <p className="font-bold text-neutral-500 text-sm">
                        About store:
                      </p>
                      <p className="text-xs mt-2 text-neutral-300 max-w-[200px]">
                        {project.about}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              }
            </div>
          </motion.div>
        )}
      </Suspense>
    </>
  );
}
