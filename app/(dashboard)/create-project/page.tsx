"use client";

import CreateStore from "@/components/forms/addProject";
import Loader from "@/components/ui/loader";
import { Suspense } from "react";

export default function CreateProject() {

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="h-full max-w-2xl">
        <Suspense fallback={<Loader />}>
          <CreateStore />
        </Suspense>
      </div>
    </div>
  )
}
