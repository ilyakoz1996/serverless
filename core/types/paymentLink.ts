import IProduct from "./product";
import IProject from "./project";



export default interface IPaymentLink {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    expiredAt?: string;
    projectId?: string;
    project?: IProject;
    productId?: string;
    product?: IProduct;
    fields?: IField;
    price?: number;
    invoiceId?: string;
    url?: string;
}

interface IField {
    [key: string]: any;
}