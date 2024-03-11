import { CrossCircledIcon } from "@radix-ui/react-icons"
import { CheckCircle, Clock, PlusCircleIcon, Timer } from "lucide-react"
  
  export const labels = [
    {
      value: "product",
      label: "Product",
    },
  ]
  
  export const invoiceStatus = [
    {
      value: 'initial',
      label: "Blank",
      icon: PlusCircleIcon,
    },
    {
      value: 'pending',
      label: "Pending",
      icon: Clock,
    },
    {
      value: 'processing',
      label: "Processing",
      icon: Timer,
    },
    {
      value: 'succsess',
      label: "Succsess",
      icon: CheckCircle,
    },
    {
      value: 'canceled',
      label: "Canceled",
      icon: CrossCircledIcon,
    }
  ]