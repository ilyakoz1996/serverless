import { Skeleton } from "@/components/ui/skeleton"
import { useWidgetContext } from "../widget-provider"

export default function StoreInfo () {

  const {project} = useWidgetContext()

    return (
        <div className="flex space-x-4 items-center px-4 mt-4">
            {project.isLoading || !project.data ? 
            <Skeleton className="w-10 min-w-[40px] min-h-[40px] h-10 rounded-full" /> :
            <img
            src={project.data.img}
            className="w-10 min-w-[40px] min-h-[40px] h-10 rounded-full"
          />
            }
                <div className="flex flex-col items-start w-full">
                {project.isLoading || !project.data ? <Skeleton className="w-24 h-5" /> :
                  <p className="text-neutral-300 font-bold text-lg line-clamp-1 max-w-[220px]">
                    {project?.data?.title!}
                  </p>}
                {project.isLoading || !project ? <Skeleton className="w-24 h-3 mt-2 pb-4" /> :
                  <p className="text-neutral-500 text-xs line-clamp-2 max-w-[290px]">
                    {project?.data?.about!}
                  </p>}
                </div>
              </div>
    )
}