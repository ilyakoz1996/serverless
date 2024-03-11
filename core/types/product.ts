import IPaymentLink from "./paymentLink";
import IProject from "./project";

export default interface IProduct {
    id?: string;
    title: string;
    img?: string;
    about?: string;
    categories?: string[];
    fields?: IField;
    priceType: string;
    price?: number;
    minPrice?: number;
    maxPrice?: number;
    project?: IProject;
    projectId?: string;
    paymentLinks?: IPaymentLink[];
}

interface IField {
    [key: string]: any;
}