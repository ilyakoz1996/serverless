import { AlertCircleIcon } from "lucide-react"

export default function ValidField ({isError}: {isError?: string}) {
    if (isError?.length!) {
        return <AlertCircleIcon className="w-4 h-4 text-red-400" />
    } else return
}