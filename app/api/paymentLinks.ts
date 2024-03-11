import { NextApiRequest, NextApiResponse } from 'next';
import PaymentLinkService from './_services/_paymentLinks';

const paymentLinkService = new PaymentLinkService()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      if (req.query.paymentLinkId) {
        const link = await paymentLinkService.getPaymentLinkById(req.query.paymentLinkId as string);
        res.status(200).json(link);
      } else if (req.query.invoiceId) {
        const link = await paymentLinkService.getPaymentLinkByInvoiceId(req.query.invoiceId as string);
        res.status(200).json(link);
      } else if (req.query.projectId) {
        const links = await paymentLinkService.getPaymentLinksByProjectId(req.query.projectId as string);
        res.status(200).json(links);
      } else if (req.query.productId) {
        const links = await paymentLinkService.getPaymentLinksByProductId(req.query.productId as string);
        res.status(200).json(links);
      } else {
        const links = await paymentLinkService.getPaymentLinks();
        res.status(200).json(links);
      }
      break;
    case 'POST':
      const link = await paymentLinkService.createPaymentLink(req.body.projectId, req.body.productId, req.body.price, req.body.fields, req.body.url);
      res.status(201).json(link); // Created status code
      break;
    case 'PUT':
      if (req.query.paymentLinkId) {
        const updatedLink = await paymentLinkService.updatePaymentLinkInvoice(req.query.paymentLinkId as string, req.body.invoiceId, req.body.price, req.body.fields);
        res.status(200).json(updatedLink);
      } else {
        res.status(400).json({ error: 'Missing payment link ID in request' });
      }
      break;
    case 'DELETE':
      if (req.query.paymentLinkId) {
        const link = await paymentLinkService.deletePaymentLink(req.query.paymentLinkId as string);
        res.status(200).json(link); // Consider returning a success message instead
      } else {
        res.status(400).json({ error: 'Missing payment link ID in request' });
      }
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
