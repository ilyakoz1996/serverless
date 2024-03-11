import TokenItem from "./tokenItem";
import { useWidgetContext } from "../widget-provider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IToken } from "@/core/types";

export default function TokenSelectPage() {
  const { setStep, setToken, tokens } = useWidgetContext();

  console.log('tokens', tokens)

  return (
    <div className="flex flex-col w-full px-4 py-3 h-full">
      <ScrollArea className="h-[60dvh]">
        <div className="flex flex-col mt-4">
          <p className="font-bold text-neutral-500">Stable coins:</p>
          {tokens.data && <div className="flex flex-col space-y-2 mt-1">
            {tokens.data
              ?.filter((token: IToken) => token.stable === true)
              .map((token: IToken) => {
                return (
                  <TokenItem
                    token={token}
                    onClick={() => {
                      setToken(token);
                      setStep("connectWallet");
                    }}
                  />
                );
              })}
          </div>}
        </div>
        <div className="flex flex-col mt-4">
          <p className="font-bold text-neutral-500">Other coins:</p>
{tokens.data &&          <div className="flex flex-col space-y-2 mt-1 max-h-">
            {tokens.data
              ?.filter((token: IToken) => token.stable === false)
              .map((token: IToken) => {
                return (
                  <TokenItem
                    token={token}
                    onClick={() => {
                      setToken(token);
                      setStep("connectWallet");
                    }}
                  />
                );
              })}
          </div>}
        </div>
      </ScrollArea>
    </div>
  );
}
