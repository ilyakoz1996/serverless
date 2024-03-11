import PaymentLinkService from '../_services/_paymentLinks';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const paymentLinkService = new PaymentLinkService()

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const paymentLinkId = searchParams.get('paymentLinkId')
  const invoiceId = searchParams.get('invoiceId')
  const projectId = searchParams.get('projectId')
  const productId = searchParams.get('productId')
  if (paymentLinkId) {
    const link = await paymentLinkService.getPaymentLinkById(paymentLinkId as string);
    return NextResponse.json(link);
  } else if (invoiceId) {
    const link = await paymentLinkService.getPaymentLinkByInvoiceId(invoiceId as string);
    return NextResponse.json(link);
  } else if (projectId) {
    const links = await paymentLinkService.getPaymentLinksByProjectId(projectId as string);
    return NextResponse.json(links);
  } else if (productId) {
    const links = await paymentLinkService.getPaymentLinksByProductId(productId as string);
    return NextResponse.json(links);
  } else {
    const links = await paymentLinkService.getPaymentLinks();
    return NextResponse.json(links);
  }
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  const link = await paymentLinkService.createPaymentLink(body.projectId, body.productId, body.price, body.fields, body.url);
  return NextResponse.json(link);
}
export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const paymentLinkId = searchParams.get('paymentLinkId')
  const body = await req.json();
  if (paymentLinkId) {
    const updatedLink = await paymentLinkService.updatePaymentLinkInvoice(paymentLinkId as string, body.invoiceId, body.price, body.fields);
    return NextResponse.json(updatedLink);
  } else {
    return NextResponse.json({ error: 'Missing payment link ID in request' });
  }
}
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const paymentLinkId = searchParams.get('paymentLinkId')
  if (paymentLinkId) {
    const link = await paymentLinkService.deletePaymentLink(paymentLinkId as string);
    return NextResponse.json(link);
  } else {
    return NextResponse.json({ error: 'Missing payment link ID in request' });
  }
}
