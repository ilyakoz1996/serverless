import { IProduct } from "@/core/types";
import prisma from "@/lib/prisma"

class ProductsService {
  async getProducts(): Promise<IProduct[]> {
    const products: any = await prisma.product.findMany();
    return products;
  }
  async getProduct(productId: string): Promise<IProduct | null> {
    const product: any = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    return product;
  }
  async getProductsByProjectId(projectId: string): Promise<IProduct[]> {
    const products: any[] = await prisma.product.findMany({
      where: {
        projectId: projectId,
      },
    });
    return products;
  }
  async createProduct(projectId: string, title: string, img?: string, about?: string, categories?: string[], price?: number, priceType?: string, minPrice?: number, maxPrice?: number, fields?: any): Promise<IProduct> {

    const product: any = await prisma.product.create({
      data: {
        projectId: projectId,
        title: title,
        img: img,
        about: about,
        categories: categories,
        price: price,
        priceType: priceType,
        minPrice: minPrice,
        maxPrice: maxPrice,
        fields: fields,
      },
    });
    return product;
  }
  async updateProduct(productId: string, title?: string, img?: string, about?: string, categories?: string[], price?: number, priceType?: string, minPrice?: number, maxPrice?: number, fields?: any): Promise<IProduct> {
    
    const product: any = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        title: title,
        img: img,
        about: about,
        categories: categories,
        price: price,
        priceType: priceType,
        minPrice: minPrice,
        maxPrice: maxPrice,
        fields: fields,
      },
    });
    return product;
  }
  async deleteProduct(productId: string): Promise<IProduct> {
    const product: any = await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    return product;
  }
}

export default ProductsService;
