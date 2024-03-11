export default interface IToken {
    id: number;
    title: string;
    symbol: string;
    img: string;
    network: string;
    decimals: number;
    contractAddress: string;
    price: number;
    type: string;
    stable: boolean;
}