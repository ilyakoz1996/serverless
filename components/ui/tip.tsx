import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

export default function TooltipInfo({children, title} : {children: React.ReactNode, title: string}) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {children}
          </TooltipTrigger>
          <TooltipContent>
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }