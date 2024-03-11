import ProductsService from '../_services/_products';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const productsService = new ProductsService()

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const productId = searchParams.get('productId')
  const projectId = searchParams.get('projectId')
  if (productId) {
    const product = await productsService.getProduct(productId as string);
    return NextResponse.json(product);
  } else if (projectId) {
    const products = await productsService.getProductsByProjectId(projectId as string);
    return NextResponse.json(products);
  } else {
    const products = await productsService.getProducts();
    return NextResponse.json(products);
  }
}
export async function POST(req: NextRequest) {
  const body = await req.json()
  const product = await productsService.createProduct(
    body.projectId, body.title, body.img, body.about, body.categories, body.price, body.priceType, body.minPrice, body.maxPrice, body.fields
  );
  return NextResponse.json(product);
}
export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const productId = searchParams.get('productId')
  const body = await req.json()
  if (productId) {
    const product = await productsService.updateProduct(
        productId as string, body.title, body.img, body.about, body.categories, body.price, body.priceType, body.minPrice, body.maxPrice, body.fields
    );
    return NextResponse.json(product);
  } else {
    return NextResponse.json({ error: 'Missing product ID in request' });
  }
}
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const productId = searchParams.get('productId')
  if (productId) {
    const product = await productsService.deleteProduct(productId as string);
    return NextResponse.json(product);
  } else {
    return NextResponse.json({ error: 'Missing product ID in request' });
  }
}
