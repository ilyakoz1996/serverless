import { ethers } from "ethers";

const providerUrl: any = {
    ethereum: "https://eth.llamarpc.com",
    bsc: "https://bsc-dataseed1.binance.org/",
    fantom: "https://fantom-rpc.publicnode.com"
  };

export default async function getConfirmations(network: string, txHash: string): Promise<number | undefined> {
    try {
    
      // Replace this with your preferred provider
      const provider = new ethers.JsonRpcProvider(providerUrl[network]);
  
      const receipt = await provider.getTransactionReceipt(txHash);
  
      if (!receipt) {
        return undefined;
      }
      
      const latestBlockNumber = await provider.getBlockNumber();
  
      if (!latestBlockNumber) {
        throw new Error("Failed to fetch latest block number");
      }
  
      const confirmationNumber = latestBlockNumber - receipt.blockNumber + 1;
  
      return confirmationNumber;
    } catch (error) {
      console.error("Error fetching transaction confirmation number:", error);
      return undefined;
    }
  }