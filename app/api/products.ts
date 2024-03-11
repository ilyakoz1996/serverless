import { NextApiRequest, NextApiResponse } from 'next';
import ProductsService from './_services/_products';

const productsService = new ProductsService()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      if (req.query.productId) {
        const product = await productsService.getProduct(req.query.productId as string);
        res.status(200).json(product);
      } else if (req.query.projectId) {
        const products = await productsService.getProductsByProjectId(req.query.projectId as string);
        res.status(200).json(products);
      } else {
        const products = await productsService.getProducts();
        res.status(200).json(products);
      }
      break;
    case 'POST':
      const product = await productsService.createProduct(
        req.body.projectId, req.body.title, req.body.img, req.body.about, req.body.categories, req.body.price, req.body.priceType, req.body.minPrice, req.body.maxPrice, req.body.fields
      );
      res.status(201).json(product); // Created status code
      break;
    case 'PUT':
      if (req.query.productId) {
        const product = await productsService.updateProduct(
            req.query.productId as string, req.body.title, req.body.img, req.body.about, req.body.categories, req.body.price, req.body.priceType, req.body.minPrice, req.body.maxPrice, req.body.fields
        );
        res.status(200).json(product);
      } else {
        res.status(400).json({ error: 'Missing product ID in request' });
      }
      break;
    case 'DELETE':
      if (req.query.productId) {
        const product = await productsService.deleteProduct(req.query.productId as string);
        res.status(200).json(product); // Consider returning a success message instead
      } else {
        res.status(400).json({ error: 'Missing product ID in request' });
      }
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
