import IPaymentLink from "./paymentLink";
import IProduct from "./product";
import IUser  from "./user";
import IWallet from "./wallet";

export default interface IProject {
    id: string;
    slug: string;
    title: string;
    img?: string;
    about?: string;
    websiteUrl?: string;
    products?: IProduct[];
    paymentLinks?: IPaymentLink[];
    wallet?: IWallet;
    user?: IUser;
    userId?: string;
}