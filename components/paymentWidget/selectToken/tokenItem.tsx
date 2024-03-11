import TokenStandartBage from "@/components/ui/tokenStandart"

export default function TokenItem ({ token, onClick }: { token: any, onClick: any }) {

    return (
        <button onClick={() => onClick()} className="flex w-full text-start items-center space-x-4 border group border-zinc-700/50 bg-zinc-900 rounded hover:bg-zinc-800 py-2 px-3">
        <img
          className="w-8 h-8 rounded-full object-cover border-4 boredr-zinc-700/50 group-hover:border-zinc-700"
          src={token.img}
        />
        <div className="flex flex-col justify-center">
          <div className="flex space-x-2 items-start">
          <p className="font-bold text-neutral-300">{token.symbol}</p>
            <TokenStandartBage type={token.type} />
          </div>
            <p className="text-xs text-neutral-500 capitalize">{token.network}</p>
        </div>
      </button>
    )
}