import prisma from "@/lib/prisma"

class PaymentLinksService {
  async getPaymentLinks() {
    const links = await prisma.paymentLink.findMany();
    return links;
  }
  async getPaymentLinkById(paymentLinkId: string) {
    const link = await prisma.paymentLink.findUnique({
      where: {
        id: paymentLinkId,
      },
    });
    return link;
  }
  async getPaymentLinkByInvoiceId(invoiceId: string) {
    const link = await prisma.paymentLink.findUnique({
      where: {
        invoiceId: invoiceId,
      },
    });
    return link;
  }
  async getPaymentLinksByProjectId(projectId: string) {
    const links = await prisma.paymentLink.findMany({
      where: {
        projectId: projectId,
      },
    });
    return links;
  }
  async getPaymentLinksByProductId(productId: string) {
    const links = await prisma.paymentLink.findMany({
      where: {
        productId: productId,
      },
    });
    return links
  }
  async createPaymentLink(projectId: string, productId: string, price: number, fields: any, url: string) {
    const prepareLink: any = { projectId };

    if (productId) prepareLink.productId = productId;
    if (price) prepareLink.price = price;
    if (fields) prepareLink.fields = fields;
    if (url) prepareLink.url = url;

    const link = await prisma.paymentLink.create({
      data: prepareLink,
    });
    return link;
  }
  async updatePaymentLinkInvoice(paymentLinkId: string, invoiceId: string, price: number, fields?: any) {
    let expiredAt = new Date();
    expiredAt.setMinutes(expiredAt.getMinutes() + 60);

    const prepareLink: any = {
      expiredAt,
      price,
      invoiceId
    };

    if (fields) prepareLink.fields = fields;

    const link = await prisma.paymentLink.update({
      where: { id: paymentLinkId },
      data: prepareLink,
    });

    return link;
  }
  async deletePaymentLink(paymentLinkId: string) {
    const link = await prisma.paymentLink.delete({
      where: {
        id: paymentLinkId,
      },
    });
    return link;
  }
}

export default PaymentLinksService;

