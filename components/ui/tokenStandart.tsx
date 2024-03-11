import { Badge } from "./badge"

export default function TokenStandartBage ({type}: {type: string}) {
        if (type === 'native') {
          return 
        } else {

          let bg = 'bg-zinc-800 group-hover:bg-zinc-700 hover:bg-red-900/50'
          let text = 'text-neutral-500'

          if (type === 'ERC20') {
            bg = 'bg-blue-900/10 group-hover:bg-blue-900/50 hover:bg-red-900/50'
            text = 'text-blue-100/50'
          }
          if (type === 'BEP20') {
            bg = 'bg-yellow-900/10 group-hover:bg-yellow-900/50 hover:bg-red-900/50'
            text = 'text-yellow-100/50'
          }
          if (type === 'TRC20') {
            bg = 'bg-red-900/10 group-hover:bg-red-900/50 hover:bg-red-900/50'
            text = 'text-red-100/50'
          }

          let defaultClasses = `${bg} ${text} rounded py-0 px-1 transition-none cursor-default`

          return <Badge className={defaultClasses}>{type}</Badge>
        }
}