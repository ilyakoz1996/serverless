import IWallet from "@/core/types/wallet";
import prisma from "@/lib/prisma"

interface WalletData {
  addresses: {
    bitcoin: { address: string };
    litecoin: { address: string };
    tron: { address: string };
    evm: { address: string };
  };
}

class WalletsService {
  async getWallet(projectId: string): Promise<IWallet | null> {
    const {wallet}: any = await prisma.project.findUnique({
      where: { id: projectId }, select: {wallet: true}
    });
    return wallet;
  }
  async createWallet(projectId: string, evm: string, bitcoin: string, litecoin: string, tron: string): Promise<IWallet> {

    const wallet: any = await prisma.wallet.create({
      data: {
        projectId,
        btc: bitcoin,
        ltc: litecoin,
        tron: tron,
        evm: evm,
      },
    });

    return wallet;
  }
  async deleteWallet(walletId: string): Promise<IWallet> {
    const wallet: any = await prisma.wallet.delete({
      where: { id: walletId },
    });
    return wallet;
  }
}

export default WalletsService;
