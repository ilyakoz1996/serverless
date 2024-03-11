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
  async createWallet(projectId: string): Promise<IWallet> {

    const wallet: any = await prisma.wallet.create({
      data: {
        projectId,
        btc: 'bc1qmdd3q5q7774nvm2nlgnsps7n4dh2q49ntzylnu',
        ltc: 'ltc1qpt28k7v4zr9jmutkd27fjxnrupcjlpfmpgtwdl',
        tron: 'TEqx4nScnTTjMucmtrq6N5w1Rvt4oYfCnz',
        evm: '0x4519171925483bd4dCF5c88F1EA2559195b3951B',
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
