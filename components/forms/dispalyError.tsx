import { AlertCircleIcon } from "lucide-react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export default function DisplayError ({error} : {error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined}) {
    if (typeof error?.message === 'string') return (
        <div className="flex space-x-2 items-center text-red-500 px-2 mt-2">
            <AlertCircleIcon className="w-3 h-3" />
            <p className="text-red-500 text-xs">{error.message}</p>
        </div>
    )
}