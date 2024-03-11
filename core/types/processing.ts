
export default interface ICreateInvoiceRequest {
    projectId: string;
    productId?: string | undefined;
    tokenId: number;
    from: string;
    clientEmail: string;
    price: string
}
